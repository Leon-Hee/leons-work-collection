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
        <h1 className="text-4xl font-bold text-text-primary mb-2">About Me</h1>

        <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-4">
          <p>
            I'm a full-stack developer with a deep interest in the intersection of graphics programming
            and web technologies. My journey started with curiosity about how pixels get painted on screen,
            and evolved into building complete web applications.
          </p>

          <p>
            On the frontend, I work primarily with React and TypeScript, crafting interfaces that are both
            functional and visually refined. On the backend, I build APIs with Node.js and Express,
            designing data models and authentication systems that keep things secure and performant.
          </p>

          <p>
            What excites me most is the graphics side — WebGL, shaders, and real-time rendering.
            I believe the web is the most accessible creative medium, and I want to push its boundaries.
          </p>

          <p>
            When I'm not coding, you'll find me exploring computer graphics papers, contributing
            to open-source, or writing about what I've learned.
          </p>
        </div>

        <div className="pt-6">
          <h2 className="text-lg font-semibold text-text-primary mb-3">Contact</h2>
          <p className="text-text-secondary">
            Feel free to reach out at{' '}
            <a href="mailto:leon@example.com" className="text-accent hover:underline">
              leon@example.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
