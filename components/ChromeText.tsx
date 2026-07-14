import type { ReactNode } from "react";

/*
  Text filled with the chrome gradient. `shimmer` animates the light
  band across the glyphs - reserve it for hero-level moments.
*/
export default function ChromeText({
  children,
  shimmer = false,
  as: Tag = "span",
  className = "",
}: {
  children: ReactNode;
  shimmer?: boolean;
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag className={`chrome-text ${shimmer ? "chrome-shimmer" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
