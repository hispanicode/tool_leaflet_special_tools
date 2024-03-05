"use strict";

const clean = require("./clean");
const compare_positive = require("./compare_positive.js");
const is_infinity = require("./is_infinity.js");
const long_addition = require("./long_addition.js");
const long_subtraction = require("./long_subtraction.js");

function subtract(a, b, { infinity_minus_infinity = "NaN" } = {}) {
  a = clean(a);
  b = clean(b);

  const a_is_negative = a[0] === "-";
  const b_is_negative = b[0] === "-";

  const a_is_positive = !a_is_negative;
  const b_is_positive = !b_is_negative;

  const ainf = is_infinity(a);
  const binf = is_infinity(b);

  if (ainf && binf) {
    if (a_is_positive === b_is_positive) {
      return infinity_minus_infinity;
    } else if (a_is_positive) {
      return "Infinity"; // inf - -inf
    } else if (b_is_positive) {
      return "-Infinity"; // -inf - inf
    }
  } else if (ainf) {
    return a;
  } else if (binf) {
    return b_is_positive ? "-Infinity" : "Infinity";
  }

  if (a_is_positive) {
    if (b_is_positive) {
      const comparison = compare_positive(a, b);
      if (comparison === ">") {
        return long_subtraction(a, b);
      } else if (comparison === "<") {
        return "-" + long_subtraction(b, a);
      } else {
        return "0";
      }
    } else {
      return long_addition(a, b.substring(1));
    }
  } else if (b_is_positive) {
    return "-" + long_addition(a.substring(1), b);
  } else {
    a = a.substring(1);
    b = b.substring(1);
    const comparison = compare_positive(a, b);
    if (comparison === ">") {
      return "-" + long_subtraction(a, b);
    } else if (comparison === "<") {
      return long_subtraction(b, a);
    } else {
      return "0";
    }
  }
}

module.exports = subtract;
module.exports.default = subtract;
