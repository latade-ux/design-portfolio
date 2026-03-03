"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" className="py-24 md:py-32 px-6 bg-surface/50">
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
            How I Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Design process
          </h2>
          <p className="text-muted mt-4 max-w-xl">
            A structured approach shaped by years of designing for enterprise
            complexity, AI systems, and cross-functional teams.
          </p>
        </motion.div>

        {/* Process timeline */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-border" />

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.phase}
                variants={fadeInUp}
                className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-12 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Step indicator */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                  <div className="w-10 h-10 rounded-full bg-background border-2 border-accent flex items-center justify-center">
                    <span className="text-xs font-mono font-bold text-accent-light">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${
                    index % 2 === 1 ? "md:text-right" : ""
                  }`}
                >
                  <div className="rounded-xl border border-card-border bg-card p-6 hover:border-border-hover transition-colors duration-300">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {step.phase}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-3rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
