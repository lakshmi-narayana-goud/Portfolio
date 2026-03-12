import { useRef } from "react";
import "./styles/WhatIDo.css";

const CARDS = [
  {
    id: "ai",
    title: "AI & Machine Learning",
    sub: "Intelligent Systems Design",
    desc: "Building explainable AI systems, ML pipelines, and production-ready intelligent backends. From model training to deployment.",
    skills: ["TensorFlow", "Scikit-learn", "SHAP", "Python", "FastAPI", "Groq LLaMA"],
    color: "var(--accent-cyan)",
    gradient: "var(--grad-cp)",
    icon: "🧠",
  },
  {
    id: "cv",
    title: "Computer Vision",
    sub: "Real-Time Visual Intelligence",
    desc: "Gesture detection, object tracking, and real-time webcam inference using state-of-the-art computer vision models.",
    skills: ["OpenCV", "YOLOv8", "Python", "Real-Time Inference", "Webcam APIs"],
    color: "var(--accent-emerald)",
    gradient: "var(--grad-ec)",
    icon: "👁️",
  },
  {
    id: "fs",
    title: "Full Stack Systems",
    sub: "End-to-End Architecture",
    desc: "Designing and shipping complete systems from database to frontend — including JARVIS, a production-deployed AI assistant.",
    skills: ["FastAPI", "WebSockets", "PostgreSQL", "Supabase", "JavaScript", "HTML5 / CSS3"],
    color: "var(--accent-purple)",
    gradient: "var(--grad-ap)",
    icon: "⚡",
  },
];

const WhatIDo = () => {
  const activeRef = useRef<string | null>(null);

  const toggle = (id: string, el: HTMLDivElement) => {
    const isActive = activeRef.current === id;
    document.querySelectorAll(".wid-card").forEach((c) => {
      c.classList.remove("wid-active", "wid-sibling");
    });
    if (!isActive) {
      el.classList.add("wid-active");
      activeRef.current = id;
      document.querySelectorAll(".wid-card").forEach((c) => {
        if (c !== el) c.classList.add("wid-sibling");
      });
    } else {
      activeRef.current = null;
    }
  };

  return (
    <div className="wid-section section-container" id="whatido">
      <div className="wid-header">
        <h2 className="wid-title">
          <span>WHAT</span>
          <span className="grad-text"> I DO</span>
        </h2>
        <p className="wid-sub">Areas of expertise & active focus</p>
      </div>
      <div className="wid-grid">
        {CARDS.map(({ id, title, sub, desc, skills, color, gradient, icon }) => (
          <div
            className="wid-card glass"
            key={id}
            onClick={(e) => toggle(id, e.currentTarget as HTMLDivElement)}
            style={{ "--card-color": color, "--card-grad": gradient } as React.CSSProperties}
          >
            <div className="wid-card-glow"></div>
            <div className="wid-icon">{icon}</div>
            <div className="wid-card-body">
              <h3 className="wid-card-title">{title}</h3>
              <h4 className="wid-card-sub">{sub}</h4>
              <p className="wid-card-desc">{desc}</p>
              <div className="wid-tags">
                {skills.map((s) => (
                  <span key={s} className="wid-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="wid-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatIDo;
