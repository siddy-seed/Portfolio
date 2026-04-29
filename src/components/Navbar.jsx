import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="nav-inner">
        <a href="#" className="nav-logo" data-hover>
          <span className="gradient-text">SG</span>
        </a>

        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link"
              data-hover
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          className={`nav-hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </motion.nav>
  );
}
