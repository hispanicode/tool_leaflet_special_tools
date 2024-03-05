"use strict";

const clean = require("./clean.js");

function count_decimal_digits(n) {
  n = clean(n);

  const i = n.indexOf(".");

  // n is an integer
  if (i === -1) return "0";

  return (n.length - i - 1).toString();
}

module.exports = count_decimal_digits;
module.exports.default = count_decimal_digits;
