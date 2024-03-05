"use strict";

function parse_fraction(n) {
  return n.split("/");
}

module.exports = parse_fraction;
module.exports.default = parse_fraction;
