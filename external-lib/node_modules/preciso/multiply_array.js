"use strict";

const is_imaginary = require("./is_imaginary.js");
const is_infinity = require("./is_infinity.js");
const is_odd = require("./is_odd.js");
const is_zero = require("./is_zero.js");
const multiply_rational = require("./multiply_rational.js");
const sign_nonzero = require("./sign_nonzero.js");

/**
 * @name multiply_array
 * @private
 * @description Multiply an array of numbers together
 * @param {Array.<String>} nums - array of numerical strings
 * @returns {String} product as a numerical string
 */
function multiply_array(nums, { max_decimal_digits, infinity_times_zero = "NaN" } = {}) {
  const has_inf = nums.some(n => is_infinity(n));
  const has_zero = nums.some(n => is_zero(n));

  if (has_inf && has_zero) {
    return infinity_times_zero;
  } else if (has_inf) {
    const ct = nums.filter(n => sign_nonzero(n) === "-").length;
    return ct % 2 === 0 ? "Infinity" : "-Infinity";
  } else if (has_zero) {
    return "0";
  }

  const imaginary = is_odd(nums.filter(n => is_imaginary(n)).length.toString());
  let product = multiply_rational(
    nums.map(n => n.replace(/i$/, "")),
    { max_decimal_digits }
  );
  if (imaginary) product += "i";
  return product;
}

module.exports = multiply_array;
module.exports.default = multiply_array;
