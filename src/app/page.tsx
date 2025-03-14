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
        className="min-h-[95vh] pt-28 flex items-center justify-center relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      >
        {/* Advanced Gradient Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(51,65,85,0.15),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(233,30,99,0.04),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(233,30,99,0.05),_transparent_50%)]" />
        </div>

        {/* Sophisticated Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] mix-blend-luminosity" />

        {/* Dynamic Light Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-magenta/10 via-pink-500/5 to-transparent rotate-12 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-bl from-red-500/10 via-rose-500/5 to-transparent -rotate-12 blur-3xl animate-pulse" />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <MotionDiv
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.01, 0.03, 0.01],
                scale: [1, 1.2, 1],
                x: [0, i % 2 === 0 ? 50 : -50, 0],
                y: [0, i % 2 === 0 ? -30 : 30, 0],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                delay: i * 3,
                ease: "easeInOut",
              }}
              className={clsx(
                "absolute rounded-full mix-blend-soft-light",
                i % 3 === 0
                  ? "bg-gradient-to-r from-magenta/[0.03] via-pink-500/[0.02] to-transparent"
                  : i % 3 === 1
                  ? "bg-gradient-to-r from-red-500/[0.03] via-rose-500/[0.02] to-transparent"
                  : "bg-gradient-to-r from-slate-400/[0.03] via-slate-500/[0.02] to-transparent"
              )}
              style={{
                width: 400 + i * 100,
                height: 400 + i * 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center flex-col gap-12 mt-6">
            {/* Enterprise Badge */}
            <MotionSpan
              variants={fadeInDown}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-magenta/20 via-pink-500/20 to-red-500/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative px-8 py-3 bg-slate-900/40 backdrop-blur-xl rounded-full text-sm font-medium tracking-wider flex items-center gap-3 border border-slate-700/30 shadow-lg shadow-slate-950/20">
                <Sparkles className="w-4 h-4 text-magenta/90" />
                <span className="bg-gradient-to-r from-slate-100 via-magenta to-red-200 bg-clip-text text-transparent">
                  Enterprise-Grade AI Solutions
                </span>
                <Sparkles className="w-4 h-4 text-magenta/90" />
              </div>
            </MotionSpan>

            {/* Title Animation */}
            <MotionDiv
              variants={fadeInUp}
              className="relative"
            >
              <div className="relative">
                <MotionDiv className="flex justify-center flex-wrap gap-1">
                  {SmartRepTitle.map((letter, index) => (
                    <MotionDiv
                      variants={letterAnimation}
                      key={index}
                      className={clsx(
                        "text-7xl sm:text-8xl md:text-9xl font-bold",
                        "bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300/90 bg-clip-text text-transparent",
                        "hover:from-magenta hover:via-pink-500 hover:to-red-500",
                        "transition-all duration-500 transform",
                        {
                          "mr-8": letter === " ",
                        }
                      )}
                      whileHover={{
                        scale: 1.05,
                        transition: { 
                          type: "spring",
                          stiffness: 500,
                          damping: 15
                        },
                      }}
                    >
                      {letter}
                    </MotionDiv>
                  ))}
                </MotionDiv>
              </div>
            </MotionDiv>

            {/* Description */}
            <MotionP
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto text-lg text-slate-300/90 leading-relaxed font-light tracking-wide"
            >
              Elevate your customer experience with our state-of-the-art AI platform. 
              Seamlessly handle inquiries, streamline transactions, and deliver 
              personalized support with unprecedented efficiency.
            </MotionP>

            {/* Stats Cards */}
            <MotionDiv
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-4 w-full max-w-5xl mx-auto px-4"
            >
              {stats.map((stat, index) => (
                <MotionDiv
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-magenta/10 via-pink-500/5 to-red-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Card className="relative border-0 bg-slate-900/40 backdrop-blur-xl shadow-lg shadow-slate-950/20 group-hover:shadow-xl group-hover:shadow-slate-950/30 transition-all duration-500">
                    <CardHeader className="pb-2">
                      <CardDescription className="text-sm text-slate-400/80 font-light group-hover:text-slate-300/90 transition-colors duration-500">
                        {stat.prefix}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-100 via-magenta to-red-200 bg-clip-text text-transparent group-hover:from-magenta group-hover:via-pink-500 group-hover:to-red-500 transition-all duration-500">
                        {stat.number}
                      </CardTitle>
                      <CardDescription className="text-slate-300/80 text-sm font-light group-hover:text-slate-200/90 transition-colors duration-500 mt-1">
                        {stat.label}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </MotionDiv>
              ))}
            </MotionDiv>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <MotionDiv
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-magenta/20 via-pink-500/20 to-red-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Link href="/dashboard">
                  <Button variant="default" size="lg" className="relative bg-gradient-to-r from-magenta/80 via-pink-500/80 to-magenta/80 hover:from-magenta/90 hover:via-pink-500/90 hover:to-magenta/90 text-white px-8 py-6 text-lg rounded-lg shadow-lg shadow-magenta/10 hover:shadow-magenta/20 transition-all duration-500 flex items-center gap-2 min-w-[200px] justify-center backdrop-blur-sm overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    Start Free Trial
                    <ArrowRightCircleIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                  </Button>
                </Link>
              </MotionDiv>

              <MotionDiv
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 via-slate-400/10 to-slate-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Link href="#features">
                  <Button variant="outline" size="lg" className="relative bg-slate-900/60 hover:bg-slate-900/80 text-slate-200 border border-slate-700/30 hover:border-slate-700/50 px-8 py-6 text-lg rounded-lg shadow-lg shadow-slate-950/10 hover:shadow-slate-950/20 transition-all duration-500 min-w-[200px] justify-center backdrop-blur-sm overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    Explore Features
                  </Button>
                </Link>
              </MotionDiv>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <Link href="#features" className="group flex flex-col items-center">
            <p className="text-sm font-light text-slate-400/80 group-hover:text-slate-200 transition-colors duration-500">
              Discover More
            </p>
            <ChevronDown className="w-6 h-6 text-slate-400/80 group-hover:text-slate-200 animate-bounce mt-2 group-hover:animate-none group-hover:-translate-y-1 transition-all duration-300" />
          </Link>
        </MotionDiv>
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

