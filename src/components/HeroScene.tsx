import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Core() {
  const ref = useRef<Mesh>(null);
  useFrame((_, d) => { if (ref.current) { ref.current.rotation.x += d * 0.2; ref.current.rotation.y += d * 0.3; } });
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[1, 0.36, 220, 32]} />
        <meshPhysicalMaterial color="#9cc4ff" roughness={0.08} metalness={0.1} clearcoat={1} clearcoatRoughness={0.05} iridescence={1} iridescenceIOR={1.3} transparent opacity={0.85} />
      </mesh>
      <mesh scale={0.45}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#4f8cff" emissive="#3a6bff" emissiveIntensity={0.8} wireframe />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} />
      <Core />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
    </Canvas>
  );
}
