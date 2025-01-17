interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date?: string | null;
  gpa?: number;
  achievements?: string[];
  location?: string;
}

interface Experience {
  id: number;
  company: string;
  position: string;
  start_date: string;
  end_date?: string | null;
  location?: string;
  description: string[];
  skills_used: string[];
  achievements: string[];
}

interface Skill {
  id: number;
  name: string;
  category: string; // e.g., "Technical", "Soft Skills", "Languages"
  proficiency_level?: string; // e.g., "Expert", "Intermediate", "Beginner"
  years_experience?: number;
}

interface Contact {
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  location: {
    city?: string;
    state?: string;
    country: string;
  };
}

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  start_date?: string;
  end_date?: string;
  highlights: string[];
}

// Main Resume interface
export interface Resume {
  id: number;
  user_id: string;
  title: string;
  version: number;
  status: 'draft' | 'published' | 'archived';

  // Personal Information
  full_name: string;
  professional_summary: string;
  contact: Contact;

  // Structured Content
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects?: Project[];

  // Additional Sections
  certifications?: {
    name: string;
    issuer: string;
    date_acquired: string;
    expiry_date?: string;
    credential_id?: string;
  }[];

  awards?: {
    title: string;
    issuer: string;
    date: string;
    description?: string;
  }[];

  // Metadata
  created_at: string;
  updated_at: string;
  last_generated_pdf?: string;

  // Format and Style Preferences
  styling_preferences?: {
    template: string;
    color_scheme?: string;
    font_family?: string;
    section_order?: string[];
  };

  // SEO and ATS Optimization
  keywords?: string[];
  industry_focus?: string[];
  job_titles_targeted?: string[];
}
