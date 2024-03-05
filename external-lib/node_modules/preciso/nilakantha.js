"use strict";

const add = require("./add.js");
const long_addition = require("./long_addition.js");
const divide = require("./divide.js");
const multiply_rational = require("./multiply_rational.js");

// calculate PI using Nilakantha Series
function nilakantha(steps = 100, { divide_options } = {}) {
  let sign = "+";
  let pi = "3";
  let a = "2";
  let b = "3";
  let c = "4";
  for (let i = 1; i < steps; i++) {
    const divisor = multiply_rational([a, b, c]);

    const part = sign + divide("4", divisor, divide_options);

    pi = add(pi, part);

    // flip sign
    sign = sign === "-" ? "+" : "-";

    a = c;
    b = long_addition(c, "1");
    c = long_addition(b, "1");
  }
  return pi;
}

module.exports = nilakantha;
module.exports.default = nilakantha;
