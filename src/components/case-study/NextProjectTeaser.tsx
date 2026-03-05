"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type { Project } from "@/lib/types";

interface Props {
  nextProject: Project;
}

export default function NextProjectTeaser({ nextProject }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 px-6 bg-surface/50 border-t border-border">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-6xl"
      >
        <Link
          href={`/work/${nextProject.slug}`}
          className="block group"
        >
          <motion.div variants={fadeInUp}>
            <p className="text-sm font-mono text-muted-foreground mb-4 tracking-wide uppercase">
              Next Project
            </p>
            <div className="flex items-center justify-between gap-6">
              <div>
                <p className="text-sm font-mono text-accent-light mb-2">
                  {nextProject.company}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-accent-light transition-colors duration-200">
                  {nextProject.title}
                </h3>
              </div>
              <svg
                className="w-8 h-8 text-muted shrink-0 group-hover:text-accent-light group-hover:translate-x-2 transition-all duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
