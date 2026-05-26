import { motion } from 'framer-motion'

const skills = [
  { category: '前端', items: ['React', 'TypeScript', 'TailwindCSS', 'Next.js', 'Framer Motion'] },
  { category: '后端', items: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs', 'JWT Auth'] },
  { category: '图形', items: ['WebGL', 'Three.js', 'GLSL Shaders', 'Canvas API', 'SVG'] },
  { category: '工具', items: ['Git', 'Docker', 'Vercel', 'Supabase', 'Figma'] },
]

const barVariants = {
  initial: { width: 0 },
  animate: (i: number) => ({
    width: '100%',
    transition: { delay: 0.2 + i * 0.1, duration: 0.8, ease: 'easeOut' as const },
  }),
}

export default function SkillsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold text-text-primary mb-2">技能</h1>
        <p className="text-text-secondary mb-10">我使用的技术和工具。</p>
      </motion.div>

      <div className="space-y-10">
        {skills.map(({ category, items }) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold text-text-primary mb-4">{category}</h2>
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="text-sm text-text-secondary w-24 shrink-0">{item}</span>
                  <div className="flex-1 h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent rounded-full"
                      variants={barVariants}
                      initial="initial"
                      animate="animate"
                      custom={i}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
