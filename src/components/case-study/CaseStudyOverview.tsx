"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type { ProjectOverviewMeta } from "@/lib/types";

interface Props {
  overview: ProjectOverviewMeta;
}

export default function CaseStudyOverview({ overview }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const items = [
    { label: "Role", value: overview.role },
    { label: overview.timelineLabel || "Timeline", value: overview.timeline },
    { label: "Team", value: overview.team },
    { label: "Tools", value: overview.tools.join(", ") },
  ];

  return (
    <section className="py-12 md:py-16 px-6 border-b border-border">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {items.map((item) => (
          <motion.div key={item.label} variants={fadeInUp}>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-2">
              {item.label}
            </p>
            <p className="text-sm text-foreground font-medium leading-relaxed">
              {item.value}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
