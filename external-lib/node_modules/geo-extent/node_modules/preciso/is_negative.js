"use strict";

const clean = require("./clean");

function is_negative(n) {
  n = clean(n);
  return n[0] === "-";
}

module.exports = is_negative;
module.exports.default = is_negative;
