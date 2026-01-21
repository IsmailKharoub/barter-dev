"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Mouse state for parallax
let mouseX = 0;
let mouseY = 0;

// Brand colors from CSS variables
const COLORS = {
  primary: "#FFFFFF",    // White
  secondary: "#888888",  // Gray
  glow: "#FFFFFF",
};

// Torus ring component - clean and simple
function Ring({
  color,
  emissive,
  rotation,
  scale = 1,
  orbitSpeed = 1,
}: {
  color: string;
  emissive: string;
  rotation: [number, number, number];
  scale?: number;
  orbitSpeed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialRotation = useMemo(() => rotation, [rotation]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * orbitSpeed;
    meshRef.current.rotation.x = initialRotation[0] + t * 0.3;
    meshRef.current.rotation.y = initialRotation[1] + t * 0.2;
    meshRef.current.rotation.z = initialRotation[2] + t * 0.1;
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <torusGeometry args={[1, 0.12, 24, 48]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Flowing particles - figure-8 path between rings
function FlowingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 60;

  const { positions, phases, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      phases[i] = (i / count) * Math.PI * 2;
      speeds[i] = 0.4 + Math.random() * 0.3;
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
    }

    return { positions, phases, speeds };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const t = state.clock.elapsedTime * speeds[i] + phases[i];
      // Figure-8 / lemniscate path
      const scale = 1.2;
      posArray[i * 3] = Math.sin(t) * scale;
      posArray[i * 3 + 1] = Math.sin(t * 2) * 0.4;
      posArray[i * 3 + 2] = Math.cos(t) * 0.5;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#FFFFFF"
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Central glow sphere
function CenterGlow() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial
        color="#FFFFFF"
        transparent
        opacity={0.1}
        depthWrite={false}
      />
    </mesh>
  );
}

// Main exchange visualization
function ExchangeRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const baseRotation = state.clock.elapsedTime * 0.08;
    const targetX = mouseY * 0.12;
    const targetY = baseRotation + mouseX * 0.15;
    
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.02;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.02;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.2}>
      <group ref={groupRef}>
        {/* Ring 1 - white (what you offer) */}
        <Ring
          color="#FFFFFF"
          emissive="#FFFFFF"
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.2}
          orbitSpeed={0.25}
        />
        {/* Ring 2 - gray (what you get) */}
        <Ring
          color="#AAAAAA"
          emissive="#AAAAAA"
          rotation={[0, 0, Math.PI / 3]}
          scale={1}
          orbitSpeed={0.35}
        />
        {/* Particles flowing through */}
        <FlowingParticles />
        {/* Center glow */}
        <CenterGlow />
      </group>
    </Float>
  );
}

// Minimal scene with clean lighting
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} color="#FFFFFF" />
      <pointLight position={[-3, 2, 3]} intensity={0.5} color="#FFFFFF" />
      <pointLight position={[3, -1, -2]} intensity={0.3} color="#CCCCCC" />
      <ExchangeRings />
    </>
  );
}

export function OrbitingShapes({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted || hasError) return null;

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        onError={() => setHasError(true)}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
