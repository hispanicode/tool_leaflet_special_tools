"use strict";

const absolute = require("./absolute.js");
const clean = require("./clean.js");
const divide = require("./divide.js");
const fraction = require("./fraction.js");
const is_integer = require("./is_integer");
const is_imaginary = require("./is_imaginary.js");
const is_odd = require("./is_odd.js");
const is_zero = require("./is_zero.js");
const multiply = require("./multiply.js");
const pow_positive = require("./pow_positive.js");
const reciprocal = require("./reciprocal.js");
const root = require("./root.js");
const round = require("./round.js");
const sign = require("./sign");
const simplify_fraction = require("./simplify_fraction.js");

function pow(
  base,
  exponent,
  {
    zero_to_the_power_of_zero = "1",
    // passed to divide then long_division
    ellipsis = false,
    imaginary = true,
    max_decimal_digits = 100,
    fraction: use_fraction = false
  } = {}
) {
  base = clean(base);
  exponent = clean(exponent);

  const base_is_imaginary = imaginary && is_imaginary(base);
  if (base_is_imaginary) base = base.replace(/i$/, "");

  const base_is_zero = is_zero(base);
  const exponent_is_zero = is_zero(exponent);

  if (base_is_zero && exponent_is_zero) {
    // https://en.wikipedia.org/wiki/Zero_to_the_power_of_zero
    return zero_to_the_power_of_zero;
  }

  if (exponent_is_zero) {
    return "1";
  }

  // const sign_of_base = sign(base);
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
    let product = pow_positive(base, exponent);
    if (typeof max_decimal_digits === "number") {
      product = round(product, { digits: max_decimal_digits });
    }
    if (base_is_imaginary && is_odd(exponent)) product += "i";
    return product;
  }

  if (sign_of_exponent === "-" && exponent_is_integer) {
    // e.g. pow(7, -2) => 1 / pow(7, 2)
    const numerator = "1";
    const denominator = pow_positive(base, absolute(exponent));
    return divide(numerator, denominator, { ellipsis, max_decimal_digits });
  }

  if (!exponent_is_integer) {
    exponent = absolute(exponent);

    let [numerator, denominator] = exponent.includes("/") ? exponent.split("/") : fraction(exponent);

    [numerator, denominator] = simplify_fraction(numerator, denominator);

    // base could be an integer or decimal
    // denominator is an integer
    let inner = root(base, denominator, { imaginary });

    let result = multiply(numerator, inner);
    // console.log({ sign_of_exponent, base, exponent, numerator, denominator, inner, result, max_decimal_digits })

    if (typeof max_decimal_digits === "number") result = round(result, { digits: max_decimal_digits });
    // console.log("rounded:", result);

    if (sign_of_exponent === "-") {
      result = reciprocal(result, { fraction: use_fraction, max_decimal_digits });
    }

    return result;
  }
}

module.exports = pow;
module.exports.default = pow;
