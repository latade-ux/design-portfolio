"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--accent)_0%,_transparent_70%)] opacity-[0.07]" />

      {/* Content — split layout */}
      <div className="relative z-10 mx-auto max-w-6xl w-full px-6 py-24 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left — Text content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
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
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-6"
            >
              Crafting Digital Experiences that turn{" "}
              <span className="gradient-text">complexity into clarity</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted max-w-xl mb-10 leading-relaxed"
            >
              I&apos;m Latade, a Senior Product Designer with 7+ years shaping
              enterprise SaaS, AI workflows, and data-rich platforms. I curate
              purposeful experiences that solve real problems, and feel delightful
              to use every single day.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <a
                href="#work"
                className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity"
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
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-surface-hover hover:border-border-hover transition-all"
              >
                Contact
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Avatar */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex justify-center md:justify-end"
          >
            <motion.div
              variants={scaleIn}
              className="relative"
            >
              {/* Glow ring behind avatar */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-accent/20 to-purple-500/20 blur-2xl" />

              {/* Avatar container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden ring-2 ring-border/50 ring-offset-4 ring-offset-background">
                <Image
                  src="/LT_Avatar.svg"
                  alt="Latade — Senior Product Designer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Decorative accent dot */}
              <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-accent border-4 border-background" />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator — centered below */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="hidden md:flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
