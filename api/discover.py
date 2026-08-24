"""
Discovery/Search API Endpoint
GET /api/discover - Search and discover users, posts
"""

import json
from api._common import cors_headers, build_response, get_supabase_admin

def handler(request):
    """Handle discovery requests"""
    
    if hasattr(request, 'method') and request.method == 'OPTIONS':
        return build_response(200, {"ok": True})
    
    method = getattr(request, 'method', 'GET')
    
    if method == "GET":
        try:
            params = getattr(request, 'args', {}) or getattr(request, 'query_params', {})
            search_query = params.get("q", "").strip()
            search_type = params.get("type", "all")  # users, posts, all
            limit = int(params.get("limit", 20))
            
            supabase = get_supabase_admin()
            results = {
                "users": [],
                "posts": []
            }
            
            # Search users
            if search_type in ["users", "all"] and search_query:
                users_res = supabase.table("users").select(
                    "id, full_name, email, department, profile_picture_url, linkedin_url, github_url, bio, is_public"
                ).or_(f"full_name.ilike.%{search_query}%,email.ilike.%{search_query}%,department.ilike.%{search_query}%").eq("is_public", True).limit(limit).execute()
                
                results["users"] = users_res.data if users_res.data else []
                print(f"[discover] Found {len(results['users'])} users")
            
            # Search posts
            if search_type in ["posts", "all"] and search_query:
                posts_res = supabase.table("posts").select(
                    "*, users:user_id(full_name, profile_picture_url)"
                ).or_(f"title.ilike.%{search_query}%,description.ilike.%{search_query}%").eq("is_public", True).order("created_at", desc=True).limit(limit).execute()
                
                results["posts"] = posts_res.data if posts_res.data else []
                print(f"[discover] Found {len(results['posts'])} posts")
            
            # If no search query, get trending posts
            if not search_query and search_type in ["posts", "all"]:
                posts_res = supabase.table("posts").select(
                    "*, users:user_id(full_name, profile_picture_url)"
                ).eq("is_public", True).order("likes_count", desc=True).order("created_at", desc=True).limit(limit).execute()
                
                results["posts"] = posts_res.data if posts_res.data else []
                print(f"[discover] Retrieved {len(results['posts'])} trending posts")
            
            return build_response(200, {
                "success": True,
                "query": search_query,
                "type": search_type,
                **results
            })
        
        except Exception as e:
            print(f"[discover] GET Error: {e}")
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
    
    class ReqProxy:
        def __init__(self, m, a):
            self.method = m
            self.args = a
        def get_json(self):
            return {}
    
    body_str, code, headers = handler(ReqProxy(method, args))
    start_response(f'{code} OK', list(headers.items()))
    return [body_str.encode('utf-8')]
