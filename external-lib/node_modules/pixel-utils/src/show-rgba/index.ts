/**
 * @name show_rgba
 * @description // make a given (scaled) rgba value visible
 * @param {RGBA} rgba pixel
 * @returns a new rgba pixel with the same Red, Green and Blue values and a 255 alpha value
 */
export default function showRGBA<R, G, B, A>([r, g, b]: [R, G, B, A]): [R, G, B, 255] {
  return [r, g, b, 255];
}
