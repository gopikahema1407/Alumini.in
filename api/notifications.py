"""
Notifications API Endpoint
GET /api/notifications - Get user notifications
"""

import json
from api._common import cors_headers, build_response, get_supabase_admin

def handler(request):
    """Handle notification requests"""
    
    if hasattr(request, 'method') and request.method == 'OPTIONS':
        return build_response(200, {"ok": True})
    
    method = getattr(request, 'method', 'GET')
    
    if method == "GET":
        try:
            params = getattr(request, 'args', {}) or getattr(request, 'query_params', {})
            user_id = params.get("user_id")
            unread_only = params.get("unread_only", "false").lower() == "true"
            limit = int(params.get("limit", 50))
            
            if not user_id:
                return build_response(400, {"error": "user_id required"})
            
            supabase = get_supabase_admin()
            
            # Build query
            query = supabase.table("notifications").select(
                "*, actor:actor_id(full_name, profile_picture_url)"
            ).eq("user_id", user_id)
            
            if unread_only:
                query = query.eq("is_read", False)
            
            query = query.order("created_at", desc=True).limit(limit)
            res = query.execute()
            
            print(f"[notifications] Retrieved {len(res.data) if res.data else 0} notifications")
            
            return build_response(200, {
                "success": True,
                "notifications": res.data if res.data else [],
                "count": len(res.data) if res.data else 0
            })
        
        except Exception as e:
            print(f"[notifications] GET Error: {e}")
            return build_response(500, {"error": str(e)})
    
    elif method == "POST":
        try:
            body = {}
            if hasattr(request, 'get_json'):
                body = request.get_json() or {}
            elif hasattr(request, 'body'):
                body = json.loads(request.body) if isinstance(request.body, str) else request.body
            
            user_id = body.get("user_id")
            notification_id = body.get("notification_id")
            action = body.get("action", "read")  # read, delete
            
            if not user_id or not notification_id:
                return build_response(400, {"error": "user_id and notification_id required"})
            
            supabase = get_supabase_admin()
            
            if action == "read":
                # Mark as read
                res = supabase.table("notifications").update({
                    "is_read": True
                }).eq("id", notification_id).eq("user_id", user_id).execute()
            elif action == "delete":
                # Delete notification
                res = supabase.table("notifications").delete().eq("id", notification_id).eq("user_id", user_id).execute()
            
            return build_response(200, {
                "success": True,
                "message": f"Notification {action}ed"
            })
        
        except Exception as e:
            print(f"[notifications] POST Error: {e}")
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
        def get_json(self):
            return json.loads(self.body) if self.body else {}
    
    body_str, code, headers = handler(ReqProxy(method, body_bytes, args))
    start_response(f'{code} OK', list(headers.items()))
    return [body_str.encode('utf-8')]
