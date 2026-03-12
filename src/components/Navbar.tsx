import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

interface NavbarProps {
  lenisRef: React.MutableRefObject<any>;
}

const Navbar = ({ lenisRef }: NavbarProps) => {
  useEffect(() => {
    const links = document.querySelectorAll(".header ul a[data-href]");
    links.forEach((el) => {
      const element = el as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        e.preventDefault();
        const target = element.getAttribute("data-href");
        if (target && lenisRef.current) {
          const section = document.querySelector(target);
          if (section) lenisRef.current.scrollTo(section, { offset: 0 });
        }
      });
    });
  }, [lenisRef]);

  return (
    <>
      <div className="header glass-nav">
        <a href="/#" className="navbar-title" data-cursor="disable">LN</a>
        <a href="mailto:ln.battini11@gmail.com" className="navbar-connect" data-cursor="disable">
          ln.battini11@gmail.com
        </a>
        <ul>
          {[
            { href: "#about", label: "ABOUT" },
            { href: "#projects", label: "WORK" },
            { href: "#contact", label: "CONTACT" },
          ].map(({ href, label }) => (
            <li key={label}>
              <a data-href={href} href={href}>
                <HoverLinks text={label} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* Ambient circles */}
      <div className="nav-orb nav-orb-1"></div>
      <div className="nav-orb nav-orb-2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
