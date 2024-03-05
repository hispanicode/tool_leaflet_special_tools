import type { NO_DATA_VALUE, RawPixel, CleanRGBA, ScaleFunction, NO_DATA_RGBA, UINT8 } from "../types";

// convert a 2-band pixel
// if any no data is found, set all RGB to no data
export default function convert_double_all<NO_DATA_PIXEL extends NO_DATA_RGBA, R extends number, G extends number>(
  old_no_data_value: NO_DATA_VALUE,
  noDataPixel: NO_DATA_PIXEL,
  scalefn1: ScaleFunction,
  scalefn2: ScaleFunction,
  pixel: [R, G]
): NO_DATA_PIXEL | [UINT8, UINT8, 0, 255] {
  if ((pixel as Array<any>).includes(old_no_data_value)) return noDataPixel;
  return [scalefn1(pixel[0]), scalefn2(pixel[1]), 0, 255];
}
