"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { testimonials } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const MAX_LINES = 6;
const LINE_HEIGHT = 1.625; // leading-relaxed = 1.625
const FONT_SIZE = 14; // text-sm = 14px
const MAX_HEIGHT = MAX_LINES * LINE_HEIGHT * FONT_SIZE;

function TestimonialCard({
  t,
  onOpenModal,
}: {
  t: (typeof testimonials)[number];
  onOpenModal: (t: (typeof testimonials)[number]) => void;
}) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const check = () => {
      setIsTruncated(el.scrollHeight > MAX_HEIGHT + 2);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <motion.div
      variants={fadeInUp}
      className="relative rounded-xl border border-card-border bg-card p-8 hover:border-border-hover transition-colors duration-300 flex flex-col"
    >
      {/* Quote mark */}
      <div className="text-4xl text-accent/20 font-serif leading-none mb-4">
        &ldquo;
      </div>

      {/* Quote text — clamped */}
      <p
        ref={textRef}
        className="text-sm text-muted leading-relaxed mb-2 line-clamp-6"
      >
        {t.quote}
      </p>

      {/* Read more button */}
      {isTruncated && (
        <button
          onClick={() => onOpenModal(t)}
          className="text-xs text-accent-light hover:text-accent font-medium mb-4 self-start cursor-pointer transition-colors"
        >
          Read more
        </button>
      )}

      <div className="mt-auto pt-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-purple-500/30 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-accent-light">
              {t.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialModal({
  testimonial,
  onClose,
}: {
  testimonial: (typeof testimonials)[number];
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-card-border bg-card p-8 md:p-10 shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-hover transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
          aria-label="Close"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>

        {/* Quote mark */}
        <div className="text-5xl text-accent/20 font-serif leading-none mb-6">
          &ldquo;
        </div>

        {/* Full quote — with paragraph breaks */}
        <div className="text-sm md:text-base text-muted leading-relaxed mb-8 space-y-4">
          {testimonial.quote.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Attribution */}
        <div className="flex items-center gap-3 pt-6 border-t border-card-border">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/30 to-purple-500/30 flex items-center justify-center shrink-0">
            <span className="text-sm font-semibold text-accent-light">
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <p className="text-base font-medium text-foreground">
              {testimonial.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {testimonial.role}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTestimonial, setActiveTestimonial] = useState<
    (typeof testimonials)[number] | null
  >(null);

  const closeModal = useCallback(() => setActiveTestimonial(null), []);

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
          {/* Section header */}
          <motion.div variants={fadeInUp} className="mb-16">
            <p className="text-sm font-mono text-accent-light mb-3 tracking-wide uppercase">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              What collaborators say
            </h2>
          </motion.div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard
                key={t.name}
                t={t}
                onOpenModal={setActiveTestimonial}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Overlay modal */}
      <AnimatePresence>
        {activeTestimonial && (
          <TestimonialModal
            testimonial={activeTestimonial}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}
