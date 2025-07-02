
-- Create a table for contact messages
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for project requests
CREATE TABLE public.project_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_name TEXT,
  business_type TEXT NOT NULL,
  website_type TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  timeline TEXT NOT NULL,
  features TEXT[],
  description TEXT,
  has_content BOOLEAN DEFAULT false,
  has_logo BOOLEAN DEFAULT false,
  additional_requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for testimonials/reviews
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  business TEXT,
  position TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  testimonial TEXT NOT NULL,
  profile_picture TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (since this is public data, we'll allow read access to everyone)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact messages and project requests
CREATE POLICY "Anyone can submit contact messages" 
  ON public.contact_messages 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can submit project requests" 
  ON public.project_requests 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can submit testimonials" 
  ON public.testimonials 
  FOR INSERT 
  WITH CHECK (true);

-- Allow public to read approved testimonials only
CREATE POLICY "Anyone can view approved testimonials" 
  ON public.testimonials 
  FOR SELECT 
  USING (is_approved = true);

-- These tables will be accessed by the CMS, so no public read access for messages and project requests
-- The CMS will handle authentication and access control
