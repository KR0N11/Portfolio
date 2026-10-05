/*
  Builds the profile from whatever photos are in public/profile/ at build time,
  so adding pictures is just dropping files into the right folder.
*/

import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { profile } from "@/lib/content";
import ProfileView from "./ProfileView";

const IMG = /\.(jpe?g|png|webp|avif|mp4)$/i;
const root = path.join(process.cwd(), "public", "profile");

export const metadata: Metadata = { title: "Profile", alternates: { canonical: "/profile/" } };

function photos(dir: string) {
  try {
    return fs
      .readdirSync(path.join(root, dir))
      .filter((f) => IMG.test(f) && !f.includes(".poster."))
      .sort()
      .map((f) => `/profile/${dir}/${encodeURIComponent(f)}`);
  } catch {
    return [];
  }
}

function portrait() {
  try {
    const f = fs.readdirSync(root).find((n) => /^portrait\.(jpe?g|png|webp|avif)$/i.test(n));
    return f ? `/profile/${f}` : null;
  } catch {
    return null;
  }
}

export default function Page() {
  const gallery: Record<string, string[]> = {};
  for (const c of profile.served) gallery[c.slug] = photos(c.slug);
  for (const p of profile.pastimes) gallery[p.slug] = photos(p.slug);
  return <ProfileView gallery={gallery} portrait={portrait()} />;
}
