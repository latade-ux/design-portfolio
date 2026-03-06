"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

interface Props {
  src: string;
  whiteBg?: boolean;
}

export default function CaseStudyVideo({ src, whiteBg }: Props) {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Ensure mobile browsers can load the video
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
    }
  }, [src]);

  if (whiteBg) {
    return (
      <section className="py-0 px-0" style={{ backgroundColor: "#ffffff" }}>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto max-w-5xl px-6 py-16 md:py-24"
        >
          <motion.div variants={fadeInUp} className="mb-10">
            <p className="text-sm font-mono text-[#7c5cfc] mb-3 tracking-wide uppercase">
              Prototype Walkthrough
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              See it in action
            </h2>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-lg"
          >
            <video
              ref={videoRef}
              controls
              preload="auto"
              playsInline
              // @ts-expect-error webkit-playsinline is needed for older iOS
              webkit-playsinline="true"
              className="w-full h-auto block"
              src={src}
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 px-6">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-5xl"
      >
        <motion.div variants={fadeInUp} className="mb-10">
          <p className="text-sm font-mono text-accent-light mb-3 tracking-wide uppercase">
            Prototype Walkthrough
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            See it in action
          </h2>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="relative rounded-2xl overflow-hidden border border-card-border bg-card"
        >
          <video
            ref={videoRef}
            controls
            preload="auto"
            playsInline
            // @ts-expect-error webkit-playsinline is needed for older iOS
            webkit-playsinline="true"
            className="w-full h-auto block"
            src={src}
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </motion.div>
    </section>
  );
}
