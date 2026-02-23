"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Github,
  Linkedin,
  Award,
  ArrowUp,
} from "lucide-react";
import { certifications, contactInfo } from "@/data/portfolio";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" aria-label="Contact and certifications">
      {/* Certifications */}
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 flex items-start gap-4 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors">
                <Award size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{cert.title}</h3>
                <p className="text-text-secondary text-sm">{cert.subtitle}</p>
                <p className="text-text-muted text-xs mt-1">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-bg-secondary" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold text-gradient mb-3">
                Ping Chun Lui
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Software Developer with a bias toward action. Building AI
                agents, cloud solutions, and full-stack products.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4 text-text">Get in Touch</h4>
              <div className="space-y-3">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors text-sm group"
                  aria-label={`Call ${contactInfo.phone}`}
                >
                  <Phone
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />
                  {contactInfo.phone}
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors text-sm group"
                  aria-label={`Email ${contactInfo.email}`}
                >
                  <Mail
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />
                  {contactInfo.email}
                </a>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold mb-4 text-text">Connect</h4>
              <div className="flex gap-4">
                <motion.a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  aria-label="GitHub profile"
                >
                  <Github size={20} className="text-text-secondary hover:text-primary" />
                </motion.a>
                <motion.a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin size={20} className="text-text-secondary hover:text-primary" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-xs">
              &copy; {new Date().getFullYear()} Ping Chun Lui. All rights
              reserved.
            </p>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-bg-card border border-border hover:border-primary transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} className="text-text-muted" />
            </motion.button>
          </div>
        </div>
      </footer>
    </section>
  );
}
