import { RGB, RawRGBA, NO_DATA_VALUE, NO_DATA_RGB } from "../types";

import isHidden from "../is-hidden";
import makeNoDataRGB from "../make-no-data-rgb";
import sliceAlpha from "../slice-alpha";

export default function safely_convert_rgba_to_rgb(noDataValue: NO_DATA_VALUE, pixel: RawRGBA): NO_DATA_RGB | RGB {
  return isHidden(pixel) ? makeNoDataRGB(noDataValue) : sliceAlpha(pixel);
}
