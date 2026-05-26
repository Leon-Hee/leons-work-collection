import { Request, Response } from 'express';
import { ProjectService } from '../services/project.service';
import { AuthRequest } from '../middleware/auth';

const projectService = new ProjectService();

export async function getAll(_req: Request, res: Response) {
  try {
    const projects = await projectService.getAll();
    res.json({ success: true, data: projects });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to get projects' });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const project = await projectService.getById(req.params.id);
    if (!project) {
      res.status(404).json({ success: false, error: 'Project not found' });
      return;
    }
    res.json({ success: true, data: project });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to get project' });
  }
}

export async function create(req: AuthRequest, res: Response) {
  try {
    const { title, description, tech_stack, github_url, demo_url } = req.body;
    if (!title || !description) {
      res.status(400).json({ success: false, error: 'Title and description required' });
      return;
    }
    const project = await projectService.create({
      title,
      description,
      tech_stack: tech_stack || [],
      github_url,
      demo_url,
    });
    res.status(201).json({ success: true, data: project });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to create project' });
  }
}

export async function update(req: AuthRequest, res: Response) {
  try {
    const project = await projectService.update(req.params.id, req.body);
    if (!project) {
      res.status(404).json({ success: false, error: 'Project not found' });
      return;
    }
    res.json({ success: true, data: project });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to update project' });
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    await projectService.delete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to delete project' });
  }
}
