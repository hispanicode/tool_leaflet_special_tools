"use strict";

const multiply_range = require("./multiply_range.js");

function factorial(n) {
  if (n === "0") return "1";
  return multiply_range("1", n);
}

module.exports = factorial;
module.exports.default = factorial;
