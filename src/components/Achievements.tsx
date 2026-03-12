import "./styles/Achievements.css";

const ACHIEVEMENTS = [
  {
    icon: "🏆", title: "CITD Technospark 2025", sub: "Winner",
    desc: "Won first place at the CITD Technospark competition organized at IARE. The project was evaluated on technical depth, real-world applicability, and presentation.",
    color: "var(--accent-amber)",
  },
  {
    icon: "🥉", title: "Codestorm-2K25 Hackathon", sub: "Third Prize",
    desc: "Placed third in Codestorm-2K25, a time-bound hackathon. Worked under pressure to design and present a working solution within the competition's deadline.",
    color: "var(--accent-cyan)",
  },
];

interface Cert {
  icon: string;
  title: string;
  issuer: string;
  date: string;
  skills?: string;
}

const CERTS: Cert[] = [
  {
    icon: "🔐", title: "Introduction to Cybersecurity",
    issuer: "Cisco", date: "Sep 2025",
    skills: "Network threats, attack types, basic security practices",
  },
  {
    icon: "🤖", title: "GenAI: Power Up LLMs with RAG",
    issuer: "CITD", date: "Sep 2025",
    skills: "Retrieval-Augmented Generation, LLM prompt engineering, vector stores",
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
          {CERTS.map(({ icon, title, issuer, date, skills }) => (
            <div className="ach-cert glass" key={title}>
              <span className="ach-cert-icon">{icon}</span>
              <div>
                <div className="ach-cert-title">{title}</div>
                <div className="ach-cert-meta">{issuer} · {date}</div>
                {skills && <div className="ach-cert-skills">{skills}</div>}
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
