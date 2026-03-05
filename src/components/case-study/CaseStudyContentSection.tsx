"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type { CaseStudyContentSection as ContentSectionType } from "@/lib/types";

interface Props {
  section: ContentSectionType;
}

export default function CaseStudyContentSection({ section }: Props) {
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
        <motion.ul
          variants={fadeInUp}
          className="max-w-3xl space-y-4"
        >
          {section.items.map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-light/60" />
              <p className="text-base md:text-lg text-muted leading-relaxed">
                {item}
              </p>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
