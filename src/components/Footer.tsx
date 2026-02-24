"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  ArrowUp,
} from "lucide-react";
import { contactInfo } from "@/data/portfolio";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" aria-label="Contact">
      {/* Contact Section */}
      <div className="section-padding max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-white/20 text-sm font-mono tracking-wider mb-3">
            05 &mdash; contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Let&apos;s connect
          </h2>
          <p className="text-white/30 text-sm max-w-md">
            Always open to interesting conversations and opportunities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href={`mailto:${contactInfo.email}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-300 text-sm"
          >
            <Mail size={16} />
            {contactInfo.email}
          </a>
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-300 text-sm"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-300 text-sm"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </motion.div>
      </div>

      {/* Footer bar */}
      <footer className="border-t border-white/[0.04]" role="contentinfo">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <p className="text-white/15 text-xs font-mono">
            &copy; {new Date().getFullYear()} Ping Chun Lui
          </p>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full border border-white/[0.06] text-white/20 hover:text-white/50 hover:border-white/[0.12] transition-all duration-300 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </footer>
    </section>
  );
}
