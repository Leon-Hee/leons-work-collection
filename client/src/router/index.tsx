import { Routes, Route } from 'react-router-dom'
import PublicLayout from '../components/layout/PublicLayout'
import AdminLayout from '../components/layout/AdminLayout'
import ProtectedRoute from './ProtectedRoute'
import HomePage from '../pages/public/HomePage'
import ProjectsPage from '../pages/public/ProjectsPage'
import ProjectDetailPage from '../pages/public/ProjectDetailPage'
import SkillsPage from '../pages/public/SkillsPage'
import BlogPage from '../pages/public/BlogPage'
import BlogDetailPage from '../pages/public/BlogDetailPage'
import AboutPage from '../pages/public/AboutPage'
import LoginPage from '../pages/admin/LoginPage'
import DashboardPage from '../pages/admin/DashboardPage'
import PostsManagePage from '../pages/admin/PostsManagePage'
import PostEditPage from '../pages/admin/PostEditPage'
import ProjectsManagePage from '../pages/admin/ProjectsManagePage'
import ProjectEditPage from '../pages/admin/ProjectEditPage'

export default function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      {/* Admin login (no auth) */}
      <Route path="/admin/login" element={<LoginPage />} />

      {/* Admin routes (auth required) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/admin/posts" element={<PostsManagePage />} />
          <Route path="/admin/posts/:id" element={<PostEditPage />} />
          <Route path="/admin/projects" element={<ProjectsManagePage />} />
          <Route path="/admin/projects/:id" element={<ProjectEditPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
