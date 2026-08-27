# Google OAuth Security Error Fix

## Problem
Chrome is blocking your site as "Dangerous" because the Google OAuth redirect URL is not properly configured in Supabase.

## Root Cause
- You have a Google OAuth Client ID configured
- But the OAuth redirect URL in Supabase doesn't match your deployment URL
- This causes malformed OAuth callback URLs that Chrome flags as suspicious

## Solution Steps

### Step 1: Go to Supabase Dashboard
1. Open https://supabase.com
2. Select your project `bgezdudpyvkehtqfndyo`
3. Go to **Authentication** → **Providers** → **Google**

### Step 2: Set Correct Redirect URLs
In your Supabase Google provider settings, make sure the **Redirect URLs** include:

For Local Development:
```
http://localhost:5000/auth/v1/callback
http://localhost:3000/auth/v1/callback
```

For Vercel Deployment (IMPORTANT - CHANGE THIS):
```
https://your-vercel-app.vercel.app/auth/v1/callback
```

Replace `your-vercel-app.vercel.app` with your actual Vercel domain.

### Step 3: Verify Google Console Settings
1. Go to https://console.cloud.google.com
2. Find your OAuth 2.0 Client ID `44614692399-v1kvs1vak9fblpeshc3vdbopfq8nnouk.apps.googleusercontent.com`
3. Edit the OAuth Client
4. Add these Authorized Redirect URIs:
   - `http://localhost:5000/auth/v1/callback`
   - `http://localhost:3000/auth/v1/callback`
   - `https://your-vercel-app.vercel.app/auth/v1/callback`
   - `https://your-vercel-app.vercel.app/dashboard.html`

### Step 4: Update Supabase Config
In your Supabase project settings:
1. Go to **Project Settings** → **API**
2. Copy your `Project URL` and `Anon Key`
3. Make sure these are set in Vercel environment variables (you already did this)

### Step 5: Test Locally
```bash
npm start
# or
python -m http.server 5000
```

Then click "Continue with Google" on `http://localhost:5000/login.html`

### Step 6: Deploy to Vercel
1. Push changes to GitHub
2. Vercel will auto-deploy
3. Test Google login on your production URL

## Important Security Notes

⚠️ **Never commit your `.env` file to git** - it contains secrets
- Your Supabase API keys are already exposed in `.env.example` (fixed in previous commit)
- These keys should only exist in:
  - Local `.env` file (in `.gitignore`)
  - Vercel Environment Variables
  - Your personal machine

## If Still Getting "Dangerous Site" Error

1. Check the URL in address bar - it should be your Vercel domain, NOT a suspicious URL
2. Clear browser cache and cookies
3. Try in an incognito/private window
4. Check browser console (F12 → Console) for detailed error messages
5. Verify Supabase Project URL matches between config and environment variables

## Testing the Fix

After setup:
1. Go to your Vercel domain or local server
2. Click "Log In"
3. Click "Continue with Google"
4. You should see Google's login popup (clean, not dangerous)
5. After login, you should redirect to dashboard

If you still see "Dangerous site" warning, the redirect URL is still wrong.
