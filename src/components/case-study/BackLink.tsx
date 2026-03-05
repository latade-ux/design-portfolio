"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { slideInLeft } from "@/lib/motion";

export default function BackLink() {
  return (
    <motion.div
      variants={slideInLeft}
      initial="hidden"
      animate="visible"
      className="pt-24 pb-8 px-6"
    >
      <div className="mx-auto max-w-6xl">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-accent-light transition-colors duration-200 group"
        >
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 12H5m0 0l7 7m-7-7l7-7"
            />
          </svg>
          Back to projects
        </Link>
      </div>
    </motion.div>
  );
}
