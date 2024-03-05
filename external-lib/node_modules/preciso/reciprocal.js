"use strict";

const divide = require("./divide.js");
const is_fraction = require("./is_fraction.js");
const parse_fraction = require("./parse_fraction.js");

function reciprocal(n, { max_decimal_digits = 100, fraction = false } = {}) {
  if (is_fraction(n)) {
    const [numerator, denominator] = parse_fraction(n);
    if (fraction) {
      return denominator + "/" + numerator;
    } else {
      return divide(denominator, numerator, { max_decimal_digits });
    }
  } else {
    if (fraction) {
      return "1/" + n;
    } else {
      return divide("1", n, { max_decimal_digits });
    }
  }
}

module.exports = reciprocal;
module.exports.default = reciprocal;
