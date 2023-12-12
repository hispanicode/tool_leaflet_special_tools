import type { AnyRGBA, CleanRGBA } from "../types";

// make a given rgba value visible
export default function setVisible<R, G, B, A>(pixel: [R, G, B, A]): [R, G, B, 255] {
  // @ts-ignore
  pixel[3] = 255;
  // @ts-ignore
  return pixel;
}
