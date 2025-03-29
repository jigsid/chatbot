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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(128,0,255,0.1),_transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(0,204,255,0.08),_transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(147,51,234,0.05),_transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(0,0,0,0.6),_rgba(0,0,0,0.3)_60%,_rgba(0,0,0,0.6))]" />
        </div>

        {/* Animated Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-soft-light"></div>

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
                </div>
              </MotionSpan>

              {/* Title */}
              <div className="space-y-3">
                <MotionH1
                  variants={fadeInUp}
                  className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
                >
                  <span className="bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent">
                    Transform Your
                  </span>
                </MotionH1>
                <MotionH1
                  variants={fadeInUp}
                  className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
                >
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Customer Support
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
              </div>

              {/* CTA Buttons */}
              <MotionDiv
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 mt-4"
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                  <Link href="/dashboard">
                    <Button className="relative bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-7 text-base font-medium text-white rounded-lg shadow-xl hover:shadow-violet-500/30 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center border border-white/10">
                      Start Free Trial
                      <ArrowRightCircleIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>

                <Link href="#demo" className="relative group">
                  <Button variant="outline" className="relative bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-8 py-7 text-base font-medium rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center transition-all duration-300">
                    <Play className="w-5 h-5" />
                    Watch Demo
                  </Button>
                </Link>
              </MotionDiv>

              {/* Trust Indicators */}
              <MotionDiv variants={fadeInUp} className="mt-6">
                <p className="text-sm text-slate-400 mb-4">Trusted by innovative companies</p>
                <div className="flex flex-wrap gap-6 items-center opacity-70">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                      <div className="h-6 w-24 bg-gradient-to-r from-slate-400 to-slate-500 rounded-md blur-[1px]"></div>
                    </div>
                  ))}
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
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/30 to-cyan-600/30 rounded-2xl blur-2xl opacity-50"></div>
                
                {/* Dashboard mockup */}
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                  <div className="p-2 bg-black/20 border-b border-white/5 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="text-xs text-slate-400 bg-white/5 rounded-md py-1 px-3 max-w-[200px] mx-auto">smartrep-ai.dashboard.io</div>
                    </div>
                  </div>
                  <div className="aspect-[16/9] w-full relative">
                    {/* Placeholder for actual dashboard image */}
                    <div className="absolute inset-0 p-6">
                      <div className="h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-white/5 flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b border-white/5">
                          <div className="w-32 h-6 bg-white/5 rounded-md"></div>
                          <div className="flex gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/5"></div>
                            <div className="w-8 h-8 rounded-full bg-white/5"></div>
                          </div>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4 p-4">
                          <div className="col-span-2 h-32 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 rounded-lg border border-white/5 flex items-center justify-center">
                            <div className="w-3/4 h-16 bg-white/5 rounded-md"></div>
                          </div>
                          <div className="h-40 bg-white/5 rounded-lg border border-white/5"></div>
                          <div className="h-40 bg-white/5 rounded-lg border border-white/5"></div>
                          <div className="col-span-2 h-20 bg-white/5 rounded-lg border border-white/5"></div>
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
                  className="absolute -bottom-6 -left-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-3 border border-white/10 shadow-lg"
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
                  className="absolute -top-6 right-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-3 border border-white/10 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-purple-400" />
                    <span className="text-sm font-medium text-white">Global Deployment</span>
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
                Discover More
              </p>
              <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-cyan-300 animate-bounce mt-1 transition-colors duration-300" />
            </Link>
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

