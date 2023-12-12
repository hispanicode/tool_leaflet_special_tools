export type NoRangeValueStrategy = "highest" | "middle" | "lowest";

export declare function createScaleFunction(
  [old_min, old_max]: [number, number],
  [new_min, new_max]: [number, number],
  options?: {
    flip?: boolean;
    no_range_value?: number;
    no_range_value_strategy?: NoRangeValueStrategy;
    round?: boolean;
  }
): (value: number) => number;
