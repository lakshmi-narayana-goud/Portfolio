import "./styles/Achievements.css";

const ACHIEVEMENTS = [
  {
    icon: "🏆", title: "CITD Technospark 2025", sub: "Winner",
    desc: "First place at the CITD Technospark competition, recognized for excellence in AI/ML innovation.",
    color: "var(--accent-amber)",
  },
  {
    icon: "🥉", title: "Codestorm-2K25 Hackathon", sub: "Third Prize",
    desc: "Placed third in a competitive hackathon showcasing full-stack development and problem-solving skills.",
    color: "var(--accent-cyan)",
  },
];

const CERTS = [
  {
    icon: "🔐", title: "Introduction to Cybersecurity",
    issuer: "Cisco", date: "Sep 2025",
  },
  {
    icon: "🤖", title: "GenAI: Power Up LLMs with RAG",
    issuer: "CITD", date: "Sep 2025",
  },
];

const CODING = [
  {
    platform: "LeetCode", icon: "⚡",
    stat: "9 solved", sub: "92.86% accuracy",
    color: "var(--accent-amber)",
    link: "#",
  },
  {
    platform: "GeeksforGeeks", icon: "🌿",
    stat: "25+ solved", sub: "Data Structures & Algorithms",
    color: "var(--accent-emerald)",
    link: "#",
  },
];

const Achievements = () => (
  <div className="ach-section section-container" id="achievements">
    <div className="ach-header">
      <h2>Achievements &amp; <span className="grad-text">Recognition</span></h2>
      <p>Awards, certifications &amp; coding activity</p>
    </div>

    {/* Hackathon wins */}
    <div className="ach-grid">
      {ACHIEVEMENTS.map(({ icon, title, sub, desc, color }) => (
        <div className="ach-card glass" key={title}
          style={{ "--ach-color": color } as React.CSSProperties}>
          <div className="ach-icon">{icon}</div>
          <div className="ach-card-body">
            <span className="ach-badge">{sub}</span>
            <h3 className="ach-card-title">{title}</h3>
            <p className="ach-card-desc">{desc}</p>
          </div>
          <div className="ach-glow"></div>
        </div>
      ))}
    </div>

    {/* Certifications + Coding */}
    <div className="ach-bottom">
      <div className="ach-certs">
        <h4 className="ach-sub-title">Certifications</h4>
        <div className="ach-cert-list">
          {CERTS.map(({ icon, title, issuer, date }) => (
            <div className="ach-cert glass" key={title}>
              <span className="ach-cert-icon">{icon}</span>
              <div>
                <div className="ach-cert-title">{title}</div>
                <div className="ach-cert-meta">{issuer} · {date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="ach-coding">
        <h4 className="ach-sub-title">Coding Profiles</h4>
        <div className="ach-coding-list">
          {CODING.map(({ platform, icon, stat, sub, color, link }) => (
            <a className="ach-coding-card glass" key={platform} href={link}
              style={{ "--ach-color": color } as React.CSSProperties}
              data-cursor="disable">
              <span className="ach-coding-icon">{icon}</span>
              <div className="ach-coding-body">
                <div className="ach-coding-platform">{platform}</div>
                <div className="ach-coding-stat">{stat}</div>
                <div className="ach-coding-sub">{sub}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Achievements;
