import type { NO_DATA_VALUE, RawPixel, ScaleFunction } from "../types";

export default function convert_raw_two_band_pixel_to_rgb_str(noDataValue: NO_DATA_VALUE, noDataPixel: string, scaleFunction1: ScaleFunction, scaleFunction2: ScaleFunction, pixel: RawPixel): string {
  if ((pixel as Array<any>).includes(noDataValue)) return noDataPixel;
  return "rgb(" + scaleFunction1(pixel[0]) + ", " + scaleFunction2(pixel[1]) + ", 0)";
}
