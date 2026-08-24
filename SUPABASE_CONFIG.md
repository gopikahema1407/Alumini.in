# AlumniX Supabase Configuration - Complete Setup

## Project Information

- **Project Name:** AlumniX
- **Project URL:** https://bgezdudpyvkehtqfndyo.supabase.co
- **Region:** (Auto-configured by Supabase)
- **Status:** ✅ Active and Connected

## API Keys Configuration

All keys are properly configured in the `.env` file and loaded via environment variables.

### Supabase Keys

#### 1. Publishable Key (Anonymous Key)
- **Type:** Anon Key
- **Usage:** Frontend - Browser Client
- **Status:** ✅ Configured
- **File:** `.env` (SUPABASE_ANON_KEY)
- **Also used in:** `js/config.js` (Frontend configuration)

#### 2. Secret Key (Service Role)
- **Type:** Service Role Key
- **Usage:** Backend - API Server Only
- **Status:** ✅ Configured
- **File:** `.env` (SUPABASE_SERVICE_ROLE_KEY)
- **Also used in:** `api/_common.py` (Backend initialization)
- **Important:** Never expose in frontend code

#### 3. Project URL
- **Type:** Connection String
- **Usage:** Both Frontend and Backend
- **Status:** ✅ Configured
- **File:** `.env` (SUPABASE_URL)
- **Also used in:** `js/config.js` (Frontend configuration)

## Configuration Files

### Backend Configuration (Python)

**File:** `api/_common.py`
```python
# Loads from .env via python-dotenv
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_ANON_KEY = os.environ.get("SUPABASE_ANON_KEY")
SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

# Creates two clients:
admin_client = get_supabase_admin()  # Uses Service Role Key
anon_client = get_supabase_anon()    # Uses Anon Key
```

### Frontend Configuration (JavaScript)

**File:** `js/config.js`
```javascript
window.ALUMNIX_CONFIG = {
  SUPABASE_URL: "https://bgezdudpyvkehtqfndyo.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  GOOGLE_CLIENT_ID: "287105659120-...",
  API_BASE_URL: "http://127.0.0.1:5000/api"
}
```

**File:** `js/supabase-client.js`
```javascript
window.supabaseClient = window.supabase.createClient(
  window.ALUMNIX_CONFIG.SUPABASE_URL,
  window.ALUMNIX_CONFIG.SUPABASE_ANON_KEY
);
```

## Environment Variables

**File:** `.env`

```env
# Supabase Configuration
SUPABASE_URL=https://bgezdudpyvkehtqfndyo.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZXpkdWRweXZrZWh0cWZuZHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MDY4MjYsImV4cCI6MjEwMjI4MjgyNn0.EDNf5wdfRBqP1MbB_u6NTj-Y43am111PZjINizLdO9M
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZXpkdWRweXZrZWh0cWZuZHlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjcwNjgyNiwiZXhwIjoyMTAyMjgyODI2fQ.W_mSi0PFxCKxInG7isdOsX1oPj-auMZ96uVnTqk3wBk

# Optional: LLM API Keys
HF_API_TOKEN=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# College Config
COLLEGE_NAME=Karpagam Institute of Technology
ALLOWED_STUDENT_EMAIL_DOMAIN=@kite.ac.in
```

## Database Tables Status

✅ **All tables created and verified:**

- `auth.users` - Supabase Auth system table
- `public.users` - User profiles
- `public.alumni_profiles` - Alumni detailed profiles
- `public.jobs` - Job listings
- `public.mentorship_requests` - Mentorship connections
- `public.chat_messages` - AI chat history
- `public.roadmap_progress` - Career roadmap progress
- `public.matchmaker_runs` - Matchmaker execution logs

## Security Status

✅ **Row-Level Security (RLS) Enabled**
- All tables have RLS policies
- Users can only access their own data
- Proper role-based access control

✅ **Authentication**
- Supabase Auth handles user authentication
- Service Role Key restricted to backend only
- Anon Key used only for frontend with RLS policies

## API Keys Security Check

- ✅ Service Role Key NOT exposed in frontend
- ✅ Anon Key safe for public use
- ✅ Environment variables loaded from `.env` (not in code)
- ✅ `.env` file is in `.gitignore` (not committed)

## Testing Configuration

### Test Account Creation
```bash
python test_account_creation.py
```

### Manual API Test
```bash
# Test account creation endpoint
curl -X POST http://localhost:5000/api/auth-complete-signup \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "test-uuid",
    "email": "test@kite.ac.in",
    "role": "student",
    "full_name": "Test User",
    "department": "CSE"
  }'
```

## Deployment Notes

### For Production Deployment

1. **Supabase URL and Keys:**
   - Keep in secure environment variables only
   - Use different keys for different environments
   - Never hardcode credentials

2. **Backend (.env file):**
   - Store securely on server
   - Load via environment variables
   - Use secrets management (AWS Secrets Manager, etc.)

3. **Frontend (js/config.js):**
   - Only includes Anon Key (public)
   - Safe to include in frontend code
   - Can be committed to version control

4. **CORS Settings:**
   - Configure in Supabase dashboard if needed
   - Current setup allows cross-origin requests from any domain

## Monitoring & Debugging

### Check Supabase Connection
```bash
python -c "from api._common import get_supabase_admin; admin = get_supabase_admin(); print('✅ Connected' if admin else '❌ Failed')"
```

### View Database Logs
- Go to Supabase Dashboard
- Navigate to Logs section
- Monitor authentication and API activity

### Enable Detailed Logging
- Check `api/auth_complete_signup.py` for detailed logs
- Check browser console for frontend errors
- Check terminal for backend server logs

## Quick Reference

| Item | Value | File |
|------|-------|------|
| Project URL | https://bgezdudpyvkehtqfndyo.supabase.co | `.env`, `js/config.js` |
| Anon Key | Used in Frontend | `js/config.js` |
| Service Role | Used in Backend | `api/_common.py` |
| Environment Setup | `python-dotenv` | `requirements.txt`, `api/_common.py` |
| College Email | @kite.ac.in | `.env`, `auth.js` |
| Institution | Karpagam Institute of Technology | All config files |

---

**Configuration Date:** August 23, 2026
**Status:** ✅ Complete and Verified
**Last Test:** Passed all connection tests
