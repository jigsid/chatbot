import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingCards } from "@/constants/landing-page";
import { blogPosts } from "@/constants/blog-posts";
import clsx from "clsx";
import {
  ArrowRightCircleIcon,
  Check,
  ChevronDown,
  Sparkles,
  Star,
  Play,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { getMonthName } from "@/lib/utils";
import Contact from "@/components/contact";
import ChatbotIframe from "./ChatbotIframe";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionP,
  MotionSection,
  MotionSpan,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleUp,
  staggerContainer,
  staggerFast,
  containerVariants,
  itemVariants,
  MotionButton,
  letterAnimation,
  textContainer,
} from "@/components/motion-wrapper";

const SmartRepTitle = "SmartRep AI".split("");

const stats = [
  { number: "500+", label: "Active Users", prefix: "Over" },
  { number: "1M+", label: "Messages Handled", prefix: "More than" },
  { number: "24/7", label: "Support", prefix: "Always-on" },
  { number: "98%", label: "Satisfaction Rate", prefix: "Industry-leading" },
];

export default async function Home() {
  return (
    <div className="overflow-hidden">
      <NavBar />

      {/* Hero Section */}
      <MotionSection
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-[95vh] pt-24 flex items-center relative bg-gradient-to-b from-black via-slate-950 to-slate-900 overflow-hidden"
      >
        {/* Modern 2025 Glass Morphism Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(138,43,226,0.15),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,230,255,0.12),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(125,58,245,0.08),_transparent_35%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(0,0,0,0.7),_rgba(0,0,0,0.4)_50%,_rgba(0,0,0,0.7))]" />
        </div>

        {/* Animated Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light"></div>
        
        {/* Futuristic Grid Lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] mix-blend-luminosity"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <MotionDiv
              key={`particle-${i}`}
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.1,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: [
                  Math.random() * 100 + "%", 
                  Math.random() * 100 + "%",
                  Math.random() * 100 + "%"
                ],
                opacity: [
                  Math.random() * 0.5 + 0.1,
                  Math.random() * 0.8 + 0.2,
                  Math.random() * 0.5 + 0.1
                ]
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              style={{
                boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.1)"
              }}
            />
          ))}
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <MotionDiv
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.03, 0.06, 0.03],
                scale: [1, 1.2, 1],
                x: [0, i % 2 === 0 ? 70 : -70, 0],
                y: [0, i % 2 === 0 ? -50 : 50, 0],
              }}
              transition={{
                duration: 20 + i * 3,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeInOut",
              }}
              className={clsx(
                "absolute rounded-full mix-blend-screen",
                i % 3 === 0
                  ? "bg-gradient-to-br from-purple-600/[0.15] via-violet-500/[0.1] to-transparent"
                  : i % 3 === 1
                  ? "bg-gradient-to-br from-cyan-500/[0.1] via-blue-600/[0.08] to-transparent"
                  : "bg-gradient-to-br from-fuchsia-500/[0.12] via-magenta/[0.08] to-transparent"
              )}
              style={{
                width: 500 + i * 200,
                height: 500 + i * 200,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Text Content - Left Side */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              {/* Smart Badge */}
            <MotionSpan
              variants={fadeInDown}
                className="relative self-start mb-2"
              >
                <div className="relative px-5 py-2 bg-white/5 backdrop-blur-2xl rounded-full text-sm font-medium tracking-wide flex items-center gap-2 border border-white/10 shadow-lg shadow-black/20 hover:border-white/15 transition-all duration-300">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="bg-gradient-to-r from-white via-cyan-200 to-violet-200 bg-clip-text text-transparent">
                    2025 Enterprise AI Platform
                </span>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              </div>
            </MotionSpan>

              {/* Title */}
              <div className="space-y-3">
                <MotionH1
                  variants={fadeInUp}
                  className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
                >
                  <span className="bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent relative inline-block">
                    Transform Your
                    <div className="absolute -right-4 -top-4 w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-violet-500/30 rounded-full blur-xl"></div>
                  </span>
                </MotionH1>
                <MotionH1
                  variants={fadeInUp}
                  className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
                >
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent relative inline-block">
                    Customer Support
                    <div className="absolute -left-4 -top-4 w-8 h-8 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/30 rounded-full blur-xl"></div>
                  </span>
                </MotionH1>
                <MotionP
                  variants={fadeInUp}
                  className="max-w-xl text-xl text-slate-300/90 mt-6 leading-relaxed font-light"
                >
                  The next-generation AI platform that handles inquiries, streamlines
                  transactions, and delivers personalized experiences - all while you
                  focus on growing your business.
                </MotionP>
                
                {/* Key Benefits Tags */}
            <MotionDiv
              variants={fadeInUp}
                  className="flex flex-wrap gap-2 mt-4"
                >
                  {["Neural Network", "Self-Learning", "Multi-modal", "Low-latency"].map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-white/5 backdrop-blur-md rounded-full text-xs font-medium border border-white/10 text-slate-300 flex items-center gap-1.5"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"></div>
                      {tag}
                    </span>
                  ))}
                </MotionDiv>
              </div>

            {/* CTA Buttons */}
              <MotionDiv
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 mt-4"
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                <Link href="/dashboard">
                    <Button className="relative bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-7 text-base font-medium text-white rounded-lg shadow-xl hover:shadow-violet-500/30 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center border border-white/10 overflow-hidden group">
                      <div className="absolute inset-0 w-full h-full bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    Start Free Trial
                      <ArrowRightCircleIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>

                <Link href="#demo" className="relative group">
                  <Button variant="outline" className="relative bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-8 py-7 text-base font-medium rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center transition-all duration-300 overflow-hidden group">
                    <div className="absolute inset-0 w-full h-full bg-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <Play className="w-5 h-5" />
                    Watch Demo
                  </Button>
                </Link>
              </MotionDiv>

              {/* Trust Indicators */}
              <MotionDiv variants={fadeInUp} className="mt-6">
                <p className="text-sm text-slate-400 mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  Trusted by innovative companies
                </p>
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="h-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 group">
                    <div className="h-8 px-3 bg-white/5 backdrop-blur-xl rounded-lg flex items-center gap-2 border border-white/10 hover:border-white/20 transition-all duration-300">
                      <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm font-medium text-white">Cubetech</span>
                    </div>
                  </div>

                  <div className="h-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 group">
                    <div className="h-8 px-3 bg-white/5 backdrop-blur-xl rounded-lg flex items-center gap-2 border border-white/10 hover:border-white/20 transition-all duration-300">
                      <svg className="w-5 h-5 text-violet-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm font-medium text-white">WaveSync</span>
                    </div>
                  </div>

                  <div className="h-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 group">
                    <div className="h-8 px-3 bg-white/5 backdrop-blur-xl rounded-lg flex items-center gap-2 border border-white/10 hover:border-white/20 transition-all duration-300">
                      <svg className="w-5 h-5 text-fuchsia-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm font-medium text-white">PlusMind</span>
                    </div>
                  </div>

                  <div className="h-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 group">
                    <div className="h-8 px-3 bg-white/5 backdrop-blur-xl rounded-lg flex items-center gap-2 border border-white/10 hover:border-white/20 transition-all duration-300">
                      <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm font-medium text-white">SocialAI</span>
                    </div>
                  </div>

                  <div className="h-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 group">
                    <div className="h-8 px-3 bg-white/5 backdrop-blur-xl rounded-lg flex items-center gap-2 border border-white/10 hover:border-white/20 transition-all duration-300">
                      <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm font-medium text-white">TechFlow</span>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            </div>

            {/* Dashboard Preview - Right Side */}
            <MotionDiv
              variants={fadeInRight}
              className="lg:col-span-6 relative"
            >
              <div className="relative">
                {/* Glow effects */}
                <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/20 via-cyan-600/20 to-fuchsia-600/20 rounded-3xl blur-3xl opacity-60"></div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent rounded-full blur-2xl"></div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent rounded-full blur-2xl"></div>
                
                {/* Animated rings */}
                <MotionDiv
                  animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-6 border border-white/5 rounded-3xl"
                ></MotionDiv>
                <MotionDiv
                  animate={{ scale: [1, 1.03, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -inset-3 border border-white/10 rounded-2xl"
                ></MotionDiv>
                
                {/* Dashboard mockup */}
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                  {/* Browser chrome */}
                  <div className="p-2 bg-black/40 border-b border-white/5 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="text-xs text-slate-400 bg-white/5 rounded-md py-1 px-3 max-w-[200px] mx-auto flex items-center justify-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-cyan-400/80"></div>
                        smartrep-ai.dashboard.io
                      </div>
                    </div>
                  </div>
                  
                  {/* Dashboard content */}
                  <div className="aspect-[16/9] w-full relative">
                    {/* AI dashboard interface */}
                    <div className="absolute inset-0 p-6">
                      <div className="h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-white/5 flex flex-col">
                        {/* Header with navigation */}
                        <div className="flex justify-between items-center p-4 border-b border-white/5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">SR</div>
                            <div className="w-24 h-5 bg-white/5 rounded-md"></div>
                          </div>
                          <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                              <div className="w-4 h-4 rounded-full bg-white/20"></div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                              <div className="w-4 h-4 rounded-full bg-white/20"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Dashboard grid */}
                        <div className="flex-1 grid grid-cols-2 gap-4 p-4">
                          {/* Analytics chart */}
                          <div className="col-span-2 h-32 bg-gradient-to-r from-violet-500/5 to-cyan-500/5 rounded-lg border border-white/5 flex flex-col p-3">
                            <div className="text-xs text-white/50 mb-2">Conversation Analytics</div>
                            <div className="flex-1 flex items-end justify-between gap-1">
                              {[...Array(12)].map((_, i) => (
                                <MotionDiv
                                  key={i}
                                  initial={{ height: "20%" }}
                                  animate={{ height: `${20 + Math.random() * 60}%` }}
                                  transition={{ 
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: i * 0.2
                                  }}
                                  className="w-full bg-gradient-to-t from-violet-500/30 to-cyan-500/30 rounded-sm"
                                ></MotionDiv>
                              ))}
                            </div>
                          </div>
                          
                          {/* Stat cards */}
                          <div className="h-40 bg-white/5 rounded-lg border border-white/5 p-4 flex flex-col justify-between">
                            <div className="text-xs text-white/50">Active Conversations</div>
                            <div className="text-2xl font-semibold text-white flex items-baseline gap-2">
                              547
                              <span className="text-xs font-normal text-cyan-400">+12%</span>
                            </div>
                            <div className="h-16 w-full bg-gradient-to-r from-violet-500/5 to-transparent rounded"></div>
                          </div>
                          
                          <div className="h-40 bg-white/5 rounded-lg border border-white/5 p-4 flex flex-col justify-between">
                            <div className="text-xs text-white/50">User Satisfaction</div>
                            <div className="text-2xl font-semibold text-white flex items-baseline gap-2">
                              98%
                              <span className="text-xs font-normal text-cyan-400">+3%</span>
                            </div>
                            <div className="h-16 w-full bg-gradient-to-r from-violet-500/5 to-transparent rounded"></div>
                          </div>
                          
                          {/* Bottom bar */}
                          <div className="col-span-2 h-12 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between px-4">
                            <div className="w-24 h-4 bg-white/10 rounded-sm"></div>
                            <div className="flex gap-2">
                              <div className="w-8 h-6 bg-violet-500/30 rounded-sm"></div>
                              <div className="w-8 h-6 bg-cyan-500/30 rounded-sm"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Animated elements */}
                    <MotionDiv
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute bottom-8 right-8 w-32 h-32 bg-gradient-to-r from-violet-500/10 to-cyan-500/20 rounded-full blur-2xl"
                    />
          </div>
                </div>
                
                {/* Floating badges */}
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -bottom-6 -left-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-3 border border-white/10 shadow-lg backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-cyan-400" />
                    <span className="text-sm font-medium text-white">Enterprise Security</span>
                  </div>
                </MotionDiv>
                
                <MotionDiv
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="absolute -top-6 right-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-3 border border-white/10 shadow-lg backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-purple-400" />
                    <span className="text-sm font-medium text-white">Global Deployment</span>
                  </div>
                </MotionDiv>
                
                {/* New floating stat badge */}
                <MotionDiv
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="absolute top-1/2 -right-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-3 border border-white/10 shadow-lg backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center text-white">
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs text-white/60">Response Time</div>
                      <div className="text-white font-medium flex items-baseline gap-1">
                        0.2s
                        <span className="text-xs text-cyan-400">Instant</span>
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              </div>
            </MotionDiv>
        </div>

        {/* Scroll Indicator */}
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <Link href="#features" className="group flex flex-col items-center">
              <p className="text-xs font-light text-slate-400 group-hover:text-cyan-300 transition-colors duration-300">
                Discover Features
              </p>
              <div className="mt-2 w-8 h-12 rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden">
                <MotionDiv
                  animate={{ 
                    y: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-1.5 h-3 bg-gradient-to-b from-cyan-400 to-violet-500 rounded-full"
                />
              </div>
          </Link>
        </MotionDiv>
          
          {/* Notification Badge */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute top-6 right-6 sm:right-10"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full blur opacity-40 animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping absolute -left-0.5"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-400 absolute -left-0.5"></div>
                <span className="text-xs font-medium text-white pl-2">New AI Features Available</span>
              </div>
            </div>
          </MotionDiv>
        </div>
      </MotionSection>

      {/* Features Section */}
      <MotionSection
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
        id="features"
      >
        <div className="container mx-auto px-4">
          <MotionH2
            variants={fadeInUp}
            className="text-5xl font-bold text-center mb-6 text-slate-50"
          >
            Enterprise Features
          </MotionH2>

          <MotionP
            variants={fadeInUp}
            className="text-center text-slate-300/90 max-w-2xl mx-auto mb-24 font-light"
          >
            Comprehensive tools and capabilities designed for businesses of all
            sizes
          </MotionP>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: "🎯",
                title: "Intelligent Response System",
                description:
                  "Advanced AI algorithms ensure accurate and contextual responses to customer inquiries.",
                variant: fadeInLeft,
              },
              {
                icon: "🔄",
                title: "Seamless Integration",
                description:
                  "Quick deployment with any existing platform through our robust API infrastructure.",
                variant: fadeInUp,
              },
              {
                icon: "📊",
                title: "Analytics Dashboard",
                description:
                  "Comprehensive insights and metrics to track performance and customer engagement.",
                variant: fadeInRight,
              },
              {
                icon: "🔐",
                title: "Enterprise Security",
                description:
                  "Bank-grade encryption and compliance with international data protection standards.",
                variant: fadeInLeft,
              },
              {
                icon: "⚡",
                title: "High Availability",
                description:
                  "99.9% uptime guarantee with distributed infrastructure.",
                variant: fadeInUp,
              },
              {
                icon: "🔧",
                title: "Custom Configuration",
                description:
                  "Tailored solutions to match your specific business requirements.",
                variant: fadeInRight,
              },
              {
                icon: "🌐",
                title: "Multi-language Support",
                description:
                  "Communicate with customers in their preferred language.",
                variant: fadeInLeft,
              },
              {
                icon: "📱",
                title: "Omnichannel Presence",
                description:
                  "Consistent experience across web, mobile, and social platforms.",
                variant: fadeInUp,
              },
              {
                icon: "🤝",
                title: "Dedicated Support",
                description: "24/7 technical assistance from our expert team.",
                variant: fadeInRight,
              },
            ].map((feature, index) => (
              <MotionDiv
                key={index}
                variants={feature.variant}
                whileHover={{ y: -5 }}
                className="bg-slate-800/20 backdrop-blur-sm p-8 rounded-xl shadow-lg shadow-slate-950/20 hover:shadow-xl hover:bg-slate-800/30 transition-all duration-500 border border-slate-700/20 flex flex-col items-center text-center group"
              >
                <span className="text-4xl mb-6 block transform transition-transform duration-500 group-hover:scale-110">
                  {feature.icon}
                </span>
                <h3 className="text-xl font-semibold mb-4 text-slate-50">
                  {feature.title}
                </h3>
                <p className="text-slate-300/90 leading-relaxed font-light">
                  {feature.description}
                </p>
              </MotionDiv>
            ))}
          </div>

          <MotionDiv variants={fadeInUp} className="mt-24 text-center">
            <Link href="/dashboard" className="inline-flex">
              <Button className="bg-violet-500/80 hover:bg-violet-500/90 text-white px-8 py-6 text-lg rounded-lg shadow-lg shadow-violet-500/5 hover:shadow-violet-500/10 transition-all duration-500 flex items-center gap-2 min-w-[250px] justify-center backdrop-blur-sm">
                Explore All Features
                <ArrowRightCircleIcon className="w-5 h-5" />
              </Button>
            </Link>
          </MotionDiv>
        </div>
      </MotionSection>

      {/* Pricing Section */}
      <MotionSection
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
        id="pricing"
      >
        <div className="container mx-auto px-4">
          <MotionH2
            variants={fadeInUp}
            className="text-5xl font-bold text-center mb-6 text-slate-50"
          >
            Flexible Pricing Plans
          </MotionH2>

          <MotionP
            variants={fadeInUp}
            className="text-center text-slate-300/90 max-w-2xl mx-auto mb-24 font-light"
          >
            Choose the perfect plan that aligns with your business needs
          </MotionP>

          <div className="flex justify-center gap-8 flex-wrap mt-6 max-w-7xl mx-auto">
            {pricingCards.map((card, index) => (
              <MotionDiv
                key={card.title}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  className={clsx(
                    "w-[320px] flex flex-col justify-between min-h-[600px] backdrop-blur-sm border border-slate-700/20",
                    {
                      "bg-violet-500/10 shadow-xl shadow-violet-500/5":
                        card.title === "Ultimate",
                      "bg-slate-800/20 shadow-lg shadow-slate-950/20":
                        card.title !== "Ultimate",
                    }
                  )}
                >
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-slate-50 text-2xl mb-3">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-slate-300/90 font-light">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pb-8">
                    <span className="text-4xl font-bold text-slate-50">
                      {card.price}
                    </span>
                    <span className="text-slate-300/90 ml-2 font-light">
                      <span>/ month</span>
                    </span>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-6">
                    <div className="space-y-4 flex-grow">
                      {card.features.map((feature) => (
                        <div key={feature} className="flex gap-3 items-center">
                          <Check className="text-violet-300/80 w-5 h-5 flex-shrink-0" />
                          <p className="text-slate-300/90 font-light">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/dashboard?plan=${card.title.toLowerCase()}`}
                      className={clsx(
                        "w-full text-center font-medium rounded-lg py-4 transition-all duration-500 hover:scale-[1.02]",
                        {
                          "bg-violet-500/80 hover:bg-violet-500/90 text-white shadow-lg shadow-violet-500/5 hover:shadow-violet-500/10":
                            card.title === "Ultimate",
                          "bg-slate-800/50 hover:bg-slate-800/70 text-slate-200 border border-slate-700/20":
                            card.title !== "Ultimate",
                        }
                      )}
                    >
                      Get Started
                    </Link>
                  </CardFooter>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* News Section */}
      <MotionSection
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
        id="news"
      >
        <div className="container mx-auto px-4">
          <MotionH2
            variants={fadeInUp}
            className="text-5xl font-bold text-center mb-6 text-slate-50"
          >
            Latest Insights
          </MotionH2>
          <MotionP
            variants={fadeInUp}
            className="text-center text-slate-300/90 max-w-2xl mx-auto mb-24 font-light"
          >
            Stay updated with the latest trends in AI and customer service
            innovation
          </MotionP>

          <div className="grid md:grid-cols-3 grid-cols-1 gap-8 max-w-7xl mx-auto">
            {blogPosts &&
              blogPosts.map((post, index) => (
                <MotionDiv
                  key={post.id}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link href={`${post.id}`}>
                    <Card className="flex flex-col gap-2 rounded-xl overflow-hidden h-full bg-slate-800/20 backdrop-blur-sm border border-slate-700/20 shadow-lg shadow-slate-950/20 hover:shadow-xl hover:bg-slate-800/30 transition-all duration-500">
                      <div className="relative w-full aspect-video overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                        <Image
                          src={post.image}
                          alt="post featured image"
                          fill
                          style={{ objectFit: "cover" }}
                          className="hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="py-8 px-8 flex flex-col gap-4">
                        <CardDescription className="text-slate-400/80 text-sm font-light">
                          {getMonthName(new Date(post.createdAt).getMonth())}{" "}
                          {new Date(post.createdAt).getDate()},{" "}
                          {new Date(post.createdAt).getFullYear()}
                        </CardDescription>
                        <CardTitle className="text-xl text-slate-50 hover:text-violet-200 transition-colors duration-500">
                          {post.title}
                        </CardTitle>
                        <div className="text-slate-300/90 leading-relaxed font-light">
                          {parse(post.content.slice(4, 150) + "...")}
                        </div>
                      </div>
                    </Card>
                  </Link>
                </MotionDiv>
              ))}
          </div>
        </div>
      </MotionSection>

      <Contact />
      <Footer />
      <ChatbotIframe />
    </div>
  );
}

