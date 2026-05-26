export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-20">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Leon Hu. 保留所有权利。
        </p>
        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-text-secondary transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-text-secondary transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
