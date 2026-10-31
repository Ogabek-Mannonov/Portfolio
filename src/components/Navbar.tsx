import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Full-Stack', href: '#projects' },
  { name: 'Frontend', href: '#frontend' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    navLinks.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 inset-x-0 z-50 px-4"
    >
      <div
        className={`mx-auto max-w-5xl flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${
          scrolled ? 'bg-ink/90 border border-line' : 'border border-transparent'
        }`}
      >
        <a href="#" className="text-xl font-bold tracking-tight">
          ogabek<span className="text-lime">.dev</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className={`relative px-4 py-2 text-sm rounded-full transition-colors ${
                active === l.href ? 'text-ink' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {active === l.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-lime"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{l.name}</span>
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:block rounded-full border border-lime/60 text-lime px-5 py-2 text-sm font-medium hover:bg-lime hover:text-ink transition-colors"
        >
          Hire me
        </a>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            className="mx-auto mt-2 max-w-5xl rounded-3xl bg-panel/95 backdrop-blur-xl border border-line p-6 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <motion.li key={l.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-2xl font-semibold">
                    {l.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
