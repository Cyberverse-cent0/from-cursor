"use client";

interface GradientOrbProps {
  size?: number;
  color: string;
  position: { x: string; y: string };
  delay?: number;
  className?: string;
}

export function GradientOrb({
  size = 200,
  color,
  position,
  delay = 0,
  className = "",
}: GradientOrbProps) {
  return (
    <div
      className={`absolute rounded-full filter blur-3xl opacity-30 animate-pulse mix-blend-screen ${className}`}
      style={{
        width: size,
        height: size,
        left: position.x,
        top: position.y,
        background: `linear-gradient(135deg, ${color})`,
        animationDelay: `${delay}ms`,
      }}
    />
  );
}
