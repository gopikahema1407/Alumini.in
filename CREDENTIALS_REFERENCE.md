# AlumniX - Supabase Credentials Reference

## ⚠️ SECURITY NOTICE

This file contains the configuration reference. The actual credentials are stored in:
- `.env` file (backend - NOT in git)
- `js/config.js` (frontend - only Anon Key, safe to commit)

**Never share `.env` file or commit it to version control.**

---

## Supabase Project Details

### Project Identification
- **Project Name:** AlumniX
- **Project URL:** https://bgezdudpyvkehtqfndyo.supabase.co
- **Region:** Auto-configured by Supabase
- **Status:** Active and Connected

---

## API Keys Reference

### 1. Publishable Key (Anon Key)

**Purpose:** Frontend client authentication and data access  
**Usage:** Safe to include in frontend code  
**Safe:** YES ✅ (Read-only with RLS policies)  
**Location:** `.env` and `js/config.js`  
**Exposure:** OK - Can be committed to git  

```
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZXpkdWRweXZrZWh0cWZuZHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MDY4MjYsImV4cCI6MjEwMjI4MjgyNn0.EDNf5wdfRBqP1MbB_u6NTj-Y43am111PZjINizLdO9M
```

### 2. Service Role Key

**Purpose:** Backend privileged database access  
**Usage:** Backend API only - NEVER expose to frontend  
**Safe:** NO ❌ (Full database access - KEEP SECRET)  
**Location:** `.env` ONLY (NOT in code)  
**Exposure:** DANGER - Never commit to git  

```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZXpkdWRweXZrZWh0cWZuZHlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjcwNjgyNiwiZXhwIjoyMTAyMjgyODI2fQ.W_mSi0PFxCKxInG7isdOsX1oPj-auMZ96uVnTqk3wBk
```

### 3. Project URL

**Purpose:** Connection string for both frontend and backend  
**Usage:** Identify the Supabase project  
**Safe:** YES ✅ (Public URL)  
**Location:** `.env` and `js/config.js`  
**Exposure:** OK - Can be committed to git  

```
SUPABASE_URL=https://bgezdudpyvkehtqfndyo.supabase.co
```

---

## Configuration by Location

### Backend (Python) - `.env` file

```env
# ALL THREE KEYS STORED HERE
SUPABASE_URL=https://bgezdudpyvkehtqfndyo.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZXpkdWRweXZrZWh0cWZuZHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MDY4MjYsImV4cCI6MjEwMjI4MjgyNn0.EDNf5wdfRBqP1MbB_u6NTj-Y43am111PZjINizLdO9M
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZXpkdWRweXZrZWh0cWZuZHlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjcwNjgyNiwiZXhwIjoyMTAyMjgyODI2fQ.W_mSi0PFxCKxInG7isdOsX1oPj-auMZ96uVnTqk3wBk
```

**How it's used in code:**
```python
# api/_common.py
from dotenv import load_dotenv
import os

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_ANON_KEY = os.environ.get("SUPABASE_ANON_KEY")
SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
```

### Frontend (JavaScript) - `js/config.js`

```javascript
// ONLY ANON KEY EXPOSED (SAFE)
window.ALUMNIX_CONFIG = {
  SUPABASE_URL: "https://bgezdudpyvkehtqfndyo.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZXpkdWRweXZrZWh0cWZuZHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MDY4MjYsImV4cCI6MjEwMjI4MjgyNn0.EDNf5wdfRBqP1MbB_u6NTj-Y43am111PZjINizLdO9M",
  GOOGLE_CLIENT_ID: "287105659120-39dst05gq6694mnq3vvo4c5qiaovgf10.apps.googleusercontent.com",
  API_BASE_URL: "/api"
}
```

**How it's used in code:**
```javascript
// js/supabase-client.js
window.supabaseClient = window.supabase.createClient(
  window.ALUMNIX_CONFIG.SUPABASE_URL,
  window.ALUMNIX_CONFIG.SUPABASE_ANON_KEY
);
```

---

## Security Guidelines

### ✅ DO

- ✅ Store Service Role Key in `.env` file
- ✅ Load Service Role Key from environment on startup
- ✅ Use Service Role Key only in backend code
- ✅ Store Anon Key in environment or config files
- ✅ Use Anon Key in frontend code
- ✅ Commit `js/config.js` with Anon Key to git
- ✅ Add `.env` to `.gitignore`
- ✅ Rotate keys periodically
- ✅ Monitor Supabase logs for suspicious activity

### ❌ DON'T

- ❌ Store Service Role Key in frontend code
- ❌ Commit `.env` file to version control
- ❌ Share `.env` file via email or messages
- ❌ Post credentials in code comments
- ❌ Use hardcoded credentials (use env vars)
- ❌ Log or print API keys
- ❌ Share Service Role Key with team members
- ❌ Store credentials in database
- ❌ Use same keys across environments

---

## Environment Management

### Development

```bash
# .env file (local only, NOT in git)
SUPABASE_URL=https://bgezdudpyvkehtqfndyo.supabase.co
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### Staging

```bash
# Use different Supabase project if possible
# Set environment variables on deployment platform
# Example (Vercel, Heroku, etc.):
SUPABASE_URL=https://staging-project.supabase.co
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### Production

```bash
# Use dedicated Supabase project
# Rotate keys frequently
# Use secrets management service
# Monitor all access logs
# Set environment variables securely
SUPABASE_URL=https://prod-project.supabase.co
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

---

## Key Rotation & Maintenance

### When to Rotate Keys

- ✅ Accidentally exposed or shared
- ✅ Employee leaving the project
- ✅ Security incident or suspected compromise
- ✅ Every 6-12 months as routine maintenance

### How to Rotate Keys

1. **Generate new keys in Supabase Dashboard**
   - Go to: https://supabase.co/dashboard
   - Project Settings → API
   - Click "Rotate" next to the key

2. **Update environment variables**
   - Update `.env` file (backend)
   - Update `js/config.js` if Anon Key (frontend)
   - Redeploy application

3. **Verify new keys are working**
   - Run test suite
   - Monitor logs
   - Test account creation

4. **Document the change**
   - Note the rotation date
   - Update any documentation
   - Notify team members

---

## API Key Scopes

### Anon Key Scope (Frontend)
- Read user's own profile ✅
- Read public data (with RLS) ✅
- Authenticate users ✅
- Cannot:
  - Modify other users' data ❌
  - Access admin tables ❌
  - Bypass RLS policies ❌

### Service Role Key Scope (Backend)
- Full database access ✅
- Read all data ✅
- Write all data ✅
- Create/delete records ✅
- Bypass RLS policies ✅
- This is why it MUST stay secret ⚠️

---

## Verification

### Test Credentials Work

```bash
# Backend test
python -c "
from api._common import get_supabase_admin
admin = get_supabase_admin()
print('✅ Backend credentials working')
"

# Frontend test (in browser console)
console.log(window.ALUMNIX_CONFIG.SUPABASE_URL)
// Should print: https://bgezdudpyvkehtqfndyo.supabase.co
```

### Monitor Key Usage

1. **Supabase Dashboard**
   - Go to: https://supabase.co/dashboard
   - Check: Logs and Monitoring
   - Monitor: API usage and errors

2. **Application Logs**
   - Check backend logs for errors
   - Check browser console for issues
   - Look for auth failures

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid credentials" | Verify keys in `.env` are correct |
| "Connection refused" | Check Project URL is reachable |
| "Permission denied" | Verify using correct key (Service Role for backend) |
| "RLS policy violation" | Frontend using Anon Key (correct) - check RLS rules |
| "Key expired" | Rotate keys in Supabase Dashboard |

---

## Reference Links

- **Supabase Dashboard:** https://supabase.co/dashboard
- **Supabase Docs:** https://supabase.com/docs
- **API Authentication:** https://supabase.com/docs/guides/auth
- **Environment Variables:** https://supabase.com/docs/guides/environment

---

## Summary Table

| Item | Value | Usage | Safe for Git |
|------|-------|-------|--------------|
| Project URL | https://bgezdudpyvkehtqfndyo.supabase.co | Both | YES |
| Anon Key | eyJhbGc... | Frontend | YES |
| Service Role | eyJhbGc... | Backend | NO |
| .env location | Project root | Backend | NO |
| js/config.js | Frontend folder | Frontend | YES |

---

**Last Updated:** August 23, 2026  
**Status:** ✅ All credentials verified and working  
**Maintenance:** Review quarterly for key rotation
