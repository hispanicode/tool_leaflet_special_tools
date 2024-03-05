"use strict";

const divide = require("./divide.js");
const is_even = require("./is_even.js");
const min = require("./min.js");
const primes = require("./primes.js");

function simplify_fraction(numerator, denominator) {
  // divide by prime numbers up to 1000
  const digits = primes("2", min(["1000", denominator, denominator]));

  // shave off excess zeros
  while (numerator.endsWith("0") && denominator.endsWith("0")) {
    numerator = numerator.substring(0, numerator.length - 1);
    denominator = denominator.substring(0, denominator.length - 1);
  }

  while (is_even(numerator) && is_even(denominator)) {
    numerator = divide(numerator, "2");
    denominator = divide(denominator, "2");
  }

  let proceed = true;
  while (proceed) {
    proceed = false;

    // attempt to divide numerator and denominator by the same digit
    for (let i = 0; i < digits.length; i++) {
      const digit = digits[i];
      const digit_length = digit.length;
      const max_decimal_digits = digit_length + 1;
      const numerator_divided = divide(numerator, digit, { ellipsis: true, max_decimal_digits });
      if (numerator_divided.indexOf(".") === -1) {
        const denominator_divided = divide(denominator, digit, { ellipsis: true, max_decimal_digits });
        if (denominator_divided.indexOf(".") === -1) {
          // console.log(`both "${numerator} and ${denominator} are evenly divisible by "${digit}"`);
          numerator = numerator_divided;
          denominator = denominator_divided;
          proceed = true;
          break;
        }
      }
    }
  }

  return [numerator, denominator];
}

module.exports = simplify_fraction;
module.exports.default = simplify_fraction;
