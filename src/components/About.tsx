"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const traits = [
  {
    label: "Systems Thinker",
    description:
      "I design holistically — connecting user flows, data models, and business logic into coherent product experiences.",
  },
  {
    label: "AI Design Fluency",
    description:
      "Deep experience designing for AI explainability, recommendation systems, and generative interfaces that build user trust.",
  },
  {
    label: "Enterprise Complexity",
    description:
      "Comfortable navigating multi-stakeholder environments, dense data requirements, and platform-scale product decisions.",
  },
  {
    label: "Outcome-Driven",
    description:
      "I measure success by metrics moved and problems solved, not screens delivered. Every design decision maps to a business outcome.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-surface/50">
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
            About
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            A bit about me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Bio */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <div className="space-y-5 text-muted leading-relaxed">
              <p>
                I&apos;m a Senior Product Designer based in the UK, specialising
                in AI-powered enterprise products. Over the past 7+ years,
                I&apos;ve worked across AdTech, FinTech, and B2B SaaS — always
                at the intersection of complex data and human-centred design.
              </p>
              <p>
                I believe the best design makes complexity feel effortless.
                Whether it&apos;s an AI recommendation engine or a multi-step
                eligibility workflow, I focus on clarity, trust, and measurable
                outcomes.
              </p>
              <p>
                I&apos;m product-minded, not just pixel-focused. I think in
                systems, collaborate closely with engineering and data teams, and
                care deeply about the impact design has on real business metrics.
              </p>
            </div>

            {/* Blockquote */}
            <blockquote className="mt-8 pl-5 border-l-2 border-accent/40">
              <p className="text-foreground italic">
                &ldquo;Good design in AI isn&apos;t about making the technology
                impressive — it&apos;s about making the outcome trustworthy.&rdquo;
              </p>
            </blockquote>
          </motion.div>

          {/* Traits grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {traits.map((trait) => (
              <motion.div
                key={trait.label}
                variants={fadeInUp}
                className="rounded-xl border border-card-border bg-card p-6 hover:border-border-hover transition-colors duration-300"
              >
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  {trait.label}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {trait.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
