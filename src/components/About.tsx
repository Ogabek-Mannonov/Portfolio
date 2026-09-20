import { motion } from 'framer-motion';
import { Server, Layout, PenTool } from 'lucide-react';

export default function About() {
  const categories = [
    {
      title: "Full-Stack Solutions",
      description: "Building robust architectures with Node.js/Python, integrating Telegram bots, and developing scalable marketplaces.",
      icon: <Server className="text-blue-400" size={32} />,
    },
    {
      title: "Frontend Development",
      description: "Crafting fast, responsive, and interactive UIs using React, Next.js, and modern CSS frameworks like Tailwind.",
      icon: <Layout className="text-violet-400" size={32} />,
    },
    {
      title: "UI/UX & Design",
      description: "Designing user-centric interfaces in Figma & Canva, ensuring the final product is both beautiful and intuitive.",
      icon: <PenTool className="text-pink-400" size={32} />,
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-4 border-blue-500/30 glass p-2"
          >
            {/* O'zingizning rasmingizni shu yerga qo'yishingiz mumkin. Masalan public papkaga rasm yuklab "src='/profile.jpg'" */}
            <img 
              src="/my_photo.jpg" 
              alt="Ogabek" 
              className="w-full h-full rounded-full object-cover"
            />
          </motion.div>
          
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              I approach web development as a way to solve real business problems through technology. 
              With experience across the entire stack, I bridge the gap between design and robust engineering to deliver comprehensive digital solutions.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div 
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{cat.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {cat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
