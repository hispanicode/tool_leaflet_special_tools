import type { NO_DATA_VALUE, NO_DATA_RGB } from "../types";

export default function makeNoDataRGB<T extends NO_DATA_VALUE>(noDataValue: T): [T, T, T] & NO_DATA_RGB {
  // typescript not smart enough to realize all values in the array will be the same
  // @ts-ignore
  return [noDataValue, noDataValue, noDataValue];
}
