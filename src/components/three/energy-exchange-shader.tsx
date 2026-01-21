"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

// Mouse state for interactivity
let mouseX = 0;
let mouseY = 0;
let scrollProgress = 0;

// ============================================
// CUSTOM SHADER MATERIALS
// ============================================

// Energy Flow Shader - creates flowing energy patterns
const EnergyFlowMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uColor1: new THREE.Color("#FFFFFF"),
    uColor2: new THREE.Color("#888888"),
    uIntensity: 1.0,
    uNoiseScale: 2.0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uIntensity;
    uniform float uNoiseScale;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    // Simplex noise functions
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                         -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                       + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
    
    // Fractal Brownian Motion
    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      for (int i = 0; i < 5; i++) {
        value += amplitude * snoise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
      }
      return value;
    }
    
    void main() {
      // Create flowing energy pattern
      vec2 uv = vUv;
      float time = uTime * 0.5;
      
      // Add mouse influence
      vec2 mouseInfluence = uMouse * 0.1;
      
      // Multi-layer noise for complex flow
      float noise1 = fbm(uv * uNoiseScale + time * 0.3 + mouseInfluence);
      float noise2 = fbm(uv * uNoiseScale * 1.5 - time * 0.2);
      float noise3 = fbm(uv * uNoiseScale * 2.0 + time * 0.4 + vec2(noise1 * 0.3));
      
      // Combine noises
      float combinedNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
      
      // Create pulsing effect
      float pulse = sin(time * 2.0) * 0.5 + 0.5;
      
      // Edge glow effect based on view angle
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
      
      // Mix colors based on noise
      vec3 color = mix(uColor1, uColor2, combinedNoise * 0.5 + 0.5);
      
      // Add energy flow patterns
      float flow = smoothstep(0.2, 0.8, combinedNoise + pulse * 0.2);
      
      // Final color with intensity and fresnel
      vec3 finalColor = color * (flow + fresnel * 0.5) * uIntensity;
      
      // Add subtle emission
      float emission = smoothstep(0.4, 0.9, combinedNoise + pulse * 0.3) * 0.8;
      finalColor += uColor1 * emission * 0.3;
      
      gl_FragColor = vec4(finalColor, 0.85 + fresnel * 0.15);
    }
  `
);

// Particle Trail Shader
const ParticleTrailMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#FFFFFF"),
    uOpacity: 1.0,
  },
  // Vertex Shader
  `
    attribute float aProgress;
    attribute float aRandom;
    
    uniform float uTime;
    
    varying float vProgress;
    varying float vRandom;
    
    void main() {
      vProgress = aProgress;
      vRandom = aRandom;
      
      vec3 pos = position;
      
      // Add subtle wave motion
      pos.x += sin(uTime * 2.0 + aProgress * 10.0 + aRandom * 6.28) * 0.02;
      pos.y += cos(uTime * 1.5 + aProgress * 8.0 + aRandom * 6.28) * 0.02;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      
      // Size varies with progress
      float size = mix(8.0, 2.0, aProgress) * (0.8 + sin(uTime * 3.0 + aRandom * 6.28) * 0.2);
      
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment Shader
  `
    uniform vec3 uColor;
    uniform float uOpacity;
    
    varying float vProgress;
    varying float vRandom;
    
    void main() {
      // Circular point
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      
      // Soft edges
      float alpha = smoothstep(0.5, 0.1, dist);
      
      // Fade based on progress
      alpha *= 1.0 - vProgress;
      
      // Add subtle color variation
      vec3 color = uColor * (0.8 + vRandom * 0.4);
      
      gl_FragColor = vec4(color, alpha * uOpacity);
    }
  `
);

// Extend Three.js with our custom materials
extend({ EnergyFlowMaterial, ParticleTrailMaterial });

// Type declarations for custom shader materials
type EnergyFlowMaterialProps = {
  ref?: React.Ref<THREE.ShaderMaterial>;
  transparent?: boolean;
  side?: THREE.Side;
  depthWrite?: boolean;
  blending?: THREE.Blending;
  uTime: number;
  uMouse: THREE.Vector2;
  uColor1: THREE.Color;
  uColor2: THREE.Color;
  uIntensity: number;
  uNoiseScale: number;
};

type ParticleTrailMaterialProps = {
  ref?: React.Ref<THREE.ShaderMaterial>;
  transparent?: boolean;
  depthWrite?: boolean;
  blending?: THREE.Blending;
  uTime: number;
  uColor: THREE.Color;
  uOpacity: number;
};

declare module "@react-three/fiber" {
  interface ThreeElements {
    energyFlowMaterial: EnergyFlowMaterialProps;
    particleTrailMaterial: ParticleTrailMaterialProps;
  }
}

// ============================================
// 3D COMPONENTS
// ============================================

function EnergyField() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const t = state.clock.elapsedTime * 0.25;
    materialRef.current.uniforms.uTime.value = t;
    materialRef.current.uniforms.uMouse.value.set(mouseX, mouseY);
    materialRef.current.uniforms.uIntensity.value = 0.4 + scrollProgress * 0.4;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]} rotation={[0, 0, 0]}>
      <planeGeometry args={[10, 6, 1, 1]} />
      <energyFlowMaterial
        ref={materialRef}
        transparent
        side={THREE.DoubleSide}
        uTime={0}
        uMouse={new THREE.Vector2(0, 0)}
        uColor1={new THREE.Color("#FFFFFF")}
        uColor2={new THREE.Color("#666666")}
        uIntensity={0.6}
        uNoiseScale={1.6}
      />
    </mesh>
  );
}

function ValueNode({
  position,
  label,
  color,
  ringColor,
}: {
  position: [number, number, number];
  label: string;
  color: string;
  ringColor?: string;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
  });

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
          roughness={0.15}
          metalness={0.4}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.04, 16, 80]} />
        <meshStandardMaterial
          color={ringColor ?? color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
      <Text
        position={[0, -0.7, 0]}
        fontSize={0.18}
        color="#E2E8F0"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.9}
      >
        {label}
      </Text>
      <pointLight intensity={0.8} color={color} distance={3} />
    </group>
  );
}

function AgreementCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const pulse = 0.9 + Math.sin(t * 2.2) * 0.08;
    meshRef.current.scale.setScalar(pulse);
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.rotation.x = t * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial
        color="#FFFFFF"
        emissive="#FFFFFF"
        emissiveIntensity={0.7}
        roughness={0.2}
        metalness={0.5}
      />
    </mesh>
  );
}

function TradeStream({
  curve,
  count = 180,
  speed = 0.22,
  color = "#FFFFFF",
  glowColor = "#666666",
}: {
  curve: THREE.CatmullRomCurve3;
  count?: number;
  speed?: number;
  color?: string;
  glowColor?: string;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const tubeMaterialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, progress, random } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const progress = new Float32Array(count);
    const random = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const phase = i / count;
      const point = curve.getPointAt(phase);
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
      progress[i] = phase;
      random[i] = Math.random();
    }

    return { positions, progress, random };
  }, [count, curve]);

  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current) return;
    const t = state.clock.elapsedTime;
    materialRef.current.uniforms.uTime.value = t;

    if (tubeMaterialRef.current) {
      tubeMaterialRef.current.uniforms.uTime.value = t * 0.6;
      tubeMaterialRef.current.uniforms.uMouse.value.set(mouseX, mouseY);
    }

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const phase = (progress[i] + t * speed + random[i] * 0.1) % 1;
      const point = curve.getPointAt(phase);
      posArray[i * 3] = point.x;
      posArray[i * 3 + 1] = point.y + Math.sin(t * 2 + phase * 12) * 0.04;
      posArray[i * 3 + 2] = point.z;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 140, 0.05, 8, false]} />
        <energyFlowMaterial
          ref={tubeMaterialRef}
          transparent
          side={THREE.DoubleSide}
          uTime={0}
          uMouse={new THREE.Vector2(0, 0)}
          uColor1={new THREE.Color(color)}
          uColor2={new THREE.Color(glowColor)}
          uIntensity={0.6}
          uNoiseScale={2.4}
        />
      </mesh>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aProgress" args={[progress, 1]} />
          <bufferAttribute attach="attributes-aRandom" args={[random, 1]} />
        </bufferGeometry>
        <particleTrailMaterial
          ref={materialRef}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uTime={0}
          uColor={new THREE.Color(color)}
          uOpacity={0.9}
        />
      </points>
    </group>
  );
}

function MilestoneBeacons({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const groupRef = useRef<THREE.Group>(null);
  const markers = useMemo(() => [0.22, 0.5, 0.78], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const pulse = 0.85 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.15;
      child.scale.setScalar(pulse);
    });
  });

  return (
    <group ref={groupRef}>
      {markers.map((marker, index) => {
        const point = curve.getPointAt(marker);
        return (
          <mesh key={`marker-${index}`} position={[point.x, point.y, point.z]}>
            <cylinderGeometry args={[0.03, 0.03, 0.22, 12]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#FFFFFF"
              emissiveIntensity={0.7}
              roughness={0.25}
              metalness={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function ExchangeVisualization() {
  const groupRef = useRef<THREE.Group>(null);
  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(-2.2, 0.2, 0),
      new THREE.Vector3(-1.4, 0.9, 0.2),
      new THREE.Vector3(0, 0.1, 0),
      new THREE.Vector3(1.4, -0.7, -0.2),
      new THREE.Vector3(2.2, -0.1, 0),
    ],
    []
  );
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(curvePoints, false, "centripetal"),
    [curvePoints]
  );

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime * 0.08;
    const targetX = mouseY * 0.2;
    const targetY = t + mouseX * 0.2;

    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.02;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.02;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.05} floatIntensity={0.2}>
      <group ref={groupRef}>
        <ValueNode
          position={[-2.2, 0.2, 0]}
          label="Your Value"
          color="#CCCCCC"
        />
        <ValueNode
          position={[2.2, -0.1, 0]}
          label="Delivered Build"
          color="#FFFFFF"
        />
        <AgreementCore />
        <TradeStream curve={curve} color="#FFFFFF" glowColor="#888888" />
        <MilestoneBeacons curve={curve} />
      </group>
    </Float>
  );
}

// Scene with post-processing
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 6]} intensity={0.5} color="#FFFFFF" />
      <pointLight position={[-3, 1.5, 3]} intensity={0.6} color="#FFFFFF" />
      <pointLight position={[3, -1, -2]} intensity={0.5} color="#CCCCCC" />
      
      {/* Main visualization */}
      <EnergyField />
      <ExchangeVisualization />
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
    </>
  );
}

// ============================================
// MAIN EXPORT
// ============================================
export function EnergyExchangeScene({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      scrollProgress = Math.min(1, scrollY / (maxScroll * 0.2)); // Cap at 20% scroll
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!mounted || hasError) return null;

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
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

