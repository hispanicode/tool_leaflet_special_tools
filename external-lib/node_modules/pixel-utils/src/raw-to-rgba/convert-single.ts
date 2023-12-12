import type { NO_DATA_RGBA, NoDataValue, RawPixel, CleanRGBA, ScaleFunction } from "../types";

export default function convert_one<R extends number, NO_DATA_PIXEL extends NO_DATA_RGBA>(old_no_data_value: NoDataValue, noDataPixel: NO_DATA_PIXEL, scalefn: ScaleFunction, pixel: [R]): NO_DATA_PIXEL | CleanRGBA {
  const n = pixel[0];
  if (n === old_no_data_value) return noDataPixel;
  const scaled = scalefn(n);
  return [scaled, scaled, scaled, 255];
}
