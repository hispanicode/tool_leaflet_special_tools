/**
 * @name sliceAlpha
 * @description slices off the alpha value of a 4-number RGBA pixel array,
 * leaving a new 3-Number RGB pixel array
 * @param {RGBA} pixel - an RGBA
 * @returns {RGBA} an RGBA pixel as an array of 4 numbers
 */
export default function sliceAlpha<R, G, B, A>(pixel: [R, G, B, A]): [R, G, B] {
  // @ts-ignore
  return pixel.slice(0, 3);
}
