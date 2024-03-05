"use strict";

function is_infinity(n) {
  return !!n.match(/^(|-|\+)inf(inity)?$/i);
}

module.exports = is_infinity;
module.exports.default = is_infinity;
