"use strict";

const add = require("./add.js");
const divide = require("./divide.js");

function eulers_number({ max_decimal_digits = 100, steps = 100 } = {}) {
  let sum = "1";
  let step = "1";
  for (let i = 1; i < steps; i++) {
    step = divide(step, i.toString(), { max_decimal_digits });
    sum = add(sum, step);
  }

  return sum;
}

module.exports = eulers_number;
module.exports.default = eulers_number;
