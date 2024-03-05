"use strict";

const absolute = require("./absolute.js");
const clean = require("./clean.js");
const compare_positive = require("./compare_positive.js");
const long_multiplication = require("./long_multiplication.js");
const round = require("./round.js");

/**
 * @name multiply
 * @returns {String} product
 */
function multiply_rational(nums, { max_decimal_digits } = {}) {
  let product = clean(nums[0]);
  let product_absolute = absolute(product);
  let product_sign = product[0] === "-" ? "-" : "";

  const imax = nums.length;
  for (let i = 1; i < imax; i++) {
    const current = clean(nums[i]);
    const current_sign = current[0] === "-" ? "-" : "";
    const current_absolute = absolute(current);
    product_sign = product_sign !== current_sign ? "-" : "";

    const comparison = compare_positive(product_absolute, current_absolute);

    product_absolute = comparison === "<" ? long_multiplication(current_absolute, product_absolute) : long_multiplication(product_absolute, current_absolute);

    product = product_sign + product_absolute;
  }
  if (typeof max_decimal_digits === "number") product = round(product, { digits: max_decimal_digits });
  return product;
}

module.exports = multiply_rational;
module.exports.default = multiply_rational;
