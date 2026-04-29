import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Projects.css';

const projects = [
  {
    id: 1,
    tag: 'Data Structuring System',
    title: 'Resume Builder',
    desc: 'A structured data pipeline that transforms unstructured career information into optimized, ATS-friendly resume formats.',
    problem: 'Job seekers struggle with inconsistent resume formats that fail ATS parsing systems.',
    solution: 'Built a form-driven data schema that structures experience, skills, and achievements into standardized JSON, rendered as beautifully formatted PDFs.',
    impact: '3x improvement in ATS pass-through rate · 500+ resumes generated · Sub-2s render time',
    tech: ['React', 'Node.js', 'PDF.js', 'MongoDB'],
    metrics: [
      { label: 'ATS Score', value: '94%', color: '#00d4ff' },
      { label: 'Users', value: '500+', color: '#7b2ff7' },
      { label: 'Render', value: '< 2s', color: '#00ff88' },
    ],
    accent: '#00d4ff',
    preview: 'resume',
  },
  {
    id: 2,
    tag: 'Analytics Dashboard Tool',
    title: 'Job Tracker',
    desc: 'A full-stack analytics tool that visualizes your job search pipeline — from applications to offers — with real-time insights.',
    problem: 'Job seekers lose track of applications across dozens of companies, with no visibility into funnel metrics.',
    solution: 'Built a Kanban + analytics hybrid that tracks applications through stages, visualizes response rates, and surfaces insights on optimal application timing.',
    impact: '40% higher response tracking · Pipeline visualized across 6 stages · Weekly trend reports',
    tech: ['React', 'Express', 'MongoDB', 'Chart.js'],
    metrics: [
      { label: 'Response Rate', value: '40%↑', color: '#00d4ff' },
      { label: 'Pipeline Stages', value: '6', color: '#7b2ff7' },
      { label: 'Insights', value: 'Real-time', color: '#ff2d95' },
    ],
    accent: '#7b2ff7',
    preview: 'jobtracker',
  },
  {
    id: 3,
    tag: 'Visual Data Showcase',
    title: 'Wheel Estate',
    desc: 'A real estate analytics platform that transforms property data into interactive maps and visual dashboards for smarter investment decisions.',
    problem: 'Real estate buyers and investors rely on fragmented data spread across multiple platforms with no unified visual layer.',
    solution: 'Aggregated property data into a unified dashboard with interactive heatmaps, price trend charts, and locality comparison views.',
    impact: '200+ properties visualized · Price trend accuracy within 5% · 60% faster decision cycle',
    tech: ['React', 'Python', 'Mapbox', 'FastAPI'],
    metrics: [
      { label: 'Properties', value: '200+', color: '#00d4ff' },
      { label: 'Accuracy', value: '95%', color: '#00ff88' },
      { label: 'Decision Speed', value: '60%↑', color: '#ff2d95' },
    ],
    accent: '#ff2d95',
    preview: 'estate',
  },
];

function MockPreview({ type }) {
  if (type === 'resume') return (
    <div className="mock-resume">
      <div className="mock-header-bar"><div className="mock-name-block" /><div className="mock-tag-row"><span /><span /><span /></div></div>
      {[80, 60, 95, 70].map((w, i) => <div key={i} className="mock-line" style={{ width: `${w}%`, opacity: 0.3 + i * 0.15 }} />)}
      <div className="mock-skills-row">{['React', 'Python', 'SQL', 'Power BI'].map(s => <span key={s} className="mock-tag">{s}</span>)}</div>
    </div>
  );
  if (type === 'jobtracker') return (
    <div className="mock-kanban">
      {['Applied', 'Interview', 'Offer'].map((col, ci) => (
        <div key={col} className="mock-kanban-col">
          <div className="mock-kanban-title">{col}</div>
          {[...Array(ci === 0 ? 3 : ci === 1 ? 2 : 1)].map((_, i) => (
            <div key={i} className="mock-kanban-card" />
          ))}
        </div>
      ))}
    </div>
  );
  return (
    <div className="mock-map">
      <div className="mock-map-bg" />
      {[[30, 40], [55, 30], [70, 60], [45, 65], [20, 55]].map(([x, y], i) => (
        <div key={i} className="mock-dot" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.3}s` }} />
      ))}
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [active, setActive] = useState(null);

  return (
    <section className="section projects" id="projects" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Projects</p>
        <h2 className="section-title">Case Studies</h2>
        <p className="section-subtitle">
          Every project is a data story — from problem discovery to measurable impact.
        </p>
      </motion.div>

      <div className="projects-list">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            className="project-card glass-card"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 * i }}
            style={{ '--accent-color': p.accent }}
            whileHover={{ y: -4 }}
            onClick={() => setActive(active === p.id ? null : p.id)}
            data-hover
          >
            <div className="project-top">
              <div className="project-left">
                <span className="project-tag" style={{ color: p.accent, borderColor: p.accent + '33', background: p.accent + '0d' }}>
                  {p.tag}
                </span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <div className="project-metrics">
                  {p.metrics.map(m => (
                    <div key={m.label} className="metric-chip">
                      <span className="metric-value" style={{ color: m.color }}>{m.value}</span>
                      <span className="metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="project-right">
                <div className="project-preview">
                  <MockPreview type={p.preview} />
                </div>
              </div>
            </div>

            <AnimatePresence>
              {active === p.id && (
                <motion.div
                  className="project-expanded"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="case-study-grid">
                    <div className="case-block">
                      <div className="case-label">🔴 Problem</div>
                      <p>{p.problem}</p>
                    </div>
                    <div className="case-block">
                      <div className="case-label">🟢 Solution</div>
                      <p>{p.solution}</p>
                    </div>
                    <div className="case-block case-full">
                      <div className="case-label">📈 Impact</div>
                      <p>{p.impact}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="project-expand-btn">
              <span>{active === p.id ? 'Collapse' : 'View Case Study'}</span>
              <motion.svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                animate={{ rotate: active === p.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path d="M6 9l6 6 6-6"/>
              </motion.svg>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
