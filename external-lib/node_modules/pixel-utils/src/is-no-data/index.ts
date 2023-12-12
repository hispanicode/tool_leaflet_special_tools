import type { NoDataValue, RGB } from "../types";

/**
 * @description check if an RGB pixel is a no data pixel
 * @param {number} no_data_value
 * @param {number[]} pixel - an array of 4 numbers representing [R, G, B, A]
 * @returns {boolean} whether the pixel is a no data pixel
 */
export default function isNoData(no_data_value: NoDataValue, pixel: RGB): boolean {
  return pixel[0] === no_data_value;
}
