import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Skills.css';

const skillGroups = [
  {
    category: 'Data & Analytics',
    icon: '📊',
    skills: [
      { name: 'Power BI', level: 85 },
      { name: 'Data Analysis', level: 90 },
      { name: 'SQL', level: 80 },
      { name: 'Tableau', level: 70 },
    ],
  },
  {
    category: 'Programming',
    icon: '💻',
    skills: [
      { name: 'Python', level: 88 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 72 },
      { name: 'Tailwind CSS', level: 75 },
    ],
  },
  {
    category: 'Tools & Frameworks',
    icon: '🛠️',
    skills: [
      { name: 'React', level: 87 },
      { name: 'Node.js', level: 80 },
      { name: 'MongoDB', level: 78 },
      { name: 'Git & GitHub', level: 90 },
    ],
  },
];

function SkillBar({ name, level, inView, delay }) {
  return (
    <div className="skill-item">
      <div className="skill-meta">
        <span className="skill-name">{name}</span>
        <span className="skill-level">{level}%</span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section skills" id="skills" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Skills</p>
        <h2 className="section-title">Technical Arsenal</h2>
        <p className="section-subtitle">
          A curated blend of data skills and engineering tools — built to take projects from raw data to polished product.
        </p>
      </motion.div>

      <div className="skills-grid">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.category}
            className="skill-group glass-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * gi }}
          >
            <div className="skill-group-header">
              <span className="skill-group-icon">{group.icon}</span>
              <h3 className="skill-group-title">{group.category}</h3>
            </div>
            <div className="skill-list">
              {group.skills.map((s, si) => (
                <SkillBar
                  key={s.name}
                  name={s.name}
                  level={s.level}
                  inView={inView}
                  delay={0.1 * gi + 0.08 * si + 0.3}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
