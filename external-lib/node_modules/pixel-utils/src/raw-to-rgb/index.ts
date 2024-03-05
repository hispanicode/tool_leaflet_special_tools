import { createScaleFunction } from "quick-scale";

import type { NoRangeValueStrategy } from "quick-scale";

import makeNoDataRGB from "../make-no-data-rgb";

import convertSingle from "./convert-single";
import convertSingleStr from "./convert-single-str";
import convertDouble from "./convert-double";
import convertDoubleStr from "./convert-double-str";
import convertTriple from "./convert-triple";
import convertTripleStr from "./convert-triple-str";
import convertMulti from "./convert-many";
import convertMultiStr from "./convert-many-str";

import rgbToStr from "../rgb-to-str";

import type { NoDataValue, NullableRGB, RawPixel, Pixel, UINT8, Range, RGB } from "../types";

export default function rawToRgb<F extends "array" | "string">({
  format = "array" as F,
  ranges,
  flip,
  new_no_data_pixel,
  new_no_data_value,
  no_range_value,
  no_range_value_strategy,
  old_no_data_value,
  round = true
}: {
  format?: F;
  ranges: Range[];
  flip?: boolean;
  new_no_data_pixel?: NullableRGB;
  new_no_data_value?: NoDataValue;
  no_range_value?: UINT8;
  no_range_value_strategy?: NoRangeValueStrategy;
  old_no_data_value?: number;
  round?: boolean;
}): F extends "string" ? (px: RawPixel) => string : (px: RawPixel) => RGB {
  const nbands = ranges.length;

  if (new_no_data_pixel && new_no_data_value) {
    throw new Error("[pixel-utils/raw-to-rgb] can't specify both new_no_data_pixel and new_no_data_value");
  }

  if (new_no_data_pixel === undefined || new_no_data_pixel === null) {
    if (new_no_data_value === undefined || new_no_data_value === null) {
      new_no_data_pixel = makeNoDataRGB(null);
    } else {
      new_no_data_pixel = makeNoDataRGB(new_no_data_value);
    }
  }

  if (new_no_data_pixel === undefined) throw new Error("[raw-to-rgb] undefined new_no_data_pixel");

  const new_range: Range = [0 === new_no_data_value ? 1 : 0, 255 === new_no_data_value ? 254 : 255];

  const options = {
    flip,
    no_range_value,
    no_range_value_strategy,
    round
  };

  const scalefns = ranges.slice(0, 3).map(rng => createScaleFunction(rng, new_range, options));

  if (nbands === 1) {
    if (format === "string") {
      // @ts-ignore
      return convertSingleStr.bind(null, old_no_data_value, rgbToStr(new_no_data_pixel as any), ...scalefns);
    } else {
      // @ts-ignore
      return convertSingle.bind(null, old_no_data_value, new_no_data_pixel, ...scalefns);
    }
  } else if (nbands === 2) {
    if (format === "string") {
      // @ts-ignore
      return convertDoubleStr.bind(null, old_no_data_value, rgbToStr(new_no_data_pixel as any), ...scalefns);
    } else {
      // @ts-ignore
      return convertDouble.bind(null, old_no_data_value, new_no_data_pixel, ...scalefns);
    }
  } else if (nbands === 3) {
    if (format === "string") {
      // @ts-ignore
      return convertTripleStr.bind(null, old_no_data_value, rgbToStr(new_no_data_pixel as any), ...scalefns);
    } else {
      // @ts-ignore
      return convertTriple.bind(null, old_no_data_value, new_no_data_pixel, ...scalefns);
    }
  } else if (nbands >= 4) {
    if (format === "string") {
      // @ts-ignore
      return convertMultiStr.bind(null, old_no_data_value, rgbToStr(new_no_data_pixel as any), ...scalefns);
    } else {
      // @ts-ignore
      return convertMulti.bind(null, old_no_data_value, new_no_data_pixel, ...scalefns);
    }
  } else {
    throw new Error("[pixel-utils/raw-to-rgb] invalid number of bands: " + nbands);
  }
}
