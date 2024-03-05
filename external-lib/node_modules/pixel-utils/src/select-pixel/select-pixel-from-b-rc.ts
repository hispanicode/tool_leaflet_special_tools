import type { RawPixel } from "../types";

export default function select_b_rc(data: number[][], depth: number, width: number, r: number, c: number): RawPixel {
  const pixel = [];
  const i = r * width + c;
  for (let b = 0; b < depth; b++) {
    pixel.push(data[b][i]);
  }
  return pixel;
}
