import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import FrontendWorks from './components/FrontendWorks';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen selection:bg-blue-500/30 selection:text-blue-200">
      {/* Background radial gradient for modern dark mode feel */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1c] to-slate-900 -z-10" />
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <FrontendWorks />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
