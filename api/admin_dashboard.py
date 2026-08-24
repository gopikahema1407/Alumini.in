"""
Admin Dashboard API
GET /api/admin-dashboard - Get admin dashboard data
GET /api/admin-stats - Get platform statistics
GET /api/admin-users - Get all users (admin only)
"""

import json
from datetime import datetime, timedelta
from api._common import cors_headers, build_response, get_supabase_admin

def check_admin_role(request):
    """Check if requester is admin"""
    try:
        user_id = None
        
        # Try multiple ways to get user_id
        if hasattr(request, 'args') and request.args:
            user_id = request.args.get("user_id")
        
        if not user_id and hasattr(request, 'query_params') and request.query_params:
            user_id = request.query_params.get("user_id")
        
        # Last resort: check in body for POST requests
        if not user_id and hasattr(request, 'body'):
            try:
                body_data = json.loads(request.body)
                user_id = body_data.get("user_id")
            except:
                pass
        
        print(f"[admin] Checking role for user_id: {user_id}")
        
        if not user_id:
            print(f"[admin] No user_id provided")
            return False, None
        
        supabase = get_supabase_admin()
        res = supabase.table("users").select("role, id, full_name, email").eq("id", user_id).execute()
        
        if res.data and len(res.data) > 0:
            user_data = res.data[0]
            is_admin = user_data.get("role") == "admin"
            print(f"[admin] User role check: {user_data.get('role')} - Is admin: {is_admin}")
            return is_admin, user_data
        
        print(f"[admin] User not found in database")
        return False, None
    except Exception as e:
        print(f"[admin] Error checking role: {e}")
        import traceback
        traceback.print_exc()
        return False, None


def handler(request):
    """Handle admin requests"""
    
    if hasattr(request, 'method') and request.method == 'OPTIONS':
        return build_response(200, {"ok": True})
    
    method = getattr(request, 'method', 'GET')
    path = getattr(request, 'path', '/api/admin-dashboard')
    
    # Check admin access
    is_admin, user_data = check_admin_role(request)
    if not is_admin:
        return build_response(403, {"error": "Unauthorized: Admin access required"})
    
    if method == "GET":
        try:
            supabase = get_supabase_admin()
            
            # Get all statistics
            # Total users
            total_users = supabase.table("users").select("id", count="exact").execute()
            total_count = total_users.count if hasattr(total_users, 'count') else len(total_users.data) if total_users.data else 0
            
            # Alumni count
            alumni_res = supabase.table("users").select("id", count="exact").eq("role", "alumni").execute()
            alumni_count = alumni_res.count if hasattr(alumni_res, 'count') else len(alumni_res.data) if alumni_res.data else 0
            
            # Student count
            students_res = supabase.table("users").select("id", count="exact").eq("role", "student").execute()
            student_count = students_res.count if hasattr(students_res, 'count') else len(students_res.data) if students_res.data else 0
            
            # Posts count
            posts_res = supabase.table("posts").select("id", count="exact").execute()
            posts_count = posts_res.count if hasattr(posts_res, 'count') else len(posts_res.data) if posts_res.data else 0
            
            # Messages count
            messages_res = supabase.table("messages").select("id", count="exact").execute()
            messages_count = messages_res.count if hasattr(messages_res, 'count') else len(messages_res.data) if messages_res.data else 0
            
            # Mentorship requests
            mentorship_res = supabase.table("mentorship_requests").select("id", count="exact").execute()
            mentorship_count = mentorship_res.count if hasattr(mentorship_res, 'count') else len(mentorship_res.data) if mentorship_res.data else 0
            
            # Recent activity (last 7 days posts)
            seven_days_ago = (datetime.utcnow() - timedelta(days=7)).isoformat()
            recent_res = supabase.table("posts").select("*").gte("created_at", seven_days_ago).order("created_at", desc=True).limit(5).execute()
            recent_activity = recent_res.data if recent_res.data else []
            
            # Top active users
            top_users = supabase.table("users").select("id, full_name, profile_picture_url, role, created_at").order("created_at", desc=True).limit(5).execute()
            
            dashboard_data = {
                "success": True,
                "stats": {
                    "total_users": total_count,
                    "alumni_count": alumni_count,
                    "student_count": student_count,
                    "total_posts": posts_count,
                    "total_messages": messages_count,
                    "active_mentorships": mentorship_count
                },
                "recent_activity": recent_activity,
                "top_users": top_users.data if top_users.data else [],
                "timestamp": datetime.utcnow().isoformat()
            }
            
            return build_response(200, dashboard_data)
        
        except Exception as e:
            print(f"[admin] Dashboard Error: {e}")
            return build_response(500, {"error": str(e)})
    
    return build_response(405, {"error": "Method not allowed"})


def app(environ, start_response):
    """WSGI app"""
    from urllib.parse import parse_qs
    method = environ.get('REQUEST_METHOD', 'GET')
    
    if method == 'OPTIONS':
        start_response('200 OK', list(cors_headers().items()))
        return [b'{"ok": true}']
    
    query_string = environ.get('QUERY_STRING', '')
    qs = parse_qs(query_string)
    args = {k: v[0] for k, v in qs.items() if v}
    
    content_length = int(environ.get('CONTENT_LENGTH', 0) or 0)
    body_bytes = environ['wsgi.input'].read(content_length) if content_length > 0 else b'{}'
    
    class ReqProxy:
        def __init__(self, m, b, a):
            self.method = m
            self.body = b.decode('utf-8')
            self.args = a
            self.path = environ.get('PATH_INFO', '/api/admin-dashboard')
        def get_json(self):
            return json.loads(self.body) if self.body else {}
    
    body_str, code, headers = handler(ReqProxy(method, body_bytes, args))
    start_response(f'{code} OK', list(headers.items()))
    return [body_str.encode('utf-8')]
