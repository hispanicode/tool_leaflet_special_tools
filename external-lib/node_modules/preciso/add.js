"use strict";

const compare_positive = require("./compare_positive.js");
const clean = require("./clean.js");
const long_addition = require("./long_addition.js");
const long_subtraction = require("./long_subtraction.js");
const is_infinity = require("./is_infinity.js");

function add(a, b, { infinity_minus_infinity = "NaN" } = {}) {
  a = clean(a);
  b = clean(b);

  const apos = a[0] !== "-";
  const bpos = b[0] !== "-";

  const aneg = !apos;
  const bneg = !bpos;

  const ainf = is_infinity(a);
  const binf = is_infinity(b);

  if (ainf && binf) {
    if (apos && bpos) return "Infinity";
    else if (aneg & bneg) return "-Infinity";
    else return infinity_minus_infinity;
  } else if (ainf) {
    if (apos) return "Infinity";
    else return "-Infinity";
  } else if (binf) {
    if (bpos) return "Infinity";
    else return "-Infinity";
  } else if (apos && bpos) {
    return long_addition(a, b);
  } else if (aneg && bneg) {
    return "-" + long_addition(a.substring(1), b.substring(1));
  } else if (aneg && bpos) {
    a = a.substring(1);
    switch (compare_positive(a, b)) {
      case "=":
        return "0";
      case "<":
        return long_subtraction(b, a);
      case ">":
        return "-" + long_subtraction(a, b);
    }
  } else if (apos && !bpos) {
    b = b.substring(1);
    switch (compare_positive(a, b)) {
      case "=":
        return "0";
      case "<":
        return "-" + long_subtraction(b, a);
      case ">":
        return long_subtraction(a, b);
    }
  }
}

module.exports = add;
module.exports.default = add;
