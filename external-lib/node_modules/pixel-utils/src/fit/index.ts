import type { NoRangeValueStrategy } from "quick-scale";
import { prepareData, prepareUpdate } from "xdim";
import rawToRgba from "../raw-to-rgba";
import selectPixel from "../select-pixel";

import type { ndarray, NO_DATA_STRATEGY, UINT8, Range, NO_DATA_VALUE } from "../types";

// fit raw bands to 8-bit color space
// while slicing and scaling as necessary
export default function fit<L extends string = "[row,column,band]">({
  data,
  debug_level = 0,
  depth,
  flip = false,
  old_no_data_value,
  old_layout,
  no_data_strategy = "partial", // png strategy
  no_range_value,
  no_range_value_strategy = "top",
  new_layout,
  new_no_data_value,
  height,
  ranges,
  width
}: {
  data: number[] | number[][] | number[][][];
  debug_level?: number;
  depth: number;
  flip?: boolean;
  old_no_data_value?: number;
  old_layout: string;
  no_data_strategy?: string;
  no_range_value?: number;
  no_range_value_strategy?: string;
  new_layout?: L;
  new_no_data_value?: UINT8 | number; // loosely accepting number
  height: number;
  ranges: number[][];
  width: number;
}): {
  data: ndarray<L>;
  layout: string;
} {
  if (!ranges) throw new Error("[expand] can't expand without ranges");
  if (debug_level >= 1) console.log("[stretch] starting fit");
  if (typeof height !== "number") throw new Error("[fit] height must be a number");
  if (typeof width !== "number") throw new Error("[fit] height must be a number");
  if (typeof old_layout !== "string") throw new Error("[fit] old_layout must be a string");

  if (new_layout === undefined) new_layout === ("[row,column,band]" as const);

  if (typeof new_layout !== "string") throw new Error("[fit] new_layout must be a string");

  const select = selectPixel(data, {
    depth,
    height,
    layout: old_layout,
    width
  });

  const out_sizes = {
    band: 4,
    row: height,
    column: width
  };

  const { data: out_data } = prepareData({
    fill: new_no_data_value,
    layout: new_layout,
    sizes: out_sizes
  });

  const convert = rawToRgba({
    debug_level: debug_level - 1,
    flip,
    ranges: ranges as Range[],
    new_no_data_value: new_no_data_value as NO_DATA_VALUE,
    no_data_strategy: no_data_strategy as NO_DATA_STRATEGY,
    no_range_value: no_range_value as UINT8,
    no_range_value_strategy: no_range_value_strategy as NoRangeValueStrategy,
    old_no_data_value
  });

  const update = prepareUpdate({ data: out_data, layout: new_layout, sizes: out_sizes });

  for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
      const [r, g, b, a] = convert(select(row, column));
      update({ point: { band: 0, row, column }, value: r });
      update({ point: { band: 1, row, column }, value: g });
      update({ point: { band: 2, row, column }, value: b });
      update({ point: { band: 3, row, column }, value: a });
    }
  }

  if (debug_level >= 1) console.log("[pixel-utils/fit] out_data:", out_data);

  return {
    // @ts-ignore
    data: out_data,
    layout: new_layout
  };
}
