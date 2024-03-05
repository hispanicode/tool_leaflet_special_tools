"use strict";

const add = require("./add.js");
const is_zero = require("./is_zero.js");
const square = require("./square.js");
const multiply_rational = require("./multiply_rational.js");
const divide = require("./divide.js");

/**
 * @name cosine_radians
 * @private
 * @param {String} n
 * @returns {String} cosine of n
 */
function cosine_radians(n, { steps = 100, max_decimal_digits = 100 } = {}) {
  if (is_zero(n)) return "0";

  let sign = "-";
  let result = "1";
  let imax = steps;
  let nsquare = square(n);
  let numerator = "1";
  let denominator = "1";
  let f1;
  let f2 = "0";
  for (let i = 0; i < imax; i++) {
    f1 = add(f2, "1");
    f2 = add(f1, "1");

    // same as increasing the power by 2
    numerator = multiply_rational([numerator, nsquare], { max_decimal_digits });
    denominator = multiply_rational([denominator, f1, f2], { max_decimal_digits });
    const diff = divide(numerator, denominator, { max_decimal_digits });

    result = add(result, sign + diff);

    sign = sign === "-" ? "+" : "-";
  }
  return result;
}

module.exports = cosine_radians;
module.exports.default = cosine_radians;
