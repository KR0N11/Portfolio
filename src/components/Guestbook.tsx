"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Trash2 } from "lucide-react";

interface Note {
  id: string;
  name: string;
  message: string;
  color: string;
  rotation: number;
  x: number;
  y: number;
}

const PASTEL_COLORS = [
  "#FFE066", // yellow
  "#FF9AA2", // pink
  "#B5EAD7", // mint
  "#C7CEEA", // lavender
  "#FFDAC1", // peach
  "#E2F0CB", // lime
  "#FFB7B2", // salmon
  "#A2D2FF", // sky blue
];

function getRandomColor() {
  return PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
}

function getRandomRotation() {
  return Math.random() * 10 - 5; // -5 to 5 degrees
}

function getRandomPosition(index: number) {
  // Distribute notes across the board
  const cols = 4;
  const col = index % cols;
  const row = Math.floor(index / cols);
  const baseX = (col / cols) * 80 + 5 + Math.random() * 8;
  const baseY = row * 30 + 5 + Math.random() * 10;
  return { x: baseX, y: baseY };
}

const STORAGE_KEY = "portfolio-guestbook";

export default function Guestbook() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Load notes from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setNotes(JSON.parse(stored));
      } else {
        // Default seed notes
        setNotes([
          {
            id: "seed-1",
            name: "Ping",
            message: "Welcome to my portfolio! Leave a note :)",
            color: "#FFE066",
            rotation: -2,
            x: 10,
            y: 8,
          },
        ]);
      }
    } catch {
      // If localStorage fails, use empty
    }
  }, []);

  // Save to localStorage whenever notes change
  useEffect(() => {
    if (notes.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch {
        // Silently fail if storage is full
      }
    }
  }, [notes]);

  const addNote = () => {
    if (!name.trim() || !message.trim()) return;
    const pos = getRandomPosition(notes.length);
    const newNote: Note = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: name.trim(),
      message: message.trim(),
      color: getRandomColor(),
      rotation: getRandomRotation(),
      x: pos.x,
      y: pos.y,
    };
    setNotes((prev) => [...prev, newNote]);
    setName("");
    setMessage("");
  };

  const removeNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <section id="guestbook" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-[4%]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-[#E50914] text-xs font-semibold tracking-[0.3em] uppercase mb-2">
            Say Hello
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Guestbook
          </h2>
          <p className="text-[#888] text-sm mt-2">
            Pin a note on the board — leave your mark!
          </p>
        </motion.div>

        {/* Whiteboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border-2 border-[#333] overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #2a2a2a 0%, #1e1e1e 50%, #252525 100%)",
            minHeight: "480px",
          }}
        >
          {/* Board texture — subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Top edge — board frame */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#444] via-[#555] to-[#444]" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#444] via-[#555] to-[#444]" />

          {/* Post-it notes */}
          <div className="relative p-6 min-h-[400px]">
            <div className="flex flex-wrap gap-4 justify-start">
              <AnimatePresence>
                {notes.map((note) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: note.rotation,
                    }}
                    exit={{ opacity: 0, scale: 0, rotate: 20 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    whileHover={{
                      scale: 1.05,
                      rotate: 0,
                      zIndex: 30,
                    }}
                    className="relative group cursor-default flex-shrink-0"
                    style={{ width: "160px" }}
                  >
                    {/* Post-it */}
                    <div
                      className="relative rounded-sm p-4 shadow-lg"
                      style={{
                        backgroundColor: note.color,
                        boxShadow: `2px 3px 12px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.06)`,
                      }}
                    >
                      {/* Tape / pin effect */}
                      <div
                        className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm opacity-50"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)",
                        }}
                      />

                      {/* Delete button */}
                      <button
                        onClick={() => removeNote(note.id)}
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity p-1 cursor-pointer"
                      >
                        <Trash2 size={12} className="text-black/50" />
                      </button>

                      {/* Content */}
                      <p className="text-black/80 text-xs leading-relaxed mb-3 min-h-[40px] break-words">
                        {note.message}
                      </p>
                      <div className="border-t border-black/10 pt-2">
                        <p className="text-black/50 text-[10px] font-semibold uppercase tracking-wider">
                          — {note.name}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Input form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={30}
            className="px-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/[0.08] text-white text-sm placeholder:text-[#555] focus:outline-none focus:border-[#E50914]/40 transition-colors flex-shrink-0 w-full sm:w-36"
          />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message..."
            maxLength={120}
            onKeyDown={(e) => e.key === "Enter" && addNote()}
            className="px-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/[0.08] text-white text-sm placeholder:text-[#555] focus:outline-none focus:border-[#E50914]/40 transition-colors flex-1"
          />
          <button
            onClick={addNote}
            disabled={!name.trim() || !message.trim()}
            className="px-6 py-3 rounded-lg bg-[#E50914] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#f40612] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer flex-shrink-0"
          >
            <Send size={14} />
            Pin it
          </button>
        </motion.div>
      </div>
    </section>
  );
}
