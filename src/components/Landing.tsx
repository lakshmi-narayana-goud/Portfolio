import { useEffect, useRef, useState } from "react";
import "./styles/Landing.css";
import * as THREE from "three";
import { setProgress } from "./Loading";
import { useLoading } from "../context/LoadingProvider";
import { isWebGLSupported } from "./WebGLErrorBoundary";

const ROLES = ["AI Developer", "Computer Vision Engineer", "ML Systems Builder", "Full Stack Developer"];

const NeuralFallbackBg = () => (
  <div className="neural-fallback">
    {[...Array(12)].map((_, i) => (
      <div key={i} className="nf-node" style={{
        left: `${10 + (i % 4) * 26}%`,
        top: `${15 + Math.floor(i / 4) * 33}%`,
        animationDelay: `${i * 0.3}s`,
        "--nf-color": i % 3 === 0 ? "var(--accent-cyan)" : i % 3 === 1 ? "var(--accent-purple)" : "var(--accent-emerald)",
      } as React.CSSProperties} />
    ))}
    <svg className="nf-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      <line x1="10" y1="15" x2="36" y2="15" stroke="rgba(6,182,212,0.12)" strokeWidth="0.3"/>
      <line x1="36" y1="15" x2="62" y2="48" stroke="rgba(139,92,246,0.12)" strokeWidth="0.3"/>
      <line x1="62" y1="48" x2="88" y2="15" stroke="rgba(6,182,212,0.12)" strokeWidth="0.3"/>
      <line x1="10" y1="48" x2="36" y2="48" stroke="rgba(139,92,246,0.10)" strokeWidth="0.3"/>
      <line x1="10" y1="81" x2="62" y2="48" stroke="rgba(16,185,129,0.10)" strokeWidth="0.3"/>
      <line x1="36" y1="81" x2="88" y2="81" stroke="rgba(6,182,212,0.10)" strokeWidth="0.3"/>
      <line x1="62" y1="81" x2="88" y2="48" stroke="rgba(139,92,246,0.12)" strokeWidth="0.3"/>
    </svg>
  </div>
);

const Landing = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const { setLoading } = useLoading();
  const [webglOk] = useState(() => isWebGLSupported());

  useEffect(() => {
    const prog = setProgress((v) => setLoading(v));
    prog.clear();
  }, [setLoading]);

  useEffect(() => {
    let roleIdx = 0, charIdx = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const el = roleRef.current;
    if (!el) return;
    const tick = () => {
      const current = ROLES[roleIdx];
      if (deleting) {
        charIdx--;
        el.textContent = current.slice(0, charIdx);
        if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % ROLES.length; timer = setTimeout(tick, 400); return; }
        timer = setTimeout(tick, 40);
      } else {
        charIdx++;
        el.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) { deleting = true; timer = setTimeout(tick, 1800); return; }
        timer = setTimeout(tick, 80);
      }
    };
    timer = setTimeout(tick, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!webglOk) return;
    const container = canvasRef.current;
    if (!container) return;
    let animId: number;
    try {
      const W = container.offsetWidth, H = container.offsetHeight;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
      camera.position.set(0, 0, 18);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const nodeCount = 28;
      const nodeData: { mesh: THREE.Mesh; ox: number; oy: number; phase: number }[] = [];
      const nodeGeo = new THREE.SphereGeometry(0.12, 12, 12);
      for (let i = 0; i < nodeCount; i++) {
        const color = Math.random() > 0.4 ? 0x06b6d4 : 0x8b5cf6;
        const mat = new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.7, transparent: true, opacity: 0.9 });
        const mesh = new THREE.Mesh(nodeGeo, mat);
        const x = (Math.random() - 0.5) * 18, y = (Math.random() - 0.5) * 11, z = (Math.random() - 0.5) * 4;
        mesh.position.set(x, y, z);
        scene.add(mesh);
        nodeData.push({ mesh, ox: x, oy: y, phase: Math.random() * Math.PI * 2 });
      }

      const connections: { line: THREE.Line; ia: number; ib: number }[] = [];
      for (let i = 0; i < nodeData.length; i++) {
        for (let j = i + 1; j < nodeData.length; j++) {
          const da = nodeData[i].mesh.position, db = nodeData[j].mesh.position;
          if (da.distanceTo(db) < 5.5) {
            const geo = new THREE.BufferGeometry().setFromPoints([da.clone(), db.clone()]);
            const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.12 }));
            scene.add(line);
            connections.push({ line, ia: i, ib: j });
          }
        }
      }

      scene.add(new THREE.AmbientLight(0xffffff, 0.4));
      const cL = new THREE.PointLight(0x06b6d4, 3, 30); cL.position.set(-6, 4, 6); scene.add(cL);
      const pL = new THREE.PointLight(0x8b5cf6, 3, 30); pL.position.set(6, -4, 6); scene.add(pL);

      let mx = 0, my = 0;
      const onMouse = (e: MouseEvent) => { mx = (e.clientX / window.innerWidth - 0.5) * 2; my = -(e.clientY / window.innerHeight - 0.5) * 2; };
      document.addEventListener("mousemove", onMouse);

      const clock = new THREE.Clock();
      const animate = () => {
        animId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        nodeData.forEach(({ mesh, ox, oy, phase }) => {
          mesh.position.x = ox + Math.sin(t * 0.25 + phase) * 0.4;
          mesh.position.y = oy + Math.cos(t * 0.2 + phase) * 0.35;
        });
        connections.forEach(({ line, ia, ib }) => {
          const pa = nodeData[ia].mesh.position, pb = nodeData[ib].mesh.position;
          line.geometry.setFromPoints([pa, pb]);
          const dist = pa.distanceTo(pb);
          (line.material as THREE.LineBasicMaterial).opacity = Math.max(0, (5.5 - dist) / 5.5) * 0.25 * (0.5 + 0.5 * Math.sin(t * 1.2 + ia));
        });
        camera.position.x += (mx * 2.5 - camera.position.x) * 0.025;
        camera.position.y += (my * 1.5 - camera.position.y) * 0.025;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => { const w = container.offsetWidth, h = container.offsetHeight; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); };
      window.addEventListener("resize", onResize);

      return () => {
        cancelAnimationFrame(animId);
        document.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    } catch { /* WebGL unavailable */ }
  }, [webglOk]);

  return (
    <div className="landing-section" id="landingDiv">
      {webglOk ? <div className="neural-canvas" ref={canvasRef} /> : <NeuralFallbackBg />}
      <div className="landing-scanlines" />

      <div className="landing-container">
        {/* Left: name — fixed to never truncate */}
        <div className="landing-intro">
          <p className="landing-hello">Hello, I'm</p>
          <h1 className="landing-name">
            <span className="landing-name-first">BATTINI</span>
            <span className="landing-name-last grad-text">LAKSHMINARAYANA</span>
            <span className="landing-name-goud">GOUD</span>
          </h1>
        </div>

        {/* Right: role + tags */}
        <div className="landing-info">
          <p className="landing-role-label">A</p>
          <div className="landing-role-wrap">
            <span className="landing-role" ref={roleRef} />
            <span className="landing-cursor-blink">|</span>
          </div>
          <div className="landing-tags">
            {["Python", "TensorFlow", "OpenCV", "YOLOv8", "FastAPI"].map((t) => (
              <span key={t} className="landing-tag">{t}</span>
            ))}
          </div>
          <div className="landing-badge glass">
            <span className="badge-dot" />
            B.Tech CSE · IARE · 8.57 CGPA
          </div>
        </div>
      </div>

      <div className="landing-scroll">
        <span>SCROLL</span>
        <div className="scroll-line"><div className="scroll-ball" /></div>
      </div>
    </div>
  );
};

export default Landing;
