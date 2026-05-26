import { getSupabase } from '../db/supabase';

export class ProjectService {
  async getAll() {
    const { data, error } = await getSupabase()
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getById(id: string) {
    const { data, error } = await getSupabase()
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async create(project: {
    title: string;
    description: string;
    tech_stack: string[];
    github_url?: string;
    demo_url?: string;
  }) {
    const { data, error } = await getSupabase()
      .from('projects')
      .insert(project)
      .select('*')
      .single();

    if (error) throw error;
    return data;
  }

  async update(
    id: string,
    project: {
      title?: string;
      description?: string;
      tech_stack?: string[];
      github_url?: string;
      demo_url?: string;
    }
  ) {
    const { data, error } = await getSupabase()
      .from('projects')
      .update(project)
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { error } = await getSupabase()
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}
