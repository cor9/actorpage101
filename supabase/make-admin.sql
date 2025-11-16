-- Make a user an admin
-- Replace YOUR_USER_ID_HERE with the actual user ID from auth.users

-- Method 1: If you know the user's ID
UPDATE public.profiles
SET role = 'admin'
WHERE id = 'YOUR_USER_ID_HERE';

-- Method 2: If you know the user's email
UPDATE public.profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'YOUR_EMAIL_HERE'
);

-- To verify admin status
SELECT id, display_name, role, subscription_tier
FROM public.profiles
WHERE role = 'admin';

-- To remove admin status (set back to user)
-- UPDATE public.profiles SET role = 'user' WHERE id = 'USER_ID_HERE';
