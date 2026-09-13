"use client";

import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/constants/blog-posts";
import {
  ArrowRight,
  ArrowRightCircleIcon,
  BadgeCheck,
  Bot,
  CalendarCheck,
  Check,
  Globe,
  Languages,
  LineChart,
  Lock,
  MessagesSquare,
  Play,
  Pause,
  Plug,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Workflow,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { getMonthName } from "@/lib/utils";
import Contact from "@/components/contact";
import ChatbotIframe from "./ChatbotIframe";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import CountUp from "react-countup";
import SmoothScroll from "@/components/landing/smooth-scroll";
import ScrollProgress from "@/components/landing/scroll-progress";
import ParticleField from "@/components/landing/particle-field";
import { Reveal, SectionHeading } from "@/components/landing/reveal";
import SpotlightCard from "@/components/landing/spotlight-card";
import { Magnetic } from "@/components/landing/magnetic";
import LogoMarquee from "@/components/landing/logo-marquee";
import HeroVisual from "@/components/landing/hero-visual";

const heroStats = [
  { value: 500, suffix: "+", label: "Active businesses", sub: "and growing weekly" },
  { value: 1, suffix: "M+", label: "Messages resolved", sub: "with context intact", decimals: 0 },
  { value: 0.2, suffix: "s", label: "Median response", sub: "low-latency edge", decimals: 1 },
  { value: 98, suffix: "%", label: "Satisfaction", sub: "auto-resolved chats", decimals: 0 },
];

const featureCards = [
  {
    icon: MessagesSquare,
    tint: "from-violet-500 to-purple-600",
    title: "Intelligent responses",
    copy: "Context-aware answers trained on your docs, tone, and policies — not generic chatbot guesses.",
  },
  {
    icon: Plug,
    tint: "from-cyan-500 to-sky-600",
    title: "Seamless integration",
    copy: "Drop-in widget, robust API, CRM + Stripe + email hooks. Live in minutes, not sprints.",
  },
  {
    icon: LineChart,
    tint: "from-fuchsia-500 to-pink-600",
    title: "Analytics that teach",
    copy: "See why customers ask, what resolves, and where revenue leaks — then auto-improve.",
  },
  {
    icon: Lock,
    tint: "from-emerald-500 to-teal-600",
    title: "Enterprise security",
    copy: "Encryption in transit + at rest, scoped data access, and audit-ready controls.",
  },
  {
    icon: Zap,
    tint: "from-amber-500 to-orange-600",
    title: "Always-on scale",
    copy: "99.9% uptime on distributed edge infra. Peak traffic feels like any other Tuesday.",
  },
  {
    icon: Languages,
    tint: "from-indigo-500 to-blue-600",
    title: "Omnichannel + multilingual",
    copy: "Web, mobile, and social with native-quality language detection built in.",
  },
];

const steps = [
  {
    n: "01",
    icon: Globe,
    title: "Connect your world",
    copy: "Add your domain, import docs and FAQs. Nova learns your voice in minutes.",
  },
  {
    n: "02",
    icon: Workflow,
    title: "Design the flow",
    copy: "Bookings, payments, handoffs, escalations — wire real actions, not just replies.",
  },
  {
    n: "03",
    icon: CalendarCheck,
    title: "Launch + compound",
    copy: "Go live with the widget, then watch analytics turn chats into conversions.",
  },
];

const tiers = [
  {
    name: "Starter",
    price: "$29",
    blurb: "For solo founders testing AI support.",
    cta: "Start free",
    featured: false,
    features: ["1 domain", "1k chats / mo", "Widget + API", "Basic analytics", "Email support"],
  },
  {
    name: "Ultimate",
    price: "$0",
    strike: "$79",
    blurb: "Full SmartRep power — limited launch offer.",
    cta: "Claim Ultimate",
    featured: true,
    features: [
      "Unlimited domains",
      "Unlimited contacts",
      "Unlimited emails / mo",
      "Bookings + payments",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    name: "Scale",
    price: "$149",
    blurb: "For teams with volume + compliance needs.",
    cta: "Talk to us",
    featured: false,
    features: ["Everything in Ultimate", "SSO + audit logs", "Custom data retention", "SLA 99.9%", "Dedicated CSM"],
  },
];

const testimonials = [
  {
    quote:
      "We replaced three tools with SmartRep. It books demos while we sleep and answers like our best rep.",
    name: "Maya Chen",
    role: "Head of Growth, WaveSync",
    initials: "MC",
  },
  {
    quote:
      "Resolution time went from hours to seconds. Customers literally say 'that was fast' in the chat.",
    name: "Daniel Okafor",
    role: "Founder, Cubetech",
    initials: "DO",
  },
  {
    quote:
      "The analytics paid for itself. We found our top refund reason in week one and fixed it.",
    name: "Sofia Marino",
    role: "CX Lead, PlusMind",
    initials: "SM",
  },
];

function Hero({ isPlaying, onToggle }: { isPlaying: boolean; onToggle: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden bg-[#050508] pb-16 pt-32">
      {/* ——— ATMOSPHERE: aurora + grid + particles = "another world" ——— */}
      <motion.div style={{ y: yBg }} className="absolute inset-0" aria-hidden>
        <div className="animate-aurora absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-[140px]" />
        <div className="animate-aurora-slow absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-cyan-500/15 blur-[130px]" />
        <div className="animate-aurora absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-fuchsia-600/15 blur-[130px]" />
        <div className="landing-grid-dark absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,transparent_30%,#050508_78%)]" />
      </motion.div>
      <div className="absolute inset-0 opacity-70" aria-hidden>
        <ParticleField density={60} />
      </div>

      <motion.div style={{ y: yFg, opacity: fade }} className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.06] py-1.5 pl-1.5 pr-4 text-[13px] text-slate-200 shadow-xl backdrop-blur-xl"
            >
              <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                <Sparkles className="h-3 w-3" /> New
              </span>
              AI reps that book, sell & support — 24/7
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 text-balance text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl xl:text-7xl"
            >
              Step into a world where
              <span className="text-gradient block">customers never wait.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-slate-300/90"
            >
              SmartRep AI is the conversational platform that resolves inquiries, books
              appointments, and takes payments — trained on your business, live on your
              site in minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Magnetic>
                <Link href="/dashboard">
                  <Button className="group relative h-[52px] w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-8 py-6 text-base font-semibold text-white shadow-[0_16px_50px_-12px_rgba(139,92,246,0.7)] transition hover:shadow-[0_20px_70px_-12px_rgba(139,92,246,0.9)] sm:w-auto">
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative flex items-center gap-2">
                      Start free trial <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              </Magnetic>
              <Button
                variant="outline"
                onClick={onToggle}
                className="h-[52px] rounded-xl border-white/15 bg-white/[0.06] px-8 py-6 text-base text-white backdrop-blur-xl transition hover:border-white/30 hover:bg-white/10"
              >
                {isPlaying ? <Pause className="mr-2 h-[18px] w-[18px]" /> : <Play className="mr-2 h-[18px] w-[18px]" />}
                {isPlaying ? "Pause live demo" : "Watch live demo"}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <div className="flex -space-x-2.5">
                {["AK", "JM", "RS", "TW"].map((t, i) => (
                  <div
                    key={t}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#050508] text-[11px] font-bold text-white ${
                      ["bg-violet-600", "bg-cyan-600", "bg-fuchsia-600", "bg-emerald-600"][i]
                    }`}
                  >
                    {t}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1.5 text-sm font-semibold text-white">4.9/5</span>
                </div>
                <p className="text-[13px] text-slate-400">Loved by 500+ modern businesses</p>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[12px] text-slate-300 sm:flex">
                <BadgeCheck className="h-4 w-4 text-emerald-400" /> No credit card required
              </div>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="lg:col-span-6"
          >
            <HeroVisual isPlaying={isPlaying} onToggle={onToggle} />
            <div className="mt-8 flex flex-wrap gap-2.5">
              {["Self-learning", "Multi-modal", "0.2s latency", "Enterprise-ready"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-[12px] font-medium text-slate-200 backdrop-blur"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {heroStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.1, duration: 0.6 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              <p className="text-3xl font-bold tracking-tight text-white">
                <CountUp end={s.value} decimals={s.decimals ?? 0} duration={2} suffix={s.suffix} enableScrollSpy scrollSpyOnce />
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-200">{s.label}</p>
              <p className="text-xs text-slate-400">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* scroll cue */}
      <div className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-slate-500">Scroll to explore</span>
        <div className="flex h-11 w-7 justify-center rounded-full border border-white/15 bg-white/[0.03] p-1.5">
          <motion.div
            animate={{ y: [0, 18, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2.5 w-1.5 rounded-full bg-gradient-to-b from-cyan-400 to-violet-500"
          />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true);
  const toggleVideo = () => {
    const video = document.getElementById("chatbot-video") as HTMLVideoElement | null;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-white text-slate-950 antialiased">
        <ScrollProgress />
        <NavBar />

        <main>
          <Hero isPlaying={isPlaying} onToggle={toggleVideo} />
          <LogoMarquee />

          {/* ═══ WORLD 2 — LIGHT · porcelain studio ═══ */}
          <section id="features" className="relative overflow-hidden bg-[#FAFAF8] py-24 sm:py-32">
            <div aria-hidden className="landing-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
              <SectionHeading
                eyebrow="Enterprise features"
                title={<>Everything you need to <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">support, sell & scale</span></>}
                copy="A complete toolkit designed for lean teams and demanding enterprises alike — clean, fast, and obsessively reliable."
              />
              <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {featureCards.map((f, i) => (
                  <Reveal key={f.title} delay={(i % 3) * 0.08}>
                    <SpotlightCard className="h-full p-7">
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.tint} shadow-lg`}>
                        <f.icon className="h-[22px] w-[22px] text-white" />
                      </div>
                      <h3 className="mt-5 text-lg font-bold tracking-tight text-slate-950">{f.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{f.copy}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700">
                        Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </SpotlightCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ WORLD 3 — DARK · deep immersion ═══ */}
          <section className="relative overflow-hidden bg-[#080812] py-24 sm:py-32">
            <div aria-hidden className="absolute inset-0">
              <div className="animate-aurora absolute left-1/4 top-0 h-[420px] w-[620px] rounded-full bg-violet-700/20 blur-[140px]" />
              <div className="animate-aurora-slow absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[130px]" />
              <div className="landing-grid-dark absolute inset-0" />
            </div>
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
              <div className="grid items-center gap-14 lg:grid-cols-2">
                <div>
                  <SectionHeading
                    align="left"
                    dark
                    eyebrow="How it works"
                    title={<>From first click to <span className="text-gradient">closed deal</span> in three moves</>}
                    copy=" Nova doesn't just chat — it takes action. Watch it qualify, book, and collect payment while your team sleeps."
                  />
                  <div className="mt-10 space-y-4">
                    {steps.map((s, i) => (
                      <Reveal key={s.n} delay={i * 0.1}>
                        <div className="group flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-violet-400/30 hover:bg-white/[0.07]">
                          <span className="bg-gradient-to-b from-violet-400 to-cyan-300 bg-clip-text font-mono text-sm font-bold text-transparent">
                            {s.n}
                          </span>
                          <div>
                            <p className="flex items-center gap-2 font-semibold text-white">
                              <s.icon className="h-[18px] w-[18px] text-cyan-300" /> {s.title}
                            </p>
                            <p className="mt-1.5 text-[15px] leading-relaxed text-slate-300/85">{s.copy}</p>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                  <Reveal delay={0.3}>
                    <Link href="/dashboard" className="mt-8 inline-flex">
                      <Magnetic>
                        <Button className="rounded-xl bg-white px-7 py-6 font-semibold text-slate-950 shadow-xl transition hover:bg-slate-100">
                          Build your AI rep <ArrowRightCircleIcon className="ml-1 h-5 w-5" />
                        </Button>
                      </Magnetic>
                    </Link>
                  </Reveal>
                </div>

                {/* Live conversation panel */}
                <Reveal delay={0.15}>
                  <div className="relative">
                    <div aria-hidden className="absolute -inset-5 rounded-[28px] bg-gradient-to-br from-cyan-500/20 to-violet-600/25 blur-3xl" />
                    <div className="relative rounded-3xl border border-white/12 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400">
                            <Bot className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">Nova is live on your site</p>
                            <p className="text-xs text-emerald-300">● Resolving 34 chats right now</p>
                          </div>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">EN · auto</span>
                      </div>
                      <div className="mt-5 space-y-3">
                        {[
                          { q: "Do you offer refunds?", a: "Yes — 30-day, no-questions refunds. I can start yours now if you'd like." },
                          { q: "Can I book for Friday?", a: "Absolutely. 10:30 AM and 2:15 PM are open — shall I hold 10:30?" },
                        ].map((c) => (
                          <div key={c.q} className="space-y-2">
                            <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-white/10 px-4 py-2.5 text-sm text-slate-100">
                              {c.q}
                            </div>
                            <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-md border border-violet-400/20 bg-gradient-to-r from-violet-600/25 to-cyan-500/15 px-4 py-2.5 text-sm leading-relaxed text-slate-100">
                              {c.a}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 grid grid-cols-3 gap-2.5 text-center">
                        {[
                          { k: "CSAT", v: "98%" },
                          { k: "Deflect", v: "73%" },
                          { k: "Booked", v: "+41%" },
                        ].map((m) => (
                          <div key={m.k} className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-3">
                            <p className="text-lg font-bold text-white">{m.v}</p>
                            <p className="text-[11px] uppercase tracking-widest text-slate-400">{m.k}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ═══ WORLD 4 — LIGHT · pricing clarity ═══ */}
          <section id="pricing" className="relative bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <SectionHeading
                eyebrow="Pricing"
                title="One plan that wins. Zero fine print."
                copy="Start free, upgrade when you grow. Every plan includes the widget, API, and human support."
              />
              <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
                {tiers.map((t, i) => (
                  <Reveal key={t.name} delay={i * 0.1} className="h-full">
                    <div
                      className={`relative flex h-full flex-col rounded-3xl p-8 transition hover:-translate-y-1.5 ${
                        t.featured
                          ? "overflow-hidden bg-slate-950 text-white shadow-[0_30px_90px_-20px_rgba(139,92,246,0.6)] ring-1 ring-violet-400/40"
                          : "border border-slate-900/10 bg-[#FAFAF8] shadow-[0_16px_50px_-24px_rgba(15,23,42,0.3)]"
                      }`}
                    >
                      {t.featured && (
                        <>
                          <div aria-hidden className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-fuchsia-600/30 blur-[80px]" />
                          <div aria-hidden className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-cyan-500/25 blur-[80px]" />
                          <span className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                            Most popular
                          </span>
                        </>
                      )}
                      <p className={`text-sm font-bold uppercase tracking-[0.2em] ${t.featured ? "text-cyan-300" : "text-violet-700"}`}>{t.name}</p>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-5xl font-bold tracking-tight">{t.price}</span>
                        {t.strike && <span className="text-lg text-slate-400 line-through">{t.strike}</span>}
                        <span className={`text-sm ${t.featured ? "text-slate-300" : "text-slate-500"}`}>/ month</span>
                      </div>
                      <p className={`mt-2 text-[15px] ${t.featured ? "text-slate-300" : "text-slate-600"}`}>{t.blurb}</p>
                      <ul className="mt-6 flex-1 space-y-3">
                        {t.features.map((f) => (
                          <li key={f} className="flex items-center gap-2.5 text-[15px]">
                            <span className={`flex h-[22px] w-[22px] items-center justify-center rounded-full ${t.featured ? "bg-emerald-400/15" : "bg-emerald-500/10"}`}>
                              <Check className={`h-3.5 w-3.5 ${t.featured ? "text-emerald-300" : "text-emerald-600"}`} />
                            </span>
                            <span className={t.featured ? "text-slate-200" : "text-slate-700"}>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href={t.featured ? "/dashboard?plan=ultimate" : "/dashboard"} className="mt-8">
                        <Button
                          className={`h-12 w-full rounded-xl font-semibold transition ${
                            t.featured
                              ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg hover:brightness-110"
                              : "border border-slate-900/15 bg-white text-slate-900 hover:bg-slate-950 hover:text-white"
                          }`}
                        >
                          {t.cta}
                        </Button>
                      </Link>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ WORLD 5 — LIGHT · social proof ═══ */}
          <section className="relative border-y border-slate-900/10 bg-[#F4F4F2] py-24 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <SectionHeading
                eyebrow="Loved in production"
                title="Teams feel the difference in week one"
              />
              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {testimonials.map((t, i) => (
                  <Reveal key={t.name} delay={i * 0.1}>
                    <SpotlightCard className="flex h-full flex-col p-7">
                      <Quote className="h-6 w-6 text-violet-500" />
                      <p className="mt-4 flex-1 text-[16px] leading-relaxed text-slate-800">“{t.quote}”</p>
                      <div className="mt-6 flex items-center gap-3 border-t border-slate-900/10 pt-5">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 text-xs font-bold text-white">
                          {t.initials}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-slate-950">{t.name}</p>
                          <p className="text-[13px] text-slate-500">{t.role}</p>
                        </div>
                      </div>
                    </SpotlightCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ WORLD 6 — LIGHT · insights ═══ */}
          <section id="news" className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <SectionHeading
                eyebrow="Latest insights"
                title="Learn the playbooks behind great CX"
                copy="Field notes on conversational AI, automation, and support that converts."
              />
              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {blogPosts?.slice(0, 3).map((post, i) => (
                  <Reveal key={post.id} delay={i * 0.1}>
                    <Link href={`/${post.id}`} className="group block h-full">
                      <Card className="h-full overflow-hidden rounded-3xl border-slate-900/10 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_-24px_rgba(15,23,42,0.35)]">
                        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-slate-800 backdrop-blur">
                            {getMonthName(new Date(post.createdAt).getMonth())} {new Date(post.createdAt).getDate()}
                          </span>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-bold leading-snug tracking-tight text-slate-950 transition group-hover:text-violet-700">
                            {post.title}
                          </h3>
                          <div className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-slate-600">
                            {parse(post.content.slice(0, 140) + "...")}
                          </div>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700">
                            Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ WORLD 7 — DARK FINALE · CTA + contact ═══ */}
          <section id="contact" className="relative overflow-hidden bg-[#050508] py-24 sm:py-32">
            <div aria-hidden className="absolute inset-0">
              <div className="animate-aurora absolute left-1/2 top-0 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-violet-700/25 blur-[150px]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(34,211,238,0.12),transparent_70%)]" />
              <div className="landing-grid-dark absolute inset-0 opacity-80" />
            </div>
            <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
              <Reveal>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-200 backdrop-blur">
                  <Bot className="h-3.5 w-3.5" /> Ready when you are
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
                  Give every visitor a <span className="text-gradient">five-star arrival.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300/90">
                  Launch your AI rep today — free to start, live in minutes, compounding every conversation after.
                </p>
              </Reveal>
              <Reveal delay={0.26}>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Magnetic>
                    <Link href="/dashboard">
                      <Button className="rounded-xl bg-white px-8 py-6 text-base font-semibold text-slate-950 shadow-2xl transition hover:bg-slate-100">
                        Start free trial <ArrowRight className="ml-1 h-[18px] w-[18px]" />
                      </Button>
                    </Link>
                  </Magnetic>
                  <Link href="#pricing">
                    <Button variant="outline" className="rounded-xl border-white/20 bg-white/5 px-8 py-6 text-base text-white backdrop-blur transition hover:bg-white/10">
                      Compare plans
                    </Button>
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-white/12 bg-white/[0.04] text-left shadow-2xl backdrop-blur-xl">
                  <Contact />
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <Footer />
        <ChatbotIframe />
      </div>
    </SmoothScroll>
  );
}
