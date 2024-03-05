"use strict";

const compare_positive = require("./compare_positive.js");
const is_zero = require("./is_zero.js");
const long_multiplication = require("./long_multiplication.js");
const long_addition = require("./long_addition.js");

function multiply_range(min, max, step = "1") {
  if (is_zero(min)) return "0";
  let product = min;
  let n = min;
  while (compare_positive(n, max) === "<") {
    n = long_addition(n, step);
    product = long_multiplication(product, n);
  }

  return product;
}

module.exports = multiply_range;
module.exports.default = multiply_range;
