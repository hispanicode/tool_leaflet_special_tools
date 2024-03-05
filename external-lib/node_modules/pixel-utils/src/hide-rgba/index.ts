import type { UINT8 } from "../types";

/**
 * @name hide_rgba
 * @description make a given (scaled) rgba value transparent/invisble
 * @param {RGBA} rgba pixel
 * @returns a new rgba pixel with the same Red, Green and Blue values and a 0 alpha value
 */
export default function hide_rgba<R extends UINT8, G extends UINT8, B extends UINT8>([r, g, b]: [R, G, B, UINT8]): [R, G, B, 0] {
  return [r, g, b, 0];
}
