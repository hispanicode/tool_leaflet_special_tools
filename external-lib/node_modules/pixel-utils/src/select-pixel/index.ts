import { Layout } from "../enums";
import type { RawPixel } from "../types";

import select_brc from "./select-pixel-from-brc";
import select_b_r_c from "./select-pixel-from-b-r-c";
import select_b_rc from "./select-pixel-from-b-rc";

import select_rcb from "./select-pixel-from-rcb";
import select_rc_b from "./select-pixel-from-rc-b";
import select_r_c_b from "./select-pixel-from-r-c-b";
import select_r_cb from "./select-pixel-from-r-cb";

export type SelectPixelFunction = (row: number, column: number) => RawPixel;

export default function selectPixel(data: number[] | number[][] | number[][][], { depth, height, layout, width }: { depth: number; height: number; layout: Layout | string; width: number }): SelectPixelFunction {
  // console.log("layout:", {layout, data, depth, width});
  switch (layout) {
    case Layout["[band][row][column]"]:
      // @ts-ignore
      return select_b_r_c.bind(null, data, depth);
    case Layout["[band][row,column]"]:
      // @ts-ignore
      return select_b_rc.bind(null, data, depth, width);
    case Layout["[band,row,column]"]:
      // @ts-ignore
      return select_brc.bind(null, data, depth, height, width);
    case Layout["[row,column][band]"]:
      // @ts-ignore
      return select_rc_b.bind(null, data, width);
    case Layout["[row][column][band]"]:
      // @ts-ignore
      return select_r_c_b.bind(null, data);
    case Layout["[row][column,band]"]:
      // @ts-ignore
      return select_r_cb.bind(null, data, depth);
    case Layout["[row,column,band]"]:
      // @ts-ignore
      return select_rcb.bind(null, data, depth, width);
    default:
      throw new Error("[pixel-utils] unknown layout " + layout);
  }
}
