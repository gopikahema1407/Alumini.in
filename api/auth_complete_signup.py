import json
import traceback
from api._common import get_supabase_admin, cors_headers, build_response

def handler(request):
    """
    Vercel Serverless Function / WSGI entry point for POST /api/auth-complete-signup
    Uses Supabase Service Role client to insert user row post-signup.
    """
    # Handle CORS OPTIONS preflight
    if hasattr(request, 'method') and request.method == 'OPTIONS':
        return build_response(200, {"ok": True})
        
    try:
        # Parse body from request object
        body = {}
        if hasattr(request, 'get_json'):
            body = request.get_json() or {}
        elif hasattr(request, 'body'):
            body = json.loads(request.body) if isinstance(request.body, str) else request.body
            
        # Accept both 'id' and 'user_id' field names
        user_id = body.get("id") or body.get("user_id")
        email = body.get("email")
        role = body.get("role", "student")
        full_name = body.get("full_name", "")
        department = body.get("department", "Computer Science & Engineering")
        institution = body.get("institution", "Karpagam Institute of Technology")
        
        print(f"[auth_complete_signup] Request: user_id={user_id}, email={email}, role={role}")
        
        if not email or not user_id:
            print(f"[auth_complete_signup] Error: Missing email={email} or user_id={user_id}")
            return build_response(400, {"error": "Missing email or user_id"})

        try:
            admin_client = get_supabase_admin()
            print("[auth_complete_signup] Supabase admin client initialized")
        except Exception as e:
            print(f"[auth_complete_signup] Failed to initialize admin client: {e}")
            return build_response(500, {"error": f"Database connection failed: {str(e)}"})
            
        # Insert user record into public.users table
        # NOTE: user_id MUST exist in auth.users table (created by Supabase Auth signup)
        user_row = {
            "id": user_id,
            "email": email,
            "role": role,
            "full_name": full_name,
            "institution": institution,
            "department": department
        }
        
        print(f"[auth_complete_signup] Inserting user record: {user_row}")
        
        try:
            res = admin_client.table("users").insert(user_row).execute()
            print(f"[auth_complete_signup] Insert response: {res}")
            
            if res and res.data:
                print(f"[auth_complete_signup] User created successfully: {res.data[0]['id']}")
                return build_response(201, {"success": True, "user": res.data[0]})
            else:
                print("[auth_complete_signup] Error: Empty response from database")
                return build_response(500, {"error": "Failed to create user record"})
        except Exception as db_error:
            # Check for foreign key constraint error
            error_msg = str(db_error)
            if "foreign key" in error_msg.lower():
                print(f"[auth_complete_signup] Foreign key error - auth user may not exist: {db_error}")
                return build_response(409, {"error": "User authentication record not found. Please ensure signup was completed."})
            raise
            
    except Exception as e:
        print(f"[auth_complete_signup] Exception: {e}")
        print(f"[auth_complete_signup] Traceback: {traceback.format_exc()}")
        return build_response(500, {"error": str(e)})

# WSGI compatibility
def app(environ, start_response):
    import sys
    # Extract method and body for WSGI environment
    method = environ.get('REQUEST_METHOD', 'GET')
    if method == 'OPTIONS':
        start_response('200 OK', list(cors_headers().items()))
        return [b'{"ok": true}']
        
    try:
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
    except Exception as e:
        print(f"[auth_complete_signup WSGI] Error: {e}")
        print(f"[auth_complete_signup WSGI] Traceback: {traceback.format_exc()}")
        start_response('500 Internal Error', list(cors_headers().items()))
        return [json.dumps({"error": str(e)}).encode('utf-8')]
