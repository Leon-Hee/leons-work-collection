import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../../components/ui/Button'

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-40 pb-20">
      <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-12">
        <motion.div variants={fadeUp}>
          <p className="text-sm text-accent font-mono tracking-widest">你好，我是</p>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-bold text-text-primary leading-none tracking-tight"
        >
          Leon Hu
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-xl md:text-2xl text-text-secondary max-w-2xl leading-loose"
        >
          全栈开发者，热衷于用现代技术构建美观、高性能的 Web 应用。
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="text-base text-text-muted max-w-xl leading-loose"
        >
          专注于 React、Node.js 和图形编程 — 在工程与设计的交汇处打造数字体验。
        </motion.p>

        <motion.div variants={fadeUp} className="flex gap-4 pt-8">
          <Link to="/projects">
            <Button>查看作品</Button>
          </Link>
          <Link to="/blog">
            <Button variant="secondary">阅读博客</Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
