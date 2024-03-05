export function absolute(n: string): string;
export function add(a: string, b: string): string;
export function ceil(n: string): string;
export function compare(a: string, b: string): "<" | ">" | "=";
export function ceil(n: string): string;
export function divide(dividend: string, divisor: string, options?: { max_decimal_digits: number; ellipsis: boolean }): string;
export function floor(n: string): string;

// you can also pass in max(a, b, c, d) but I'm not sure how to type that
export function max(nums: string[]): string;

// you can also pass in min(a, b, c, d) but I'm not sure how to type that
export function min(nums: string[]): string;

export function multiply(a: string, b: string): string;
export function remainder(dividend: string, divisor: string): string;
export function sign(n: string): string;
export function subtract(a: string, b: string): string;
export function truncate(n: string);
