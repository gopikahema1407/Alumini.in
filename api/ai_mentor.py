"""
AI Career Mentor API Endpoint
POST /api/ai-mentor - Send message to AI mentor
GET /api/ai-mentor/health - Check AI service status
"""

import json
from api._common import cors_headers, build_response, verify_authenticated_user
from services.ai_service import get_ai_service

def handler(request):
    """Handle AI mentor requests"""
    
    if hasattr(request, 'method') and request.method == 'OPTIONS':
        return build_response(200, {"ok": True})
    
    method = getattr(request, 'method', 'GET')
    
    if method == "GET":
        # Health check endpoint
        if hasattr(request, 'path') and 'health' in request.path:
            ai_service = get_ai_service()
            health = ai_service.health_check()
            status_code = 200 if health.get("ready") else 503
            return build_response(status_code, health)
        
        return build_response(200, {"message": "AI Mentor Service", "version": "1.0"})
    
    elif method == "POST":
        try:
            # Parse request body
            body = {}
            if hasattr(request, 'get_json'):
                body = request.get_json() or {}
            elif hasattr(request, 'body'):
                body = json.loads(request.body) if isinstance(request.body, str) else request.body
            
            user_message = body.get("message", "").strip()
            user_role = body.get("role", "student")
            context = body.get("context", None)
            user_id = body.get("user_id")
            
            print(f"[ai_mentor] Request: user_id={user_id}, role={user_role}, message_len={len(user_message)}")
            
            if not user_message:
                return build_response(400, {"error": "Message cannot be empty"})
            
            if len(user_message) > 5000:
                return build_response(400, {"error": "Message too long (max 5000 characters)"})
            
            # Get AI service
            ai_service = get_ai_service()
            
            # Generate mentor response
            print(f"[ai_mentor] Generating response...")
            response = ai_service.mentor_chat(user_message, user_role, context)
            
            return build_response(200, {
                "success": response.get("success"),
                "message": response.get("message"),
                "model": response.get("model"),
                "user_message": user_message
            })
        
        except Exception as e:
            print(f"[ai_mentor] Exception: {e}")
            return build_response(500, {"error": str(e)})
    
    return build_response(405, {"error": "Method not allowed"})


def app(environ, start_response):
    """WSGI app"""
    method = environ.get('REQUEST_METHOD', 'GET')
    path = environ.get('PATH_INFO', '')
    
    if method == 'OPTIONS':
        start_response('200 OK', list(cors_headers().items()))
        return [b'{"ok": true}']
    
    content_length = int(environ.get('CONTENT_LENGTH', 0) or 0)
    body_bytes = environ['wsgi.input'].read(content_length) if content_length > 0 else b'{}'
    
    class ReqProxy:
        def __init__(self, m, b, p):
            self.method = m
            self.body = b.decode('utf-8')
            self.path = p
        def get_json(self):
            return json.loads(self.body) if self.body else {}
    
    body_str, code, headers = handler(ReqProxy(method, body_bytes, path))
    start_response(f'{code} OK', list(headers.items()))
    return [body_str.encode('utf-8')]
