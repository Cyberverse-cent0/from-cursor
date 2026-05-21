"use client";

interface FloatingParticlesProps {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  className?: string;
}

export function FloatingParticles({
  count = 20,
  colors = ["bg-purple-400", "bg-emerald-400", "bg-blue-400", "bg-amber-400", "bg-rose-400"],
  minSize = 2,
  maxSize = 6,
  className = "",
}: FloatingParticlesProps) {
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: minSize + Math.random() * (maxSize - minSize),
    color: colors[i % colors.length],
    delay: `${Math.random() * 5}s`,
    duration: `${2 + Math.random() * 3}s`,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full ${particle.color} opacity-40 animate-pulse`}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
}
