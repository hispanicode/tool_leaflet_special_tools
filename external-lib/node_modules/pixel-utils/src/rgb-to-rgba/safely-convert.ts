import type { NO_DATA_VALUE, RGB, NO_DATA_RGBA, VISIBLE_RGBA } from "../types";

import addAlpha from "../add-alpha";
import isNoData from "../is-no-data";
import makeNoDataRGBA from "../make-no-data-rgba";

export default function safely_convert_rgb_to_rgba(old_no_data_value: NO_DATA_VALUE, new_no_data_value: NO_DATA_VALUE, pixel: RGB): NO_DATA_RGBA | VISIBLE_RGBA {
  return isNoData(old_no_data_value, pixel) ? makeNoDataRGBA(new_no_data_value) : addAlpha(pixel);
}
