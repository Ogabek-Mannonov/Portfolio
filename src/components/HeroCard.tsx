import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const lines = [
  { t: 'const dev = {', c: 'text-zinc-400' },
  { t: '  name: "Ogabek",', c: 'text-lime' },
  { t: '  stack: ["React", "Node"],', c: 'text-iris' },
  { t: '  passion: "clean UI",', c: 'text-coral' },
  { t: '  coffee: Infinity,', c: 'text-zinc-300' },
  { t: '};', c: 'text-zinc-400' },
];

/** Floating glass code card that tilts toward the cursor */
export default function HeroCard() {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 80, damping: 14 });
  const sry = useSpring(ry, { stiffness: 80, damping: 14 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      ry.set((e.clientX / window.innerWidth - 0.5) * 24);
      rx.set(-(e.clientY / window.innerHeight - 0.5) * 24);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [rx, ry]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:block absolute right-[6%] top-1/2 -translate-y-1/2 w-[26rem]"
      style={{ perspective: 1000 }}
    >
      <motion.div style={{ rotateX: srx, rotateY: sry }} className="animate-float">
        <div className="absolute -inset-10 rounded-[3rem] opacity-40" style={{ background: 'radial-gradient(closest-side, rgba(124,92,255,0.5), transparent)' }} />
        <div className="relative rounded-3xl border border-white/10 bg-panel/95 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-line">
            <span className="w-3 h-3 rounded-full bg-coral" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-lime" />
            <span className="ml-3 font-mono text-xs text-zinc-500">ogabek.ts</span>
          </div>
          <div className="p-6 font-mono text-sm leading-7">
            {lines.map((l, i) => (
              <motion.div
                key={i}
                className={l.c}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 + i * 0.25 }}
                style={{ whiteSpace: 'pre' }}
              >
                {l.t}
              </motion.div>
            ))}
            <motion.span
              className="inline-block w-2 h-4 bg-lime align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>

        {/* floating chips */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-8 -right-6 rounded-2xl bg-lime text-ink px-4 py-2 font-mono text-xs font-semibold rotate-6 shadow-xl"
        >
          React ⚛
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -bottom-6 -left-8 rounded-2xl bg-iris text-white px-4 py-2 font-mono text-xs font-semibold -rotate-6 shadow-xl"
        >
          Node.js
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

