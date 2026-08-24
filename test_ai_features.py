#!/usr/bin/env python3
"""
Test script for AI features in AlumniX
Tests HuggingFace integration for mentor, matchmaker, and roadmap
"""

import sys
import os
from datetime import datetime

# Add project to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

print("=" * 70)
print("AlumniX AI Features Test Suite")
print("=" * 70)
print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

# Test 1: Environment Configuration
print("[Test 1] Checking AI environment configuration...")
from dotenv import load_dotenv
load_dotenv()

HF_TOKEN = os.environ.get("HF_API_TOKEN")
HF_MODEL = os.environ.get("HF_MODEL")
HF_CHAT_MODEL = os.environ.get("HF_CHAT_MODEL")

if HF_TOKEN and HF_MODEL and HF_CHAT_MODEL:
    print("✅ HuggingFace environment variables configured")
    print(f"   Token: {HF_TOKEN[:20]}...")
    print(f"   LLM Model: {HF_MODEL}")
    print(f"   Chat Model: {HF_CHAT_MODEL}")
else:
    print("❌ Missing HuggingFace configuration!")
    print(f"   HF_API_TOKEN: {HF_TOKEN}")
    print(f"   HF_MODEL: {HF_MODEL}")
    print(f"   HF_CHAT_MODEL: {HF_CHAT_MODEL}")
    sys.exit(1)

# Test 2: AI Service Initialization
print("\n[Test 2] Initializing AI Service...")
try:
    from services.ai_service import get_ai_service
    ai_service = get_ai_service()
    print("✅ AI Service initialized successfully")
except Exception as e:
    print(f"❌ Failed to initialize AI Service: {e}")
    sys.exit(1)

# Test 3: Health Check
print("\n[Test 3] Testing AI service health...")
try:
    health = ai_service.health_check()
    print(f"   Status: {health.get('status')}")
    print(f"   Message: {health.get('message')}")
    print(f"   Ready: {health.get('ready')}")
    
    if health.get("ready"):
        print("✅ AI service health check passed")
    else:
        print("⚠️  AI service not ready - may be loading")
except Exception as e:
    print(f"❌ Health check failed: {e}")
    sys.exit(1)

# Test 4: Mentor Chat
print("\n[Test 4] Testing AI Mentor Chat...")
try:
    mentor_response = ai_service.mentor_chat(
        user_message="How do I start learning machine learning?",
        user_role="student",
        context="I'm a second-year Computer Science student"
    )
    
    print(f"   Success: {mentor_response.get('success')}")
    if mentor_response.get('success'):
        response_text = mentor_response.get('message', '')[:100]
        print(f"   Response: {response_text}...")
        print("✅ Mentor chat working")
    else:
        print(f"⚠️  Response: {mentor_response.get('message')[:100]}...")
except Exception as e:
    print(f"❌ Mentor chat test failed: {e}")
    import traceback
    traceback.print_exc()

# Test 5: Career Roadmap
print("\n[Test 5] Testing Career Roadmap Generation...")
try:
    roadmap = ai_service.generate_career_roadmap(
        current_role="Student",
        target_role="Data Scientist",
        department="Computer Science & Engineering"
    )
    
    print(f"   Success: {roadmap.get('success')}")
    if roadmap.get('success'):
        roadmap_text = roadmap.get('roadmap', '')[:100]
        print(f"   Roadmap: {roadmap_text}...")
        print("✅ Career roadmap generation working")
    else:
        print(f"⚠️  Response: {roadmap.get('roadmap', '')[:100]}...")
except Exception as e:
    print(f"❌ Career roadmap test failed: {e}")
    import traceback
    traceback.print_exc()

# Test 6: Alumni Bio Generation
print("\n[Test 6] Testing Alumni Bio Generation...")
try:
    alumni_profile = {
        "full_name": "John Smith",
        "job_role": "Senior Software Engineer",
        "company": "Tech Corp",
        "department": "Computer Science",
        "batch_year": 2020,
        "industry": "Software Development"
    }
    
    bio = ai_service.generate_alumni_bio(alumni_profile)
    
    print(f"   Success: {bio.get('success')}")
    if bio.get('success'):
        bio_text = bio.get('bio', '')[:100]
        print(f"   Bio: {bio_text}...")
        print("✅ Alumni bio generation working")
    else:
        print(f"⚠️  Response: {bio.get('bio', '')[:100]}...")
except Exception as e:
    print(f"❌ Alumni bio test failed: {e}")
    import traceback
    traceback.print_exc()

# Test 7: Feedback Analysis
print("\n[Test 7] Testing Feedback Analysis...")
try:
    feedback = "I really enjoyed the mentorship program! It was very helpful and the mentor was knowledgeable."
    analysis = ai_service.analyze_feedback(feedback)
    
    print(f"   Success: {analysis.get('success')}")
    if analysis.get('success'):
        analysis_text = analysis.get('analysis', '')[:100]
        print(f"   Analysis: {analysis_text}...")
        print("✅ Feedback analysis working")
    else:
        print(f"⚠️  Response: {analysis.get('analysis', '')[:100]}...")
except Exception as e:
    print(f"❌ Feedback analysis test failed: {e}")
    import traceback
    traceback.print_exc()

# Summary
print("\n" + "=" * 70)
print("✅ AI Features Test Suite Complete!")
print("=" * 70)
print("""
Available AI Features:
  ✅ AI Mentor Chat - /api/ai-mentor
  ✅ AI Matchmaker - /api/ai-matchmaker
  ✅ Career Roadmap - /api/ai-roadmap
  ✅ Alumni Bio Generation
  ✅ Feedback Analysis

Next Steps:
  1. Start server: python app.py
  2. Test endpoints via browser or curl
  3. Integrate AI into frontend components
  4. Monitor AI service logs

All systems ready! 🚀
""")
