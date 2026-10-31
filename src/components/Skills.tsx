import { motion } from 'framer-motion';
import { Reveal, SectionHeading } from './ui';

const skillCategories = [
  { title: 'Frontend', skills: ['React.js', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'] },
  { title: 'Backend & DB', skills: ['Node.js', 'Python', 'Express', 'REST APIs', 'MongoDB', 'PostgreSQL'] },
  { title: 'Tools & Design', skills: ['Git & GitHub', 'Vercel', 'Figma', 'Canva', 'Telegram Bot API', 'Postman'] },
];

const marquee = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Tailwind', 'Figma', 'PostgreSQL', 'MongoDB', 'Telegram Bots'];

export default function Skills() {
  const row = [...marquee, ...marquee];
  return (
    <section id="skills" className="py-28 md:py-40 relative overflow-hidden">
      {/* Marquee */}
      <div className="mb-24 -rotate-2 border-y border-line bg-panel py-5">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {row.map((m, i) => (
            <span key={i} className="mx-6 text-4xl md:text-6xl font-bold flex items-center gap-12">
              <span className={i % 2 ? 'text-outline' : ''}>{m}</span>
              <span className="text-lime">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading
          index="04"
          label="Skills"
          title="The tools in my arsenal."
          desc="I constantly learn and adapt to the best tools for the job."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((c, idx) => (
            <Reveal key={c.title} delay={idx * 0.12}>
              <div className="h-full rounded-3xl border border-line bg-panel p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <span className="font-mono text-sm text-lime">0{idx + 1}</span>
                  {c.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {c.skills.map((s, i) => (
                    <motion.span
                      key={s}
                      data-hover
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.05, type: 'spring', stiffness: 260, damping: 18 }}
                      whileHover={{ y: -4, backgroundColor: '#c6ff3d', color: '#07070b' }}
                      className="px-4 py-2 rounded-full border border-line font-mono text-sm text-zinc-300"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
