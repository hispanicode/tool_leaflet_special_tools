export function calculate<P>(data: {
  nums?: number[];
  no_data?: number;
  counts?: {
    [key: string]: {
      n: number;
      ct: number;
    }
  },
  precise?: P & boolean;
  threshold?: number;
  total?: number;
}): P extends true ? string : number;