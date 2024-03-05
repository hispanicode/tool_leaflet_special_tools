"use strict";

const absolute = require("./absolute.js");
const clean = require("./clean.js");
const compare_positive = require("./compare_positive.js");
const long_multiplication = require("./long_multiplication.js");

function multiply(a, b) {
  a = clean(a);
  b = clean(b);

  const apos = a[0] !== "-";
  const bpos = b[0] !== "-";

  const out_sign = apos !== bpos ? "-" : "";

  a = absolute(a);
  b = absolute(b);

  const comparison = compare_positive(a, b);

  if (comparison === "<") {
    const aold = a;
    const bold = b;
    a = bold;
    b = aold;
  }

  return out_sign + long_multiplication(a, b);
}

module.exports = multiply;
module.exports.default = multiply;
