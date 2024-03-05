import isNoData from "../is-no-data";
import pushAlpha from "../push-alpha";
import type { NO_DATA_RGBA, NO_DATA_VALUE, VALID_RGB, VALID_RGBA } from "../types";

// assuming valid RGB input
export default function quickly_convert<T extends NO_DATA_RGBA>(old_no_data_value: NO_DATA_VALUE, new_no_data_pixel: T, px: VALID_RGB): T | VALID_RGBA {
  return isNoData(old_no_data_value, px) ? new_no_data_pixel : pushAlpha(px);
}
