import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import "./styles/SocialIcons.css";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => (
  <div className="icons-section">
    <div className="social-icons" data-cursor="icons" id="social">
      <span>
        <a href="https://github.com/suunyshu-sketch" target="_blank" rel="noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
      </span>
      <span>
        <a href="https://linkedin.com/in/lakshmi-narayana-goud" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <FaLinkedinIn />
        </a>
      </span>
      <span>
        <a href="https://x.com/ln_battini11" target="_blank" rel="noreferrer" aria-label="Twitter">
          <FaXTwitter />
        </a>
      </span>
    </div>
    <a className="resume-button" href="#" data-cursor="disable">
      <HoverLinks text="RESUME" />
      <span><TbNotes /></span>
    </a>
  </div>
);

export default SocialIcons;
