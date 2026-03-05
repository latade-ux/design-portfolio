"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type { CaseStudyLearning } from "@/lib/types";

interface Props {
  learnings: CaseStudyLearning;
}

export default function CaseStudyLearnings({ learnings }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 px-6 bg-surface/50">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-4xl"
      >
        <motion.div variants={fadeInUp} className="mb-12">
          <p className="text-sm font-mono text-accent-light mb-3 tracking-wide uppercase">
            {learnings.label}
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            {learnings.heading}
          </h2>
        </motion.div>

        <ul className="space-y-6">
          {learnings.items.map((item, i) => (
            <motion.li
              key={i}
              variants={fadeInUp}
              className="flex gap-4 items-start"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-light" />
              <p className="text-base md:text-lg text-muted leading-relaxed">
                {item}
              </p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
