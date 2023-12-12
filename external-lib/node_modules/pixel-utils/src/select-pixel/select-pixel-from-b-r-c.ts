import type { RawPixel } from "../types";

export default function select_b_r_c(data: number[][][], depth: number, r: number, c: number): RawPixel {
  const pixel = [];
  for (let b = 0; b < depth; b++) {
    pixel.push(data[b][r][c]);
  }
  return pixel;
}
