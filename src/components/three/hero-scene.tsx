"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Float, 
  RoundedBox, 
  Text,
  MeshReflectorMaterial,
  Environment,
  ContactShadows
} from "@react-three/drei";
import * as THREE from "three";

// Mouse state
let mouseX = 0;
let mouseY = 0;

// Floating device/screen that shows UI
function FloatingDevice() {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const t = state.clock.elapsedTime;
    
    // Gentle floating motion
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    
    // Mouse-driven rotation (subtle)
    const targetRotY = mouseX * 0.2;
    const targetRotX = mouseY * 0.1;
    
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.03;
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} rotation={[0.1, -0.3, 0]}>
        {/* Main device frame */}
        <RoundedBox 
          args={[3.2, 2, 0.15]} 
          radius={0.08} 
          smoothness={4}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial 
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.1}
          />
        </RoundedBox>

        {/* Screen bezel */}
        <RoundedBox 
          args={[3, 1.8, 0.02]} 
          radius={0.05} 
          smoothness={4}
          position={[0, 0, 0.08]}
        >
          <meshStandardMaterial 
            color="#0a0a0a"
            metalness={0.5}
            roughness={0.8}
          />
        </RoundedBox>

        {/* Screen surface with gradient */}
        <mesh position={[0, 0, 0.09]} ref={screenRef}>
          <planeGeometry args={[2.85, 1.65]} />
          <meshBasicMaterial color="#0f0f0f" />
        </mesh>

        {/* UI Elements on screen */}
        <group position={[0, 0, 0.1]}>
          {/* Header bar */}
          <mesh position={[0, 0.65, 0]}>
            <planeGeometry args={[2.8, 0.2]} />
            <meshBasicMaterial color="#171717" />
          </mesh>
          
          {/* Navigation dots */}
          {[-1.2, -1.1, -1].map((x, i) => (
            <mesh key={i} position={[x, 0.65, 0.01]}>
              <circleGeometry args={[0.03, 16]} />
              <meshBasicMaterial color={i === 0 ? "#ef4444" : i === 1 ? "#f59e0b" : "#22c55e"} />
            </mesh>
          ))}

          {/* Sidebar */}
          <mesh position={[-1.1, -0.1, 0]}>
            <planeGeometry args={[0.5, 1.3]} />
            <meshBasicMaterial color="#1a1a1a" />
          </mesh>

          {/* Sidebar items */}
          {[0.35, 0.15, -0.05, -0.25, -0.45].map((y, i) => (
            <mesh key={i} position={[-1.1, y, 0.01]}>
              <planeGeometry args={[0.35, 0.08]} />
              <meshBasicMaterial color={i === 0 ? "#FFFFFF" : "#2a2a2a"} />
            </mesh>
          ))}

          {/* Main content area - cards */}
          <group position={[0.35, 0.2, 0]}>
            {/* Card 1 */}
            <RoundedBox args={[0.8, 0.5, 0.02]} radius={0.03} position={[-0.45, 0.15, 0]}>
              <meshBasicMaterial color="#1f1f1f" />
            </RoundedBox>
            {/* Card 2 */}
            <RoundedBox args={[0.8, 0.5, 0.02]} radius={0.03} position={[0.45, 0.15, 0]}>
              <meshBasicMaterial color="#1f1f1f" />
            </RoundedBox>
            {/* Card 3 - highlighted */}
            <RoundedBox args={[0.8, 0.5, 0.02]} radius={0.03} position={[-0.45, -0.45, 0]}>
              <meshBasicMaterial color="#FFFFFF" opacity={0.15} transparent />
            </RoundedBox>
            {/* Card 4 */}
            <RoundedBox args={[0.8, 0.5, 0.02]} radius={0.03} position={[0.45, -0.45, 0]}>
              <meshBasicMaterial color="#1f1f1f" />
            </RoundedBox>
          </group>

          {/* Chart/graph element */}
          <group position={[0.8, -0.4, 0.01]}>
            {[0, 0.1, 0.2, 0.3, 0.4].map((x, i) => {
              const heights = [0.15, 0.25, 0.18, 0.32, 0.22];
              return (
                <mesh key={i} position={[x - 0.2, heights[i] / 2 - 0.2, 0]}>
                  <planeGeometry args={[0.06, heights[i]]} />
                  <meshBasicMaterial color="#FFFFFF" opacity={0.5 + i * 0.1} transparent />
                </mesh>
              );
            })}
          </group>
        </group>

        {/* Reflection/shine on device edge */}
        <mesh position={[1.55, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.15, 1.8]} />
          <meshBasicMaterial color="#333" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

// Ambient floating particles
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 50;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;
  }

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#FFFFFF" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

// Scene lighting
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#fff" />
      <pointLight position={[-3, 2, 2]} intensity={0.4} color="#FFFFFF" />
      <pointLight position={[3, -1, 3]} intensity={0.3} color="#CCCCCC" />
      <spotLight 
        position={[0, 5, 0]} 
        angle={0.5} 
        penumbra={1} 
        intensity={0.5} 
        color="#FFFFFF"
      />
    </>
  );
}

// Full scene
function Scene() {
  return (
    <>
      <Lighting />
      <FloatingDevice />
      <Particles />
      <ContactShadows 
        position={[0, -1.5, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2} 
        far={4}
        color="#000"
      />
    </>
  );
}

export function HeroScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ 
        background: "transparent",
        width: "100%",
        height: "100%",
        display: "block",
      }}
    >
      <Scene />
    </Canvas>
  );
}

