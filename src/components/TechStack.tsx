import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { BallCollider, Physics, RigidBody, CylinderCollider, RapierRigidBody } from "@react-three/rapier";
import "./styles/TechStack.css";

const TECHS = [
  { name: "Python",      color: "#3b82f6" },
  { name: "TensorFlow",  color: "#f97316" },
  { name: "OpenCV",      color: "#7c3aed" },
  { name: "YOLOv8",      color: "#06b6d4" },
  { name: "FastAPI",     color: "#10b981" },
  { name: "PostgreSQL",  color: "#1e40af" },
  { name: "Scikit-learn",color: "#f59e0b" },
  { name: "SHAP",        color: "#8b5cf6" },
  { name: "RAG",         color: "#06b6d4" },
  { name: "LLaMA 3.1",   color: "#a855f7" },
  { name: "Groq API",    color: "#22d3ee" },
  { name: "Cybersec",    color: "#ef4444" },
  { name: "JWT Auth",    color: "#eab308" },
  { name: "WebSockets",  color: "#3b82f6" },
  { name: "Supabase",    color: "#3ecf8e" },
  { name: "Java",        color: "#f97316" },
];

function createTechTexture(name: string, hex: string) {
  const c = document.createElement("canvas");
  c.width = 256; c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = hex + "cc";
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fillRect(0, 0, 256, 128);
  ctx.fillStyle = "white";
  ctx.font = "bold 32px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const words = name.split("-");
  if (words.length > 1) {
    ctx.fillText(words[0], 128, 110);
    ctx.font = "bold 26px Arial";
    ctx.fillText(words.slice(1).join("-"), 128, 150);
  } else {
    ctx.fillText(name.length > 8 ? name.slice(0,8) : name, 128, 128);
  }
  return new THREE.CanvasTexture(c);
}

const sphereGeo = new THREE.SphereGeometry(1, 28, 28);
const spheres = [...Array(32)].map(() => ({
  scale: [0.65, 0.8, 0.9, 1, 1.05][Math.floor(Math.random() * 5)],
}));

function Sphere({ scale, material, isActive, r = THREE.MathUtils.randFloatSpread }:
  { scale: number; material: THREE.MeshPhysicalMaterial; isActive: boolean; r?: typeof THREE.MathUtils.randFloatSpread }) {
  const api = useRef<RapierRigidBody>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);
  useFrame((_s, dt) => {
    if (!isActive || !api.current) return;
    const d = Math.min(0.1, dt);
    const imp = vec.copy(api.current.translation()).normalize()
      .multiply(new THREE.Vector3(-50 * d * scale, -150 * d * scale, -50 * d * scale));
    api.current.applyImpulse(imp, true);
  });
  return (
    <RigidBody linearDamping={0.75} angularDamping={0.15} friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]} ref={api} colliders={false}>
      <BallCollider args={[scale]} />
      <CylinderCollider rotation={[Math.PI/2,0,0]} position={[0,0,1.2*scale]} args={[0.15*scale,0.275*scale]} />
      <mesh castShadow receiveShadow scale={scale} geometry={sphereGeo} material={material} rotation={[0.3,1,1]} />
    </RigidBody>
  );
}

function Pointer({ isActive }: { isActive: boolean }) {
  const ref = useRef<RapierRigidBody>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    ref.current.setNextKinematicTranslation(
      vec.lerp(new THREE.Vector3(pointer.x * viewport.width/2, pointer.y * viewport.height/2, 0), 0.2)
    );
  });
  return (
    <RigidBody position={[100,100,100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handle = () => {
      const work = document.getElementById("projects");
      if (work) setIsActive(work.getBoundingClientRect().top < window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const textures = useMemo(() => TECHS.map(t => createTechTexture(t.name, t.color)), []);
  const materials = useMemo(() => textures.map((tex, i) =>
    new THREE.MeshPhysicalMaterial({
      map: tex, emissive: TECHS[i].color as unknown as THREE.ColorRepresentation,
      emissiveMap: tex, emissiveIntensity: 0.25,
      metalness: 0.2, roughness: 0.8, clearcoat: 0.3,
    })
  ), [textures]);

  return (
    <div className="techstack-section">
      <h2 className="techstack-title">My <span className="grad-text">Techstack</span></h2>
      <Canvas shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0,0,20], fov: 32.5, near: 1, far: 100 }}
        onCreated={s => (s.gl.toneMappingExposure = 1.5)}
        className="tech-canvas">
        <ambientLight intensity={0.8} />
        <spotLight position={[20,20,25]} penumbra={1} angle={0.2} color="white" castShadow shadow-mapSize={[512,512]} />
        <directionalLight position={[0,5,-4]} intensity={2} />
        <Physics gravity={[0,0,0]}>
          <Pointer isActive={isActive} />
          {spheres.map((s, i) => (
            <Sphere key={i} {...s} material={materials[i % materials.length]} isActive={isActive} />
          ))}
        </Physics>
        <Environment preset="city" environmentIntensity={0.4} />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#030712" aoRadius={2} intensity={1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
