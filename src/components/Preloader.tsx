import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/** Intro: counter 0→100, then two curtains slide away */
export default function Preloader() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [done]);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 9 + 3;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 350);
      }
      setN(Math.floor(v));
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="fixed inset-0 z-[200] pointer-events-none" exit={{ transition: { duration: 1.2 } }}>
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className={`absolute top-0 bottom-0 w-1/2 bg-ink ${i ? 'right-0' : 'left-0'}`}
              exit={{ x: i ? '100%' : '-100%' }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            />
          ))}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-6"
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-5xl md:text-8xl font-bold tracking-tighter">
              {'OGABEK'.split('').map((c, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {c}
                </motion.span>
              ))}
              <span className="text-lime">.</span>
            </div>
            <div className="w-56 h-px bg-white/10 overflow-hidden">
              <div className="h-full bg-lime transition-all duration-100" style={{ width: `${n}%` }} />
            </div>
            <span className="font-mono text-sm text-zinc-500">{n}%</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

