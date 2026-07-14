"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/*
  Hidden trigger: type "jenga" anywhere on the page to open the game.
  The footer's cube icon is the discoverable route for everyone else.
*/
export default function EasterEgg() {
  const router = useRouter();

  useEffect(() => {
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-5);
      if (buffer === "jenga") router.push("/jenga");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return null;
}
