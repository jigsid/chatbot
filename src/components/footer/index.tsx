import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import Image from 'next/image';

const cols = [
  {
    h: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Live demo", href: "/dashboard" },
      { label: "Integrations", href: "/dashboard" },
    ],
  },
  {
    h: "Resources",
    links: [
      { label: "Insights", href: "#news" },
      { label: "Contact", href: "#contact" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Support", href: "#contact" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050508] text-slate-300">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[720px] -translate-x-1/2 rounded-full bg-violet-700/20 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-[7%] py-14 sm:px-[11%]">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" width={40} height={40} alt="SmartRep AI logo" />
              <span className="text-lg font-bold text-white">
                Smart<span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">Rep</span> AI
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Conversational AI that supports, sells, and books — trained on your business, live in minutes.
            </p>
            <p className="mt-4 text-sm text-slate-400">Contact: info@smartrepai.com</p>
            <div className="mt-5 flex gap-2.5">
              {[
                { href: "https://facebook.com", Icon: FaFacebookF, label: "Facebook" },
                { href: "https://twitter.com", Icon: FaTwitter, label: "Twitter" },
                { href: "https://instagram.com", Icon: FaInstagram, label: "Instagram" },
                { href: "https://www.linkedin.com/in/jigsid", Icon: FaLinkedinIn, label: "LinkedIn" },
                { href: "https://github.com/jigsid", Icon: FaGithub, label: "GitHub" },
              ].map(({ href, Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 transition hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
                >
                  <Icon size={15} />
                </Link>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.h}>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{c.h}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-slate-300 transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Get started</p>
            <p className="mt-4 text-sm text-slate-400">Free to start. No credit card required.</p>
            <Link
              href="/dashboard"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
            >
              Launch your AI rep
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[13px] text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} SmartRep AI. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
