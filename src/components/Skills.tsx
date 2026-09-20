import { motion } from 'framer-motion';

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "HTML/CSS"]
    },
    {
      title: "Backend & DB",
      skills: ["Node.js", "Python", "Express", "REST APIs", "MongoDB", "PostgreSQL"]
    },
    {
      title: "Tools & Design",
      skills: ["Git & GitHub", "Vercel", "Figma", "Canva", "Telegram Bot API", "Postman"]
    }
  ];

  return (
    <section id="skills" className="py-24 relative bg-slate-900/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Tech Stack & Skills</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            The weapons of choice in my development arsenal. I constantly learn and adapt to the best tools for the job.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="glass p-8 rounded-2xl border-t-4 border-t-blue-500"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">{category.title}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {category.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-slate-800/80 rounded-lg text-sm font-medium border border-white/5 hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
