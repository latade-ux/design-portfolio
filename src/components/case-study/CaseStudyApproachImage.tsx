"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp } from "@/lib/motion";

interface Props {
  src: string;
  alt: string;
}

export default function CaseStudyApproachImage({ src, alt }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-0 px-0">
      <motion.div
        ref={ref}
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full"
      >
        <div className="relative w-full">
          <Image
            src={src}
            alt={alt}
            width={1920}
            height={1080}
            className="w-full h-auto object-cover"
            sizes="100vw"
            quality={90}
          />
        </div>
      </motion.div>
    </section>
  );
}
