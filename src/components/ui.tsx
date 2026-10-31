import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useInView,
  animate,
} from 'framer-motion';

/** Fade/slide-in on scroll */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word masked text reveal */
export function SplitText({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] mr-[0.25em]" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  desc,
}: {
  index: string;
  label: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-16 md:mb-24">
      <Reveal>
        <p className="font-mono text-sm text-lime flex items-center gap-3 mb-6">
          <span>{index}</span>
          <span className="h-px w-12 bg-lime/60" />
          <span className="uppercase tracking-[0.25em]">{label}</span>
        </p>
      </Reveal>
      <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl">
        <SplitText text={title} />
      </h2>
      {desc && (
        <Reveal delay={0.2}>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl">{desc}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Top scroll progress bar */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-lime via-iris to-coral z-[100]"
    />
  );
}

/** Custom cursor: dot + trailing ring that grows over interactive elements */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.5 });
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const next = !!t?.closest('a, button, [data-hover]');
      setHover((h) => (h === next ? h : next));
      const lbl = t?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? '';
      setLabel((l) => (l === lbl ? l : lbl));
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        style={{ x, y }}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-lime z-[110] pointer-events-none"
      />
      <motion.div
        style={{ x: sx, y: sy }}
        animate={{
          width: label ? 96 : hover ? 72 : 36,
          height: label ? 96 : hover ? 72 : 36,
          marginLeft: label ? -48 : hover ? -36 : -18,
          marginTop: label ? -48 : hover ? -36 : -18,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={`fixed top-0 left-0 rounded-full border z-[110] pointer-events-none transition-colors grid place-items-center font-mono text-[11px] font-semibold uppercase tracking-wider ${
          label ? 'border-lime bg-lime text-ink' : hover ? 'border-lime bg-lime/10' : 'border-white/40'
        }`}
      >
        {label}
      </motion.div>
    </>
  );
}

/** Element gently pulled toward the cursor */
export function Magnetic({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Card with a cursor-following spotlight + subtle 3D tilt */
export function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });

  return (
    <motion.div
      ref={ref}
      data-hover
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        // direct DOM update: no React re-render on every mouse move
        if (glow.current) {
          glow.current.style.opacity = '1';
          glow.current.style.background = `radial-gradient(400px circle at ${px}px ${py}px, rgba(198,255,61,0.12), transparent 60%)`;
        }
        ry.set((px / r.width - 0.5) * 8);
        rx.set(-(py / r.height - 0.5) * 8);
      }}
      onMouseLeave={() => {
        if (glow.current) glow.current.style.opacity = '0';
        rx.set(0);
        ry.set(0);
      }}
      className={`relative overflow-hidden rounded-3xl border border-line bg-panel ${className}`}
    >
      <div ref={glow} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

/** Animated number counter */
export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

