# Account Creation Guide - AlumniX

## Quick Start

Your database and account creation system is now fully configured and tested.

### What's Been Fixed

✅ **Database Connection**
- Supabase credentials properly configured in `.env`
- Environment variables validated on startup
- Database connection tested and verified

✅ **Account Creation API**
- `/api/auth-complete-signup` endpoint enhanced with detailed logging
- Proper error handling for edge cases
- Foreign key constraint properly handled

✅ **Frontend Integration**
- Supabase client properly initialized
- Authentication flow implemented (Google + Email)
- Profile sync after signup

### How to Test Account Creation

#### Method 1: Using the Web Interface

1. **Start the server:**
   ```bash
   python app.py
   ```
   Expected: Server running on http://127.0.0.1:5000

2. **Open signup page:**
   - Visit: http://localhost:5000/signup.html

3. **Create a Student Account:**
   - Click "Student" tab (if not already selected)
   - Fill in the form:
     - Full Name: "Test Student"
     - Email: "test@kite.ac.in" (must end with @kite.ac.in)
     - Department: Select any option
     - Batch Year: 2024
     - Password: Enter a secure password
     - Confirm Password: Match the password
   - Click "Create Account"

4. **Expected Results:**
   - Success message: "Student account created successfully!"
   - Redirected to dashboard
   - Your profile should be visible

#### Method 2: Using the Test Suite

```bash
python test_account_creation.py
```

This runs comprehensive tests on:
- Environment variables loading
- Database connection
- User profile creation
- API endpoint handler

### Signup Flow Architecture

```
1. User fills form on signup.html
   ↓
2. Frontend calls Supabase Auth signup()
   ↓
3. Supabase creates auth.users record
   ↓
4. Frontend calls /api/auth-complete-signup
   ↓
5. Backend creates public.users record
   ↓
6. User is redirected to dashboard
```

### Creating Different Account Types

#### Student Account
- Email: Must end with `@kite.ac.in`
- Fields: Full Name, Email, Department, Batch Year, Password
- Role: `student`
- After signup: Goes to dashboard

#### Alumni Account
- Email: Any email (personal or work)
- Fields: Full Name, Email, Department, Company, Job Title, Password
- Role: `alumni`
- After signup: Goes to register-alumni.html for additional profile info

### API Endpoint Reference

#### POST /api/auth-complete-signup

**Purpose:** Create user profile after Supabase Auth signup

**Request Body:**
```json
{
  "user_id": "uuid-from-supabase-auth",
  "email": "user@kite.ac.in",
  "role": "student",
  "full_name": "Full Name",
  "department": "Computer Science & Engineering",
  "institution": "Karpagam Institute of Technology"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@kite.ac.in",
    "role": "student",
    "full_name": "Full Name",
    "department": "Computer Science & Engineering",
    "institution": "Karpagam Institute of Technology",
    "created_at": "2026-08-23T05:30:00Z"
  }
}
```

**Error Response (409):**
```json
{
  "error": "User authentication record not found. Please ensure signup was completed."
}
```

### Database Structure

**public.users table:**
- `id` (UUID) - Linked to auth.users
- `email` (TEXT) - User email
- `role` (TEXT) - 'student' or 'alumni'
- `full_name` (TEXT) - User's full name
- `department` (TEXT) - Department/field of study
- `institution` (TEXT) - Institution name
- `created_at` (TIMESTAMP) - Account creation date

### Environment Configuration

Your `.env` file contains:

```env
SUPABASE_URL=https://bgezdudpyvkehtqfndyo.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

**Important:** Never share or commit this file to version control.

### Troubleshooting

**Problem:** "User authentication record not found"
- **Cause:** Supabase Auth signup failed before calling this endpoint
- **Solution:** Ensure signup() call succeeds first, then call this endpoint with correct user_id

**Problem:** "Database connection failed"
- **Cause:** Environment variables not loaded or incorrect
- **Solution:** 
  1. Verify `.env` file exists
  2. Restart the server
  3. Check that Supabase credentials are valid

**Problem:** "Student email must end with @kite.ac.in"
- **Cause:** Invalid email domain for student signup
- **Solution:** Use an email address ending with @kite.ac.in

**Problem:** Account created but not visible in dashboard
- **Cause:** Session not properly synced
- **Solution:** 
  1. Hard refresh page (Ctrl+Shift+R)
  2. Clear localStorage
  3. Try logging in with the new account

### Next Steps

1. ✅ Test account creation with different roles
2. ✅ Verify login works for created accounts
3. ✅ Test alumni profile setup flow
4. ✅ Set up password reset functionality
5. ✅ Configure email verification (optional)

### Support

For detailed implementation information, see:
- `SETUP_COMPLETE.md` - Full setup documentation
- `API_INTEGRATION_GUIDE.md` - API integration details
- Database schema: `db/schema.sql`

---

**Last Updated:** August 23, 2026
**Status:** ✅ Ready for Production Testing
