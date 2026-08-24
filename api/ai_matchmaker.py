"""
AI Matchmaker API Endpoint
POST /api/ai-matchmaker - Get AI-powered alumni-student matches
"""

import json
from api._common import cors_headers, build_response, get_supabase_admin
from services.ai_service import get_ai_service

def handler(request):
    """Handle AI matchmaker requests"""
    
    if hasattr(request, 'method') and request.method == 'OPTIONS':
        return build_response(200, {"ok": True})
    
    method = getattr(request, 'method', 'GET')
    
    if method == "POST":
        try:
            # Parse request
            body = {}
            if hasattr(request, 'get_json'):
                body = request.get_json() or {}
            elif hasattr(request, 'body'):
                body = json.loads(request.body) if isinstance(request.body, str) else request.body
            
            student_id = body.get("student_id")
            limit = body.get("limit", 5)
            department_filter = body.get("department")
            
            print(f"[ai_matchmaker] Request: student_id={student_id}, limit={limit}")
            
            if not student_id:
                return build_response(400, {"error": "student_id required"})
            
            # Get student profile
            supabase = get_supabase_admin()
            student_res = supabase.table("users").select("*").eq("id", student_id).execute()
            
            if not student_res.data or len(student_res.data) == 0:
                return build_response(404, {"error": "Student not found"})
            
            student = student_res.data[0]
            
            # Get alumni profiles
            query = supabase.table("alumni_profiles").select("*")
            if department_filter:
                query = query.eq("department", department_filter)
            else:
                query = query.eq("department", student.get("department", ""))
            
            alumni_res = query.limit(20).execute()
            alumni_list = alumni_res.data if alumni_res.data else []
            
            print(f"[ai_matchmaker] Found {len(alumni_list)} alumni in {student.get('department')}")
            
            if len(alumni_list) == 0:
                return build_response(200, {
                    "success": False,
                    "matches": [],
                    "message": "No alumni found for matching"
                })
            
            # Prepare student profile for AI
            student_profile = {
                "full_name": student.get("full_name", "Student"),
                "department": student.get("department", ""),
                "interest_area": student.get("interest_area", "Career guidance"),
                "skills": ["General", "Learning"]
            }
            
            # Call AI matchmaker
            ai_service = get_ai_service()
            print(f"[ai_matchmaker] Running AI match analysis...")
            ai_matches = ai_service.match_alumni_students(student_profile, alumni_list)
            
            # Enrich matches with full alumni data
            enriched_matches = []
            for match in ai_matches.get("matches", []):
                # Find full alumni data by name
                for alumni in alumni_list:
                    if match.get("alumni_name") and alumni.get("full_name") in match.get("alumni_name"):
                        enriched_matches.append({
                            "alumni_id": alumni.get("id"),
                            "alumni_name": alumni.get("full_name"),
                            "job_role": alumni.get("job_role"),
                            "company": alumni.get("company"),
                            "department": alumni.get("department"),
                            "compatibility": match.get("compatibility", 0.8),
                            "reason": match.get("reason"),
                            "mentor_available": alumni.get("mentor_available", True)
                        })
                        break
            
            # Limit results
            enriched_matches = enriched_matches[:limit]
            
            return build_response(200, {
                "success": True,
                "student_id": student_id,
                "matches": enriched_matches,
                "match_count": len(enriched_matches),
                "model": ai_matches.get("model", "unknown")
            })
        
        except Exception as e:
            print(f"[ai_matchmaker] Exception: {e}")
            import traceback
            print(traceback.format_exc())
            return build_response(500, {"error": str(e)})
    
    return build_response(405, {"error": "Method not allowed"})


def app(environ, start_response):
    """WSGI app"""
    method = environ.get('REQUEST_METHOD', 'GET')
    
    if method == 'OPTIONS':
        start_response('200 OK', list(cors_headers().items()))
        return [b'{"ok": true}']
    
    content_length = int(environ.get('CONTENT_LENGTH', 0) or 0)
    body_bytes = environ['wsgi.input'].read(content_length) if content_length > 0 else b'{}'
    
    class ReqProxy:
        def __init__(self, m, b):
            self.method = m
            self.body = b.decode('utf-8')
        def get_json(self):
            return json.loads(self.body) if self.body else {}
    
    body_str, code, headers = handler(ReqProxy(method, body_bytes))
    start_response(f'{code} OK', list(headers.items()))
    return [body_str.encode('utf-8')]
