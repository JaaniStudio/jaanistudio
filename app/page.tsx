import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Process from './components/Process';
import Footer from './components/Footer';

function SectionDivider() {
  return (
    <div className="relative h-16 md:h-20 overflow-hidden bg-[#080808]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path
          d="M0,40 C360,80 1080,0 1440,40"
          fill="none"
          stroke="rgba(255,166,73,0.05)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

export default function Page() {
  return (
    <ReactLenis root>
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Portfolio />
        <SectionDivider />
        <About />
        <Process />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </ReactLenis>
  );
}