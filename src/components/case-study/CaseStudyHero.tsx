"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type { Project } from "@/lib/types";

interface Props {
  project: Project;
}

export default function CaseStudyHero({ project }: Props) {
  return (
    <section className="relative overflow-hidden">
      {/* Hero image */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
        )}
        {/* Gradient fallback */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
        />
        {/* Bottom fade to background */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      {/* Text overlay */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative -mt-40 md:-mt-48 px-6 pb-12"
      >
        <div className="mx-auto max-w-6xl">
          <motion.p
            variants={fadeInUp}
            className="text-sm font-mono text-accent-light mb-3 tracking-wide uppercase"
          >
            {project.company}
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            {project.title}
          </motion.h1>
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-mono rounded-md bg-surface/80 text-muted-foreground border border-border backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
