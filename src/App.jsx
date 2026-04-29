import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Dashboard from './components/Dashboard';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" />
        ) : (
          <main key="main">
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Dashboard />
            <Experience />
            <Contact />
            <Footer />
          </main>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
