"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--accent)_0%,_transparent_70%)] opacity-[0.07]" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        {/* Badge */}
        <motion.div variants={fadeInUp} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface/50 text-xs text-muted font-mono tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available for new opportunities
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeInUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          Designing AI-powered
          <br />
          systems that turn{" "}
          <span className="gradient-text">complexity into clarity</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I'm Latade, a Senior Product Designer with 7+ years shaping
          enterprise SaaS, AI workflows, and data-rich platforms. I curate
          purposeful experiences that solve real problems, and feel delightful
          to use every single day.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity"
          >
            View Work
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-surface-hover hover:border-border-hover transition-all"
          >
            Contact
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeInUp}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 mx-auto flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
