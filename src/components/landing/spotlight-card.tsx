"use client";

import { useRef, useState } from "react";

// Spotlight hover card — cursor-tracked radial glow, light + dark worlds
export default function SpotlightCard({
  children,
  className = "",
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setPos({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        });
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`group relative overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1.5 ${
        dark
          ? "border border-white/10 bg-white/[0.04] backdrop-blur-xl"
          : "border border-slate-900/10 bg-white shadow-[0_8px_40px_-16px_rgba(15,23,42,0.25)]"
      } ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(520px circle at ${pos.x}% ${pos.y}%, ${
            dark ? "rgba(139,92,246,0.22), transparent 65%" : "rgba(139,92,246,0.14), transparent 65%"
          })`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
