"use strict";

const sine_radians = require("./sine_radians.js");

/**
 * @param {String} n - radians
 * @returns {String} sine of n
 */
function sine() {
  const n = arguments[0];
  const options = arguments[1];
  return sine_radians(n, options);
}

module.exports = sine;
module.exports.default = sine;
