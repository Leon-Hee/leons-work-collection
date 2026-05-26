import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h1 className="text-4xl font-bold text-text-primary mb-2">关于我</h1>

        <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-4">
          <p>
            我是一名全栈开发者，对图形编程与 Web 技术的交汇点充满热情。
            从最初对屏幕像素如何绘制的好奇，到如今构建完整的 Web 应用，
            这条探索之路从未停止。
          </p>

          <p>
            前端方面，我主要使用 React 和 TypeScript，打造既实用又精致的界面。
            后端方面，我用 Node.js 和 Express 构建 API，设计数据模型和认证系统，
            确保安全性与性能兼备。
          </p>

          <p>
            最让我兴奋的是图形领域 — WebGL、着色器、实时渲染。
            我相信 Web 是最触手可及的创作媒介，我想推动它的边界。
          </p>

          <p>
            不写代码的时候，我会研读图形学论文、参与开源项目，
            或者把学到的东西写成博客分享出来。
          </p>
        </div>

        <div className="pt-6">
          <h2 className="text-lg font-semibold text-text-primary mb-3">联系方式</h2>
          <p className="text-text-secondary">
            欢迎通过邮件联系{' '}
            <a href="mailto:leon@example.com" className="text-accent hover:underline">
              leon@example.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
