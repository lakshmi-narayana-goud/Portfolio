import { useEffect, useRef } from "react";
import "./styles/Education.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const EDU = [
  {
    degree: "B.Tech in Computer Science",
    institution: "Institute of Aeronautical Engineering",
    location: "Hyderabad",
    year: "2024 – 2028",
    detail: "CGPA: 8.57 / 10",
    tags: ["AI/ML", "Computer Vision", "DSA", "OOP"],
    color: "var(--accent-cyan)",
  },
  {
    degree: "Intermediate (MPC)",
    institution: "Narayana Junior College",
    location: "Hyderabad",
    year: "2022",
    detail: "Score: 89.4%",
    tags: ["Mathematics", "Physics", "Chemistry"],
    color: "var(--accent-purple)",
  },
  {
    degree: "Secondary School (SSC)",
    institution: "Kanya Gurukul High School",
    location: "Hyderabad",
    year: "2020",
    detail: "Score: 85%",
    tags: ["Foundation", "Mathematics", "Science"],
    color: "var(--accent-emerald)",
  },
];

const Education = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scrollTrigger: { trigger: ".edu-section", start: "top 70%", end: "bottom 60%", scrub: 1 },
        scaleY: 0, transformOrigin: "top center",
      });
      gsap.from(".edu-box", {
        scrollTrigger: { trigger: ".edu-timeline", start: "top 80%" },
        x: -40, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="edu-section section-container" id="education">
      <div className="edu-header">
        <h2>My <span className="grad-text">Education</span></h2>
        <p>Academic journey & background</p>
      </div>
      <div className="edu-timeline">
        <div className="edu-line" ref={lineRef}>
          <div className="edu-line-dot"></div>
        </div>
        <div className="edu-boxes">
          {EDU.map(({ degree, institution, location, year, detail, tags, color }) => (
            <div className="edu-box glass" key={degree}
              style={{ "--edu-color": color } as React.CSSProperties}>
              <div className="edu-box-left">
                <h4 className="edu-degree">{degree}</h4>
                <h5 className="edu-inst">{institution}</h5>
                <p className="edu-location">{location}</p>
                <div className="edu-tags">
                  {tags.map((t) => <span key={t} className="edu-tag">{t}</span>)}
                </div>
              </div>
              <div className="edu-box-right">
                <div className="edu-year">{year}</div>
                <div className="edu-detail">{detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
