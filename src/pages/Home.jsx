import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@600;700&family=Open+Sans:wght@400;500;700&family=Poppins:wght@400;600&display=swap');

.home-root {
  --blue-1: #4F6FE8;
  --blue-2: #6E8BFA;
  --ink: #1C2333;
  --muted: #5C6478;
  --surface: #FFFFFF;
  --bg-soft: #F4F6FB;
  --accent: #FF6B5B;
  font-family: 'Open Sans', sans-serif;
  color: var(--ink);
  background: var(--bg-soft);
  overflow-x: hidden;
}

.home-root h1, .home-root h2, .home-root h3 {
  font-family: 'Poppins', sans-serif;
}

/* ---------- NAVBAR ---------- */
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 48px;
  background: transparent;
  position: relative;
  z-index: 10;
}

.site-logo {
  font-family: 'Barlow', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: var(--ink);
  letter-spacing: 0.03em;
}

.site-nav {
  display: flex;
  gap: 32px;
  align-items: center;
}

.site-nav a {
  color: var(--ink);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}

.site-nav a:hover { color: var(--blue-1); }

.nav-cta {
  background: var(--accent);
  color: white !important;
  padding: 10px 22px;
  border-radius: 30px;
  font-weight: 600;
}

/* ---------- HERO ---------- */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, var(--blue-1) 0%, var(--blue-2) 100%);
  padding: 60px 48px 100px;
  overflow: hidden;
}

.hero-grid {
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;
}

.hero-eyebrow {
  color: rgba(255,255,255,0.85);
  font-size: 16px;
  margin-bottom: 6px;
}

.hero-name {
  font-family: 'Barlow', sans-serif;
  font-weight: 700;
  font-size: 52px;
  line-height: 1.08;
  color: white;
  margin: 0 0 16px;
}

.hero-role {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: rgba(255,255,255,0.95);
  margin-bottom: 18px;
}

.hero-tagline {
  color: rgba(255,255,255,0.85);
  font-size: 16px;
  line-height: 1.6;
  max-width: 460px;
  margin-bottom: 32px;
}

.hero-btn-group { display: flex; gap: 16px; flex-wrap: wrap; }

.btn-pill {
  display: inline-block;
  padding: 13px 28px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
  border: none;
}

.btn-pill-primary {
  background: var(--accent);
  color: white;
}
.btn-pill-primary:hover { background: #ff5645; color: white; }

.btn-pill-outline {
  background: transparent;
  color: white;
  border: 1.5px solid rgba(255,255,255,0.6);
}
.btn-pill-outline:hover { background: rgba(255,255,255,0.12); color: white; }

.hero-image-wrap {
  position: relative;
  display: flex;
  justify-content: center;
}

.hero-image {
  width: 100%;
  max-width: 360px;
  aspect-ratio: 4/5;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 30px 60px rgba(20, 30, 70, 0.35);
}

.hero-placeholder {
  width: 100%;
  max-width: 360px;
  aspect-ratio: 4/5;
  border-radius: 24px;
  background: rgba(255,255,255,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.7);
  font-size: 14px;
  text-align: center;
  padding: 24px;
}

/* ---------- SECTION SHARED ---------- */
.section { padding: 90px 48px; }
.section-inner { max-width: 1180px; margin: 0 auto; }

.section-subtitle {
  color: var(--blue-1);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.section-title {
  font-weight: 600;
  font-size: 32px;
  margin-bottom: 16px;
  color: var(--ink);
}

.section-text {
  color: var(--muted);
  font-size: 16px;
  line-height: 1.7;
  max-width: 600px;
}

/* ---------- ABOUT ---------- */
.about-section { background: var(--surface); }
.about-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 56px;
  align-items: center;
}

.about-image {
  width: 100%;
  border-radius: 20px;
  object-fit: cover;
  aspect-ratio: 4/3.3;
}

/* ---------- SOCIAL LINKS ---------- */
.social-links {
  display: flex;
  align-items: center;
  gap: 14px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(79, 111, 232, 0.08);
  border: 1.5px solid rgba(79, 111, 232, 0.2);
  color: var(--blue-1);
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}

.social-link:hover {
  background: var(--blue-1);
  border-color: var(--blue-1);
  color: white;
  transform: translateY(-2px);
}

.social-link svg { width: 16px; height: 16px; fill: currentColor; }

.site-footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1180px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 12px;
}

.footer-social { display: flex; gap: 12px; }

.footer-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(92, 100, 120, 0.1);
  color: var(--muted);
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}

.footer-social-link:hover { background: var(--blue-1); color: white; }
.footer-social-link svg { width: 15px; height: 15px; fill: currentColor; }

.about-image-placeholder {
  width: 100%;
  border-radius: 20px;
  aspect-ratio: 4/3.3;
  background: var(--bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  font-size: 14px;
}

/* ---------- EDUCATION ---------- */
.education-section {
  background: linear-gradient(135deg, #1C2333 0%, #2A3350 100%);
}

.education-section .section-subtitle {
  color: #58A6FF;
}

.education-section .section-title {
  color: white;
}

.education-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 40px;
}

.education-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 28px;
  position: relative;
  overflow: hidden;
  transition: transform 0.25s ease, background 0.25s ease;
}

.education-card:hover {
  transform: translateY(-4px);
  background: rgba(255,255,255,0.08);
}

.education-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #4F6FE8, #6E8BFA);
}

.education-card-year {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #58A6FF;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.education-card-year::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #58A6FF;
  box-shadow: 0 0 8px #58A6FF;
}

.education-card-degree {
  font-weight: 600;
  font-size: 16px;
  color: white;
  margin-bottom: 8px;
  line-height: 1.4;
}

.education-card-institution {
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  margin-bottom: 16px;
  line-height: 1.5;
}

.education-card-score {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(79, 111, 232, 0.2);
  border: 1px solid rgba(79, 111, 232, 0.4);
  color: #8FB4FF;
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 13px;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
}

/* ---------- SKILLS ---------- */
.skills-list { list-style: none; padding: 0; margin: 32px 0 0; max-width: 640px; }
.skill-item { margin-bottom: 22px; }
.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 15px;
}
.skill-track {
  height: 8px;
  background: #E4E8F2;
  border-radius: 6px;
  overflow: hidden;
}
.skill-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--blue-1), var(--blue-2));
  border-radius: 6px;
  transition: width 1s ease;
}

/* ---------- LEETCODE ---------- */
.leetcode-card {
  background: linear-gradient(135deg, #1C2333 0%, #2A3350 100%);
  border-radius: 20px;
  padding: 28px 36px 36px;
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  margin-top: 36px;
  max-width: 700px;
}
.leetcode-card-header {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #FFA116;
  font-weight: 600;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 14px;
  margin-bottom: 4px;
}
.leetcode-card-header a {
  color: #FFA116;
  text-decoration: none;
  margin-left: auto;
  font-size: 12px;
  opacity: 0.8;
}
.leetcode-card-header a:hover { opacity: 1; }
.leetcode-stat { text-align: center; }
.leetcode-stat-value {
  font-family: 'Barlow', sans-serif;
  font-size: 30px;
  font-weight: 700;
  color: #FFA116;
}
.leetcode-stat-label {
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  margin-top: 4px;
}
.leetcode-loading, .leetcode-error {
  color: var(--muted);
  font-size: 14px;
  margin-top: 24px;
}

/* ---------- PORTFOLIO ---------- */
.portfolio-section { background: var(--bg-soft); }
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-top: 40px;
}

.portfolio-card {
  background: var(--surface);
  border-radius: 18px;
  overflow: hidden;
  text-decoration: none;
  display: block;
  box-shadow: 0 8px 24px rgba(28, 35, 51, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.portfolio-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 36px rgba(28, 35, 51, 0.12);
}

.portfolio-card-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  background: var(--bg-soft);
}

.portfolio-card-body { padding: 22px; }

.portfolio-card-tag {
  color: var(--blue-1);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
}

.portfolio-card-title {
  font-weight: 600;
  font-size: 18px;
  color: var(--ink);
  margin-bottom: 12px;
}

.portfolio-card-link {
  color: var(--accent);
  font-weight: 600;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.portfolio-empty {
  color: var(--muted);
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px 0;
}

/* ---------- CONTACT ---------- */
.contact-section { background: var(--surface); }
.contact-card {
  background: var(--bg-soft);
  border-radius: 24px;
  padding: 48px;
}
.contact-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin-top: 24px;
}

.contact-form { display: flex; flex-direction: column; gap: 16px; }
.contact-input {
  padding: 14px 18px;
  border-radius: 10px;
  border: 1px solid #D8DCE8;
  font-family: 'Open Sans', sans-serif;
  font-size: 15px;
  background: white;
}
.contact-input:focus { outline: 2px solid var(--blue-1); }
textarea.contact-input { min-height: 120px; resize: vertical; }

.btn-submit {
  padding: 14px 18px;
  border-radius: 10px;
  border: none;
  background: var(--blue-1);
  color: white;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  align-self: flex-start;
  padding-left: 28px;
  padding-right: 28px;
}
.btn-submit:hover { background: #3f5cd6; }
.btn-submit:disabled { background: #9FB0E8; cursor: not-allowed; }

.contact-info-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 20px; }
.contact-info-item { display: flex; gap: 14px; align-items: flex-start; }
.contact-info-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--blue-1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}
.contact-info-title { font-weight: 600; font-size: 14px; margin-bottom: 2px; }
.contact-info-value { color: var(--muted); font-size: 14px; text-decoration: none; }
.contact-info-value a { color: var(--muted); text-decoration: none; }

.form-status { font-size: 14px; margin-top: 4px; }
.form-status.success { color: #1F9D55; }
.form-status.error { color: #D64545; }

/* ---------- FOOTER ---------- */
.site-footer {
  text-align: center;
  padding: 28px;
  color: var(--muted);
  font-size: 14px;
  background: var(--bg-soft);
}

/* ---------- RESPONSIVE ---------- */
@media (max-width: 900px) {
  .hero-grid, .about-grid, .contact-grid { grid-template-columns: 1fr; }
  .hero-image-wrap { order: -1; }
  .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
  .leetcode-card { grid-template-columns: 1fr 1fr; }
  .education-cards { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .site-header { padding: 18px 24px; flex-wrap: wrap; gap: 12px; }
  .site-nav { gap: 16px; flex-wrap: wrap; font-size: 14px; }
  .hero-section, .section { padding-left: 24px; padding-right: 24px; }
  .hero-name { font-size: 36px; }
  .portfolio-grid { grid-template-columns: 1fr; }
  .leetcode-card { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .skill-fill { transition: none; }
  .portfolio-card { transition: none; }
}
`;

function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    api.get(endpoint)
      .then((res) => { if (active) { setData(res.data); setLoading(false); } })
      .catch((err) => { if (active) { setError(err); setLoading(false); } });
    return () => { active = false; };
  }, [endpoint]);

  return { data, loading, error };
}

function LeetCodeStats({ username }) {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!username) { setStatus('error'); return; }
    fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.solvedProblem === undefined) { setStatus('error'); return; }
        setStats(data);
        setStatus('ok');
      })
      .catch(() => setStatus('error'));
  }, [username]);

  if (!username) return null;
  if (status === 'loading') return <p className="leetcode-loading">Loading LeetCode stats…</p>;
  if (status === 'error') return <p className="leetcode-error">Couldn't load LeetCode stats right now.</p>;

  return (
    <div className="leetcode-card">
      <div className="leetcode-card-header">
        <span>⚡</span>
        <span>LeetCode Stats</span>
        <a href="https://leetcode.com/u/S_BALASUBRAMANYAM/" target="_blank" rel="noreferrer">View Profile →</a>
      </div>
      <div className="leetcode-stat">
        <div className="leetcode-stat-value">{stats.solvedProblem}</div>
        <div className="leetcode-stat-label">Problems solved</div>
      </div>
      <div className="leetcode-stat">
        <div className="leetcode-stat-value">{stats.easySolved}</div>
        <div className="leetcode-stat-label">Easy</div>
      </div>
      <div className="leetcode-stat">
        <div className="leetcode-stat-value">{stats.mediumSolved}</div>
        <div className="leetcode-stat-label">Medium</div>
      </div>
    </div>
  );
}

export default function Home() {
  const { data: heroList } = useFetch('hero/');
  const { data: aboutList } = useFetch('about/');
  const { data: skills } = useFetch('skills/');
  const { data: projects } = useFetch('projects/');

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const hero = heroList && heroList.length > 0 ? heroList[0] : null;
  const about = aboutList && aboutList.length > 0 ? aboutList[0] : null;

  // Set this to your LeetCode username to show live stats, or leave as null to hide the section
  const leetcodeUsername = 'S_BALASUBRAMANYAM';

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormStatus(null);
    api.post('contact/', form)
      .then(() => {
        setFormStatus('success');
        setForm({ name: '', email: '', message: '' });
      })
      .catch(() => setFormStatus('error'))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="home-root">
      <style>{styles}</style>

      <header className="site-header">
        <div className="site-logo">{hero ? hero.name.toUpperCase() : 'PORTFOLIO'}</div>
        <nav className="site-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#education">Education</a>
          <a href="#portfolio">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
          <div className="social-links">
            <a href="https://github.com/balsubbu2004" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/bala-subramanyam-s" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
          {hero && hero.resume_url ? (
            <a href={hero.resume_url} target="_blank" rel="noreferrer" className="nav-cta">Resume</a>
          ) : (
            <span className="nav-cta" style={{opacity: 0.5, cursor: 'default'}}>Resume</span>
          )}
        </nav>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-grid">
          <div>
            <p className="hero-eyebrow">Hi, I'm</p>
            <h1 className="hero-name">{hero ? hero.name : 'S Bala Subramanyam'}</h1>
            <p className="hero-role">{hero ? hero.title : 'Software Engineer — Systems & Full-Stack'}</p>
            <p className="hero-tagline">
              {hero ? hero.tagline : 'ISE graduate debugging real network protocols at Alcatel-Lucent Enterprise, now building full-stack projects with React, Django, and PostgreSQL.'}
            </p>
            <div className="hero-btn-group">
              <a href="#contact" className="btn-pill btn-pill-primary">Get in Touch</a>
              <a href="#about" className="btn-pill btn-pill-outline">About Me</a>
            </div>
          </div>
          <div className="hero-image-wrap">
            {hero && hero.hero_image ? (
              <img src={hero.hero_image} alt={hero.name} className="hero-image" />
            ) : (
              <div className="hero-placeholder">Add a hero image in Django admin</div>
            )}
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="section-inner about-grid">
          {about && about.about_image ? (
            <img src={about.about_image} alt={about.heading} className="about-image" />
          ) : (
            <div className="about-image-placeholder">Add an about image in Django admin</div>
          )}
          <div>
            <p className="section-subtitle">{about ? about.subtitle : "I'm a Developer"}</p>
            <h2 className="section-title">{about ? about.heading : 'I build software that solves real problems'}</h2>
            <p className="section-text">
              {about ? about.description : 'Add your about content in Django admin — this text updates automatically once you do.'}
            </p>

            {leetcodeUsername && <LeetCodeStats username={leetcodeUsername} />}
          </div>
        </div>
      </section>

      <section className="section education-section" id="education">
        <div className="section-inner">
          <p className="section-subtitle">Academic Background</p>
          <h2 className="section-title">Education</h2>
          <div className="education-cards">

            <div className="education-card">
              <div className="education-card-year">2022 – 2026</div>
              <div className="education-card-degree">B.E. — Information Science & Engineering</div>
              <div className="education-card-institution">Rao Bahadur Y. Mahabaleswarappa Engineering College, Ballari</div>
              <span className="education-card-score">🎓 85.17%</span>
            </div>

            <div className="education-card">
              <div className="education-card-year">2020 – 2022</div>
              <div className="education-card-degree">Pre-University (PUC)</div>
              <div className="education-card-institution">Satyam PU College, Ballari</div>
              <span className="education-card-score">🎓 77.66%</span>
            </div>

            <div className="education-card">
              <div className="education-card-year">2019 – 2020</div>
              <div className="education-card-degree">SSLC</div>
              <div className="education-card-institution">Vivekananda High School</div>
              <span className="education-card-score">🎓 88.32%</span>
            </div>

          </div>
        </div>
      </section>

      <section className="section" id="skills">
        <div className="section-inner">
          <p className="section-subtitle">My Skills</p>
          <h2 className="section-title">Tools & technologies I work with</h2>
          <ul className="skills-list">
            {skills && skills.length > 0 ? (
              skills.map((skill) => (
                <li className="skill-item" key={skill.id}>
                  <div className="skill-header">
                    <span>{skill.name}</span>
                    <span>{skill.proficiency}%</span>
                  </div>
                  <div className="skill-track">
                    <div className="skill-fill" style={{ width: `${skill.proficiency}%` }} />
                  </div>
                </li>
              ))
            ) : (
              <p className="section-text">Add skills in Django admin to show progress bars here.</p>
            )}
          </ul>
        </div>
      </section>

      <section className="section portfolio-section" id="portfolio">
        <div className="section-inner">
          <p className="section-subtitle">Projects</p>
          <h2 className="section-title">Projects I've built</h2>
          <p className="section-text">A few things I've shipped — click through for details, code, and a live look.</p>
          <div className="portfolio-grid">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <Link to={`/projects/${project.id}`} className="portfolio-card" key={project.id}>
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="portfolio-card-image" />
                  ) : (
                    <div className="portfolio-card-image" />
                  )}
                  <div className="portfolio-card-body">
                    <span className="portfolio-card-tag">{project.tech_stack}</span>
                    <h3 className="portfolio-card-title">{project.title}</h3>
                    <span className="portfolio-card-link">View Project →</span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="portfolio-empty">Add projects in Django admin to see them here.</p>
            )}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="section-inner">
          <div className="contact-card">
            <p className="section-subtitle">Don't be shy</p>
            <h2 className="section-title">Drop me a line</h2>
            <div className="contact-grid">
              <form className="contact-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="contact-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="contact-input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <textarea
                  placeholder="Message"
                  required
                  className="contact-input"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Submit Message'}
                </button>
                {formStatus === 'success' && <p className="form-status success">Message sent — thank you!</p>}
                {formStatus === 'error' && <p className="form-status error">Something went wrong. Please try again.</p>}
              </form>

              <ul className="contact-info-list">
                <li className="contact-info-item">
                  <div className="contact-info-icon">@</div>
                  <div>
                    <div className="contact-info-title">Email</div>
                    <a href="mailto:balsubbu2004@gmail.com" className="contact-info-value">balsubbu2004@gmail.com</a>
                  </div>
                </li>
                <li className="contact-info-item">
                  <div className="contact-info-icon">#</div>
                  <div>
                    <div className="contact-info-title">Phone</div>
                    <a href="tel:+918792026133" className="contact-info-value">+91 8792026133</a>
                  </div>
                </li>
                <li className="contact-info-item">
                  <div className="contact-info-icon">·</div>
                  <div>
                    <div className="contact-info-title">Location</div>
                    <div className="contact-info-value">Ballari, India</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <p style={{margin:0}}>&copy; 2026 {hero ? hero.name : 'S Bala Subramanyam'}. All rights reserved.</p>
          <div className="footer-social">
            <a href="https://github.com/balsubbu2004" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="GitHub">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/bala-subramanyam-s" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}