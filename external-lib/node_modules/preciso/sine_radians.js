"use strict";

const add = require("./add.js");
const is_zero = require("./is_zero.js");
const square = require("./square.js");
const multiply_rational = require("./multiply_rational.js");
const divide = require("./divide.js");

function sine_radians(n, { steps = 100, max_decimal_digits = 100 } = {}) {
  if (is_zero(n)) return "0";

  let sign = "-";
  let result = n;
  let imax = steps;
  let nsquare = square(n);
  let numerator = n;
  let denominator = "1";
  let f1;
  let f2 = "1";
  for (let i = 0; i < imax; i++) {
    f1 = add(f2, "1");
    f2 = add(f1, "1");

    // same as increasing the power by 2
    numerator = multiply_rational([numerator, nsquare], { max_decimal_digits });
    denominator = multiply_rational([denominator, f1, f2], { max_decimal_digits });
    const diff = divide(numerator, denominator, { max_decimal_digits });
    // console.log({ f1, f2, sign, numerator, denominator, diff });

    result = add(result, sign + diff);

    sign = sign === "-" ? "+" : "-";
  }
  return result;
}

module.exports = sine_radians;
module.exports.default = sine_radians;
