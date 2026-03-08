
-- Create a security definer function to check user role from profiles
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE user_id = _user_id LIMIT 1;
$$;

-- Drop existing insert policy on agents
DROP POLICY IF EXISTS "Sellers can insert own agents" ON public.agents;

-- Create new insert policy that checks profile role is 'seller'
CREATE POLICY "Sellers can insert own agents" ON public.agents
FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = seller_id
  AND public.get_user_role(auth.uid()) = 'seller'
);
