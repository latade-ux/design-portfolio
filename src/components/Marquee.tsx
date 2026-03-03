"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { marqueeItems } from "@/lib/data";
import { fadeIn } from "@/lib/motion";

export default function Marquee() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="py-16 border-y border-border overflow-hidden"
    >
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Marquee track */}
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="mx-8 text-lg md:text-xl font-medium text-muted-foreground/60 flex items-center gap-8"
            >
              {item}
              <span className="text-accent/40">&#x2022;</span>
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
