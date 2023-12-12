import type { NO_DATA_VALUE, RawPixel, NO_DATA_RGBA, ScaleFunction, VISIBLE_RGBA } from "../types";

export default function convert_multiband_all<NO_DATA_PIXEL extends NO_DATA_RGBA>(
  old_no_data_value: NO_DATA_VALUE,
  noDataPixel: NO_DATA_PIXEL,
  scalefn1: ScaleFunction,
  scalefn2: ScaleFunction,
  scalefn3: ScaleFunction,
  pixel: RawPixel
): NO_DATA_PIXEL | VISIBLE_RGBA {
  if ((pixel as Array<any>).includes(old_no_data_value)) return noDataPixel;
  return [scalefn1(pixel[0]), scalefn2(pixel[1]), scalefn3(pixel[2]), 255];
}
