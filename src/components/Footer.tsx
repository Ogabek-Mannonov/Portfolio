import { motion } from 'framer-motion';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line pt-16 pb-8 overflow-hidden">
      <div className="flex justify-center select-none" aria-hidden>
        {'OGABEK'.split('').map((c, i) => (
          <motion.span
            key={i}
            data-hover
            initial={{ y: '60%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -20, color: '#c6ff3d', WebkitTextStroke: '0px transparent' }}
            className="text-outline font-bold tracking-tighter leading-none text-[clamp(4rem,19vw,18rem)]"
          >
            {c}
          </motion.span>
        ))}
      </div>
      <div className="container mx-auto px-6 md:px-12 mt-10 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-sm text-zinc-500">
        <p>© {year} Ogabek. Built with React, Tailwind & Framer Motion.</p>
        <a href="#" className="hover:text-lime transition-colors">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
