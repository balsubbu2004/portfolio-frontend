import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const cardData = [
  {
    id: 'summary',
    label: 'whoami',
    title: 'S Bala Subramanyam',
    subtitle: 'Software Engineer — Systems & Full-Stack',
    front: 'ISE graduate, 2026 · Ballari, India',
    backTitle: '$ cat summary.txt',
    backLines: [
      'ISE graduate (RYMEC, 2026)',
      'Industry exp: low-level C debugging,',
      'memory optimization, network protocol',
      'analysis @ Alcatel-Lucent Enterprise',
      '',
      'Stack: Python, C/C++, React, PostgreSQL,',
      'Linux tooling',
      '',
      'Seeking: Software Engineer role in',
      'networking, systems, or full-stack',
    ],
  },
  {
    id: 'experience',
    label: 'ps -ef',
    title: 'Software Engineering Intern',
    subtitle: 'Alcatel-Lucent Enterprise · Feb–Apr 2026',
    front: 'AOS · BGP/EVPN · Embedded Linux',
    backTitle: '$ tail -f debug.log',
    backLines: [
      '[BGP-EVPN] Route Type 1 — debugged',
      '  enterprise switch C stack',
      '',
      '[valgrind] svcmgr, DHCPv6, BGP-EVPN',
      '  leak scan on live CMM board',
      '',
      '[trace] CMM/NI roles, CSLIB, HAL',
      '  modules — process interaction map',
      '',
      '[build] AOS image, flags:',
      '  VALGRIND=1 DEBUGBIN — via Perforce',
    ],
  },
  {
    id: 'skills',
    label: 'pip list',
    title: 'Technical Skills',
    subtitle: 'Languages, stack & tooling',
    front: 'Python · C/C++ · React · PostgreSQL',
    backTitle: '$ pip list --installed',
    backLines: [
      'lang        python, c, cpp',
      'frontend    html, css, js, bootstrap,',
      '            react',
      'backend     flask, django, rest-api',
      'database    sql, postgresql',
      'tools       git, github, vscode,',
      '            valgrind, gdb, linux',
    ],
  },
  {
    id: 'projects',
    label: 'ls ~/projects',
    title: 'Projects',
    subtitle: 'Two shipped builds',
    front: 'Eventure · Krypton Chatbot',
    backTitle: '$ ls -la ~/projects',
    backLines: [
      'eventure/',
      '  college event management system',
      '  creation, registration, scheduling,',
      '  participant tracking',
      '',
      'krypton-chatbot/',
      '  telegram bot — python + bot api',
      '  user auth, message handling logic',
    ],
  },
  {
    id: 'education',
    label: 'cat transcript',
    title: 'Education',
    subtitle: 'B.E. Information Science & Engineering',
    front: 'RYMEC, Ballari · 2022–2026 · 85.17%',
    backTitle: '$ cat transcript.txt',
    backLines: [
      'B.E. — Info Science & Engineering',
      '  RYMEC, Ballari  (2022–2026)',
      '  score: 85.17%',
      '',
      'PUC — Satyam PU College  (2020–2022)',
      '  score: 77.66%',
      '',
      'SSLC — Vivekananda High School (2020)',
      '  score: 88.32%',
    ],
  },
  {
    id: 'languages',
    label: 'locale -a',
    title: 'Languages',
    subtitle: 'Spoken fluently',
    front: 'English · Kannada · Hindi · Telugu',
    backTitle: '$ locale -a',
    backLines: [
      'en_IN.UTF-8   english',
      'kn_IN.UTF-8   kannada',
      'hi_IN.UTF-8   hindi',
      'te_IN.UTF-8   telugu',
    ],
  },
];

const styles = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');

.about-root {
  --bg: #0D1117;
  --surface: #161B22;
  --surface-hover: #1C2330;
  --border: #21262D;
  --signal: #58A6FF;
  --status: #3FB950;
  --amber: #D29922;
  --text-primary: #E6EDF3;
  --text-muted: #8B949E;
  background: var(--bg);
  font-family: 'Inter', sans-serif;
  padding: 64px 0 80px;
  min-height: 100vh;
}

.about-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--status);
  letter-spacing: 0.05em;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.about-eyebrow::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--status);
  box-shadow: 0 0 8px var(--status);
}

.about-heading {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 40px;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.about-sub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 48px;
}

.flip-card {
  perspective: 1200px;
  height: 220px;
  margin-bottom: 28px;
  cursor: pointer;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner,
.flip-card.flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  border: 1px solid var(--border);
  padding: 22px 24px;
  box-sizing: border-box;
}

.flip-front {
  background: var(--surface);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.flip-front:hover {
  background: var(--surface-hover);
  border-color: var(--signal);
}

.flip-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--signal);
  background: rgba(88, 166, 255, 0.1);
  border: 1px solid rgba(88, 166, 255, 0.25);
  border-radius: 4px;
  padding: 3px 8px;
  width: fit-content;
}

.flip-front-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 19px;
  color: var(--text-primary);
  margin: 14px 0 4px;
  line-height: 1.3;
}

.flip-front-subtitle {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 12px;
  line-height: 1.4;
}

.flip-front-data {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--status);
}

.flip-back {
  background: #0A0D12;
  transform: rotateY(180deg);
  font-family: 'JetBrains Mono', monospace;
  overflow-y: auto;
}

.flip-back-title {
  font-size: 12px;
  color: var(--amber);
  margin-bottom: 10px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 8px;
}

.flip-back-line {
  font-size: 11.5px;
  color: var(--text-primary);
  line-height: 1.65;
  white-space: pre;
}

.flip-back-line.empty {
  height: 8px;
}

.about-hint {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
  margin-top: 24px;
}

@media (max-width: 767px) {
  .flip-card { height: 240px; }
  .about-heading { font-size: 30px; }
}

@media (prefers-reduced-motion: reduce) {
  .flip-card-inner { transition: none; }
}
`;

function FlipCard({ data }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Col md={4} sm={6} xs={12}>
      <div
        className={`flip-card${flipped ? ' flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        aria-label={`${data.title} — flip for details`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setFlipped((f) => !f);
        }}
      >
        <div className="flip-card-inner">
          <div className="flip-face flip-front">
            <span className="flip-label">{data.label}</span>
            <div>
              <div className="flip-front-title">{data.title}</div>
              <div className="flip-front-subtitle">{data.subtitle}</div>
              <div className="flip-front-data">{data.front}</div>
            </div>
          </div>
          <div className="flip-face flip-back">
            <div className="flip-back-title">{data.backTitle}</div>
            {data.backLines.map((line, i) => (
              <div
                key={i}
                className={`flip-back-line${line === '' ? ' empty' : ''}`}
              >
                {line || '\u00A0'}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Col>
  );
}

export default function About() {
  return (
    <div className="about-root">
      <style>{styles}</style>
      <Container>
        <div className="about-eyebrow">process status: active</div>
        <h1 className="about-heading">About</h1>
        <p className="about-sub">
          balsubbu2004@gmail.com · 8792026133 · Ballari, India — hover or tap a card to read the trace
        </p>
        <Row>
          {cardData.map((card) => (
            <FlipCard key={card.id} data={card} />
          ))}
        </Row>
        <p className="about-hint">hover (desktop) or tap (mobile) any card to flip it</p>
      </Container>
    </div>
  );
}