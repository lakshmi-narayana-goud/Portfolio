import { useState, useCallback } from "react";
import "./styles/Projects.css";
import { MdArrowBack, MdArrowForward, MdArrowOutward } from "react-icons/md";
import { FiGithub } from "react-icons/fi";
import ProjectDetail from "./ProjectDetail";

const PROJECTS = [
  {
    num: "01",
    title: "JARVIS",
    category: "Full-Stack AI Assistant",
    type: "Major Project",
    desc: "Production-deployed AI assistant with real-time WebSocket streaming, LLaMA 3.1 integration, voice I/O, multilingual support (EN/HI/TE), emotion detection, smart todos, JWT auth, and admin dashboard. Deployed on Render with Supabase PostgreSQL.",
    tools: ["Python", "FastAPI", "WebSockets", "PostgreSQL", "Supabase", "LLaMA 3.1", "Groq", "JavaScript", "Web Speech API"],
    scale: ["70+ files", "16 DB tables", "20+ API endpoints", "Cloud deployed"],
    github: "https://github.com/lakshmi-narayana-goud",
    live: "https://cloud-jarvis-p6zu.onrender.com/",
    gradient: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    accent: "#06b6d4",
    badge: "PRODUCTION",
    detailKey: "jarvis",
  },
  {
    num: "02",
    title: "XAI Finance Advisor",
    category: "Explainable AI · Machine Learning",
    type: "Major Project",
    desc: "ML-powered financial advisory system that combines Scikit-learn models with SHAP explainability to make every AI prediction transparent. Produces risk profiles, personalised investment recommendations, and human-readable explanations for each output.",
    tools: ["Python", "Scikit-learn", "SHAP", "Pandas", "NumPy", "Matplotlib"],
    scale: ["SHAP explanations per user", "6-stage ML pipeline", "3 risk categories", "12 financial features"],
    github: "https://github.com/lakshmi-narayana-goud",
    live: null,
    gradient: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    accent: "#8b5cf6",
    badge: "ML + XAI",
    detailKey: "xai",
  },
  {
    num: "03",
    title: "AirCanvas",
    category: "Computer Vision · Mini Project",
    type: "Mini Project",
    desc: "Gesture-controlled virtual drawing application using real-time YOLOv8 hand detection via webcam. Supports drawing, erasing, and canvas reset through natural hand gestures — no physical input device needed.",
    tools: ["Python", "OpenCV", "YOLOv8"],
    scale: ["Real-time inference", "Gesture detection", "Webcam input", "Zero touch"],
    github: "https://github.com/lakshmi-narayana-goud",
    live: null,
    gradient: "linear-gradient(135deg, #0b3d2e, #1a5c42, #0d4a35)",
    accent: "#10b981",
    badge: "CV · MINI",
    detailKey: null,
  },
];

const Projects = () => {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [detailKey, setDetailKey] = useState<string | null>(null);

  const goTo = useCallback((i: number) => {
    if (animating) return;
    setAnimating(true);
    setIdx(i);
    setTimeout(() => setAnimating(false), 500);
  }, [animating]);

  const prev = useCallback(() => goTo(idx === 0 ? PROJECTS.length - 1 : idx - 1), [idx, goTo]);
  const next = useCallback(() => goTo(idx === PROJECTS.length - 1 ? 0 : idx + 1), [idx, goTo]);

  const p = PROJECTS[idx];

  return (
    <>
      {detailKey && (
        <ProjectDetail projectKey={detailKey} onClose={() => setDetailKey(null)} />
      )}

      <div className="proj-section" id="projects">
        <div className="proj-container section-container">
          <div className="proj-header">
            <h2>My <span className="grad-text">Work</span></h2>
            <p className="proj-count">
              <span className="proj-count-current">{String(idx + 1).padStart(2, "0")}</span>
              <span className="proj-count-sep"> / </span>
              <span className="proj-count-total">{String(PROJECTS.length).padStart(2, "0")}</span>
            </p>
          </div>

          <div className="proj-card glass" key={idx}
            style={{ "--proj-accent": p.accent } as React.CSSProperties}>
            <div className="proj-card-bg" style={{ background: p.gradient }}></div>
            <div className="proj-card-body">
              <div className="proj-info">
                <div className="proj-num-badge">
                  <span className="proj-num">{p.num}</span>
                  <span className="proj-badge" style={{ background: `${p.accent}22`, border: `1px solid ${p.accent}44`, color: p.accent }}>
                    {p.badge}
                  </span>
                  <span className="proj-type-label" style={{ color: p.type === "Mini Project" ? "var(--text-dim)" : "var(--accent-emerald)" }}>
                    {p.type}
                  </span>
                </div>
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-category">{p.category}</p>
                <p className="proj-desc">{p.desc}</p>

                <div className="proj-scale">
                  {p.scale.map((s) => (
                    <span key={s} className="proj-scale-item">
                      <span className="proj-scale-dot" style={{ background: p.accent }}></span>
                      {s}
                    </span>
                  ))}
                </div>

                <div className="proj-tools">
                  {p.tools.slice(0, 6).map((t) => (
                    <span key={t} className="proj-tool">{t}</span>
                  ))}
                  {p.tools.length > 6 && <span className="proj-tool">+{p.tools.length - 6}</span>}
                </div>

                <div className="proj-links">
                  <a href={p.github} target="_blank" rel="noreferrer" className="proj-link glass" data-cursor="disable">
                    <FiGithub /> GitHub
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="proj-link proj-link-live glass" data-cursor="disable">
                      <MdArrowOutward /> Live Demo
                    </a>
                  )}
                  {p.detailKey && (
                    <button
                      className="proj-link proj-link-detail glass"
                      onClick={() => setDetailKey(p.detailKey)}
                      data-cursor="disable"
                      style={{ border: `1px solid ${p.accent}44`, color: p.accent }}
                    >
                      Full Details →
                    </button>
                  )}
                </div>
              </div>

              <div className="proj-visual" style={{ background: p.gradient }}>
                <div className="proj-visual-inner">
                  <div className="proj-visual-title" style={{ color: p.accent }}>{p.title}</div>
                  <div className="proj-visual-lines">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="proj-visual-line"
                        style={{ width: `${40 + i * 8}%`, opacity: 0.08 + i * 0.04, background: p.accent }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="proj-nav">
            <button className="proj-arrow glass" onClick={prev} aria-label="Previous" data-cursor="disable">
              <MdArrowBack />
            </button>
            <div className="proj-dots">
              {PROJECTS.map((pr, i) => (
                <button key={i}
                  className={`proj-dot ${i === idx ? "proj-dot-active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Project ${i + 1}`}
                  data-cursor="disable"
                  style={{ background: i === idx ? p.accent : undefined }}
                />
              ))}
            </div>
            <button className="proj-arrow glass" onClick={next} aria-label="Next" data-cursor="disable">
              <MdArrowForward />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
