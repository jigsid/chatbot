"use client";

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
  Pause,
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
import { useState } from "react";

const stats = [
  { number: "500+", label: "Active Users", prefix: "Over" },
  { number: "1M+", label: "Messages Handled", prefix: "More than" },
  { number: "24/7", label: "Support", prefix: "Always-on" },
  { number: "98%", label: "Satisfaction Rate", prefix: "Industry-leading" },
];

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideoPlayback = () => {
    const video = document.getElementById('chatbot-video') as HTMLVideoElement;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="overflow-hidden">
      <NavBar />

      {/* Hero Section - 2025 Edition */}
      <MotionSection
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-[95vh] pt-16 flex items-center relative bg-gradient-to-b from-black via-slate-950 to-slate-900 overflow-hidden"
      >
        {/* Modern Glass Morphism Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(138,43,226,0.15),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,230,255,0.12),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(125,58,245,0.08),_transparent_35%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(0,0,0,0.7),_rgba(0,0,0,0.4)_50%,_rgba(0,0,0,0.7))]" />
        </div>

        {/* Subtle Animated Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light"></div>
        
        {/* Container */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text Content - Left Side */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Smart Badge */}
              <MotionSpan
                variants={fadeInDown}
                className="relative self-start mb-1"
              >
                <div className="relative px-5 py-2 bg-white/5 backdrop-blur-2xl rounded-full text-sm font-medium tracking-wide flex items-center gap-2 border border-white/10 shadow-lg shadow-black/20 hover:border-white/15 transition-all duration-300">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="bg-gradient-to-r from-white via-cyan-200 to-violet-200 bg-clip-text text-transparent">
                    AI-Powered Customer Experience
                  </span>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                </div>
              </MotionSpan>

              {/* Title */}
              <div className="space-y-2">
                <MotionH1
                  variants={fadeInUp}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
                >
                  <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                    Conversational AI
                  </span>
                </MotionH1>
                <MotionH1
                  variants={fadeInUp}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
                >
                  <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    For Modern Business
                  </span>
                </MotionH1>
                <MotionP
                  variants={fadeInUp}
                  className="max-w-xl text-lg text-slate-300/90 mt-4 leading-relaxed"
                >
                  Elevate customer support with our AI platform that handles inquiries, 
                  automates responses, and delivers personalized experiences 24/7.
                </MotionP>
              </div>

              {/* Key Features Tags */}
              <MotionDiv
                variants={fadeInUp}
                className="flex flex-wrap gap-2 mt-2"
              >
                {["Self-Learning", "Multi-modal", "Low-latency", "Enterprise-ready"].map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-white/5 backdrop-blur-md rounded-full text-xs font-medium border border-white/10 text-slate-300 flex items-center gap-1.5"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"></div>
                    {tag}
                  </span>
                ))}
              </MotionDiv>

              {/* CTA Buttons */}
              <MotionDiv
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 mt-4"
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                  <Link href="/dashboard">
                    <Button className="relative bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-6 text-base font-medium text-white rounded-lg shadow-xl hover:shadow-violet-500/30 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center border border-white/10 overflow-hidden group">
                      <div className="absolute inset-0 w-full h-full bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      Start Free Trial
                      <ArrowRightCircleIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>

                <Button 
                  variant="outline" 
                  onClick={toggleVideoPlayback}
                  className="relative bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-8 py-6 text-base font-medium rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center transition-all duration-300 overflow-hidden group"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isPlaying ? "Pause Demo" : "Play Demo"}
                </Button>
              </MotionDiv>

              {/* Trust Indicators */}
              <MotionDiv variants={fadeInUp} className="mt-4">
                <p className="text-sm text-slate-400 mb-3 flex items-center gap-2">
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

            {/* Video Showcase - Right Side */}
            <MotionDiv
              variants={fadeInRight}
              className="lg:col-span-6 relative"
            >
              <div className="relative">
                {/* Glow effects */}
                <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/20 via-cyan-600/20 to-fuchsia-600/20 rounded-3xl blur-3xl opacity-60"></div>
                
                {/* Video Container */}
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
                        smartrep-ai.app
                      </div>
                    </div>
                  </div>
                  
                  {/* Video */}
                  <div className="aspect-[16/9] w-full relative">
                    <video 
                      id="chatbot-video"
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src="/chatbot.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Video overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                    
                    {/* Play/Pause button overlay */}
                    <button 
                      onClick={toggleVideoPlayback}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white" />
                      )}
                    </button>
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
                    <Shield className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm font-medium text-white">Enterprise Security</span>
                  </div>
                </MotionDiv>
                
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
          
          {/* Stats Row */}
          <MotionDiv
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 mb-8"
          >
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-xs text-slate-400">{stat.prefix}</div>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mt-1">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-300 mt-1">{stat.label}</div>
              </div>
            ))}
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
      </MotionSection>

      {/* Section Divider */}
      <div className="relative h-24 bg-slate-950 overflow-hidden">
        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(125,58,245,0.15),_transparent_50%)]"></div>
          <div className="absolute h-px w-full top-1/2 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent"></div>
        </MotionDiv>
      </div>

      {/* Features Section */}
      <MotionSection
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
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
                delay: 0.1
              },
              {
                icon: "🔄",
                title: "Seamless Integration",
                description:
                  "Quick deployment with any existing platform through our robust API infrastructure.",
                variant: fadeInUp,
                delay: 0.2
              },
              {
                icon: "📊",
                title: "Analytics Dashboard",
                description:
                  "Comprehensive insights and metrics to track performance and customer engagement.",
                variant: fadeInRight,
                delay: 0.3
              },
              {
                icon: "🔐",
                title: "Enterprise Security",
                description:
                  "Bank-grade encryption and compliance with international data protection standards.",
                variant: fadeInLeft,
                delay: 0.4
              },
              {
                icon: "⚡",
                title: "High Availability",
                description:
                  "99.9% uptime guarantee with distributed infrastructure.",
                variant: fadeInUp,
                delay: 0.5
              },
              {
                icon: "🔧",
                title: "Custom Configuration",
                description:
                  "Tailored solutions to match your specific business requirements.",
                variant: fadeInRight,
                delay: 0.6
              },
              {
                icon: "🌐",
                title: "Multi-language Support",
                description:
                  "Communicate with customers in their preferred language.",
                variant: fadeInLeft,
                delay: 0.7
              },
              {
                icon: "📱",
                title: "Omnichannel Presence",
                description:
                  "Consistent experience across web, mobile, and social platforms.",
                variant: fadeInUp,
                delay: 0.8
              },
              {
                icon: "🤝",
                title: "Dedicated Support",
                description: "24/7 technical assistance from our expert team.",
                variant: fadeInRight,
                delay: 0.9
              },
            ].map((feature, index) => (
              <MotionDiv
                key={index}
                variants={feature.variant}
                custom={feature.delay}
                transition={{ duration: 0.5, delay: feature.delay }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
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

          <MotionDiv 
            variants={fadeInUp} 
            transition={{ delay: 0.5 }}
            className="mt-24 text-center"
          >
            <Link href="/dashboard" className="inline-flex">
              <Button className="bg-violet-500/80 hover:bg-violet-500/90 text-white px-8 py-6 text-lg rounded-lg shadow-lg shadow-violet-500/5 hover:shadow-violet-500/10 transition-all duration-500 flex items-center gap-2 min-w-[250px] justify-center backdrop-blur-sm">
                Explore All Features
                <ArrowRightCircleIcon className="w-5 h-5" />
              </Button>
            </Link>
          </MotionDiv>
        </div>
      </MotionSection>

      {/* Section Divider */}
      <div className="relative h-24 bg-slate-950 overflow-hidden">
        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,230,255,0.15),_transparent_50%)]"></div>
          <div className="absolute h-px w-full top-1/2 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        </MotionDiv>
      </div>

      {/* Pricing Section */}
      <MotionSection
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
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
                custom={index * 0.2}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: { duration: 0.3 } 
                }}
              >
                <Card
                  className={clsx(
                    "w-[320px] flex flex-col justify-between min-h-[600px] backdrop-blur-sm border border-slate-700/20",
                    {
                      "bg-violet-500/10 shadow-xl shadow-violet-500/5":
                        card.title === "ULTIMATE",
                      "bg-slate-800/20 shadow-lg shadow-slate-950/20":
                        card.title !== "ULTIMATE",
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
                            card.title === "ULTIMATE",
                          "bg-slate-800/50 hover:bg-slate-800/70 text-slate-200 border border-slate-700/20":
                            card.title !== "ULTIMATE",
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

      {/* Section Divider */}
      <div className="relative h-24 bg-slate-950 overflow-hidden">
        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,0,255,0.1),_transparent_50%)]"></div>
          <div className="absolute h-px w-full top-1/2 bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent"></div>
        </MotionDiv>
      </div>

      {/* News Section */}
      <MotionSection
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
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
                  custom={index * 0.2}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    transition: { duration: 0.3 } 
                  }}
                >
                  <Link href={`${post.id}`}>
                    <Card className="flex flex-col gap-2 rounded-xl overflow-hidden h-full bg-slate-800/20 backdrop-blur-sm border border-slate-700/20 shadow-lg shadow-slate-950/20 hover:shadow-xl hover:bg-slate-800/30 transition-all duration-500">
                      <div className="relative w-full aspect-video overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                        <Image
                          src={post.image}
                          alt="post featured image"
                          fill
                          style={{ objectFit: "cover" }}
                          className="group-hover:scale-105 transition-transform duration-700"
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
                          {parse(post.content.slice(0, 150) + "...")}
                        </div>
                      </div>
                    </Card>
                  </Link>
                </MotionDiv>
              ))}
          </div>
        </div>
      </MotionSection>

      {/* Scroll Progress Indicator */}
      <MotionDiv
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-cyan-500 to-fuchsia-500 z-50 origin-left"
        style={{ 
          scaleX: 0,
          opacity: 0.8,
          boxShadow: "0 0 10px rgba(125, 58, 245, 0.5)"
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ 
          scaleX: [0, 1],
          opacity: [0, 0.8]
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut"
        }}
      />

      {/* Enhanced Contact Section */}
      <MotionSection
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative"
        id="contact"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(125,58,245,0.1),_transparent_70%)]"></div>
        <Contact />
      </MotionSection>

      <Footer />
      <ChatbotIframe />
    </div>
  );
}

