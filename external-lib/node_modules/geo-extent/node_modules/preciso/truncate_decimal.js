"use strict";

// given n is a decimal number
function truncate_decimal(n) {
  return n.substring(0, n.indexOf("."));
}

module.exports = truncate_decimal;
module.exports.default = truncate_decimal;
