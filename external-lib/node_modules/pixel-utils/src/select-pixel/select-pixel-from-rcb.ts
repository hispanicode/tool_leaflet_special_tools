import type { RawPixel } from "../types";

// like ImageData.data
export default function select_rcb(data: number[], depth: number, width: number, r: number, c: number): RawPixel {
  const pixel = [];
  let i = (r * width + c) * depth;
  const imax = i + depth;
  for (; i < imax; i++) {
    pixel.push(data[i]);
  }
  return pixel;
}
