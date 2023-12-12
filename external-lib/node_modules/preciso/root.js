"use strict";

const absolute = require("./absolute.js");
const clean = require("./clean.js");
const compare_positive = require("./compare_positive.js");
const is_even = require("./is_even.js");
const is_integer = require("./is_integer.js");
const is_negative = require("./is_negative.js");
const pow_positive = require("./pow_positive.js");
const root_integer_digits = require("./root_integer_digits.js");

/**
 *
 * @param {String} radicand
 * @param {String} index
 * @param {Object} options
 * @param {Boolean} options.imaginary - imaginary numbers are supported
 * @param {Number} options.max_decimal_digits - maximum number of decimal digits allowed in the result
 * @returns {String} result
 */
function root(radicand, index, { imaginary = true, max_decimal_digits = 100 } = {}) {
  radicand = clean(radicand);
  index = clean(index);

  if (index === "1") return radicand;
  if (radicand === "1") return "1";

  if (!is_integer(index)) throw new Error("[preciso] can't find fractional roots");
  if (is_negative(index)) throw new Error("[preciso] can't find root of negative indexes");

  const rad = absolute(radicand);

  const radicand_is_negative = is_negative(radicand);
  const index_is_even = is_even(index);

  const has_imaginary = radicand_is_negative && index_is_even;
  if (has_imaginary && !imaginary) throw new Error("[preciso] root has an imaginary number");

  const out_sign = radicand_is_negative && !index_is_even ? "-" : "";

  const count_of_integer_places = root_integer_digits(rad, index);

  const digits = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0"];

  let left = "";

  for (let i = 0; i < count_of_integer_places; i++) {
    for (let ii = 0; ii < digits.length; ii++) {
      const digit = digits[ii];
      const test_start = left + digit;
      let test_base = test_start + "0".repeat(count_of_integer_places - i - 1);
      const test_res = pow_positive(test_base, index);
      const comparison = compare_positive(test_res, rad);
      if (comparison === "=") {
        if (has_imaginary) test_base += "i";
        return out_sign + test_base;
      } else if (comparison === "<") {
        left = test_start;
        break;
      }
    }
  }

  let base = left + ".";

  for (let i = 0; i < max_decimal_digits; i++) {
    let added = false;
    for (let ii = 0; ii < digits.length; ii++) {
      const digit = digits[ii];
      let test_base = base + digit;
      const test_res = pow_positive(test_base, index);
      const comparison = compare_positive(test_res, rad);
      if (comparison === "=") {
        if (has_imaginary) test_base += "i";
        return out_sign + test_base;
      } else if (comparison === "<") {
        base = test_base;
        added = true;
        break;
      }
    }
    if (!added) break;
  }

  if (has_imaginary) base += "i";

  return out_sign + base;
}

module.exports = root;
module.exports.default = root;
