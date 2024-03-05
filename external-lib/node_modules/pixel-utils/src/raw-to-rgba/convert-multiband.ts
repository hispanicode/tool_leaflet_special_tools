import type { NoDataValue, RawPixel, CleanRGBA, ScaleFunction } from "../types";

export default function convert_multiband(old_no_data_value: NoDataValue, new_no_data_value: NoDataValue, scalefn1: ScaleFunction, scalefn2: ScaleFunction, scalefn3: ScaleFunction, pixel: RawPixel): CleanRGBA {
  const [r, g, b] = pixel;
  return [
    // @ts-ignore
    r === old_no_data_value ? new_no_data_value : scalefn1(r),
    // @ts-ignore
    g === old_no_data_value ? new_no_data_value : scalefn2(g),
    // @ts-ignore
    b === old_no_data_value ? new_no_data_value : scalefn3(b),
    // @ts-ignore
    r === old_no_data_value || g === old_no_data_value || b === old_no_data_value ? 0 : 255
  ];
}
