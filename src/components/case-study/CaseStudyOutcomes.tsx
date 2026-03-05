"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type { CaseStudyOutcome } from "@/lib/types";

interface Props {
  outcomes: CaseStudyOutcome[];
  label?: string;
  heading?: string;
}

export default function CaseStudyOutcomes({ outcomes, label, heading }: Props) {
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
        <motion.div variants={fadeInUp} className="mb-16">
          <p className="text-sm font-mono text-accent-light mb-3 tracking-wide uppercase">
            {label || "Key Outcomes"}
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            {heading || "Results that mattered"}
          </h2>
        </motion.div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${outcomes.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-6`}>
          {outcomes.map((outcome) => (
            <motion.div
              key={outcome.metric}
              variants={fadeInUp}
              className="rounded-xl border border-card-border bg-card p-6"
            >
              <p className="text-3xl md:text-4xl font-bold gradient-text mb-3">
                {outcome.metric}
                {outcome.badge && (
                  <span
                    className="ml-2 text-sm md:text-base font-semibold text-emerald-400 align-middle"
                    style={{ WebkitTextFillColor: "rgb(52 211 153)" }}
                  >
                    ({outcome.badge})
                  </span>
                )}
              </p>
              <p className="text-sm text-muted leading-relaxed">
                {outcome.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
