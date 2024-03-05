export function absolute(n: string): string;
export function add(a: string, b: string, options?: { infinity_minus_infinity?: string }): string;
export function binomial_coefficient(n: string, k: string): string;
export function ceil(n: string): string;
export function compare(a: string, b: string): "<" | ">" | "=";
export function cube(
  base: string,
  options?: { ellipsis?: boolean; fraction?: boolean; imaginary?: boolean; max_decimal_digits?: number; zero_to_the_power_of_zero?: string }
): string;
export function cube_root(radicand: string, options?: { imaginary?: boolean; max_decimal_digits?: number }): string;
export function divide(dividend: string, divisor: string, options?: { max_decimal_digits: number; ellipsis: boolean }): string;
export function factorial(n: string): string;
export function flip_sign(n: string): string;
export function floor(n: string): string;

// you can also pass in max(a, b, c, d) but I'm not sure how to type that
export function max(nums: string[]): string;

// you can also pass in min(a, b, c, d) but I'm not sure how to type that
export function min(nums: string[]): string;

export function multiply(
  a: string,
  b: string,
  options?: {
    max_decimal_digits?: number;
    infinity_times_zero?: string;
  }
): string;
export function ols(
  nums: string[][] | [string, string][] | Readonly<[string, string]>[] | Readonly<Readonly<[string, string]>[]>,
  options?: { max_decimal_digits?: number }
): { b: string; m: string };
export function pow(
  base: string,
  exponent: string,
  options?: { ellipsis?: boolean; fraction?: boolean; imaginary?: boolean; max_decimal_digits?: number; zero_to_the_power_of_zero?: string }
): string;
export function remainder(dividend: string, divisor: string): string;
export function root(radicand: string, index: string, options?: { imaginary?: boolean; max_decimal_digits?: number }): string;
export function sign(n: string): string;
export function square(
  base: string,
  options?: { ellipsis?: boolean; fraction?: boolean; imaginary?: boolean; max_decimal_digits?: number; zero_to_the_power_of_zero?: string }
): string;
export function square_root(radicand: string, options?: { imaginary?: boolean; max_decimal_digits?: number }): string;
export function subtract(a: string, b: string, options?: { infinity_minus_infinity?: string }): string;
export function truncate(n: string);

declare const preciso: {
  absolute: typeof absolute;
  add: typeof add;
  binomial_coefficient: typeof binomial_coefficient;
  ceil: typeof ceil;
  compare: typeof compare;
  divide: typeof divide;
  floor: typeof floor;
  max: typeof max;
  min: typeof min;
  multiply: typeof multiply;
  pow: typeof pow;
  remainder: typeof remainder;
  sign: typeof sign;
  subtract: typeof subtract;
  truncate: typeof truncate;
};
export default preciso;
