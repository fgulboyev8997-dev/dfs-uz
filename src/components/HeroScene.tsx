import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Lightformer, OrbitControls, Sparkles, ContactShadows } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function shieldShape(k = 1) {
  const s = new THREE.Shape();
  s.moveTo(0, 1.35 * k);
  s.bezierCurveTo(0.5 * k, 1.15 * k, 0.9 * k, 1.15 * k, 1.1 * k, 1.1 * k);
  s.bezierCurveTo(1.1 * k, 0.2 * k, 0.9 * k, -0.8 * k, 0, -1.4 * k);
  s.bezierCurveTo(-0.9 * k, -0.8 * k, -1.1 * k, 0.2 * k, -1.1 * k, 1.1 * k);
  s.bezierCurveTo(-0.9 * k, 1.15 * k, -0.5 * k, 1.15 * k, 0, 1.35 * k);
  return s;
}

function rimShape() {
  const outer = shieldShape(1.08);
  outer.holes.push(new THREE.Path(shieldShape(0.97).getPoints(96).reverse()));
  return outer;
}

function extrude(shape: THREE.Shape, depth: number, bevel: number) {
  const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel * 0.7, bevelSegments: 6, curveSegments: 64 });
  g.center();
  return g;
}

function Orbit({ r, tilt, speed, color }: { r: number; tilt: [number, number, number]; speed: number; color: string }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (g.current) g.current.rotation.z += d * speed; });
  return (
    <group rotation={tilt}>
      <group ref={g}>
        <mesh><torusGeometry args={[r, 0.008, 8, 160]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.7} /></mesh>
        <mesh position={[r, 0, 0]}><sphereGeometry args={[0.06, 24, 24]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} /></mesh>
        <mesh position={[-r, 0, 0]}><sphereGeometry args={[0.035, 16, 16]} /><meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={1.5} /></mesh>
      </group>
    </group>
  );
}

function Shield() {
  const group = useRef<THREE.Group>(null);
  const body = useMemo(() => extrude(shieldShape(), 0.22, 0.1), []);
  const rim = useMemo(() => extrude(rimShape(), 0.3, 0.05), []);
  const plate = useMemo(() => extrude(shieldShape(0.78), 0.04, 0.03), []);
  useFrame((st) => {
    if (group.current) group.current.rotation.y = Math.sin(st.clock.elapsedTime * 0.5) * 0.45;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.8}>
      <group ref={group} scale={0.92}>
        <mesh geometry={body}>
          <meshPhysicalMaterial color="#a9c8ff" roughness={0.05} metalness={0.1} transmission={0.6} thickness={0.8} clearcoat={1} iridescence={1} iridescenceIOR={1.3} />
        </mesh>
        <mesh geometry={rim}>
          <meshStandardMaterial color="#e8eef8" metalness={1} roughness={0.18} />
        </mesh>
        <mesh geometry={plate} position={[0, 0, 0.2]}>
          <meshPhysicalMaterial color="#3d7bff" roughness={0.2} metalness={0.3} clearcoat={1} />
        </mesh>
        {/* padlock */}
        <group position={[0, -0.05, 0.34]}>
          <mesh position={[0, 0.22, 0]}>
            <torusGeometry args={[0.2, 0.055, 24, 64, Math.PI]} />
            <meshStandardMaterial color="#f4f6fb" metalness={1} roughness={0.12} />
          </mesh>
          <mesh position={[-0.2, 0.15, 0]}><cylinderGeometry args={[0.055, 0.055, 0.14, 24]} /><meshStandardMaterial color="#f4f6fb" metalness={1} roughness={0.12} /></mesh>
          <mesh position={[0.2, 0.15, 0]}><cylinderGeometry args={[0.055, 0.055, 0.14, 24]} /><meshStandardMaterial color="#f4f6fb" metalness={1} roughness={0.12} /></mesh>
          <mesh position={[0, -0.12, 0]}>
            <boxGeometry args={[0.62, 0.48, 0.18]} />
            <meshStandardMaterial color="#ffffff" metalness={0.7} roughness={0.15} />
          </mesh>
          <mesh position={[0, -0.08, 0.095]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.055, 0.055, 0.02, 32]} /><meshStandardMaterial color="#1a2a55" /></mesh>
          <mesh position={[0, -0.08, 0.1]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.05, 0.05, 0.01, 32]} /><meshStandardMaterial color="#2f6bff" emissive="#4f8cff" emissiveIntensity={2} /></mesh>
          <mesh position={[0, -0.2, 0.1]}><boxGeometry args={[0.035, 0.12, 0.01]} /><meshStandardMaterial color="#2f6bff" emissive="#4f8cff" emissiveIntensity={2} /></mesh>
        </group>
        {/* rivets */}
        {[[-0.85, 0.95], [0.85, 0.95], [-0.7, -0.45], [0.7, -0.45], [0, -1.2]].map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.2]}><sphereGeometry args={[0.04, 16, 16]} /><meshStandardMaterial color="#ffffff" metalness={1} roughness={0.1} /></mesh>
        ))}
      </group>
      <Orbit r={1.7} tilt={[Math.PI / 2.3, 0, 0]} speed={0.5} color="#4f8cff" />
      <Orbit r={1.55} tilt={[Math.PI / 2.8, 0.6, 0]} speed={-0.35} color="#b98cff" />
      <Sparkles count={40} scale={4} size={2.5} speed={0.3} color="#7aa8ff" />
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 5]} intensity={1.8} />
      <pointLight position={[-3, -2, 3]} intensity={8} color="#b98cff" />
      <Shield />
      <ContactShadows position={[0, -1.9, 0]} opacity={0.25} scale={6} blur={2.8} far={3} />
      <Environment>
        <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
        <Lightformer intensity={1.5} color="#c9a7ff" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
        <Lightformer intensity={1.5} color="#8ff0e0" position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[20, 1, 1]} />
      </Environment>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
