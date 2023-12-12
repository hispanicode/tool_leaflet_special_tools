import type { RawPixel } from "../types";

export default function select_r_c_b(data: number[][][], r: number, c: number): RawPixel {
  return data[r][c];
}
