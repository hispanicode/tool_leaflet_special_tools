"use strict";

const clean = require("./clean.js");
const compare_positive = require("./compare_positive.js");
const factorial = require("./factorial.js");
const long_addition = require("./long_addition.js");
const long_subtraction = require("./long_subtraction.js");
const long_division = require("./long_division.js");
const multiply_range = require("./multiply_range.js");

function binomial_coefficient(n, k) {
  n = clean(n);
  k = clean(k);

  switch (compare_positive(n, k)) {
    case "=":
      return "1";
    case ">": {
      const diff = long_subtraction(n, k);
      const numerator = multiply_range(long_addition(k, "1"), n);
      const denominator = factorial(diff);
      return long_division(numerator, denominator);
    }
    case "<": {
      throw new Error("[binominal_coefficient] unsupported");
    }
  }
}

module.exports = binomial_coefficient;
module.exports.default = binomial_coefficient;
