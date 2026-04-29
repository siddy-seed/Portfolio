import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './About.css';

const highlights = [
  { icon: '🧠', value: '500+', label: 'LeetCode Problems', desc: 'Strong DSA & problem-solving foundation' },
  { icon: '🤖', value: 'B.Tech AI', label: 'Artificial Intelligence', desc: 'Specializing in Data Visualization & Analytics' },
  { icon: '📊', value: 'DVA', label: 'Data Analytics', desc: 'Transforming raw data into actionable insights' },
  { icon: '💻', value: 'Full-Stack', label: 'Development', desc: 'End-to-end application architecture' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section about" id="about" ref={ref}>
      <motion.div
        className="about-header"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">About</p>
        <h2 className="section-title">Driven by Data,<br />Powered by Code</h2>
        <p className="section-subtitle">
          I'm a B.Tech AI student with a passion for turning complex datasets into clear, 
          compelling visual stories. With a foundation in full-stack development and 500+ 
          LeetCode problems solved, I bring both analytical rigor and engineering craftsmanship 
          to every project.
        </p>
      </motion.div>

      <div className="about-grid">
        {highlights.map((h, i) => (
          <motion.div
            key={h.label}
            className="about-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 * i }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <div className="about-card-icon">{h.icon}</div>
            <div className="about-card-value gradient-text">{h.value}</div>
            <div className="about-card-label">{h.label}</div>
            <div className="about-card-desc">{h.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
