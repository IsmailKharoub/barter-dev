"use client";

import dynamic from "next/dynamic";
import { HeroContent } from "./hero-content";

const OrbitingShapes = dynamic(
  () =>
    import("@/components/three/orbiting-shapes").then(
      (mod) => mod.OrbitingShapes
    ),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* 3D Shapes */}
      <OrbitingShapes className="absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroContent />
          <div className="hidden lg:block" aria-hidden="true">
            {/* Space for 3D elements on desktop */}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-border-default rounded-full flex justify-center">
          <div className="w-1 h-3 bg-fg-muted rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

