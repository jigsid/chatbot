"use client";

import Image from "next/image";
import * as React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { MotionDiv, MotionNav, navVariants } from "@/components/motion-wrapper";
import { Menu, LogIn } from "lucide-react";
import { useEffect, useState } from "react";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <MotionNav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-lg shadow-lg border-b border-magenta/30"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3 max-w-7xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.png"
              width={60}
              height={60}
              alt="logo"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-xl font-bold -ml-3 bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent group-hover:from-violet-300 group-hover:to-slate-200 transition-all duration-300">
              Smart
              <span className="text-violet-300 group-hover:text-slate-200">
                Rep
              </span>{" "}
              AI
            </span>
          </Link>
        </MotionDiv>

        {/* Desktop Menu */}
        <MotionDiv
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block"
        >
          <ul className="flex gap-8 font-medium text-sm text-slate-300">
            {[
              { href: "#features", label: "Features" },
              { href: "#pricing", label: "Pricing" },
              { href: "#news", label: "News Room" },
              { href: "#contact", label: "Contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative hover:text-slate-100 transition-colors duration-300 py-2"
                >
                  <span>{item.label}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-300/50 scale-x-0 transition-transform duration-300 origin-left hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </MotionDiv>

        {/* Auth Buttons */}
        <MotionDiv
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex gap-4 items-center"
        >
          <SignedIn>
            <Link href="/dashboard">
              <Button className="bg-violet-500/80 hover:bg-violet-500/90 text-white px-6 py-2 rounded-lg shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 transition-all duration-300 backdrop-blur-sm">
                Dashboard
              </Button>
            </Link>
            <div className="border-2 border-slate-700/50 rounded-full transition-transform duration-300 hover:scale-105 hover:border-violet-300/30 hover:shadow-lg hover:shadow-violet-500/10">
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <Link href="/dashboard">
              <Button className="bg-violet-500/80 hover:bg-violet-500/90 text-white px-6 py-2 rounded-lg shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm">
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            </Link>
          </SignedOut>
        </MotionDiv>

        {/* Mobile Menu Button */}
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden"
        >
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-slate-100 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </MotionDiv>
      </div>

      {/* Mobile Menu */}
      <MotionDiv
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-slate-900/80 backdrop-blur-lg border-t border-slate-800/30"
      >
        <div className="px-4 py-4">
          <ul className="flex flex-col gap-3 font-medium text-slate-300">
            {[
              { href: "#features", label: "Features" },
              { href: "#pricing", label: "Pricing" },
              { href: "#news", label: "News Room" },
              { href: "#contact", label: "Contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-4 hover:bg-slate-800/50 rounded-lg transition-colors duration-300 hover:text-slate-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 border-t border-slate-800/30">
              <SignedIn>
                <div className="flex items-center gap-4 px-4">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1"
                  >
                    <Button className="w-full bg-violet-500/80 hover:bg-violet-500/90 text-white px-6 py-2 rounded-lg shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 transition-all duration-300 backdrop-blur-sm">
                      Dashboard
                    </Button>
                  </Link>
                  <div className="border-2 border-slate-700/50 rounded-full transition-transform duration-300 hover:scale-105 hover:border-violet-300/30 hover:shadow-lg hover:shadow-violet-500/10">
                    <UserButton />
                  </div>
                </div>
              </SignedIn>
              <SignedOut>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4"
                >
                  <Button className="w-full bg-violet-500/80 hover:bg-violet-500/90 text-white px-6 py-2 rounded-lg shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Button>
                </Link>
              </SignedOut>
            </li>
          </ul>
        </div>
      </MotionDiv>
    </MotionNav>
  );
}

export default NavBar;
