"use strict";

/**
 * @param {String} n
 * @returns {Boolean} result
 */
function is_fraction(n) {
  return n.includes("/");
}

module.exports = is_fraction;
module.exports.default = is_fraction;
