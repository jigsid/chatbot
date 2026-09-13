"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

// Magnetic CTA — subtle pull toward cursor for a premium feel
export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        ref.current!.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
      }}
      className="inline-block transition-transform duration-200 ease-out will-change-transform"
    >
      {children}
    </motion.div>
  );
}
