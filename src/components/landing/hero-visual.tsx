"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Bot, User } from "lucide-react";

// Hero product visual — static browser frame + live chat simulation (no tilt, no controls)
export default function HeroVisual() {
  return (
    <div className="relative w-full">
      <div className="relative">
        <div
          aria-hidden
          className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-violet-600/30 via-cyan-500/20 to-fuchsia-600/30 blur-3xl"
        />
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-slate-950/90 shadow-[0_40px_120px_-30px_rgba(139,92,246,0.55)] backdrop-blur-xl">
          {/* browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/50 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[11px] text-slate-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              smartrep-ai.app/live-demo
            </div>
            <span className="hidden items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300 sm:flex">
              <ShieldCheck className="h-3 w-3" /> SOC2
            </span>
          </div>

          <div className="grid gap-0 md:grid-cols-[1.15fr_0.85fr]">
            {/* video — autoplay only, no controls or overlays */}
            <div className="relative aspect-[16/10] bg-black">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/chatbot.mp4" type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] text-white backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                Live AI resolving in 0.2s
              </div>
            </div>

            {/* chat mock */}
            <div className="relative flex flex-col gap-3 border-t border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-4 md:border-l md:border-t-0">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg">
                  <Bot className="h-[18px] w-[18px] text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Nova — AI Rep</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Online now
                  </p>
                </div>
                <span className="ml-auto rounded-full bg-cyan-400/10 px-2 py-1 text-[10px] font-bold text-cyan-300">
                  0.2s
                </span>
              </div>

              {[
                { me: false, text: "Hi! I need to reschedule my demo for tomorrow." },
                { me: true, text: "Got it — I found 3 open slots. Prefer morning or afternoon?" },
                { me: false, text: "Morning works best." },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.35, duration: 0.5 }}
                  className={`flex gap-2 ${m.me ? "justify-end" : "justify-start"}`}
                >
                  {!m.me && (
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/30">
                      <Bot className="h-3 w-3 text-violet-200" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      m.me
                        ? "rounded-br-md bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg"
                        : "rounded-bl-md border border-white/10 bg-white/5 text-slate-200 backdrop-blur"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.me && (
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20">
                      <User className="h-3 w-3 text-cyan-200" />
                    </div>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3.5 py-2.5 text-[12px] text-slate-400"
              >
                <span className="widget-dot bg-cyan-400" style={{ animationDelay: "0ms" }} />
                <span className="widget-dot bg-violet-400" style={{ animationDelay: "150ms" }} />
                <span className="widget-dot bg-fuchsia-400" style={{ animationDelay: "300ms" }} />
                <span className="ml-1">Nova is booking 10:30 AM…</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* static badges (no motion offsets that add bulk) */}
        <div className="absolute -bottom-5 -left-3 hidden items-center gap-2.5 rounded-2xl border border-white/15 bg-slate-900/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:flex">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <div>
            <p className="text-[13px] font-semibold text-white">Enterprise security</p>
            <p className="text-[11px] text-slate-400">Bank-grade encryption</p>
          </div>
        </div>
        <div className="absolute -right-3 -top-5 hidden items-center gap-3 rounded-2xl border border-white/15 bg-slate-900/90 px-4 py-3 shadow-2xl backdrop-blur-xl lg:flex">
          <div className="text-right">
            <p className="text-[11px] text-slate-400">Resolution rate</p>
            <p className="text-lg font-bold text-white">
              98% <span className="text-xs font-medium text-cyan-300">auto-resolved</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
