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
    <main className="overflow-hidden">
      <NavBar />

      {/* Hero Section */}
      <MotionSection
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-[95vh] pt-28 flex items-center justify-center relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(124,58,237,0.03),_rgba(15,23,42,0)_50%)]" />

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] mix-blend-luminosity" />

        {/* Animated background elements - Ultra subtle */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <MotionDiv
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.02, 0.04, 0.02],
                scale: [1, 1.05, 1],
                x: [0, 30, 0],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 25 + i * 2,
                repeat: Infinity,
                delay: i * 4,
                ease: "easeInOut",
              }}
              className={clsx(
                "absolute rounded-full blur-3xl mix-blend-soft-light",
                i % 2 === 0
                  ? "bg-gradient-to-r from-violet-500/[0.03] via-fuchsia-500/[0.02] to-slate-400/[0.01]"
                  : "bg-gradient-to-r from-slate-400/[0.02] via-violet-500/[0.02] to-slate-400/[0.01]"
              )}
              style={{
                width: 500 + i * 100,
                height: 500 + i * 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${i * 60}deg)`,
              }}
            />
          ))}
        </div>

        {/* Light Beams - Ultra subtle */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.07]">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-violet-500/10 to-slate-400/10 rounded-full blur-3xl transform rotate-45 animate-pulse mix-blend-soft-light" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-slate-400/10 to-violet-500/10 rounded-full blur-3xl transform -rotate-45 animate-pulse mix-blend-soft-light" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center flex-col gap-12 mt-6">
            <MotionSpan
              variants={fadeInDown}
              className="text-slate-200 bg-slate-800/20 backdrop-blur-sm px-8 py-3 rounded-full text-sm font-medium tracking-wider flex items-center gap-3 shadow-lg shadow-slate-950/20 border border-slate-700/20 hover:bg-slate-800/30 hover:border-slate-700/30 transition-all duration-500"
            >
              <Sparkles className="w-4 h-4 text-violet-300/80 animate-pulse" />
              <span className="bg-gradient-to-r from-slate-200 via-violet-200 to-slate-200 bg-clip-text text-transparent">
                Enterprise-Grade AI Customer Service
              </span>
              <Sparkles className="w-4 h-4 text-violet-300/80 animate-pulse" />
            </MotionSpan>

            <MotionDiv
              variants={textContainer}
              className="relative text-center"
            >
              <div className="relative">
                <MotionDiv className="flex justify-center flex-wrap gap-1">
                  {SmartRepTitle.map((letter, index) => (
                    <MotionDiv
                      variants={letterAnimation}
                      key={index}
                      className={clsx(
                        "text-7xl sm:text-8xl md:text-9xl font-bold bg-gradient-to-b from-slate-50 via-slate-200 to-slate-300/80 bg-clip-text text-transparent hover:from-violet-200 hover:via-violet-100 hover:to-slate-200 transition-all duration-500",
                        {
                          "mr-8": letter === " ",
                        }
                      )}
                      whileHover={{
                        scale: 1.05,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                    >
                      {letter}
                    </MotionDiv>
                  ))}
                </MotionDiv>
              </div>
            </MotionDiv>

            <MotionP
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto text-lg text-slate-300/90 leading-relaxed px-4 font-light"
            >
              Transform your customer service with enterprise-grade AI
              technology. Our intelligent platform handles inquiries, processes
              transactions, and manages appointments with unmatched efficiency
              and precision.
            </MotionP>

            {/* Stats Section */}
            <MotionDiv
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-4 w-full max-w-5xl mx-auto px-4"
            >
              {stats.map((stat, index) => (
                <MotionDiv
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="text-center p-6 rounded-xl bg-slate-800/20 backdrop-blur-sm border border-slate-700/20 shadow-lg shadow-slate-950/20 hover:shadow-xl hover:bg-slate-800/30 hover:border-slate-700/30 transition-all duration-500 group"
                >
                  <p className="text-sm text-slate-400/80 font-light group-hover:text-slate-300/80 transition-colors duration-500">
                    {stat.prefix}
                  </p>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-50 via-violet-100 to-slate-50 bg-clip-text text-transparent my-2 group-hover:from-violet-200 group-hover:via-slate-50 group-hover:to-violet-200 transition-all duration-500">
                    {stat.number}
                  </h3>
                  <p className="text-slate-300/80 text-sm font-light group-hover:text-slate-200/90 transition-colors duration-500">
                    {stat.label}
                  </p>
                </MotionDiv>
              ))}
            </MotionDiv>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-20">
              <MotionDiv
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/dashboard">
                  <Button className="relative bg-violet-500/80 hover:bg-violet-500/90 text-white px-8 py-6 text-lg rounded-lg shadow-lg shadow-violet-500/5 hover:shadow-violet-500/10 transition-all duration-500 flex items-center gap-2 min-w-[200px] justify-center backdrop-blur-sm overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-400/0 via-violet-400/10 to-violet-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    Start Free Trial
                    <ArrowRightCircleIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                  </Button>
                </Link>
              </MotionDiv>

              <MotionDiv
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="#features">
                  <Button className="relative bg-slate-900/50 hover:bg-slate-900/70 text-slate-200 border border-slate-700/20 hover:border-slate-700/30 px-8 py-6 text-lg rounded-lg shadow-lg shadow-slate-950/10 hover:shadow-slate-950/20 transition-all duration-500 min-w-[200px] justify-center backdrop-blur-sm overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-700/0 via-slate-700/10 to-slate-700/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    View Features
                  </Button>
                </Link>
              </MotionDiv>
            </div>
          </div>
        </div>

        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <Link href="#features" className="group flex flex-col items-center">
            <p className="text-sm font-light text-slate-400/80 group-hover:text-slate-200 transition-colors duration-500">
              Explore Features
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
    </main>
  );
}
