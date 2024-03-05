"use strict";

const count_decimal_digits = require("./count_decimal_digits.js");

/**
 * @private
 * @param {String} n - decimal string
 * @returns {Array.<string>} n - fraction like ["123", "100"] (meaning 123/100)
 */
function fraction(n) {
  const decimal_digits = count_decimal_digits(n);

  const numerator = n.replace(/\./g, "").replace(/^0/, "");
  const denominator = 1 + "0".repeat(decimal_digits);

  return [numerator, denominator];
}

module.exports = fraction;
module.exports.default = fraction;
