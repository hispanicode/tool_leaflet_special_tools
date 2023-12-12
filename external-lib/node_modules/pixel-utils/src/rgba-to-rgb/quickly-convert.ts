import { NO_DATA_RGB, RGB, RawRGBA } from "../types";

import isHidden from "../is-hidden";
import popAlpha from "../pop-alpha";

export default function quickly_convert_rgba_to_rgb<T extends NO_DATA_RGB, R, G, B, A>(noDataPixel: T, pixel: [R, G, B, A]): T | [R, G, B] {
  return isHidden(pixel) ? noDataPixel : popAlpha(pixel);
}
