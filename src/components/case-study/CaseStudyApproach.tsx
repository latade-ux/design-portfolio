"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type { CaseStudySection } from "@/lib/types";

interface Props {
  approach: CaseStudySection[];
}

function ApproachStep({
  step,
  index,
}: {
  step: CaseStudySection;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div variants={fadeInUp} className="flex gap-6 md:gap-8">
        {/* Step number */}
        <div className="hidden md:flex shrink-0 items-start">
          <span className="text-5xl font-bold text-border select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        {/* Step content */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
            {step.heading}
          </h3>
          <div className="space-y-4">
            {step.body.map((paragraph, i) => (
              <p
                key={i}
                className="text-base text-muted leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CaseStudyApproach({ approach }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 px-6 bg-surface/50">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.div variants={fadeInUp}>
            <p className="text-sm font-mono text-accent-light mb-3 tracking-wide uppercase">
              The Approach
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
              How I got there
            </h2>
          </motion.div>
        </motion.div>
        <div className="space-y-16">
          {approach.map((step, i) => (
            <ApproachStep key={step.heading} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
