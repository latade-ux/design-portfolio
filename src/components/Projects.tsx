"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group relative rounded-xl border border-card-border bg-card overflow-hidden hover:border-border-hover transition-all duration-300"
    >
      {/* Gradient header area */}
      <div
        className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80" />
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-20 grid-pattern" />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-xs font-mono text-accent-light mb-2 tracking-wide uppercase">
          {project.company}
        </p>
        <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent-light transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed mb-4">
          {project.summary}
        </p>

        {/* Outcomes */}
        <div className="space-y-2 mb-5">
          {project.outcomes.map((outcome, i) => (
            <div key={i} className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4"
                />
              </svg>
              <span className="text-sm text-muted">{outcome}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-mono rounded-md bg-surface text-muted-foreground border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom hover accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gradient-start to-gradient-end scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" className="py-24 md:py-32 px-6">
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
            Selected Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Projects that moved metrics
          </h2>
          <p className="text-muted mt-4 max-w-xl">
            A selection of enterprise-scale design work spanning AI systems,
            data platforms, and complex workflows.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
