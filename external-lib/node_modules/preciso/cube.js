"use strict";

const pow = require("./pow.js");

/**
 *
 * @param {String} base - numerical string
 * @returns {String} cube (base * base * base) as a numerical string
 */
function cube(base, options) {
  return pow(base, "3", options);
}

module.exports = cube;
module.exports.default = cube;
