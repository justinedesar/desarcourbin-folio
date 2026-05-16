
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  linkedin_url text NOT NULL,
  company text NOT NULL,
  funding_stage text,
  team_size text,
  sector text,
  target_market text,
  mission_type text[],
  engagement text,
  duration text,
  start_date text,
  budget text,
  context text NOT NULL,
  objective text,
  success_criteria text,
  language text DEFAULT 'en',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact" ON public.contact_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Only authenticated can read submissions" ON public.contact_submissions
  FOR SELECT TO authenticated USING (true);

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  description text,
  image_url text,
  tags text[] DEFAULT '{}',
  link text,
  "order" integer DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active projects readable by all" ON public.projects
  FOR SELECT TO anon, authenticated USING (active = true);

CREATE POLICY "Authenticated can manage projects" ON public.projects
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
