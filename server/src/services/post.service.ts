import { getSupabase } from '../db/supabase';

export class PostService {
  async getAll() {
    const { data, error } = await getSupabase()
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getById(id: string) {
    const { data, error } = await getSupabase()
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async create(post: { title: string; content: string; cover_image?: string }) {
    const { data, error } = await getSupabase()
      .from('posts')
      .insert(post)
      .select('*')
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, post: { title?: string; content?: string; cover_image?: string }) {
    const { data, error } = await getSupabase()
      .from('posts')
      .update({ ...post, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { error } = await getSupabase()
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}
