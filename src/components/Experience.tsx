"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-24 md:py-32 px-6">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-4xl"
      >
        {/* Section header */}
        <motion.div variants={fadeInUp} className="mb-16">
          <p className="text-sm font-mono text-accent-light mb-3 tracking-wide uppercase">
            Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Where I&apos;ve made impact
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-border" />

          <div className="space-y-12">
            {experiences.map((exp) => (
              <motion.div
                key={exp.company}
                variants={fadeInUp}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1">
                  <div className="w-10 h-10 rounded-full bg-background border-2 border-border flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                  </div>
                </div>

                {/* Content */}
                <div className="rounded-xl border border-card-border bg-card p-6 hover:border-border-hover transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-accent-light mb-4">
                    {exp.company}{" "}
                    <span className="text-muted-foreground">
                      · {exp.location}
                    </span>
                  </p>
                  <ul className="space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <span className="text-muted-foreground mt-1.5 shrink-0">
                          –
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
