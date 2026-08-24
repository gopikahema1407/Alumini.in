"""
Profile Update API Endpoint
PATCH /api/profile-update - Update user profile with social media links and pictures
"""

import json
from api._common import cors_headers, build_response, get_supabase_admin

def handler(request):
    """Handle profile update requests"""
    
    if hasattr(request, 'method') and request.method == 'OPTIONS':
        return build_response(200, {"ok": True})
    
    method = getattr(request, 'method', 'GET')
    
    if method == "PATCH":
        try:
            body = {}
            if hasattr(request, 'get_json'):
                body = request.get_json() or {}
            elif hasattr(request, 'body'):
                body = json.loads(request.body) if isinstance(request.body, str) else request.body
            
            user_id = body.get("user_id")
            profile_picture_url = body.get("profile_picture_url")
            linkedin_url = body.get("linkedin_url")
            github_url = body.get("github_url")
            bio = body.get("bio")
            full_name = body.get("full_name")
            department = body.get("department")
            
            print(f"[profile_update] Updating profile: {user_id}")
            
            if not user_id:
                return build_response(400, {"error": "user_id required"})
            
            supabase = get_supabase_admin()
            
            # Build update data
            update_data = {
                "updated_profile_at": "now()"
            }
            
            if profile_picture_url is not None:
                update_data["profile_picture_url"] = profile_picture_url
            if linkedin_url is not None:
                update_data["linkedin_url"] = linkedin_url
            if github_url is not None:
                update_data["github_url"] = github_url
            if bio is not None:
                update_data["bio"] = bio
            if full_name is not None:
                update_data["full_name"] = full_name
            if department is not None:
                update_data["department"] = department
            
            # Update profile
            res = supabase.table("users").update(update_data).eq("id", user_id).execute()
            
            if res.data and len(res.data) > 0:
                print(f"[profile_update] Profile updated successfully")
                return build_response(200, {
                    "success": True,
                    "user": res.data[0]
                })
            else:
                return build_response(404, {"error": "User not found"})
        
        except Exception as e:
            print(f"[profile_update] PATCH Error: {e}")
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
