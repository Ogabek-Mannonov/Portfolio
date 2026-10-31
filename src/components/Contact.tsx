import { Send, Mail, Code2, Briefcase, ArrowUpRight } from 'lucide-react';
import { Magnetic, Reveal, SectionHeading, SpotlightCard } from './ui';

const contactLinks = [
  { name: 'Telegram', value: '@ogabekdev', link: 'https://t.me/ogabekdev', icon: Send },
  { name: 'Email', value: 'hello@ogabek.dev', link: 'mailto:hello@ogabek.dev', icon: Mail },
  { name: 'Upwork', value: 'Hire Me', link: '#', icon: Briefcase },
  { name: 'GitHub', value: 'github.com/ogabekdev', link: 'https://github.com/ogabekdev', icon: Code2 },
];

export default function Contact() {
  return (
    <section id="contact" className="py-28 md:py-40 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] pointer-events-none" style={{ background: 'radial-gradient(closest-side, rgba(124,92,255,0.22), transparent)' }} />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading index="05" label="Contact" title="Let's work together." desc="Available for freelance projects and full-time opportunities." />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {contactLinks.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.1}>
              <a href={c.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                <SpotlightCard className="p-6 md:p-8 h-full group">
                  <div className="flex justify-between items-start mb-10">
                    <c.icon className="text-lime" size={28} strokeWidth={1.5} />
                    <ArrowUpRight className="text-zinc-600 group-hover:text-lime group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <h4 className="text-xl font-semibold">{c.name}</h4>
                  <span className="text-sm text-zinc-500 font-mono break-all">{c.value}</span>
                </SpotlightCard>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center">
          <Magnetic>
            <a
              href="https://t.me/ogabekdev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-lime text-ink px-12 py-6 font-bold text-xl md:text-2xl"
            >
              <Send size={24} />
              Message me on Telegram
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
