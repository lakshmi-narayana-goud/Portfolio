import "./styles/TechStackFallback.css";

const TECHS = [
  { name: "Python",       color: "#3b82f6" },
  { name: "TensorFlow",   color: "#f97316" },
  { name: "OpenCV",       color: "#7c3aed" },
  { name: "YOLOv8",       color: "#06b6d4" },
  { name: "FastAPI",      color: "#10b981" },
  { name: "PostgreSQL",   color: "#1e40af" },
  { name: "Scikit-learn", color: "#f59e0b" },
  { name: "SHAP",         color: "#8b5cf6" },
  { name: "Java",         color: "#ef4444" },
  { name: "Bash",         color: "#64748b" },
  { name: "JavaScript",   color: "#eab308" },
  { name: "Supabase",     color: "#10b981" },
];

const TechStackFallback = () => (
  <div className="tsf-section section-container" id="techstack">
    <h2 className="tsf-title">
      My <span className="grad-text">Techstack</span>
    </h2>
    <div className="tsf-grid">
      {TECHS.map(({ name, color }, i) => (
        <div
          key={name}
          className="tsf-bubble glass"
          style={{
            "--bubble-color": color,
            animationDelay: `${i * 0.15}s`,
          } as React.CSSProperties}
        >
          <div className="tsf-bubble-dot" style={{ background: color }} />
          <span className="tsf-bubble-name">{name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default TechStackFallback;
