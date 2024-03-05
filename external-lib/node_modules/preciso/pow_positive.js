"use strict";

const multiply_rational = require("./multiply_rational.js");

// assuming:
// - base and exponent are clean
// - exponent is a positive integer
function pow_positive(base, exponent) {
  const imax = Number(exponent);
  let product = base;
  for (let i = 1; i < imax; i++) {
    product = multiply_rational([product, base]);
  }
  return product;
}

module.exports = pow_positive;
module.exports.default = pow_positive;
