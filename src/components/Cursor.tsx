import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current!;
    const dot = dotRef.current!;
    let hover = false;
    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.05 });
    };
    document.addEventListener("mousemove", onMouseMove);

    const loop = () => {
      if (!hover) {
        pos.x += (mouse.x - pos.x) / 7;
        pos.y += (mouse.y - pos.y) / 7;
        gsap.set(cursor, { x: pos.x, y: pos.y });
      }
      requestAnimationFrame(loop);
    };
    loop();

    document.querySelectorAll("[data-cursor]").forEach((el) => {
      const elem = el as HTMLElement;
      elem.addEventListener("mouseover", (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        if (elem.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.15 });
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (elem.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
        if (elem.dataset.cursor === "link") {
          cursor.classList.add("cursor-link");
        }
      });
      elem.addEventListener("mouseout", () => {
        cursor.classList.remove("cursor-disable", "cursor-icons", "cursor-link");
        hover = false;
      });
    });

    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      <div className="cursor-main" ref={cursorRef}></div>
      <div className="cursor-dot" ref={dotRef}></div>
    </>
  );
};

export default Cursor;
