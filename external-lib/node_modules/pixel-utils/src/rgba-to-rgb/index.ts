import make_no_data_rgb from "../make-no-data-rgb";
import pop_alpha from "../pop-alpha";
import slice_alpha from "../slice-alpha";

import { NoDataValue, RGB, RawRGBA } from "../types";

import safely_convert from "./safely-convert";
import quickly_convert from "./quickly-convert";

// converting from RGBA to RGB
// where we no longer have an alpha value
// assuming pixel is already scaled
// assume no data pixels have zero transparency
export default function rgbaToRgb({
  new_no_data_value,
  safe = true
}: {
  new_no_data_value?: NoDataValue;
  safe?: boolean;
} = {}): (px: RawRGBA) => RGB {
  if (safe) {
    if (typeof new_no_data_value === "number") {
      // @ts-ignore
      return safely_convert.bind(null, new_no_data_value);
    } else {
      return slice_alpha;
    }
  } else {
    if (typeof new_no_data_value === "number") {
      // @ts-ignore
      return quickly_convert.bind(null, make_no_data_rgb(new_no_data_value));
    } else {
      return pop_alpha;
    }
  }
}
