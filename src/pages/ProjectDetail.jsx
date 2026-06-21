import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@600;700&family=Open+Sans:wght@400;500;700&family=Poppins:wght@400;600&display=swap');

.detail-root {
  --blue-1: #4F6FE8;
  --ink: #1C2333;
  --muted: #5C6478;
  --surface: #FFFFFF;
  --bg-soft: #F4F6FB;
  --accent: #FF6B5B;
  font-family: 'Open Sans', sans-serif;
  background: var(--bg-soft);
  min-height: 100vh;
}

.detail-nav {
  background: white;
  padding: 18px 48px;
  border-bottom: 1px solid #E4E8F2;
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail-nav a {
  color: var(--blue-1);
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
}

.detail-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}

.detail-image {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: 18px;
  margin-bottom: 36px;
  box-shadow: 0 12px 32px rgba(28,35,51,0.10);
}

.detail-image-placeholder {
  width: 100%;
  height: 280px;
  border-radius: 18px;
  background: #E4E8F2;
  margin-bottom: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  font-size: 14px;
}

.detail-tag {
  display: inline-block;
  background: rgba(79, 111, 232, 0.1);
  color: var(--blue-1);
  border: 1px solid rgba(79, 111, 232, 0.25);
  border-radius: 20px;
  padding: 5px 14px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
}

.detail-title {
  font-family: 'Barlow', sans-serif;
  font-weight: 700;
  font-size: 38px;
  color: var(--ink);
  margin-bottom: 20px;
  line-height: 1.15;
}

.detail-description {
  font-size: 16px;
  line-height: 1.75;
  color: var(--muted);
  margin-bottom: 36px;
  white-space: pre-line;
}

.detail-btn-group {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.btn-detail {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 26px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;
}

.btn-detail:hover { opacity: 0.85; }

.btn-github {
  background: #1C2333;
  color: white;
}

.btn-live {
  background: var(--accent);
  color: white;
}

.btn-back {
  background: var(--bg-soft);
  color: var(--ink);
  border: 1.5px solid #D8DCE8;
}

.detail-loading {
  text-align: center;
  padding: 80px 24px;
  color: var(--muted);
  font-size: 16px;
}

.detail-error {
  text-align: center;
  padding: 80px 24px;
}

.detail-error h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  color: var(--ink);
  margin-bottom: 12px;
}

.detail-error p {
  color: var(--muted);
  margin-bottom: 24px;
}

@media (max-width: 640px) {
  .detail-nav { padding: 14px 20px; }
  .detail-title { font-size: 28px; }
}
`;

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get(`projects/${id}/`)
      .then((res) => {
        setProject(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="detail-root">
      <style>{styles}</style>

      <nav className="detail-nav">
        <Link to="/">← Back to Portfolio</Link>
      </nav>

      {loading && (
        <div className="detail-loading">Loading project...</div>
      )}

      {error && (
        <div className="detail-error">
          <h2>Project not found</h2>
          <p>This project does not exist or was removed.</p>
          <Link to="/" className="btn-detail btn-back">← Back to Portfolio</Link>
        </div>
      )}

      {project && (
        <div className="detail-inner">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="detail-image"
            />
          ) : (
            <div className="detail-image-placeholder">No image uploaded</div>
          )}

          <span className="detail-tag">{project.tech_stack}</span>
          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-description">{project.description}</p>

          <div className="detail-btn-group">
            <Link to="/" className="btn-detail btn-back">← Back</Link>
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="btn-detail btn-github"
              >
                View Code on GitHub
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="btn-detail btn-live"
              >
                View Live Site
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}