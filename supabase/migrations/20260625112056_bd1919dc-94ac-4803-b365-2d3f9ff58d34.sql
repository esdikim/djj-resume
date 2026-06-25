CREATE TABLE public.resume_history (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  variant text NOT NULL DEFAULT 'default',
  content text NOT NULL DEFAULT '',
  label text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX resume_history_user_variant_idx ON public.resume_history (user_id, variant, created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.resume_history TO authenticated;
GRANT ALL ON public.resume_history TO service_role;

ALTER TABLE public.resume_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "history_select_own" ON public.resume_history FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "history_insert_own" ON public.resume_history FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "history_update_own" ON public.resume_history FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "history_delete_own" ON public.resume_history FOR DELETE TO authenticated USING (auth.uid() = user_id);