"use strict";

const absolute = require("./absolute.js");
const clean = require("./clean.js");
const long_addition = require("./long_addition.js");
const sign = require("./sign.js");

function ceil(n) {
  n = clean(n);

  const idot = n.indexOf(".");

  // if not a decimal number
  // return the original number
  if (idot === -1) return n;

  const nsign = sign(n);

  // convert n to an absolute integer
  n = absolute(n).split(".")[0];

  if (nsign === "+") {
    // like 1.5 => 1 => 2
    return long_addition(n, "1");
  } else if (nsign === "-") {
    // like -1.5 => -1
    if (n === "0" || n === "") {
      return "0";
    } else {
      return "-" + n;
    }
  }
}

module.exports = ceil;
module.exports.default = ceil;
