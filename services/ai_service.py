"""
AlumniX AI Service
Integrates HuggingFace Inference API for various AI features:
- AI Chat/Mentor
- Alumni-Student Matching
- Career Recommendations
- Skill Roadmap Generation
"""

import os
import json
import requests
from typing import Dict, Any, List, Optional

class AIService:
    def __init__(self):
        self.hf_token = os.environ.get("HF_API_TOKEN")
        self.hf_model = os.environ.get("HF_MODEL", "meta-llama/Meta-Llama-3-8B-Instruct")
        self.chat_model = os.environ.get("HF_CHAT_MODEL", "mistralai/Mistral-7B-Instruct-v0.1")
        self.embedding_model = os.environ.get("HF_EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
        self.hf_api_url = "https://api-inference.huggingface.co/models"
        
        if not self.hf_token:
            print("[AIService] Warning: HF_API_TOKEN not configured. AI features will be limited.")
    
    def _get_headers(self) -> Dict[str, str]:
        """Get HTTP headers for HuggingFace API requests"""
        return {
            "Authorization": f"Bearer {self.hf_token}",
            "Content-Type": "application/json"
        }
    
    def _call_model(self, model: str, prompt: str, params: Optional[Dict] = None) -> Optional[str]:
        """
        Call HuggingFace model with a prompt
        
        Args:
            model: Model identifier (e.g., "meta-llama/Meta-Llama-3-8B-Instruct")
            prompt: Input prompt for the model
            params: Optional generation parameters
        
        Returns:
            Generated text or None if error
        """
        if not self.hf_token:
            print(f"[AIService] Error: HF_API_TOKEN not configured")
            return None
        
        try:
            url = f"{self.hf_api_url}/{model}"
            headers = self._get_headers()
            
            payload = {
                "inputs": prompt,
                "parameters": params or {
                    "max_new_tokens": 512,
                    "temperature": 0.7,
                    "top_p": 0.95
                }
            }
            
            print(f"[AIService] Calling {model}...")
            response = requests.post(url, json=payload, headers=headers, timeout=30)
            
            if response.status_code == 200:
                result = response.json()
                if isinstance(result, list) and len(result) > 0:
                    return result[0].get("generated_text", "")
                return result.get("generated_text", "")
            else:
                print(f"[AIService] Error: {response.status_code} - {response.text}")
                return None
        except Exception as e:
            print(f"[AIService] Exception calling model: {e}")
            return None
    
    # ============ CHAT/MENTOR FEATURE ============
    
    def mentor_chat(self, user_message: str, user_role: str = "student", context: Optional[str] = None) -> Dict[str, Any]:
        """
        AI Career Mentor Chat
        
        Args:
            user_message: User's question or message
            user_role: 'student' or 'alumni'
            context: Optional context about user (e.g., major, goals)
        
        Returns:
            Response dict with mentor advice
        """
        role_context = "student" if user_role == "student" else "professional alumni"
        
        prompt = f"""You are an experienced career mentor helping {role_context}s at Karpagam Institute of Technology.
{f"User Context: {context}" if context else ""}

User Question: {user_message}

Provide helpful, actionable career advice in 2-3 sentences. Be supportive and constructive."""
        
        response = self._call_model(self.chat_model, prompt)
        
        return {
            "success": bool(response),
            "message": response if response else "Sorry, I couldn't generate a response. Please try again.",
            "model": self.chat_model
        }
    
    # ============ MATCHMAKER FEATURE ============
    
    def match_alumni_students(self, student_profile: Dict, alumni_profiles: List[Dict]) -> Dict[str, Any]:
        """
        AI-powered matching between students and alumni mentors
        
        Args:
            student_profile: Student's profile with goals, interests, skills
            alumni_profiles: List of alumni profiles with expertise, roles
        
        Returns:
            Ranked list of best matches with explanations
        """
        student_info = f"""
Name: {student_profile.get('full_name', 'Student')}
Department: {student_profile.get('department', 'Unknown')}
Goal: {student_profile.get('interest_area', 'Career guidance')}
Skills: {', '.join(student_profile.get('skills', ['General']))}
"""
        
        alumni_list = "\n".join([
            f"- {a.get('full_name')}: {a.get('job_role')} at {a.get('company')} ({a.get('department')} dept)"
            for a in alumni_profiles[:5]  # Top 5 alumni
        ])
        
        prompt = f"""You are a career matching expert. Based on the student and alumni profiles below, 
rank the top 3 alumni mentors who would be best matches for this student. Explain why each is a good match.

STUDENT PROFILE:
{student_info}

AVAILABLE ALUMNI:
{alumni_list}

Provide your ranking in JSON format:
{{
    "matches": [
        {{"alumni_name": "name", "compatibility": 0.95, "reason": "why good match"}},
        ...
    ]
}}"""
        
        response = self._call_model(self.chat_model, prompt)
        
        try:
            if response:
                # Try to extract JSON from response
                import re
                json_match = re.search(r'\{[\s\S]*\}', response)
                if json_match:
                    return json.loads(json_match.group())
        except:
            pass
        
        return {
            "success": bool(response),
            "matches": [],
            "analysis": response if response else "Could not generate matches"
        }
    
    # ============ SKILL ROADMAP FEATURE ============
    
    def generate_career_roadmap(self, current_role: str, target_role: str, department: str) -> Dict[str, Any]:
        """
        Generate AI career roadmap with skill progression
        
        Args:
            current_role: Current role/position
            target_role: Target career goal
            department: Academic department
        
        Returns:
            Structured roadmap with steps and milestones
        """
        prompt = f"""You are a career development expert. Create a detailed career roadmap for someone moving from "{current_role}" to "{target_role}" with a background in {department}.

Include:
1. Key skills to develop (prioritized)
2. Timeline estimate (months)
3. Specific actions/projects
4. Certifications or learning resources
5. Success metrics

Format as structured JSON with clear progression steps."""
        
        response = self._call_model(self.hf_model, prompt, params={
            "max_new_tokens": 1024,
            "temperature": 0.7
        })
        
        return {
            "success": bool(response),
            "roadmap": response if response else "Could not generate roadmap",
            "model": self.hf_model
        }
    
    # ============ JOB RECOMMENDATION FEATURE ============
    
    def recommend_jobs(self, student_profile: Dict, available_jobs: List[Dict]) -> Dict[str, Any]:
        """
        AI job recommendations based on student profile
        
        Args:
            student_profile: Student's profile
            available_jobs: List of available job listings
        
        Returns:
            Ranked job recommendations
        """
        student_info = f"""
Department: {student_profile.get('department')}
Skills: {', '.join(student_profile.get('skills', ['General']))}
Interests: {student_profile.get('interest_area', 'General')}
Batch Year: {student_profile.get('batch_year', 'Current')}
"""
        
        jobs_list = "\n".join([
            f"- {j.get('title')} at {j.get('company')}: {j.get('description', '')[:100]}"
            for j in available_jobs[:10]
        ])
        
        prompt = f"""You are a job matching AI. Recommend the top 3 jobs for this student and explain why each is a good fit.

STUDENT PROFILE:
{student_info}

AVAILABLE JOBS:
{jobs_list}

Provide recommendations with match percentage and reasons."""
        
        response = self._call_model(self.chat_model, prompt)
        
        return {
            "success": bool(response),
            "recommendations": response if response else "Could not generate recommendations",
            "model": self.chat_model
        }
    
    # ============ SENTIMENT ANALYSIS ============
    
    def analyze_feedback(self, feedback_text: str) -> Dict[str, Any]:
        """
        Analyze sentiment and extract insights from feedback
        
        Args:
            feedback_text: User feedback or review
        
        Returns:
            Sentiment analysis and key points
        """
        prompt = f"""Analyze this feedback and provide:
1. Overall sentiment (positive/neutral/negative)
2. Key points mentioned
3. Suggestions for improvement

Feedback: {feedback_text}

Provide response as structured data."""
        
        response = self._call_model(self.chat_model, prompt)
        
        return {
            "success": bool(response),
            "analysis": response if response else "Could not analyze feedback",
            "model": self.chat_model
        }
    
    # ============ CONTENT GENERATION ============
    
    def generate_alumni_bio(self, alumni_profile: Dict) -> Dict[str, Any]:
        """
        Generate professional bio from alumni profile
        
        Args:
            alumni_profile: Alumni profile data
        
        Returns:
            Generated bio text
        """
        prompt = f"""Generate a professional 2-3 sentence bio for this alumni:
Name: {alumni_profile.get('full_name')}
Role: {alumni_profile.get('job_role')}
Company: {alumni_profile.get('company')}
Department: {alumni_profile.get('department')}
Year: {alumni_profile.get('batch_year')}
Industry: {alumni_profile.get('industry', 'Technology')}

Make it engaging and highlight achievements."""
        
        response = self._call_model(self.chat_model, prompt, params={
            "max_new_tokens": 256,
            "temperature": 0.8
        })
        
        return {
            "success": bool(response),
            "bio": response if response else "Could not generate bio",
            "model": self.chat_model
        }
    
    # ============ HEALTH CHECK ============
    
    def health_check(self) -> Dict[str, Any]:
        """Check if AI service is operational"""
        if not self.hf_token:
            return {
                "status": "unconfigured",
                "message": "HF_API_TOKEN not set",
                "ready": False
            }
        
        try:
            # Simple test prompt
            response = self._call_model(self.chat_model, "Hello, are you working?", params={
                "max_new_tokens": 10
            })
            
            return {
                "status": "operational" if response else "error",
                "message": "AI service is ready" if response else "Could not connect to AI service",
                "ready": bool(response),
                "model": self.chat_model
            }
        except Exception as e:
            return {
                "status": "error",
                "message": str(e),
                "ready": False
            }

# Singleton instance
_ai_service = None

def get_ai_service() -> AIService:
    """Get or create AI service instance"""
    global _ai_service
    if _ai_service is None:
        _ai_service = AIService()
    return _ai_service
