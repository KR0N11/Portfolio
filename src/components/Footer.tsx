"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Phone } from "lucide-react";
import { contactInfo } from "@/data/portfolio";

export default function Footer() {
  return (
    <section id="contact" aria-label="Contact">
      {/* Contact Section */}
      <div className="px-[4%] py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#999] text-sm mb-4"
          >
            Questions? Interested in working together?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold text-white mb-2"
          >
            Let&apos;s connect
          </motion.h2>
          <motion.a
            href={`mailto:${contactInfo.email}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#999] hover:text-white hover:underline transition-colors text-sm"
          >
            {contactInfo.email}
          </motion.a>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex gap-4 mt-8"
          >
            <a
              href={`mailto:${contactInfo.email}`}
              className="p-3 rounded bg-[#252525] text-[#999] hover:text-white hover:bg-[#333] transition-all"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded bg-[#252525] text-[#999] hover:text-white hover:bg-[#333] transition-all"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded bg-[#252525] text-[#999] hover:text-white hover:bg-[#333] transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`tel:${contactInfo.phone}`}
              className="p-3 rounded bg-[#252525] text-[#999] hover:text-white hover:bg-[#333] transition-all"
              aria-label="Phone"
            >
              <Phone size={18} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Netflix-style footer */}
      <footer className="border-t border-white/[0.04] px-[4%] py-8" role="contentinfo">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <p className="text-[#999] text-xs mb-3 font-medium">Navigate</p>
              <ul className="space-y-2">
                {["Home", "Projects", "Skills", "Experience"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => {
                        if (item === "Home") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          document
                            .getElementById(item.toLowerCase())
                            ?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="text-[#666] text-xs hover:text-[#999] transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[#999] text-xs mb-3 font-medium">More</p>
              <ul className="space-y-2">
                {["Contact"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => {
                        document
                          .getElementById(item.toLowerCase())
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-[#666] text-xs hover:text-[#999] transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[#999] text-xs mb-3 font-medium">Connect</p>
              <ul className="space-y-2">
                <li>
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#666] text-xs hover:text-[#999] transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#666] text-xs hover:text-[#999] transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[#999] text-xs mb-3 font-medium">Location</p>
              <p className="text-[#666] text-xs">Montr&eacute;al, QC</p>
              <p className="text-[#666] text-xs">Canada</p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between pt-6 border-t border-white/[0.04]">
            <span
              className="text-sm font-bold"
              style={{ color: "#E50914" }}
            >
              PCL
            </span>
            <p className="text-[#444] text-[11px]">
              &copy; {new Date().getFullYear()} Ping Chun Lui
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
