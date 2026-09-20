import { motion } from 'framer-motion';
import { Palette, MonitorSmartphone } from 'lucide-react';

export default function FrontendWorks() {
  const works = [
    {
      title: "E-Commerce Dashboard UI",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      liveLink: "#",
      figmaLink: "#",
    },
    {
      title: "Fintech Mobile App Design",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
      liveLink: "#",
      figmaLink: "#",
    },
    {
      title: "Real Estate Landing Page",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
      liveLink: "#",
      figmaLink: "#",
    },
    {
      title: "SaaS Analytics Platform",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      liveLink: "#",
      figmaLink: "#",
    }
  ];

  return (
    <section id="frontend" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Frontend & Design Works</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Clean code meets beautiful design. Explore my pure frontend projects hosted on Vercel and UI prototypes designed in Figma.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {works.map((work, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden glass border-white/10"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={work.image} 
                  alt={work.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-4">
                  <h3 className="text-2xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {work.title}
                  </h3>
                  
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    <a 
                      href={work.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-white text-slate-900 rounded-full hover:scale-110 transition-transform"
                      title="Live Demo"
                    >
                      <MonitorSmartphone size={20} />
                    </a>
                    <a 
                      href={work.figmaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-[#F24E1E] text-white rounded-full hover:scale-110 transition-transform"
                      title="Figma Design"
                    >
                      <Palette size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
