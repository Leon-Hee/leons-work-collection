import { Request, Response } from 'express';
import { PostService } from '../services/post.service';
import { AuthRequest } from '../middleware/auth';

const postService = new PostService();

export async function getAll(_req: Request, res: Response) {
  try {
    const posts = await postService.getAll();
    res.json({ success: true, data: posts });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to get posts' });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const post = await postService.getById(req.params.id);
    if (!post) {
      res.status(404).json({ success: false, error: 'Post not found' });
      return;
    }
    res.json({ success: true, data: post });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to get post' });
  }
}

export async function create(req: AuthRequest, res: Response) {
  try {
    const { title, content, cover_image } = req.body;
    if (!title || !content) {
      res.status(400).json({ success: false, error: 'Title and content required' });
      return;
    }
    const post = await postService.create({ title, content, cover_image });
    res.status(201).json({ success: true, data: post });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to create post' });
  }
}

export async function update(req: AuthRequest, res: Response) {
  try {
    const post = await postService.update(req.params.id, req.body);
    if (!post) {
      res.status(404).json({ success: false, error: 'Post not found' });
      return;
    }
    res.json({ success: true, data: post });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to update post' });
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    await postService.delete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to delete post' });
  }
}
