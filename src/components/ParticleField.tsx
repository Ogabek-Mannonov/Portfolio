import { useEffect, useRef } from 'react';

type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };

/**
 * Full-page interactive background:
 * - drifting particles linked by lines
 * - particles are pulled toward / swirl around the cursor and light up the links near it
 * - click = shockwave burst, fast mouse movement leaves a glowing spark trail
 */
export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, raf = 0;
    const dpr = 1; // retina canvas is 4x the pixels for little visual gain on thin lines
    const mouse = { x: -9999, y: -9999, px: -9999, py: -9999 };
    let particles: P[] = [];
    const sparks: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    const waves: { x: number; y: number; r: number }[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(75, Math.floor((w * h) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.6,
        hue: Math.random() < 0.7 ? 75 : 255, // lime or violet
      }));
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const dx = e.clientX - mouse.px;
      const dy = e.clientY - mouse.py;
      const speed = Math.hypot(dx, dy);
      if (mouse.px > -999 && speed > 6) {
        for (let i = 0; i < Math.min(3, speed / 12); i++) {
          sparks.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 2 - dx * 0.05,
            vy: (Math.random() - 0.5) * 2 - dy * 0.05,
            life: 1,
          });
        }
      }
      mouse.px = e.clientX;
      mouse.py = e.clientY;
    };
    const onLeave = () => {
      mouse.x = mouse.y = mouse.px = mouse.py = -9999;
    };
    const onClick = (e: MouseEvent) => {
      waves.push({ x: e.clientX, y: e.clientY, r: 0 });
      for (let i = 0; i < 18; i++) {
        const a = (i / 18) * Math.PI * 2;
        sparks.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * 3, vy: Math.sin(a) * 3, life: 1 });
      }
    };

    const color = (hue: number, a: number) =>
      hue === 75 ? `rgba(198,255,61,${a})` : `rgba(124,92,255,${a})`;

    const frame = () => {
      if (document.hidden) {
        if (!reduce) raf = requestAnimationFrame(frame);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      const R = 170; // mouse influence radius
      const L = 120; // link distance

      // shockwaves
      for (let i = waves.length - 1; i >= 0; i--) {
        const s = waves[i];
        s.r += 9;
        const a = 1 - s.r / 500;
        if (a <= 0) { waves.splice(i, 1); continue; }
        ctx.strokeStyle = `rgba(198,255,61,${a * 0.5})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (const p of particles) {
        // mouse interaction: attract + swirl; inside the core repel
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d < R) {
          const f = (1 - d / R);
          if (d > 45) {
            p.vx += (dx / d) * f * 0.06 + (-dy / d) * f * 0.05;
            p.vy += (dy / d) * f * 0.06 + (dx / d) * f * 0.05;
          } else {
            p.vx -= (dx / (d + 1)) * 0.5;
            p.vy -= (dy / (d + 1)) * 0.5;
          }
        }
        // shockwave push
        if (waves.length) for (const s of waves) {
          const sd = Math.hypot(p.x - s.x, p.y - s.y);
          if (Math.abs(sd - s.r) < 30) {
            p.vx += ((p.x - s.x) / (sd + 1)) * 1.2;
            p.vy += ((p.y - s.y) / (sd + 1)) * 1.2;
          }
        }
        p.vx *= 0.97;
        p.vy *= 0.97;
        // keep a gentle base drift
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const near = d < R ? 1 - d / R : 0;
        ctx.fillStyle = color(p.hue, 0.45 + near * 0.55);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + near * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // links
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const ddx = a.x - b.x;
          const ddy = a.y - b.y;
          if (ddx > L || ddx < -L || ddy > L || ddy < -L) continue;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < L * L) {
            const d = Math.sqrt(d2);
            const mx = (a.x + b.x) / 2 - mouse.x;
            const my = (a.y + b.y) / 2 - mouse.y;
            const boost = Math.max(0, 1 - Math.hypot(mx, my) / R);
            ctx.strokeStyle = color(a.hue, (1 - d / L) * (0.12 + boost * 0.7));
            ctx.lineWidth = 0.6 + boost;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // lines from cursor to nearby particles
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < R) {
          ctx.strokeStyle = `rgba(255,92,138,${(1 - md / R) * 0.6})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(a.x, a.y);
          ctx.stroke();
        }
      }

      // cursor glow
      if (mouse.x > -999) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        g.addColorStop(0, 'rgba(124,92,255,0.18)');
        g.addColorStop(1, 'rgba(124,92,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(mouse.x - 220, mouse.y - 220, 440, 440);
      }

      // sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.96;
        s.vy *= 0.96;
        s.life -= 0.025;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        ctx.fillStyle = `rgba(255,${120 + s.life * 135},${60 + s.life * 20},${s.life})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1 + s.life * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(frame);
    };

    resize();
    frame();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onClick);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onClick);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="fixed inset-0 z-0 pointer-events-none" />;
}

