"use strict";

const clean = require("./clean.js");
const is_integer = require("./is_integer.js");

function is_even(n) {
  n = clean(n);

  if (!is_integer(n)) throw new Error("can't call is_even on decimal");

  return ["0", "2", "4", "6", "8"].includes(n.charAt(n.length - 1));
}

module.exports = is_even;
module.exports.default = is_even;
