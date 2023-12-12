"use strict";

function is_negative_infinity(n) {
  return !!n.match(/^-inf(inity)?$/i);
}

module.exports = is_negative_infinity;
module.exports.default = is_negative_infinity;
