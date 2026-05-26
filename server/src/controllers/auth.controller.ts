import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../middleware/auth';

const authService = new AuthService();

export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Email and password required' });
      return;
    }
    const result = await authService.register(email, password);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Registration failed';
    const status = message === 'Email already registered' ? 409 : 500;
    res.status(status).json({ success: false, error: message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Email and password required' });
      return;
    }
    const result = await authService.login(email, password);
    res.json({ success: true, data: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Login failed';
    res.status(401).json({ success: false, error: message });
  }
}

export async function getMe(req: AuthRequest, res: Response) {
  try {
    const user = await authService.getMe(req.userId!);
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to get user' });
  }
}
