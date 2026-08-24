-- Add admin role support to users table
-- Run this ONCE in Supabase SQL editor

-- Alter the role column to include 'admin' option
-- Note: The exact syntax depends on how your role column is defined
-- If it's an enum or check constraint, adjust accordingly

-- Option 1: If role is an ENUM type (uncomment if needed):
-- ALTER TYPE public.user_role ADD VALUE 'admin';

-- Option 2: If role has a CHECK constraint, update it (modify constraint name as needed):
-- ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_role_check;
-- ALTER TABLE public.users ADD CONSTRAINT users_role_check CHECK (role IN ('student', 'alumni', 'admin'));

-- Option 3: Manual one-off: Just update the specific user to admin
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'mohansampath098@gmail.com';

-- Verify it worked:
SELECT id, email, role FROM public.users WHERE email = 'mohansampath098@gmail.com';
