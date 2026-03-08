
CREATE TABLE public.demo_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  agent_id uuid NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
  used_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT demo_usage_user_agent_unique UNIQUE (user_id, agent_id, id)
);

ALTER TABLE public.demo_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own demo usage" ON public.demo_usage
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own demo usage" ON public.demo_usage
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
