"use strict";

// assume n is not zero
function sign_nonzero(n) {
  return n[0] === "-" ? "-" : "+";
}

module.exports = sign_nonzero;
module.exports.default = sign_nonzero;
