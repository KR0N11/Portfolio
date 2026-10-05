import Link from "next/link";

/* A wrong turn. Kept as plain as the game's own messages. */
export default function NotFound() {
  return (
    <main className="lost">
      <p className="lost-band">Nothing here</p>
      <p>This path leads nowhere.</p>
      <Link href="/road/">Return to the Site of Grace</Link>
    </main>
  );
}
