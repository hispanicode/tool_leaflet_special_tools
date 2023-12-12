import type { RawPixel } from "../types";

export default function select_brc(data: number[], depth: number, height: number, width: number, r: number, c: number): RawPixel {
  const pixel = [];
  const size = height * width;
  const i = r * width + c;
  for (let b = 0; b < depth; b++) {
    pixel.push(data[b * size + i]);
  }
  return pixel;
}
