import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getSupabase } from '../db/supabase';
import { config } from '../config';

export class AuthService {
  async register(email: string, password: string) {
    const { data: existing } = await getSupabase()
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      throw new Error('Email already registered');
    }

    const password_hash = await bcrypt.hash(password, 10);
    const { data: user, error } = await getSupabase()
      .from('users')
      .insert({ email, password_hash })
      .select('id, email, created_at')
      .single();

    if (error) throw error;

    const token = jwt.sign({ userId: user.id }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    return {
      token,
      user: { id: user.id, email: user.email },
    };
  }

  async login(email: string, password: string) {
    const { data: user, error } = await getSupabase()
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      throw new Error('Invalid email or password');
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ userId: user.id }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    return {
      token,
      user: { id: user.id, email: user.email },
    };
  }

  async getMe(userId: string) {
    const { data: user, error } = await getSupabase()
      .from('users')
      .select('id, email, created_at')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return user;
  }
}
