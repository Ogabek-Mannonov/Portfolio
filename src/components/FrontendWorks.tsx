import { Palette, MonitorSmartphone } from 'lucide-react';
import { Reveal, SectionHeading } from './ui';

const works = [
  { title: 'E-Commerce Dashboard UI', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80', liveLink: '#', figmaLink: '#' },
  { title: 'Fintech Mobile App Design', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80', liveLink: '#', figmaLink: '#' },
  { title: 'Real Estate Landing Page', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80', liveLink: '#', figmaLink: '#' },
  { title: 'SaaS Analytics Platform', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80', liveLink: '#', figmaLink: '#' },
];

export default function FrontendWorks() {
  return (
    <section id="frontend" className="py-28 md:py-40 relative">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading
          index="03"
          label="Frontend & Design"
          title="Clean code meets beautiful design."
          desc="Pure frontend projects hosted on Vercel and UI prototypes designed in Figma."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {works.map((w, i) => (
            <Reveal key={i} delay={(i % 2) * 0.12} className={i % 2 ? 'md:mt-20' : ''}>
              <div data-hover className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
                <img
                  src={w.image}
                  alt={w.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs text-lime">0{i + 1}</span>
                    <h3 className="text-2xl font-semibold">{w.title}</h3>
                  </div>
                  <div className="flex gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <a href={w.liveLink} target="_blank" rel="noopener noreferrer" title="Live Demo" className="grid place-items-center w-12 h-12 rounded-full bg-lime text-ink hover:scale-110 transition-transform">
                      <MonitorSmartphone size={20} />
                    </a>
                    <a href={w.figmaLink} target="_blank" rel="noopener noreferrer" title="Figma" className="grid place-items-center w-12 h-12 rounded-full bg-coral text-white hover:scale-110 transition-transform">
                      <Palette size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
