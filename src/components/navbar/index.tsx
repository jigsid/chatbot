"use client";

import Image from "next/image";
import * as React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { MotionDiv, MotionNav, navVariants } from "@/components/motion-wrapper";
import { Menu, X, LogIn, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#news", label: "Insights" },
  { href: "#contact", label: "Contact" },
];

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <MotionNav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto mt-3 flex max-w-7xl items-center justify-between gap-3 rounded-2xl border px-5 py-2.5 transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-[#0A0A14]/80 shadow-[0_16px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "border-white/[0.06] bg-black/30 backdrop-blur-md"
        } mx-[7%] sm:mx-[11%] lg:mx-auto`}
      >
        <Link href="/" className="group flex items-center gap-2">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="SmartRep AI logo"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-[17px] font-bold tracking-tight text-white">
            Smart<span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">Rep</span> AI
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          <SignedIn>
            <Link href="/dashboard">
              <Button className="rounded-xl bg-white px-5 font-semibold text-slate-950 transition hover:bg-slate-200">
                Dashboard <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <div className="rounded-full border border-white/15 p-0.5">
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <Link href="/dashboard" className="text-sm font-medium text-slate-300 transition hover:text-white">
              Sign in
            </Link>
            <Link href="/dashboard">
              <Button className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 font-semibold text-white shadow-lg transition hover:brightness-110">
                <LogIn className="mr-1.5 h-4 w-4" /> Get started
              </Button>
            </Link>
          </SignedOut>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-white md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <MotionDiv
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28 }}
        className="mx-[7%] overflow-hidden sm:mx-[11%] md:hidden"
      >
        <div className="mt-2 rounded-2xl border border-white/10 bg-[#0A0A14]/95 p-3 shadow-2xl backdrop-blur-xl">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-[15px] font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-white/10 pt-3">
            <SignedIn>
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                <Button className="w-full rounded-xl bg-white font-semibold text-slate-950">Dashboard</Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                <Button className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold text-white">
                  Get started
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </MotionDiv>
    </MotionNav>
  );
}

export default NavBar;
