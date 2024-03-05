"use strict";

function is_factorial(n) {
  return !!n.match(/^\d+!$/i);
}

module.exports = is_factorial;
module.exports.default = is_factorial;
