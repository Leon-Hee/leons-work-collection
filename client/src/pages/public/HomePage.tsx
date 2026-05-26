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
    <div className="max-w-4xl mx-auto px-6 pt-24 pb-20">
      <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-8">
        <motion.div variants={fadeUp}>
          <p className="text-sm text-accent font-mono tracking-wide">Hi, my name is</p>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-bold text-text-primary leading-tight tracking-tight"
        >
          Leon Hu
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-xl md:text-2xl text-text-secondary max-w-2xl leading-relaxed"
        >
          Full-stack developer passionate about building beautiful, performant web applications
          with modern technologies.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="text-base text-text-muted max-w-xl leading-relaxed"
        >
          I specialize in React, Node.js, and graphics programming — crafting digital experiences
          that sit at the intersection of engineering and design.
        </motion.p>

        <motion.div variants={fadeUp} className="flex gap-4 pt-4">
          <Link to="/projects">
            <Button>View My Work</Button>
          </Link>
          <Link to="/blog">
            <Button variant="secondary">Read Blog</Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
