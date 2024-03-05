import type { NO_DATA_VALUE } from "../types";

export default function hasNoData(noDataValue: NO_DATA_VALUE, pixel: any): boolean {
  return pixel.includes(noDataValue);
}
