"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type { CaseStudyFeedback as FeedbackType } from "@/lib/types";

interface Props {
  feedback: FeedbackType;
}

export default function CaseStudyFeedback({ feedback }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-28 px-6">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.p
          variants={fadeInUp}
          className="text-sm font-mono text-accent-light mb-8 tracking-wide uppercase"
        >
          Customer Feedback
        </motion.p>

        <motion.blockquote variants={fadeInUp} className="relative">
          <span className="absolute -top-6 -left-2 text-6xl text-accent-light/20 font-serif leading-none select-none">
            &ldquo;
          </span>
          <p className="text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed font-light italic">
            {feedback.quote}
          </p>
        </motion.blockquote>

        <motion.p
          variants={fadeInUp}
          className="mt-8 text-sm text-muted font-medium tracking-wide"
        >
          &mdash; {feedback.name}
        </motion.p>
      </motion.div>
    </section>
  );
}
