
CREATE TABLE public.resume_uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  file_name text NOT NULL,
  storage_path text NOT NULL UNIQUE,
  mime_type text NOT NULL,
  size_bytes bigint NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.resume_uploads TO authenticated;
GRANT ALL ON public.resume_uploads TO service_role;

ALTER TABLE public.resume_uploads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "uploads_select_own" ON public.resume_uploads FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "uploads_insert_own" ON public.resume_uploads FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "uploads_update_own" ON public.resume_uploads FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "uploads_delete_own" ON public.resume_uploads FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER update_resume_uploads_updated_at
  BEFORE UPDATE ON public.resume_uploads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage policies for resume-uploads bucket (created via tool). User folder = first path segment = user id.
CREATE POLICY "resume_uploads_select_own"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'resume-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "resume_uploads_insert_own"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'resume-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "resume_uploads_update_own"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'resume-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "resume_uploads_delete_own"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'resume-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
