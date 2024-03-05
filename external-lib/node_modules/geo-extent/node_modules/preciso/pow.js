"use strict";

const absolute = require("./absolute.js");
const clean = require("./clean.js");
const divide = require("./divide.js");
const is_integer = require("./is_integer");
const is_zero = require("./is_zero.js");
const multiply = require("./multiply.js");
const pow_positive = require("./pow_positive.js");
const sign = require("./sign");

function pow(
  base,
  exponent,
  {
    zero_to_the_power_of_zero = "1",

    // passed to divide then long_division
    ellipsis = false,
    max_decimal_digits = 100
  } = {
    zero_to_the_power_of_zero: 1,

    // passed on to divide then long_division
    ellipsis: false,
    max_decimal_digits: 100
  }
) {
  base = clean(base);
  exponent = clean(exponent);

  const base_is_zero = is_zero(base);
  const exponent_is_zero = is_zero(exponent);

  if (base_is_zero && exponent_is_zero) {
    // https://en.wikipedia.org/wiki/Zero_to_the_power_of_zero
    return zero_to_the_power_of_zero;
  }

  if (exponent_is_zero) {
    return "1";
  }

  const sign_of_base = sign(base);
  const sign_of_exponent = sign(exponent);

  if (base_is_zero) {
    if (sign_of_exponent === "+") {
      return "0";
    } else if (sign_of_exponent === "-") {
      return "Infinity";
    }
  }

  const exponent_is_integer = is_integer(exponent);

  if (sign_of_exponent === "+" && exponent_is_integer) {
    const imax = Number(exponent);
    let product = base;
    for (let i = 1; i < imax; i++) {
      product = multiply(product, base);
    }
    return product;
  }

  if (sign_of_exponent === "-" && exponent_is_integer) {
    // e.g. pow(7, -2) => 1 / pow(7, 2)
    const numerator = "1";
    const denominator = pow_positive(base, absolute(exponent));
    return divide(numerator, denominator, { ellipsis, max_decimal_digits });
  }

  if (!exponent_is_integer) {
    // eq(pow("2", "1/3"), "1.2599210498948732"
    throw new Error("[preciso] we don't support ");
  }
}

module.exports = pow;
module.exports.default = pow;
