/**
 * @description check if an RGBA pixel is hidden
 * @param {number[]} pixel - an array of 4 numbers representing [R, G, B, A]
 * @returns {boolean} whether the pixel is hidden
 */
export default function isHidden<R, G, B, A extends any>(pixel: [R, G, B, A]): boolean {
  return pixel[3] === 0;
}
