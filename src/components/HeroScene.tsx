import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function shieldShape() {
  const s = new THREE.Shape();
  s.moveTo(0, 1.35);
  s.bezierCurveTo(0.5, 1.15, 0.9, 1.15, 1.1, 1.1);
  s.bezierCurveTo(1.1, 0.2, 0.9, -0.8, 0, -1.4);
  s.bezierCurveTo(-0.9, -0.8, -1.1, 0.2, -1.1, 1.1);
  s.bezierCurveTo(-0.9, 1.15, -0.5, 1.15, 0, 1.35);
  return s;
}

function Shield() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(shieldShape(), { depth: 0.25, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.08, bevelSegments: 8, curveSegments: 48 });
    g.center();
    return g;
  }, []);
  useFrame((st, d) => {
    if (group.current) group.current.rotation.y = Math.sin(st.clock.elapsedTime * 0.6) * 0.5;
    if (ring.current) ring.current.rotation.z += d * 0.4;
  });
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={group}>
        <mesh geometry={geo}>
          <meshPhysicalMaterial color="#8fb8ff" roughness={0.08} metalness={0.2} clearcoat={1} iridescence={1} iridescenceIOR={1.3} transparent opacity={0.9} />
        </mesh>
        {/* padlock */}
        <group position={[0, -0.05, 0.3]}>
          <mesh position={[0, -0.15, 0]}>
            <boxGeometry args={[0.7, 0.55, 0.22]} />
            <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.15} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <torusGeometry args={[0.22, 0.06, 16, 48, Math.PI]} />
            <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.1} />
          </mesh>
          <mesh position={[0, -0.12, 0.12]}>
            <cylinderGeometry args={[0.07, 0.07, 0.02, 24]} />
            <meshStandardMaterial color="#2f6bff" emissive="#2f6bff" emissiveIntensity={1.2} />
          </mesh>
        </group>
      </group>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.75, 0.015, 8, 128]} />
        <meshStandardMaterial color="#4f8cff" emissive="#4f8cff" emissiveIntensity={1} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <Shield />
      <Environment>
        <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
        <Lightformer intensity={1.5} color="#c9a7ff" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
        <Lightformer intensity={1.5} color="#8ff0e0" position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[20, 1, 1]} />
      </Environment>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
