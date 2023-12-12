"use strict";

const is_imaginary = require("./is_imaginary.js");
const round_rational = require("./round_rational.js");

function round(n, { digits = 0 } = {}) {
  if (is_imaginary(n)) {
    return round_rational(n.substring(0, n.length - 1), { digits }) + "i";
  } else {
    return round_rational(n, { digits });
  }
}

module.exports = round;
module.exports.default = round;
