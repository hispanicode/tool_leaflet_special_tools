"use strict";

const clean = require("./clean.js");
const count_decimal_digits = require("./count_decimal_digits.js");
const absolute = require("./absolute.js");
const is_negative = require("./is_negative.js");
const round_last_decimal = require("./round_last_decimal.js");

const UP = ["5", "6", "7", "8", "9"];

function round(n, { digits = 0 } = { digits: 0 }) {
  n = clean(n);

  const orig = n;

  const sign = is_negative(n) ? "-" : "";

  // convert to positive because
  // round_last_decimal only works on positive decimals
  n = absolute(n);

  const idec = n.indexOf(".");

  // integer, already rounded
  if (idec === -1) return orig;

  // decimal, but already rounded enough
  if (count_decimal_digits(n) <= digits) return orig;

  const v = n[idec + digits + 1];

  if (UP.includes(v)) {
    const clip = n.substring(0, idec + digits + 2);
    return sign + round_last_decimal(clip);
  } else if (digits === 0) {
    return sign + n.substring(0, idec);
  } else {
    const clip = n.substring(0, idec + digits + 1);
    return sign + clip;
  }
}

module.exports = round;
module.exports.default = round;
