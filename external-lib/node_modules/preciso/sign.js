"use strict";

const is_zero = require("./is_zero.js");
const sign_nonzero = require("./sign_nonzero.js");

function sign(n) {
  return is_zero(n) ? "" : sign_nonzero(n);
}

module.exports = sign;
module.exports.default = sign;
