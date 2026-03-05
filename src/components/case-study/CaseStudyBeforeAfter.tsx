"use client";

import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type { CaseStudyBeforeAfter as BeforeAfterType } from "@/lib/types";

interface Props {
  data: BeforeAfterType;
}

export default function CaseStudyBeforeAfter({ data }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expandedImage, setExpandedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const openLightbox = useCallback((src: string, alt: string) => {
    setExpandedImage({ src, alt });
  }, []);

  const closeLightbox = useCallback(() => {
    setExpandedImage(null);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    if (expandedImage) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [expandedImage, closeLightbox]);

  return (
    <>
      <section className="py-24 md:py-32 px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeInUp} className="mb-16">
            <p className="text-sm font-mono text-accent-light mb-3 tracking-wide uppercase">
              Design Evolution
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
              From friction to clarity
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Before Panel */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <div>
                <span className="inline-block mb-3 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider rounded-full bg-red-500/15 text-red-400 border border-red-500/20">
                  {data.before.label}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    openLightbox(data.before.image, data.before.label)
                  }
                  className="group relative block w-full rounded-2xl overflow-hidden border border-card-border bg-card cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light/50"
                  aria-label={`Expand ${data.before.label} image`}
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={data.before.image}
                      alt={data.before.label}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  {/* Expand hint overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-gray-900 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M13.28 7.78l3.22-3.22v2.69a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.69l-3.22 3.22a.75.75 0 001.06 1.06zM2 17.25v-4.5a.75.75 0 011.5 0v2.69l3.22-3.22a.75.75 0 011.06 1.06L4.56 16.5h2.69a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" />
                      </svg>
                      Click to expand
                    </span>
                  </div>
                </button>
              </div>
              <ul className="space-y-3 pl-1">
                {data.before.points.map((point, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-400/60" />
                    <p className="text-sm text-muted leading-relaxed">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* After Panel */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <div>
                <span className="inline-block mb-3 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  {data.after.label}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    openLightbox(data.after.image, data.after.label)
                  }
                  className="group relative block w-full rounded-2xl overflow-hidden border border-card-border bg-card cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light/50"
                  aria-label={`Expand ${data.after.label} image`}
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={data.after.image}
                      alt={data.after.label}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  {/* Expand hint overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-gray-900 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M13.28 7.78l3.22-3.22v2.69a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.69l-3.22 3.22a.75.75 0 001.06 1.06zM2 17.25v-4.5a.75.75 0 011.5 0v2.69l3.22-3.22a.75.75 0 011.06 1.06L4.56 16.5h2.69a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" />
                      </svg>
                      Click to expand
                    </span>
                  </div>
                </button>
              </div>
              <ul className="space-y-3 pl-1">
                {data.after.points.map((point, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                    <p className="text-sm text-muted leading-relaxed">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Close expanded image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>

            {/* Hint text */}
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/50 font-mono">
              Click anywhere or press Esc to close
            </p>

            {/* Expanded image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-5xl max-h-[85vh] rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={expandedImage.src}
                alt={expandedImage.alt}
                width={1920}
                height={1200}
                className="w-full h-auto object-contain"
                quality={95}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
