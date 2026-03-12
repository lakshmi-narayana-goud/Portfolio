import { useEffect, useRef } from "react";
import "./styles/About.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "8.57", label: "CGPA / 10", suffix: "" },
  { value: "3",    label: "Major Projects", suffix: "+" },
  { value: "2",    label: "Hackathon Awards", suffix: "" },
  { value: "2025", label: "CITD Winner", suffix: "" },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-card", {
        scrollTrigger: { trigger: ".about-card", start: "top 80%" },
        y: 60, opacity: 0, duration: 1, ease: "power3.out",
      });
      gsap.from(".about-stat", {
        scrollTrigger: { trigger: ".about-stats", start: "top 80%" },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="about-section section-container" id="about" ref={sectionRef}>
      {/* Bio Card */}
      <div className="about-card glass">
        <div className="about-card-header">
          <span className="about-tag">ABOUT ME</span>
          <div className="about-dot-row">
            <div className="about-dot"></div>
            <div className="about-dot" style={{background:'var(--accent-purple)'}}></div>
            <div className="about-dot" style={{background:'var(--accent-emerald)'}}></div>
          </div>
        </div>
        <p className="about-bio">
          Computer Science undergraduate at IARE, Hyderabad — specializing in{" "}
          <span className="about-highlight">Artificial Intelligence</span>,{" "}
          <span className="about-highlight">Machine Learning</span>, and{" "}
          <span className="about-highlight">Computer Vision</span>. Builder of
          real-world AI systems including JARVIS — a production-deployed full-stack
          AI assistant with voice interaction, multilingual support, and cloud
          deployment. Passionate about making AI transparent, explainable, and
          genuinely useful.
        </p>
        <div className="about-meta">
          <span className="about-meta-item">
            <span className="about-meta-icon">📍</span> Hyderabad, India
          </span>
          <span className="about-meta-item">
            <span className="about-meta-icon">🎓</span> B.Tech CSE · Expected 2028
          </span>
          <span className="about-meta-item">
            <span className="about-meta-icon">⚡</span> Open to opportunities
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="about-stats">
        {STATS.map(({ value, label, suffix }) => (
          <div className="about-stat glass" key={label}>
            <div className="stat-value grad-text">{value}<span>{suffix}</span></div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
