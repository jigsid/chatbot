"use client"
import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    setSending(true);

    emailjs.sendForm('service_xx1z4se', 'template_76ab09d', form.current, 'aiOWrRF1FXzLf8_e_')
      .then(
        (result) => {
          console.log(result.text);
          setSending(false);
          setSent(true);
          e.currentTarget.reset();
          setTimeout(() => setSent(false), 5000);
        },
        (error) => {
          console.log(error.text);
          setSending(false);
        }
      );
  };

  return (
    <div className="p-6 sm:p-10">
      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-white">Talk to a human</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-300/85">
            Questions about setup, pricing, or compliance? We reply within one business day.
          </p>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-center gap-3 text-slate-200">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <MapPin className="h-4 w-4 text-cyan-300" />
              </span>
              1234 Street, NYC, USA
            </li>
            <li className="flex items-center gap-3 text-slate-200">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Phone className="h-4 w-4 text-violet-300" />
              </span>
              (123) 456-7890
            </li>
            <li className="flex items-center gap-3 text-slate-200">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Mail className="h-4 w-4 text-fuchsia-300" />
              </span>
              info@smartrepai.com
            </li>
          </ul>
          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-3 text-[13px] text-emerald-200">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Median first reply: under 4 hours
          </div>
        </div>

        <form ref={form} onSubmit={sendEmail} className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="h-12 w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 text-[15px] text-white placeholder:text-slate-400 outline-none backdrop-blur transition focus:border-cyan-300/60 focus:bg-white/[0.09]"
            />
            <input
              type="email"
              name="email"
              placeholder="Work email"
              required
              className="h-12 w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 text-[15px] text-white placeholder:text-slate-400 outline-none backdrop-blur transition focus:border-cyan-300/60 focus:bg-white/[0.09]"
            />
          </div>
          <textarea
            name="message"
            placeholder="How can we help? Tell us about your volume, channels, and goals…"
            rows={5}
            required
            className="w-full resize-none rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3.5 text-[15px] leading-relaxed text-white placeholder:text-slate-400 outline-none backdrop-blur transition focus:border-cyan-300/60 focus:bg-white/[0.09]"
          />
          <button
            type="submit"
            disabled={sending}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 font-semibold text-white shadow-[0_16px_40px_-12px_rgba(139,92,246,0.7)] transition hover:brightness-110 disabled:opacity-60"
          >
            {sent ? (
              <>
                <CheckCircle2 className="h-[18px] w-[18px]" /> Message sent — we&apos;ll be in touch
              </>
            ) : sending ? (
              "Sending…"
            ) : (
              <>
                Send message <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-400">No spam. No pressure. Just a useful reply.</p>
        </form>
      </div>
    </div>
  );
};

export default Contact;
