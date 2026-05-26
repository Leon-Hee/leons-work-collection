export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string | null;
  demo_url: string | null;
  created_at: string;
}
