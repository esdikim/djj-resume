ALTER TABLE public.resumes ADD COLUMN IF NOT EXISTS variant text NOT NULL DEFAULT 'default';
CREATE UNIQUE INDEX IF NOT EXISTS resumes_user_variant_unique ON public.resumes (user_id, variant);