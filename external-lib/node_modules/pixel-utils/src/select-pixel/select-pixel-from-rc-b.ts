import type { RawPixel } from "../types";

export default function select_rc_b(data: number[][], width: number, r: number, c: number): RawPixel {
  return data[r * width + c];
}
