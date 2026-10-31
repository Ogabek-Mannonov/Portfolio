import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, Send } from 'lucide-react';
import { Magnetic } from './ui';
import HeroCard from './HeroCard';

const roles = ['Frontend Developer', 'Full-Stack Engineer', 'UI/UX Designer', 'Bot Builder'];

function Typewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = roles[i];
    const t = setTimeout(
      () => {
        if (!del) {
          setText(full.slice(0, text.length + 1));
          if (text.length + 1 === full.length) setTimeout(() => setDel(true), 1200);
        } else {
          setText(full.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setDel(false);
            setI((i + 1) % roles.length);
          }
        }
      },
      del ? 35 : 75,
    );
    return () => clearTimeout(t);
  }, [text, del, i]);

  return (
    <span className="font-mono text-lime">
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-lime ml-1 align-middle animate-pulse" />
    </span>
  );
}

const line = (delay: number) => ({
  initial: { y: '110%' },
  animate: { y: 0 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-grid" />
      {/* soft glows: radial gradients (no blur filter) are far cheaper */}
      <div
        className="absolute top-1/4 -left-40 w-[40rem] h-[40rem] pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(124,92,255,0.3), transparent)' }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-[36rem] h-[36rem] pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(198,255,61,0.15), transparent)' }}
      />

      <motion.div style={{ y, opacity }} className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-1.5 mb-10 font-mono text-xs md:text-sm text-zinc-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          Available for new opportunities
        </motion.div>

        <h1 className="font-bold tracking-tighter leading-[0.9] text-[clamp(3.2rem,12vw,10rem)]">
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span className="block" {...line(0.3)}>
              Hi, I'm
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span className="block text-gradient" {...line(0.45)}>
              Ogabek.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10 text-xl md:text-3xl text-zinc-300 h-10"
        >
          <Typewriter />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8 }}
          className="mt-6 max-w-xl text-lg text-zinc-400 leading-relaxed"
        >
          I build real-world business applications, modern web interfaces, and automated workflows.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center gap-5"
        >
          <Magnetic>
            <a
              href="#projects"
              className="group flex items-center gap-3 rounded-full bg-lime text-ink px-8 py-4 font-semibold text-lg"
            >
              View Projects
              <ArrowDownRight className="group-hover:rotate-[-45deg] transition-transform duration-300" size={22} />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="https://t.me/ogabekdev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              <Send size={20} className="text-lime" />
              Telegram
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <HeroCard />

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-zinc-500"
      >
        SCROLL
        <span className="relative h-10 w-px bg-white/10 overflow-hidden">
          <motion.span
            className="absolute top-0 left-0 w-full h-1/2 bg-lime"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
}
