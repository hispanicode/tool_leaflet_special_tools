import type { NO_DATA_VALUE, NO_DATA_RGBA } from "../types";

export default function makeNoDataRgba<T extends NO_DATA_VALUE>(noDataValue: T): [T, T, T, 0] & NO_DATA_RGBA {
  // typescript not smart enough to realize all values in the array will be the same
  // @ts-ignore
  return [noDataValue, noDataValue, noDataValue, 0];
}
