import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Experience.css';

const timeline = [
  {
    year: '2024',
    type: 'Certification',
    title: 'Goldman Sachs — Forage Virtual Internship',
    subtitle: 'Software Engineering Job Simulation',
    desc: 'Completed the Goldman Sachs Software Engineering virtual experience on Forage. Tasks included password security analysis, cryptography best practices, and proposing technical recommendations to engineering leadership.',
    tags: ['Cryptography', 'Security', 'Engineering'],
    icon: '🏦',
    accent: '#00d4ff',
  },
  {
    year: '2024',
    type: 'Education',
    title: 'B.Tech — Artificial Intelligence',
    subtitle: 'Specialization: Data Visualization & Analytics',
    desc: 'Pursuing a B.Tech in AI with a DVA specialization. Core coursework includes machine learning, data analytics pipelines, visualization theory, and applied AI engineering.',
    tags: ['Machine Learning', 'DVA', 'AI Engineering'],
    icon: '🎓',
    accent: '#7b2ff7',
  },
  {
    year: '2023',
    type: 'Milestone',
    title: '500+ LeetCode Problems Solved',
    subtitle: 'Consistent DSA Practice',
    desc: 'Solved 500+ problems across arrays, trees, graphs, dynamic programming and system design. Competed in weekly contests, sharpening algorithmic thinking and time complexity analysis.',
    tags: ['DSA', 'Algorithms', 'Problem Solving'],
    icon: '⚡',
    accent: '#ff2d95',
  },
  {
    year: '2023',
    type: 'Project',
    title: 'Full-Stack Development — MERN Stack',
    subtitle: 'Building production-ready web apps',
    desc: 'Built multiple end-to-end applications using the MERN stack. Gained experience in REST API design, authentication, database modeling, and deploying cloud-based applications.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    icon: '🚀',
    accent: '#00ff88',
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section experience" id="experience" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Experience & Certifications</p>
        <h2 className="section-title">The Journey So Far</h2>
        <p className="section-subtitle">
          A timeline of milestones — from certifications and projects to academic achievements.
        </p>
      </motion.div>

      <div className="timeline" role="list">
        {timeline.map((item, i) => (
          <motion.div
            key={item.title}
            className="timeline-item"
            role="listitem"
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 * i }}
          >
            <div className="timeline-line">
              <div className="timeline-dot" style={{ borderColor: item.accent, boxShadow: `0 0 12px ${item.accent}55` }}>
                <span>{item.icon}</span>
              </div>
              {i < timeline.length - 1 && <div className="timeline-connector" />}
            </div>

            <motion.div
              className="timeline-card glass-card"
              whileHover={{ y: -4 }}
              style={{ '--item-accent': item.accent }}
            >
              <div className="timeline-meta">
                <span className="timeline-year">{item.year}</span>
                <span className="timeline-type" style={{ color: item.accent }}>{item.type}</span>
              </div>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-subtitle">{item.subtitle}</p>
              <p className="timeline-desc">{item.desc}</p>
              <div className="timeline-tags">
                {item.tags.map(t => (
                  <span key={t} className="timeline-tag" style={{ borderColor: item.accent + '44', color: item.accent }}>{t}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
