"use strict";

function is_positive_infinity(n) {
  return !!n.match(/^\+?inf(inity)?$/i);
}

module.exports = is_positive_infinity;
module.exports.default = is_positive_infinity;
