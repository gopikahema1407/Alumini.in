"""
Messages API Endpoint
GET/POST /api/messages - Get messages or send new message
"""

import json
from api._common import cors_headers, build_response, get_supabase_admin

def handler(request):
    """Handle message requests"""
    
    if hasattr(request, 'method') and request.method == 'OPTIONS':
        return build_response(200, {"ok": True})
    
    method = getattr(request, 'method', 'GET')
    
    if method == "GET":
        try:
            params = getattr(request, 'args', {}) or getattr(request, 'query_params', {})
            user_id = params.get("user_id")
            other_user_id = params.get("other_user_id")
            limit = int(params.get("limit", 50))
            
            if not user_id:
                return build_response(400, {"error": "user_id required"})
            
            supabase = get_supabase_admin()
            
            # Get conversation with specific user
            if other_user_id:
                # Get messages between two users
                res = supabase.table("messages").select(
                    "*, sender:sender_id(full_name, profile_picture_url), recipient:recipient_id(full_name, profile_picture_url)"
                ).or_(f"sender_id.eq.{user_id},recipient_id.eq.{user_id}").or_(
                    f"sender_id.eq.{other_user_id},recipient_id.eq.{other_user_id}"
                ).order("created_at", desc=False).limit(limit).execute()
            else:
                # Get all conversations for user
                res = supabase.table("messages").select(
                    "*, sender:sender_id(full_name, profile_picture_url), recipient:recipient_id(full_name, profile_picture_url)"
                ).or_(f"sender_id.eq.{user_id},recipient_id.eq.{user_id}").order("created_at", desc=True).limit(limit).execute()
            
            print(f"[messages] Retrieved {len(res.data) if res.data else 0} messages")
            
            return build_response(200, {
                "success": True,
                "messages": res.data if res.data else [],
                "count": len(res.data) if res.data else 0
            })
        
        except Exception as e:
            print(f"[messages] GET Error: {e}")
            return build_response(500, {"error": str(e)})
    
    elif method == "POST":
        try:
            body = {}
            if hasattr(request, 'get_json'):
                body = request.get_json() or {}
            elif hasattr(request, 'body'):
                body = json.loads(request.body) if isinstance(request.body, str) else request.body
            
            sender_id = body.get("sender_id")
            recipient_id = body.get("recipient_id")
            message_text = body.get("message", "").strip()
            attachment_url = body.get("attachment_url")
            
            print(f"[messages] New message: {sender_id} -> {recipient_id}")
            
            if not sender_id or not recipient_id or not message_text:
                return build_response(400, {"error": "sender_id, recipient_id, and message required"})
            
            if len(message_text) > 5000:
                return build_response(400, {"error": "Message too long (max 5000 characters)"})
            
            supabase = get_supabase_admin()
            
            # Create message
            message_data = {
                "sender_id": sender_id,
                "recipient_id": recipient_id,
                "message_text": message_text,
                "attachment_url": attachment_url,
                "is_read": False
            }
            
            res = supabase.table("messages").insert(message_data).execute()
            
            if res.data and len(res.data) > 0:
                message = res.data[0]
                print(f"[messages] Message sent: {message['id']}")
                
                # Create notification
                try:
                    supabase.table("notifications").insert({
                        "user_id": recipient_id,
                        "actor_id": sender_id,
                        "notification_type": "message",
                        "related_message_id": message['id'],
                        "title": "New Message",
                        "description": f"You have a new message from a user",
                        "is_read": False
                    }).execute()
                except:
                    pass
                
                return build_response(201, {
                    "success": True,
                    "message": message
                })
            else:
                return build_response(500, {"error": "Failed to send message"})
        
        except Exception as e:
            print(f"[messages] POST Error: {e}")
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
