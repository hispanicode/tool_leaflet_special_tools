/**
 *
 * @param {Pixel} pixel - an RGBA Pixel, an Array of 4 Numbers [Red, Green, Blue, Alpha]
 * @returns {RGBA} an RGB Pixel, an Array of 3 Numbers [Red, Green, Blue]
 */
export default function popAlpha<R, G, B, A>(pixel: [R, G, B, A]): [R, G, B] {
  pixel.pop();
  // @ts-ignore
  return pixel;
}
