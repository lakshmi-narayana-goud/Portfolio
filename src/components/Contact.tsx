import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import "./styles/Contact.css";

const Contact = () => (
  <div className="contact-section section-container" id="contact">
    <div className="contact-inner glass">
      <div className="contact-top">
        <div className="contact-cta">
          <p className="contact-label">CONTACT</p>
          <h2 className="contact-heading">
            Let's build something<br />
            <span className="grad-text">intelligent</span> together.
          </h2>
          <a href="mailto:ln.battini11@gmail.com" className="contact-email-btn glass" data-cursor="disable">
            ln.battini11@gmail.com <MdArrowOutward />
          </a>
        </div>
        <div className="contact-links">
          <div className="contact-col">
            <p className="contact-col-title">FIND ME ON</p>
            {[
              { href: "https://github.com/suunyshu-sketch", label: "GitHub", icon: <FaGithub /> },
              { href: "https://linkedin.com/in/lakshmi-narayana-goud", label: "LinkedIn", icon: <FaLinkedinIn /> },
              { href: "https://x.com/ln_battini11", label: "Twitter / X", icon: <FaXTwitter /> },
            ].map(({ href, label, icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                className="contact-social" data-cursor="disable">
                <span className="contact-social-icon">{icon}</span>
                {label}
                <MdArrowOutward className="contact-arrow" />
              </a>
            ))}
          </div>
          <div className="contact-col">
            <p className="contact-col-title">EDUCATION</p>
            <p className="contact-info-line">B.Tech CSE</p>
            <p className="contact-info-line contact-info-dim">Institute of Aeronautical Engineering</p>
            <p className="contact-info-line contact-info-dim">CGPA: 8.57 / 10</p>
            <p className="contact-info-line contact-info-dim">Expected 2028</p>
          </div>
        </div>
      </div>
      <div className="contact-footer">
        <span>Designed &amp; developed by <span className="grad-text">Battini Lakshminarayana Goud</span></span>
        <span className="contact-copy"><MdCopyright /> 2025</span>
      </div>
    </div>
  </div>
);

export default Contact;
