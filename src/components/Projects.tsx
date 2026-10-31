import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowUpRight, Code2, Play, X } from 'lucide-react';
import { Reveal, SectionHeading } from './ui';

const projects = [
  {
    title: 'Telegram Bot + Admin Panel',
    kind: 'Food delivery ecosystem',
    description:
      'A complete food delivery ecosystem: a Telegram bot for customers to order food and a comprehensive admin panel for restaurant management.',
    tags: ['Node.js', 'React', 'Telegram Bot API', 'MongoDB', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
    url: 'bot-admin.app',
    accent: '#c6ff3d',
    demoLink: '#',
    githubLink: '#',
    videoLink: '',
  },
  {
    title: 'Market Delivery Platform',
    kind: 'Marketplace · Yandex Go-like',
    description:
      'A marketplace platform similar to Yandex Go, allowing vendors to sell products and drivers to manage deliveries efficiently.',
    tags: ['Next.js', 'Python', 'PostgreSQL', 'WebSocket', 'Google Maps API'],
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    url: 'market-delivery.app',
    accent: '#7c5cff',
    demoLink: '#',
    githubLink: '#',
    videoLink: '',
  },
  {
    title: 'Toyingiz Qayerda',
    kind: 'Booking system',
    description:
      'An online booking system for restaurants and wedding halls with calendar integrations, availability checking, and payments.',
    tags: ['React', 'Express', 'Stripe', 'PostgreSQL', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    url: 'toyingizqayerda.uz',
    accent: '#ff5c8a',
    demoLink: '#',
    githubLink: '#',
    videoLink: '',
  },
];

type Project = (typeof projects)[number];

function useIsDesktop() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(min-width: 1024px)');
    const f = () => setV(m.matches);
    f();
    m.addEventListener('change', f);
    return () => m.removeEventListener('change', f);
  }, []);
  return v;
}

/** Browser-window mockup with tilt and inner parallax */
function Mockup({ p, onPlay }: { p: Project; onPlay: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ix = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });
  const iy = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });

  return (
    <div style={{ perspective: 1200 }} className="w-full">
      <motion.div
        ref={ref}
        data-cursor="Play"
        onClick={onPlay}
        style={{ rotateX: rx, rotateY: ry }}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry.set(px * 10);
          rx.set(-py * 10);
          ix.set(-px * 30);
          iy.set(-py * 30);
        }}
        onMouseLeave={() => {
          rx.set(0);
          ry.set(0);
          ix.set(0);
          iy.set(0);
        }}
        className="group relative rounded-2xl border border-white/10 bg-ink overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
      >
        <div className="flex items-center gap-2 px-4 py-3 bg-panel border-b border-line">
          <span className="w-2.5 h-2.5 rounded-full bg-coral" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-lime" />
          <span className="mx-auto font-mono text-[11px] text-zinc-500 bg-ink rounded-full px-4 py-1">{p.url}</span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.img
            src={p.image}
            alt={p.title}
            style={{ x: ix, y: iy, scale: 1.15 }}
            className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-500 group-hover:brightness-50"
          />
          <div className="absolute inset-0 grid place-items-center">
            <span
              className="grid place-items-center w-20 h-20 rounded-full text-ink scale-0 group-hover:scale-100 transition-transform duration-500"
              style={{ background: p.accent }}
            >
              <Play size={30} fill="currentColor" />
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Card({
  p,
  i,
  total,
  progress,
  desktop,
  onPlay,
}: {
  p: Project;
  i: number;
  total: number;
  progress: MotionValue<number>;
  desktop: boolean;
  onPlay: () => void;
}) {
  const target = 1 - (total - 1 - i) * 0.05;
  const scale = useTransform(progress, [i / total, 1], [1, target]);
  const dim = useTransform(progress, [i / total, 1], [0, i === total - 1 ? 0 : 0.5]);

  return (
    <div className="lg:sticky lg:top-0 lg:h-screen flex lg:items-start mb-10 lg:mb-0" style={desktop ? { paddingTop: `${6 + i * 1.5}rem` } : undefined}>
      <motion.article
        style={desktop ? { scale, transformOrigin: 'top center' } : undefined}
        className="relative w-full rounded-[2rem] border border-line bg-panel overflow-hidden p-6 md:p-10 lg:p-12"
      >
        <div
          className="pointer-events-none absolute -top-40 -right-40 w-[32rem] h-[32rem] opacity-25"
          style={{ background: `radial-gradient(closest-side, ${p.accent}, transparent)` }}
        />

        <div className="relative grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-14 items-center">
          <Reveal y={30}>
            <Mockup p={p} onPlay={onPlay} />
          </Reveal>

          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="text-7xl font-bold text-outline leading-none">0{i + 1}</span>
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color: p.accent }}>
                {p.kind}
              </span>
            </div>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">{p.title}</h3>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">{p.description}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {p.tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full border border-line font-mono text-xs text-zinc-300">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={p.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-ink"
                style={{ background: p.accent }}
              >
                Live Demo
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a
                href={p.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold hover:bg-white/10 transition-colors"
              >
                <Code2 size={18} /> Code
              </a>
              <button
                onClick={onPlay}
                className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold hover:bg-white/10 transition-colors"
              >
                <Play size={16} /> Video
              </button>
            </div>
          </div>
        </div>

        {/* darkens the card as the next one stacks over it */}
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />
      </motion.article>
    </div>
  );
}

function VideoModal({ p, onClose }: { p: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!p) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [p, onClose]);

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[150] grid place-items-center bg-ink/90 backdrop-blur-md p-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-panel"
          >
            {p.videoLink ? (
              <video src={p.videoLink} controls autoPlay className="w-full h-full" />
            ) : (
              <div className="w-full h-full grid place-items-center text-center">
                <div>
                  <Play size={48} className="mx-auto mb-4" style={{ color: p.accent }} />
                  <p className="text-2xl font-semibold">{p.title}</p>
                  <p className="font-mono text-sm text-zinc-500 mt-2">Video demo coming soon</p>
                </div>
              </div>
            )}
          </motion.div>
          <button onClick={onClose} aria-label="Close" className="absolute top-6 right-6 grid place-items-center w-12 h-12 rounded-full bg-white/10 hover:bg-lime hover:text-ink transition-colors">
            <X />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const listRef = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const [video, setVideo] = useState<Project | null>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start start', 'end end'] });

  return (
    <section id="projects" className="pt-28 md:pt-40 pb-10 relative">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading
          index="02"
          label="Full-Stack"
          title="Real products, built from the ground up."
          desc="Some of my most significant full-stack achievements."
        />
        <div ref={listRef}>
          {projects.map((p, i) => (
            <Card
              key={p.title}
              p={p}
              i={i}
              total={projects.length}
              progress={scrollYProgress}
              desktop={desktop}
              onPlay={() => setVideo(p)}
            />
          ))}
        </div>
      </div>
      <VideoModal p={video} onClose={() => setVideo(null)} />
    </section>
  );
}
