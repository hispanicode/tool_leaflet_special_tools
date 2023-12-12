"use strict";

const clean = require("./clean.js");
const is_negative_infinity = require("./is_negative_infinity.js");
const is_positive_infinity = require("./is_positive_infinity.js");
const is_zero = require("./is_zero.js");
const eulers_number = require("./eulers_number.js");
const pow = require("./pow.js");

function exp(power, { max_decimal_digits = 100 } = {}) {
  const e = eulers_number({ max_decimal_digits: 2 * max_decimal_digits });

  if (is_negative_infinity(power)) return "0";
  if (is_positive_infinity(power)) return "Infinity";
  if (is_zero(power)) return "1";

  power = clean(power);

  return pow(e, power, { max_decimal_digits });
}

module.exports = exp;
module.exports.default = exp;
