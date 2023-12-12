"use strict";

const absolute = require("./absolute.js");
const clean = require("./clean.js");
const sign = require("./sign.js");

function flip_sign(n) {
  n = clean(n);
  const s = sign(n);
  if (s === "") {
    return n;
  } else if (s === "-") {
    return absolute(n);
  } else if (s === "+") {
    return "-" + n;
  }

  return sum;
}

module.exports = flip_sign;
module.exports.default = flip_sign;
