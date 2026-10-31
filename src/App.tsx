import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import FrontendWorks from './components/FrontendWorks';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import ParticleField from './components/ParticleField';
import { Cursor, ScrollProgress } from './components/ui';

function App() {
  return (
    <div className="grain bg-ink text-zinc-100 min-h-screen">
      <Preloader />
      <ParticleField />
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <FrontendWorks />
        <Skills />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
