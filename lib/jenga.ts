/*
  Jenga easter-egg constants. 12 levels x 3 blocks, classic alternating
  orientation, no gimmicks: just a machined-aluminum tower you can
  actually play with.
*/

export const LEVELS = 12;
export const PER_LEVEL = 3;

/* Block dimensions, classic jenga ratio 5 : 1 : 1.67 (l : w : h) */
export const BLOCK = { length: 3, height: 0.6, width: 1 } as const;
export const GAP = 0.015;

/* Blocks that started at level >= 3 and fell below this Y count as toppled */
export const FALL_Y = 0.55;
export const TOPPLE_COUNT = 9;
