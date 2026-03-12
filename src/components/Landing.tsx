import { useEffect, useRef } from "react";
import "./styles/Landing.css";
import * as THREE from "three";
import { setProgress } from "./Loading";
import { useLoading } from "../context/LoadingProvider";

const ROLES = ["AI Developer", "Computer Vision Engineer", "ML Systems Builder", "Full Stack Developer"];

const Landing = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const { setLoading } = useLoading();

  /* ── Typewriter for roles ── */
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

  /* ── Three.js Neural Network ── */
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const W = container.offsetWidth, H = container.offsetHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    /* Nodes */
    const nodeCount = 28;
    const nodeData: { mesh: THREE.Mesh; ox: number; oy: number; phase: number }[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.12, 12, 12);

    for (let i = 0; i < nodeCount; i++) {
      const isCyan = Math.random() > 0.4;
      const color = isCyan ? 0x06b6d4 : 0x8b5cf6;
      const mat = new THREE.MeshPhongMaterial({
        color, emissive: color, emissiveIntensity: 0.7,
        transparent: true, opacity: 0.9,
      });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      const x = (Math.random() - 0.5) * 18;
      const y = (Math.random() - 0.5) * 11;
      const z = (Math.random() - 0.5) * 4;
      mesh.position.set(x, y, z);
      scene.add(mesh);
      nodeData.push({ mesh, ox: x, oy: y, phase: Math.random() * Math.PI * 2 });
    }

    /* Connections */
    const connections: { line: THREE.Line; ia: number; ib: number }[] = [];
    for (let i = 0; i < nodeData.length; i++) {
      for (let j = i + 1; j < nodeData.length; j++) {
        const da = nodeData[i].mesh.position;
        const db = nodeData[j].mesh.position;
        const dist = da.distanceTo(db);
        if (dist < 5.5) {
          const geo = new THREE.BufferGeometry().setFromPoints([da.clone(), db.clone()]);
          const mat = new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.12 });
          const line = new THREE.Line(geo, mat);
          scene.add(line);
          connections.push({ line, ia: i, ib: j });
        }
      }
    }

    /* Lights */
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const cyanLight = new THREE.PointLight(0x06b6d4, 3, 30);
    cyanLight.position.set(-6, 4, 6); scene.add(cyanLight);
    const purpleLight = new THREE.PointLight(0x8b5cf6, 3, 30);
    purpleLight.position.set(6, -4, 6); scene.add(purpleLight);

    /* Mouse parallax */
    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    document.addEventListener("mousemove", onMouse);

    /* Loading progress */
    const prog = setProgress((v) => setLoading(v));
    prog.clear(); // Complete instantly for now since there's no 3D model to load

    /* Animation */
    const clock = new THREE.Clock();
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      nodeData.forEach(({ mesh, ox, oy, phase }) => {
        mesh.position.x = ox + Math.sin(t * 0.25 + phase) * 0.4;
        mesh.position.y = oy + Math.cos(t * 0.2 + phase) * 0.35;
      });

      connections.forEach(({ line, ia, ib }) => {
        const pa = nodeData[ia].mesh.position;
        const pb = nodeData[ib].mesh.position;
        line.geometry.setFromPoints([pa, pb]);
        const dist = pa.distanceTo(pb);
        const mat = line.material as THREE.LineBasicMaterial;
        mat.opacity = Math.max(0, (5.5 - dist) / 5.5) * 0.25 * (0.5 + 0.5 * Math.sin(t * 1.2 + ia));
      });

      camera.position.x += (mx * 2.5 - camera.position.x) * 0.025;
      camera.position.y += (my * 1.5 - camera.position.y) * 0.025;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    /* Resize */
    const onResize = () => {
      const w = container.offsetWidth, h = container.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement))
        container.removeChild(renderer.domElement);
    };
  }, [setLoading]);

  return (
    <div className="landing-section" id="landingDiv">
      {/* Neural network canvas */}
      <div className="neural-canvas" ref={canvasRef}></div>

      {/* Scan line overlay */}
      <div className="landing-scanlines"></div>

      <div className="landing-container">
        {/* Left: name */}
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
            <span className="landing-role" ref={roleRef}></span>
            <span className="landing-cursor-blink">|</span>
          </div>
          <div className="landing-tags">
            <span className="landing-tag">Python</span>
            <span className="landing-tag">TensorFlow</span>
            <span className="landing-tag">OpenCV</span>
            <span className="landing-tag">YOLOv8</span>
            <span className="landing-tag">FastAPI</span>
          </div>
          <div className="landing-badge glass">
            <span className="badge-dot"></span>
            B.Tech CSE · IARE · 8.57 CGPA
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="landing-scroll">
        <span>SCROLL</span>
        <div className="scroll-line"><div className="scroll-ball"></div></div>
      </div>
    </div>
  );
};

export default Landing;
