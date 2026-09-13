"use client";

const logos = [
  "Cubetech",
  "WaveSync",
  "PlusMind",
  "TechFlow",
  "Nexora",
  "Quantia",
  "Lumina",
  "Vertex Labs",
];

export default function LogoMarquee({ dark = true }: { dark?: boolean }) {
  const row = [...logos, ...logos];
  return (
    <div
      className={`relative overflow-hidden border-y py-5 ${
        dark ? "border-white/10 bg-black/40" : "border-slate-900/10 bg-white"
      }`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r ${
          dark ? "from-[#050508] to-transparent" : "from-white to-transparent"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l ${
          dark ? "from-[#050508] to-transparent" : "from-white to-transparent"
        }`}
      />
      <div className="landing-marquee items-center gap-12 pr-12">
        {row.map((name, i) => (
          <div key={i} className="flex shrink-0 items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
            <span
              className={`text-sm font-semibold uppercase tracking-[0.24em] ${
                dark ? "text-white/50" : "text-slate-500"
              }`}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
      <p className="sr-only">Trusted by innovative companies</p>
    </div>
  );
}
