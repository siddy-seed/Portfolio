import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Dashboard.css';

/* ---- animated bar chart ---- */
function BarChart({ data, label }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="chart-wrap">
      <div className="chart-label">{label}</div>
      <div className="bar-chart">
        {data.map((d, i) => (
          <div key={d.name} className="bar-col">
            <div className="bar-outer">
              <motion.div
                className="bar-inner"
                initial={{ height: 0 }}
                whileInView={{ height: `${(d.value / max) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                viewport={{ once: true }}
              />
            </div>
            <span className="bar-name">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- line sparkline ---- */
function LineChart({ data, label, color = '#00d4ff' }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const H = 80, W = 300;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / (max - min)) * H;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="chart-wrap">
      <div className="chart-label">{label}</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="line-chart-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`lg-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.polyline
          points={pts}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
      </svg>
    </div>
  );
}

/* ---- donut chart ---- */
function DonutChart({ segments, label }) {
  const total = segments.reduce((s, sg) => s + sg.value, 0);
  let offset = 0;
  const R = 40, C = 2 * Math.PI * R;
  return (
    <div className="chart-wrap donut-wrap">
      <div className="chart-label">{label}</div>
      <div className="donut-body">
        <svg viewBox="0 0 100 100" className="donut-svg">
          {segments.map((seg, i) => {
            const pct = seg.value / total;
            const dash = pct * C;
            const currentOffset = offset;
            offset += dash;
            return (
              <motion.circle
                key={seg.name}
                cx="50" cy="50" r={R}
                fill="none"
                stroke={seg.color}
                strokeWidth="12"
                strokeDasharray={`${dash} ${C - dash}`}
                strokeDashoffset={-(currentOffset - C / 4)}
                initial={{ strokeDasharray: `0 ${C}` }}
                whileInView={{ strokeDasharray: `${dash} ${C - dash}` }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
              />
            );
          })}
          <text x="50" y="54" textAnchor="middle" fontSize="10" fill="#f0f0f5" fontWeight="700">DVA</text>
        </svg>
        <div className="donut-legend">
          {segments.map(s => (
            <div key={s.name} className="donut-legend-item">
              <span className="donut-dot" style={{ background: s.color }} />
              <span className="donut-text">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const barData = [
  { name: 'Jan', value: 42 }, { name: 'Feb', value: 67 }, { name: 'Mar', value: 55 },
  { name: 'Apr', value: 80 }, { name: 'May', value: 73 }, { name: 'Jun', value: 91 },
  { name: 'Jul', value: 84 },
];

const lineData = [30, 48, 40, 62, 55, 78, 70, 88, 82, 95, 90, 100];

const donutSegs = [
  { name: 'Python', value: 35, color: '#00d4ff' },
  { name: 'Power BI', value: 25, color: '#7b2ff7' },
  { name: 'React', value: 20, color: '#ff2d95' },
  { name: 'SQL', value: 20, color: '#00ff88' },
];

const kpis = [
  { label: 'Datasets Analyzed', value: '24+', icon: '📁', delta: '+12%', up: true },
  { label: 'Dashboards Built', value: '8', icon: '📊', delta: '+3 this month', up: true },
  { label: 'Avg Insight Time', value: '< 4h', icon: '⚡', delta: '-30%', up: false },
  { label: 'Data Accuracy', value: '97.3%', icon: '🎯', delta: '+2.1%', up: true },
];

export default function Dashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section dashboard" id="dashboard" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Analytics Panel</p>
        <h2 className="section-title">Data at a Glance</h2>
        <p className="section-subtitle">
          A live-style analytics panel showcasing data visualization capabilities — Power BI inspired, built from scratch.
        </p>
      </motion.div>

      {/* KPI Row */}
      <div className="kpi-row">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            className="kpi-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
          >
            <div className="kpi-icon">{k.icon}</div>
            <div className="kpi-value gradient-text">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <div className={`kpi-delta ${k.up ? 'up' : 'down'}`}>{k.delta}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <motion.div
        className="charts-grid"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="chart-card glass-card">
          <BarChart data={barData} label="Monthly Problem Solving Activity" />
        </div>
        <div className="chart-card glass-card">
          <LineChart data={lineData} label="Skill Growth Index (12mo)" color="#7b2ff7" />
        </div>
        <div className="chart-card glass-card donut-card">
          <DonutChart segments={donutSegs} label="Tech Stack Distribution" />
        </div>
      </motion.div>
    </section>
  );
}
