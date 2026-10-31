import { Server, Layout, PenTool } from 'lucide-react';
import { Counter, Reveal, SectionHeading, SpotlightCard } from './ui';

const categories = [
  {
    title: 'Full-Stack Solutions',
    description:
      'Robust architectures with Node.js/Python, Telegram bots, and scalable marketplaces.',
    icon: Server,
    color: 'text-lime',
  },
  {
    title: 'Frontend Development',
    description:
      'Fast, responsive, interactive UIs with React, Next.js and modern CSS like Tailwind.',
    icon: Layout,
    color: 'text-iris',
  },
  {
    title: 'UI/UX & Design',
    description:
      'User-centric interfaces in Figma & Canva — beautiful and intuitive end products.',
    icon: PenTool,
    color: 'text-coral',
  },
];

const stats = [
  { n: 3, s: '+', l: 'Full-stack products' },
  { n: 10, s: '+', l: 'Technologies' },
  { n: 100, s: '%', l: 'Dedication' },
];

export default function About() {
  return (
    <section id="about" className="py-28 md:py-40 relative">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading index="01" label="About" title="Solving real business problems through code." />

        <div className="grid lg:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-center mb-20">
          <Reveal>
            <div className="relative w-56 h-56 md:w-72 md:h-72 mx-auto">
              <div className="absolute -inset-3 rounded-full border border-dashed border-lime/40 animate-spin-slow" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lime via-iris to-coral blur-xl opacity-30" />
              <img
                src="/my_photo.jpg"
                alt="Ogabek"
                className="relative w-full h-full rounded-full object-cover border-4 border-ink"
              />
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed">
                With experience across the entire stack, I bridge the gap between design and robust
                engineering to deliver comprehensive digital solutions.
              </p>
            </Reveal>
            <div className="grid grid-cols-3 gap-4 mt-10">
              {stats.map((s, i) => (
                <Reveal key={s.l} delay={0.2 + i * 0.1}>
                  <div className="border-t border-line pt-4">
                    <div className="text-4xl md:text-6xl font-bold text-gradient">
                      <Counter to={s.n} suffix={s.s} />
                    </div>
                    <div className="mt-1 text-xs md:text-sm text-zinc-500 font-mono">{s.l}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.12}>
              <SpotlightCard className="p-8 h-full">
                <c.icon className={c.color} size={36} strokeWidth={1.5} />
                <h3 className="text-2xl font-semibold mt-8 mb-3">{c.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{c.description}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
