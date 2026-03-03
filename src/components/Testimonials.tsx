"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { testimonials } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 px-6">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-6xl"
      >
        {/* Section header */}
        <motion.div variants={fadeInUp} className="mb-16">
          <p className="text-sm font-mono text-accent-light mb-3 tracking-wide uppercase">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What collaborators say
          </h2>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeInUp}
              className="relative rounded-xl border border-card-border bg-card p-8 hover:border-border-hover transition-colors duration-300"
            >
              {/* Quote mark */}
              <div className="text-4xl text-accent/20 font-serif leading-none mb-4">
                &ldquo;
              </div>

              <p className="text-sm text-muted leading-relaxed mb-6">
                {t.quote}
              </p>

              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-purple-500/30 flex items-center justify-center">
                  <span className="text-xs font-semibold text-accent-light">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
