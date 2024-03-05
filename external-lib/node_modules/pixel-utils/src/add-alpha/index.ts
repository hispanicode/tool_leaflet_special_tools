import type { VALID_RGB, VISIBLE_RGBA } from "../types";

/**
 * @description adds an alpha channel to an RGB Pixel, creating a new RGBA pixel
 * @param rgb - a 3-number RGB pixel
 * @returns rgba - a 4-number array representing an RGBA pixel
 */
export default function addAlpha(rgb: VALID_RGB): VISIBLE_RGBA {
  return [...rgb, 255];
}
