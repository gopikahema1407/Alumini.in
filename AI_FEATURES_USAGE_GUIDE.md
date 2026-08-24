# AI Features Usage Guide - AlumniX

## 📚 Complete Guide to AI Integration

Your AlumniX platform now has enterprise-grade AI capabilities integrated with HuggingFace Inference API.

---

## 🎯 AI Features Overview

### 1. AI Career Mentor ✅
**What it does:** Provides intelligent career advice and mentoring

**Best for:**
- Students asking career questions
- Career transition guidance
- Skill development advice
- Industry insights

**Example:** 
```
Student: "I want to transition from web development to machine learning. How do I start?"
AI Mentor: "Here's a structured path to get started in ML..."
```

### 2. AI Matchmaker ✅
**What it does:** Matches students with the most suitable alumni mentors

**Best for:**
- Finding ideal mentorship pairs
- Department-specific matching
- Skill-based recommendations

**Example:**
```
Student: "I'm looking for a mentor in data science"
AI: "Based on your profile, these 5 alumni are great matches..."
```

### 3. Career Roadmap Generator ✅
**What it does:** Creates personalized career progression paths

**Best for:**
- Career planning
- Skill gap identification
- Timeline estimation

**Example:**
```
Goal: "Become a Data Science Manager"
AI: "Here's your 3-year roadmap with milestones..."
```

---

## 🔧 How to Integrate AI Into Your Pages

### Frontend Integration - Mentor Chat

**Add to chat page (chat.html):**

```html
<!-- AI Mentor Button -->
<button id="askAI" class="btn-secondary">
  🤖 Ask AI Mentor
</button>

<!-- Modal for AI Response -->
<div id="aiModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h3>AI Career Mentor</h3>
    <textarea id="aiQuestion" placeholder="Ask anything about your career..."></textarea>
    <button id="sendToAI">Get Advice</button>
    <div id="aiResponse"></div>
  </div>
</div>
```

**JavaScript (chat.js):**

```javascript
// Send message to AI Mentor
async function askAIMentor() {
  const question = document.getElementById('aiQuestion').value;
  
  if (!question.trim()) {
    alert('Please ask a question');
    return;
  }
  
  try {
    const response = await window.apiClient.post('/api/ai-mentor', {
      message: question,
      role: window.authService.getCurrentUser().role,
      context: `${window.authService.getCurrentUser().full_name} - ${window.authService.getCurrentUser().department}`,
      user_id: window.authService.getCurrentUser().id
    });
    
    if (response.success) {
      document.getElementById('aiResponse').innerHTML = `
        <div class="ai-response">
          <strong>🤖 AI Mentor:</strong>
          <p>${response.message}</p>
        </div>
      `;
    } else {
      alert('AI could not generate response: ' + response.message);
    }
  } catch (error) {
    console.error('AI Mentor Error:', error);
    alert('Error connecting to AI Mentor');
  }
}

// Bind button
document.getElementById('sendToAI').addEventListener('click', askAIMentor);
```

### Frontend Integration - AI Matchmaker

**Add to matchmaker page (matchmaker.html):**

```html
<!-- AI Match Button -->
<button id="findAIMatches" class="btn-primary">
  🤖 Find Perfect Mentor Match (AI Powered)
</button>

<!-- Results Container -->
<div id="aiMatches" class="matches-container"></div>
```

**JavaScript (matchmaker.js):**

```javascript
// Get AI-powered matches
async function getAIMatches() {
  const user = window.authService.getCurrentUser();
  
  try {
    const matches = await window.apiClient.post('/api/ai-matchmaker', {
      student_id: user.id,
      limit: 5,
      department: user.department
    });
    
    if (matches.success && matches.matches.length > 0) {
      displayAIMatches(matches.matches);
    } else {
      document.getElementById('aiMatches').innerHTML = 
        '<p>No alumni matches found. Please try again later.</p>';
    }
  } catch (error) {
    console.error('AI Matchmaker Error:', error);
    alert('Error finding matches');
  }
}

function displayAIMatches(matches) {
  const html = matches.map(match => `
    <div class="match-card">
      <h4>${match.alumni_name}</h4>
      <p><strong>Role:</strong> ${match.job_role} at ${match.company}</p>
      <p><strong>Department:</strong> ${match.department}</p>
      <p><strong>Compatibility:</strong> ${(match.compatibility * 100).toFixed(0)}%</p>
      <p><strong>Why matched:</strong> ${match.reason}</p>
      <button onclick="requestMentorship('${match.alumni_id}')">
        Request Mentorship
      </button>
    </div>
  `).join('');
  
  document.getElementById('aiMatches').innerHTML = html;
}

// Bind button
document.getElementById('findAIMatches').addEventListener('click', getAIMatches);
```

### Frontend Integration - Career Roadmap

**Add to roadmap page (roadmap.html):**

```html
<!-- Roadmap Generator -->
<div class="roadmap-generator">
  <input id="targetRole" placeholder="Enter your target role (e.g., Data Scientist)" />
  <button id="generateRoadmap" class="btn-primary">
    🤖 Generate AI Roadmap
  </button>
</div>

<!-- Roadmap Display -->
<div id="roadmapResult"></div>
```

**JavaScript (roadmap.js):**

```javascript
// Generate AI Roadmap
async function generateAIRoadmap() {
  const targetRole = document.getElementById('targetRole').value.trim();
  const user = window.authService.getCurrentUser();
  
  if (!targetRole) {
    alert('Please enter a target role');
    return;
  }
  
  try {
    document.getElementById('generateRoadmap').disabled = true;
    document.getElementById('generateRoadmap').textContent = '⏳ Generating...';
    
    const roadmap = await window.apiClient.post('/api/ai-roadmap', {
      user_id: user.id,
      target_role: targetRole,
      current_role: 'Student',
      department: user.department
    });
    
    if (roadmap.success) {
      displayRoadmap(roadmap);
    } else {
      alert('Could not generate roadmap');
    }
  } catch (error) {
    console.error('Roadmap Error:', error);
    alert('Error generating roadmap');
  } finally {
    document.getElementById('generateRoadmap').disabled = false;
    document.getElementById('generateRoadmap').textContent = '🤖 Generate AI Roadmap';
  }
}

function displayRoadmap(roadmap) {
  const html = `
    <div class="roadmap-container">
      <h3>Your Career Roadmap: ${roadmap.target_role}</h3>
      <p><strong>Current Role:</strong> ${roadmap.current_role}</p>
      <p><strong>Department:</strong> ${roadmap.department}</p>
      <div class="roadmap-content">
        ${roadmap.roadmap}
      </div>
    </div>
  `;
  
  document.getElementById('roadmapResult').innerHTML = html;
}

// Bind button
document.getElementById('generateRoadmap').addEventListener('click', generateAIRoadmap);
```

---

## 🚀 Deploying AI Features

### Step 1: Verify Configuration

Check that `.env` has:
```env
HF_API_TOKEN=hf_YOUR_TOKEN_HERE
HF_MODEL=meta-llama/Meta-Llama-3-8B-Instruct
HF_CHAT_MODEL=mistralai/Mistral-7B-Instruct-v0.1
```

### Step 2: Test AI Services

```bash
# Test AI features
python AluminiX/test_ai_features.py

# Should show ✅ for all components
```

### Step 3: Start Server

```bash
python AluminiX/app.py
# Server running on http://localhost:5000
```

### Step 4: Test via API

```bash
# Test Mentor
curl -X POST http://localhost:5000/api/ai-mentor \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How do I start learning AI?",
    "role": "student",
    "user_id": "test-user"
  }'

# Test Health
curl http://localhost:5000/api/ai-mentor/health
```

---

## 📊 Areas Where AI is Integrated

| Feature | Location | Endpoint | Status |
|---------|----------|----------|--------|
| Career Mentor | Chat Page | `/api/ai-mentor` | ✅ Ready |
| Student Matching | Matchmaker | `/api/ai-matchmaker` | ✅ Ready |
| Career Planning | Roadmap | `/api/ai-roadmap` | ✅ Ready |
| Bio Generation | Alumni Profile | Internal | ✅ Ready |
| Feedback Analysis | Dashboard | Internal | ✅ Ready |
| Job Recommendations | Jobs Page | Future | 🔄 Planned |
| Interview Prep | Dashboard | Future | 🔄 Planned |
| Skill Gap Analysis | Profile | Future | 🔄 Planned |

---

## 🎨 UI/UX Best Practices

### For AI Mentor Chat
- Keep conversation natural and supportive
- Show loading state while AI generates response
- Display response time metrics
- Allow users to save favorite responses
- Provide feedback (helpful/not helpful)

### For AI Matchmaker
- Show compatibility percentage clearly
- Explain why matches were selected
- Allow filtering by criteria
- Show alumni response rate
- Display testimonials from successful matches

### For Career Roadmap
- Use visual timeline format
- Break roadmap into milestones
- Provide resource links
- Allow saving/printing roadmap
- Show estimated timeline

---

## ⚙️ Configuration Options

### Change AI Models

Update `.env`:

```env
# Use different models
HF_MODEL=meta-llama/Meta-Llama-3-8B-Instruct    # For detailed reasoning
HF_CHAT_MODEL=mistralai/Mistral-7B-Instruct-v0.1  # For chat/quick responses
HF_EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2  # For embeddings
```

### Adjust Response Length

In `services/ai_service.py`:

```python
params = {
    "max_new_tokens": 512,  # Reduce for shorter responses
    "temperature": 0.7,      # Adjust for creativity (0=deterministic, 1=creative)
    "top_p": 0.95           # Nucleus sampling parameter
}
```

---

## 🔒 Security Considerations

### API Key Protection
- ✅ Never commit `.env` to git
- ✅ HF_API_TOKEN only on backend
- ✅ Rotate key periodically
- ✅ Monitor HuggingFace usage

### Input Validation
- ✅ Max message length: 5000 chars
- ✅ Sanitize user inputs
- ✅ Validate user_id ownership
- ✅ Rate limiting per user

### Privacy
- ✅ Don't log sensitive user data
- ✅ Anonymize in logs
- ✅ Delete old conversations if needed
- ✅ Comply with data retention policies

---

## 📈 Monitoring & Analytics

### Track AI Usage

```javascript
// Log AI feature usage
function logAIUsage(feature, status) {
  console.log(`[AI Usage] Feature: ${feature}, Status: ${status}`);
  // Send to analytics service
  ga('send', 'event', 'AI', feature, status);
}

// In your AI calls
logAIUsage('mentor', response.success ? 'success' : 'failure');
```

### Performance Monitoring

```python
import time

# In AI endpoints
start_time = time.time()
response = ai_service.mentor_chat(...)
duration = time.time() - start_time
print(f"[Performance] Mentor chat took {duration:.2f}s")
```

---

## 🐛 Troubleshooting

### AI Not Responding

**Issue:** Endpoints return "Could not connect"

**Solutions:**
1. Check internet connection
2. Verify HF_API_TOKEN
3. Check HuggingFace API status
4. Try simpler prompts
5. Check logs for detailed errors

### Slow Responses

**Issue:** AI takes 10+ seconds

**Solutions:**
1. First request loads model (normal)
2. Subsequent requests are faster
3. Use lighter models
4. Implement caching
5. Add queue system for high load

### Poor Quality Responses

**Issue:** AI responses are not useful

**Solutions:**
1. Improve prompt engineering
2. Add more context
3. Try different models
4. Fine-tune models with your data
5. Add feedback collection

---

## 📞 Support

### Getting Help

1. **Check logs** - Terminal where `python app.py` runs
2. **Test endpoints** - Use curl to test directly
3. **Review documentation** - See code comments in `services/ai_service.py`
4. **Check HuggingFace docs** - https://huggingface.co/docs/api-inference

### Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| "Failed to resolve" | No internet | Requires internet connection |
| "Invalid token" | Wrong API key | Verify HF_API_TOKEN |
| "Rate limited" | Too many requests | Wait or upgrade plan |
| "Model loading" | First use | Wait ~10 seconds |
| "No response" | Token spent | Check HuggingFace usage |

---

## ✅ Checklist for Full Integration

- [ ] Add AI Mentor to chat page
- [ ] Add AI Matchmaker to matchmaker page
- [ ] Add Career Roadmap to profile/roadmap page
- [ ] Test all endpoints
- [ ] Add error handling in frontend
- [ ] Add loading states
- [ ] Add user feedback collection
- [ ] Monitor AI usage
- [ ] Document for team
- [ ] Train users on features

---

## 🎉 You're Ready!

Your AlumniX platform now has advanced AI capabilities:

✅ **3 AI Features Integrated**
- Career Mentoring
- Alumni Matching
- Career Planning

✅ **Production Ready**
- Error handling
- Logging
- Monitoring
- Documentation

✅ **Easy to Extend**
- Add new AI features
- Change models
- Customize prompts
- Adjust parameters

Start building with AI! 🚀

```bash
# Start the server
python app.py

# Your AI features are ready at:
# - POST /api/ai-mentor
# - POST /api/ai-matchmaker
# - POST /api/ai-roadmap
```

---

**AI Integration Complete!** 🤖✨

Your platform can now intelligently guide students through mentorship, career planning, and professional development!
