import { motion } from 'framer-motion';
import { ExternalLink, Code2, PlayCircle } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: "Telegram Bot + Admin Panel",
      description: "A complete food delivery ecosystem with a Telegram bot for customers to order food and a comprehensive admin panel for restaurant management.",
      tags: ["Node.js", "React", "Telegram Bot API", "MongoDB", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      demoLink: "#",
      githubLink: "#",
      videoLink: "#"
    },
    {
      title: "Market Delivery Platform",
      description: "A comprehensive marketplace platform similar to Yandex Go, allowing vendors to sell products and drivers to manage deliveries efficiently.",
      tags: ["Next.js", "Python", "PostgreSQL", "WebSocket", "Google Maps API"],
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
      demoLink: "#",
      githubLink: "#",
      videoLink: "#"
    },
    {
      title: "Toyingiz Qayerda",
      description: "An online booking system tailored for restaurants and wedding halls. Features calendar integrations, availability checking, and payment processing.",
      tags: ["React", "Express", "Stripe", "PostgreSQL", "Framer Motion"],
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
      demoLink: "#",
      githubLink: "#",
      videoLink: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 relative bg-slate-900/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Full-Stack Projects</h2>
          <p className="text-lg text-slate-400 max-w-2xl">
            Real-world business applications built from the ground up. Here are some of my most significant full-stack achievements.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {projects.map((project, index) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
            >
              {/* Project Image */}
              <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-white/10 group relative">
                <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                  <a href={project.videoLink} className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white hover:bg-white/30 transition-colors">
                    <PlayCircle size={40} />
                  </a>
                </div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Project Details */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h3>
                
                <div className="glass p-6 rounded-xl mb-6 shadow-xl">
                  <p className="text-slate-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a 
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-lg font-medium transition-transform hover:-translate-y-1"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                  <a 
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-5 py-2.5 rounded-lg font-medium transition-all hover:bg-white/20 hover:-translate-y-1"
                  >
                    <Code2 size={18} />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
