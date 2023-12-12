import type { NO_DATA_VALUE, NoDataPixel, RawPixel, NullableRGB, ScaleFunction } from "../types";

export default function convert_raw_one_band_pixel_to_rgb(noDataValue: NO_DATA_VALUE, noDataPixel: NoDataPixel, scale: ScaleFunction, pixel: RawPixel): NullableRGB {
  if ((pixel as Array<any>).includes(noDataValue)) return noDataPixel;
  const scaled = scale(pixel[0]);
  return [scaled, scaled, scaled];
}
