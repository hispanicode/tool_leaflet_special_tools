import type { RawPixel } from "../types";

// each row is its own array
export default function select_r_cb(data: number[][], depth: number, r: number, c: number): RawPixel {
  const pixel = [];
  const row = data[r];
  let i = c * depth;
  const imax = i + depth;
  for (; i < imax; i++) {
    pixel.push(row[i]);
  }
  return pixel;
}
