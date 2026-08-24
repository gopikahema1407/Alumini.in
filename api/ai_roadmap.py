"""
Career Roadmap Generation API
POST /api/ai-roadmap - Generate personalized career roadmap using AI
"""

import json
import os
from datetime import datetime

def handler(request):
    """Handle AI roadmap generation"""
    
    if hasattr(request, 'method') and request.method == 'OPTIONS':
        return build_response(200, {"ok": True})
    
    method = getattr(request, 'method', 'GET')
    
    if method != "POST":
        return build_response(405, {"error": "Method not allowed"})
    
    try:
        # Parse request
        body = {}
        if hasattr(request, 'get_json'):
            body = request.get_json() or {}
        elif hasattr(request, 'body'):
            body = json.loads(request.body) if isinstance(request.body, str) else request.body
        
        user_id = body.get("user_id")
        target_role = body.get("target_role", "").strip()
        current_role = body.get("current_role", "Student").strip()
        department = body.get("department", "Engineering").strip()
        skills = body.get("skills", "").strip()
        
        if not user_id or not target_role:
            return build_response(400, {"error": "user_id and target_role required"})
        
        # Generate roadmap content
        roadmap = generate_roadmap(target_role, current_role, department, skills)
        
        return build_response(200, {
            "success": True,
            "target_role": target_role,
            "current_role": current_role,
            "department": department,
            "roadmap": roadmap
        })
    
    except Exception as e:
        print(f"[ai_roadmap] Error: {e}")
        import traceback
        traceback.print_exc()
        return build_response(500, {"error": str(e)})


def generate_roadmap(target_role, current_level, department, skills):
    """Generate a personalized career roadmap"""
    
    # Define role-specific roadmaps
    roadmaps = {
        "software engineer": [
            "Phase 1: Build Strong Fundamentals",
            "  • Master programming fundamentals (data structures, algorithms, OOP)",
            "  • Learn a modern programming language (Python, Java, or JavaScript)",
            "  • Understand basic computer science concepts (databases, networks)",
            "  • Time commitment: 3-4 months",
            "",
            "Phase 2: Develop Full-Stack Skills",
            "  • Learn frontend technologies (HTML, CSS, JavaScript, React)",
            "  • Learn backend development (Node.js, Django, or Spring)",
            "  • Understand databases and SQL",
            "  • Work with version control (Git)",
            "  • Time commitment: 4-6 months",
            "",
            "Phase 3: Build Real Projects",
            "  • Create 2-3 portfolio projects showcasing your skills",
            "  • Build a full-stack application",
            "  • Deploy your projects to production",
            "  • Time commitment: 3-4 months",
            "",
            "Phase 4: Open Source & Contribution",
            "  • Contribute to open-source projects on GitHub",
            "  • Learn to work in team environments",
            "  • Build relationships with the tech community",
            "  • Time commitment: 2-3 months (ongoing)",
            "",
            "Phase 5: Interview Preparation",
            "  • Practice coding interviews (LeetCode, HackerRank)",
            "  • Prepare for system design interviews",
            "  • Research companies and roles",
            "  • Mock interview practice",
            "  • Time commitment: 2-3 months",
            "",
            "Phase 6: Networking & Applying",
            "  • Connect with KIT alumni working at top companies",
            "  • Apply to entry-level positions",
            "  • Attend tech meetups and conferences",
            "  • Network with recruiters",
            "  • Time commitment: Ongoing"
        ],
        
        "product manager": [
            "Phase 1: Understand Product Fundamentals",
            "  • Read books on product management (Inspired, Lean Product)",
            "  • Study successful products and their evolution",
            "  • Learn about user experience and design thinking",
            "  • Understand metrics and analytics basics",
            "  • Time commitment: 2-3 months",
            "",
            "Phase 2: Technical Knowledge",
            "  • Learn basic software development concepts",
            "  • Understand APIs and integrations",
            "  • Learn about databases and how they work",
            "  • Familiarize with common tech stacks",
            "  • Time commitment: 2-3 months",
            "",
            "Phase 3: Business & Analytics",
            "  • Learn product strategy and roadmap planning",
            "  • Understand market research and competitive analysis",
            "  • Study pricing and monetization models",
            "  • Learn data analysis and SQL basics",
            "  • Time commitment: 3 months",
            "",
            "Phase 4: Real Experience",
            "  • Take on product roles at startups or companies",
            "  • Manage a feature or small product",
            "  • Work with engineering, design, and marketing teams",
            "  • Launch a product or feature",
            "  • Time commitment: 6-12 months",
            "",
            "Phase 5: Build Your Portfolio",
            "  • Document your product achievements",
            "  • Create case studies of your product decisions",
            "  • Share insights on product strategy",
            "  • Build relationships in product community",
            "  • Time commitment: Ongoing",
            "",
            "Phase 6: Network in PM Community",
            "  • Attend product management conferences",
            "  • Join PM communities and local groups",
            "  • Connect with alumni working in product",
            "  • Mentor others in product development",
            "  • Time commitment: Ongoing"
        ],
        
        "data scientist": [
            "Phase 1: Statistics & Mathematics Foundation",
            "  • Master statistics, probability, and linear algebra",
            "  • Learn calculus and optimization basics",
            "  • Study statistical distributions and hypothesis testing",
            "  • Understand correlation and causation",
            "  • Time commitment: 3-4 months",
            "",
            "Phase 2: Programming & Python",
            "  • Master Python for data science",
            "  • Learn essential libraries (NumPy, Pandas, Scikit-learn)",
            "  • Understand data manipulation and cleaning",
            "  • Learn visualization tools (Matplotlib, Seaborn)",
            "  • Time commitment: 3 months",
            "",
            "Phase 3: Machine Learning Basics",
            "  • Understand supervised and unsupervised learning",
            "  • Learn regression, classification, and clustering",
            "  • Study model evaluation and validation",
            "  • Work with popular ML algorithms",
            "  • Time commitment: 3-4 months",
            "",
            "Phase 4: Advanced Machine Learning",
            "  • Deep learning and neural networks",
            "  • NLP and computer vision",
            "  • Feature engineering and selection",
            "  • Model optimization and tuning",
            "  • Time commitment: 4-6 months",
            "",
            "Phase 5: Real-World Projects",
            "  • Build end-to-end ML projects",
            "  • Work with real datasets from Kaggle",
            "  • Deploy models to production",
            "  • Create a strong portfolio",
            "  • Time commitment: 3-4 months",
            "",
            "Phase 6: Industry Experience",
            "  • Apply to entry-level data science roles",
            "  • Learn SQL for data querying",
            "  • Understand A/B testing and experimentation",
            "  • Collaborate with engineering teams",
            "  • Time commitment: Ongoing"
        ]
    }
    
    # Find matching roadmap
    role_lower = target_role.lower()
    for key in roadmaps:
        if key in role_lower or role_lower in key:
            return "\n".join(roadmaps[key])
    
    # Generate generic roadmap if no specific match
    return generate_generic_roadmap(target_role, current_level, department)


def generate_generic_roadmap(target_role, current_level, department):
    """Generate a generic career roadmap for any role"""
    
    return f"""Career Roadmap to {target_role}
Current Level: {current_level}
Department: {department}

PHASE 1: ASSESS & PLAN (Weeks 1-4)
  • Analyze the target role and required skills
  • Research companies and roles in {target_role} space
  • Identify skill gaps compared to your current level
  • Set SMART goals for the next 6-12 months
  • Action: Create a detailed learning plan

PHASE 2: BUILD CORE SKILLS (Months 2-5)
  • Master fundamental skills for {target_role}
  • Complete relevant online courses and certifications
  • Read industry books and publications
  • Attend webinars and workshops
  • Join communities related to {target_role}
  • Action: Complete 2-3 major courses

PHASE 3: GAIN PRACTICAL EXPERIENCE (Months 6-9)
  • Start building projects related to {target_role}
  • Contribute to open-source or internal projects
  • Take internships or side projects
  • Document your learning journey
  • Build a portfolio of work
  • Action: Complete 1-2 significant projects

PHASE 4: EXPAND YOUR NETWORK (Months 10-12)
  • Connect with KIT alumni in {target_role} roles
  • Attend industry conferences and meetups
  • Schedule informational interviews
  • Join professional associations
  • Participate in online communities
  • Action: Schedule 5-10 informational interviews

PHASE 5: PREPARE FOR OPPORTUNITIES (Months 13+)
  • Practice interviews and assessments
  • Refine your resume and online profiles
  • Apply to relevant positions
  • Negotiate offers
  • Continue learning and growing
  • Action: Apply to 5-10 positions per week

PHASE 6: SUCCEED & CONTINUE GROWTH (Ongoing)
  • Perform excellently in your new role
  • Continue building skills and knowledge
  • Network and mentor others
  • Stay updated with industry trends
  • Plan for long-term career progression
  • Action: Regular learning and networking"""


def build_response(status_code, data):
    """Build API response"""
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
    return json.dumps(data), status_code, headers


def app(environ, start_response):
    """WSGI app for roadmap generation"""
    method = environ.get('REQUEST_METHOD', 'GET')
    
    if method == 'OPTIONS':
        start_response('200 OK', [
            ('Content-Type', 'application/json'),
            ('Access-Control-Allow-Origin', '*'),
            ('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'),
            ('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        ])
        return [b'{"ok": true}']
    
    content_length = int(environ.get('CONTENT_LENGTH', 0) or 0)
    body_bytes = environ['wsgi.input'].read(content_length) if content_length > 0 else b'{}'
    
    class ReqProxy:
        def __init__(self, m, b):
            self.method = m
            self.body = b.decode('utf-8') if isinstance(b, bytes) else b
        
        def get_json(self):
            try:
                return json.loads(self.body) if self.body else {}
            except:
                return {}
    
    body_str, code, headers = handler(ReqProxy(method, body_bytes))
    start_response(f'{code} OK', [(k, v) for k, v in headers.items()])
    return [body_str.encode('utf-8') if isinstance(body_str, str) else body_str]
