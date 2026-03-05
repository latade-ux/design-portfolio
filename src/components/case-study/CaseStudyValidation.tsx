"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type { CaseStudyLabelledSection } from "@/lib/types";

interface Props {
  section: CaseStudyLabelledSection;
}

export default function CaseStudyValidation({ section }: Props) {
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
        <motion.div variants={fadeInUp} className="mb-10">
          <p className="text-sm font-mono text-accent-light mb-3 tracking-wide uppercase">
            {section.label}
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            {section.heading}
          </h2>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="max-w-3xl space-y-6"
        >
          {section.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-base md:text-lg text-muted leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
