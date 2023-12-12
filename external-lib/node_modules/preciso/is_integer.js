"use strict";

const clean = require("./clean.js");
const is_infinity = require("./is_infinity.js");

function is_integer(n) {
  if (is_infinity(n)) return false;
  n = clean(n);
  return !n.includes(".") && !n.includes("/");
}

module.exports = is_integer;
module.exports.default = is_integer;
