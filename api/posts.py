"""
Posts API Endpoint
GET/POST /api/posts - Get posts or create new post
DELETE /api/posts/<post_id> - Delete a post
POST /api/posts/<post_id>/report - Report a post
"""

import json
from api._common import cors_headers, build_response, get_supabase_admin

def check_post_ownership_or_admin(request, post_id, user_id):
    """Check if user owns the post or is admin"""
    try:
        supabase = get_supabase_admin()
        
        # Get post owner
        post_res = supabase.table("posts").select("user_id").eq("id", post_id).execute()
        if not post_res.data or len(post_res.data) == 0:
            return False, "Post not found"
        
        post_owner_id = post_res.data[0]["user_id"]
        
        # Check if user owns post
        if post_owner_id == user_id:
            return True, "Owner"
        
        # Check if user is admin
        user_res = supabase.table("users").select("role").eq("id", user_id).execute()
        if user_res.data and len(user_res.data) > 0:
            if user_res.data[0].get("role") == "admin":
                return True, "Admin"
        
        return False, "Not authorized"
    except Exception as e:
        print(f"[posts] Error checking ownership: {e}")
        return False, str(e)

def handler(request):
    """Handle post requests"""
    
    if hasattr(request, 'method') and request.method == 'OPTIONS':
        return build_response(200, {"ok": True})
    
    method = getattr(request, 'method', 'GET')
    path = getattr(request, 'path', '/api/posts')
    
    # Parse path for DELETE and REPORT
    if method == "DELETE" or (method == "POST" and "/report" in path):
        try:
            # Extract post_id from path: /api/posts/<post_id> or /api/posts/<post_id>/report
            path_parts = path.strip('/').split('/')
            if len(path_parts) >= 3 and path_parts[0] == 'api' and path_parts[1] == 'posts':
                post_id = path_parts[2]
                
                # Get user_id from request
                body = {}
                if hasattr(request, 'get_json'):
                    body = request.get_json() or {}
                elif hasattr(request, 'body'):
                    body = json.loads(request.body) if isinstance(request.body, str) else request.body
                
                user_id = body.get("user_id")
                
                if method == "DELETE":
                    # Delete post
                    if not user_id:
                        return build_response(400, {"error": "user_id required"})
                    
                    is_authorized, reason = check_post_ownership_or_admin(request, post_id, user_id)
                    if not is_authorized:
                        return build_response(403, {"error": "Unauthorized: " + reason})
                    
                    supabase = get_supabase_admin()
                    supabase.table("posts").delete().eq("id", post_id).execute()
                    print(f"[posts] Post deleted: {post_id} by {user_id}")
                    return build_response(200, {"success": True, "message": "Post deleted"})
                
                elif method == "POST" and "/report" in path:
                    # Report post
                    if not user_id:
                        return build_response(400, {"error": "user_id required"})
                    
                    reason = body.get("reason", "").strip()
                    if not reason:
                        return build_response(400, {"error": "reason required"})
                    
                    supabase = get_supabase_admin()
                    
                    # Create post_reports table if it doesn't exist (implicit via insert)
                    report_data = {
                        "post_id": post_id,
                        "reporter_id": user_id,
                        "reason": reason
                    }
                    
                    res = supabase.table("post_reports").insert(report_data).execute()
                    print(f"[posts] Post reported: {post_id} by {user_id}")
                    return build_response(201, {"success": True, "message": "Post reported"})
        
        except Exception as e:
            print(f"[posts] Error in DELETE/REPORT: {e}")
            return build_response(500, {"error": str(e)})
    
    if method == "GET":
        try:
            # Get query parameters
            params = getattr(request, 'args', {}) or getattr(request, 'query_params', {})
            user_id = params.get("user_id")
            post_type = params.get("type")
            limit = int(params.get("limit", 20))
            offset = int(params.get("offset", 0))
            
            supabase = get_supabase_admin()
            
            # Build query
            query = supabase.table("posts").select("*, users:user_id(full_name, profile_picture_url, linkedin_url, github_url)")
            
            # Filter by user if specified
            if user_id:
                query = query.eq("user_id", user_id)
            
            # Filter by type if specified (note: use 'type' not 'post_type')
            if post_type:
                query = query.eq("type", post_type)
            
            # Order by newest and apply limit/offset
            query = query.order("created_at", desc=True).limit(limit).offset(offset)
            
            res = query.execute()
            
            print(f"[posts] Retrieved {len(res.data) if res.data else 0} posts")
            
            return build_response(200, {
                "success": True,
                "posts": res.data if res.data else [],
                "count": len(res.data) if res.data else 0
            })
        
        except Exception as e:
            print(f"[posts] GET Error: {e}")
            import traceback
            traceback.print_exc()
            return build_response(500, {"error": str(e)})
    
    elif method == "POST":
        try:
            body = {}
            if hasattr(request, 'get_json'):
                body = request.get_json() or {}
            elif hasattr(request, 'body'):
                body = json.loads(request.body) if isinstance(request.body, str) else request.body
            
            user_id = body.get("user_id")
            action = body.get("action")  # "like", "comment", or create post
            
            # ===== LIKE ACTION =====
            if action == "like":
                post_id = body.get("post_id")
                if not post_id or not user_id:
                    return build_response(400, {"error": "Missing post_id or user_id"})
                
                supabase = get_supabase_admin()
                
                # Check if already liked
                existing = supabase.table("posts_likes").select("id").eq("post_id", post_id).eq("user_id", user_id).execute()
                if existing and existing.data and len(existing.data) > 0:
                    return build_response(400, {"error": "Already liked"})
                
                # Add like
                like_data = {"post_id": post_id, "user_id": user_id}
                like_res = supabase.table("posts_likes").insert(like_data).execute()
                
                # Update post like count
                posts_res = supabase.table("posts").select("likes_count").eq("id", post_id).execute()
                if posts_res.data and len(posts_res.data) > 0:
                    current_count = posts_res.data[0].get("likes_count", 0) or 0
                    supabase.table("posts").update({"likes_count": current_count + 1}).eq("id", post_id).execute()
                
                print(f"[posts] Post liked: {post_id} by {user_id}")
                return build_response(200, {"success": True, "message": "Post liked"})
            
            # ===== COMMENT ACTION =====
            elif action == "comment":
                post_id = body.get("post_id")
                comment_text = body.get("comment_text", "").strip()
                if not post_id or not user_id or not comment_text:
                    return build_response(400, {"error": "Missing required fields for comment"})
                
                supabase = get_supabase_admin()
                
                # Add comment
                comment_data = {
                    "post_id": post_id,
                    "user_id": user_id,
                    "comment_text": comment_text
                }
                comment_res = supabase.table("posts_comments").insert(comment_data).execute()
                
                # Update post comment count
                posts_res = supabase.table("posts").select("comments_count").eq("id", post_id).execute()
                if posts_res.data and len(posts_res.data) > 0:
                    current_count = posts_res.data[0].get("comments_count", 0) or 0
                    supabase.table("posts").update({"comments_count": current_count + 1}).eq("id", post_id).execute()
                
                print(f"[posts] Comment added to post: {post_id} by {user_id}")
                if comment_res.data and len(comment_res.data) > 0:
                    return build_response(201, {"success": True, "comment": comment_res.data[0]})
                else:
                    return build_response(500, {"error": "Failed to add comment"})
            
            # ===== CREATE POST =====
            else:
                title = body.get("title", "").strip()
                description = body.get("description", "").strip()
                image_url = body.get("image_url")
                post_type = body.get("type", "announcement")
                tags = body.get("tags", [])
                
                print(f"[posts] Creating post: user_id={user_id}, type={post_type}")
                
                if not user_id or not title or not description:
                    return build_response(400, {"error": "user_id, title, and description required"})
                
                supabase = get_supabase_admin()
                
                # Create post
                post_data = {
                    "user_id": user_id,
                    "title": title,
                    "description": description,
                    "image_url": image_url,
                    "type": post_type,  # Changed from post_type to type
                    "tags": tags,
                    "likes_count": 0,
                    "comments_count": 0
                }
                
                res = supabase.table("posts").insert(post_data).execute()
                
                if res.data and len(res.data) > 0:
                    print(f"[posts] Post created: {res.data[0]['id']}")
                    return build_response(201, {
                        "success": True,
                        "post": res.data[0]
                    })
                else:
                    return build_response(500, {"error": "Failed to create post"})
        
        except Exception as e:
            print(f"[posts] POST Error: {e}")
            import traceback
            traceback.print_exc()
            return build_response(500, {"error": str(e)})
    
    return build_response(405, {"error": "Method not allowed"})


def app(environ, start_response):
    """WSGI app"""
    from urllib.parse import parse_qs
    method = environ.get('REQUEST_METHOD', 'GET')
    path = environ.get('PATH_INFO', '/api/posts')
    
    if method == 'OPTIONS':
        start_response('200 OK', list(cors_headers().items()))
        return [b'{"ok": true}']
    
    query_string = environ.get('QUERY_STRING', '')
    qs = parse_qs(query_string)
    args = {k: v[0] for k, v in qs.items() if v}
    
    content_length = int(environ.get('CONTENT_LENGTH', 0) or 0)
    body_bytes = environ['wsgi.input'].read(content_length) if content_length > 0 else b'{}'
    
    class ReqProxy:
        def __init__(self, m, b, a, p):
            self.method = m
            self.body = b.decode('utf-8')
            self.args = a
            self.path = p
        def get_json(self):
            return json.loads(self.body) if self.body else {}
    
    body_str, code, headers = handler(ReqProxy(method, body_bytes, args, path))
    start_response(f'{code} OK', list(headers.items()))
    return [body_str.encode('utf-8')]
