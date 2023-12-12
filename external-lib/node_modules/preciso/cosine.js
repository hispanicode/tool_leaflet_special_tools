"use strict";

const cosine_radians = require("./cosine_radians.js");

/**
 * @name cosine
 * @param {String} n - a number string
 * @returns {String} cosine of n
 */
function cosine() {
  const n = arguments[0];
  const options = arguments[1];
  return cosine_radians(n, options);
}

module.exports = cosine;
module.exports.default = cosine;
