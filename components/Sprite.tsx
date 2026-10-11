/*
  Tiny pixel sprites drawn from rows of characters, one character per pixel.
  Each sprite scales by whole pixels (--px, 4px by default) so it sits on the
  same grid as the art. "X" pixels take the text colour unless a palette says
  otherwise.
*/

type Props = {
  rows: string[];
  colors?: Record<string, string>;
  /** css pixels per sprite pixel */
  px?: number;
  className?: string;
};

export const SPRITES = {
  /** the menu pointer: a gold hand-drawn arrowhead with a dark outline */
  pointer: [
    "OO.....",
    "OYO....",
    "OWYO...",
    "OWYYO..",
    "OWYYYO.",
    "OYYYYYO",
    "OYYYYO.",
    "OYYYO..",
    "OYYO...",
    "OYO....",
    "OO.....",
  ],
  back: ["...X....", "..XX....", ".XXXXXXX", "XXXXXXXX", ".XXXXXXX", "..XX....", "...X...."],
  out: ["..XXXX", "...XXX", "..XXXX", ".XX..X", "XX...."],
  up: ["...X...", "..XXX..", ".XXXXX.", "XXXXXXX", "..XXX..", "..XXX.."],
  play: ["X..", "XX.", "XXX", "XX.", "X.."],
} as const;

export const POINTER_COLORS = { O: "#071016", Y: "#ffcf4a", W: "#fff6c8" };

export default function Sprite({ rows, colors = {}, px = 4, className }: Props) {
  const w = Math.max(...rows.map((r) => r.length));
  const h = rows.length;
  const rects: React.ReactNode[] = [];
  rows.forEach((r, y) => {
    for (let x = 0; x < r.length; x++) {
      const c = r[x];
      if (c === ".") continue;
      // merge runs of the same colour into one rect
      let n = 1;
      while (r[x + n] === c) n++;
      rects.push(<rect key={`${x},${y}`} x={x} y={y} width={n} height={1} fill={colors[c] ?? "currentColor"} />);
      x += n - 1;
    }
  });
  return (
    <svg
      className={className}
      width={w * px}
      height={h * px}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {rects}
    </svg>
  );
}
