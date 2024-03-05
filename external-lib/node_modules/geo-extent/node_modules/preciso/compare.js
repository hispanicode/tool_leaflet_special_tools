"use strict";

const clean = require("./clean.js");
const compare_positive = require("./compare_positive.js");

function compare(a, b) {
  a = clean(a);
  b = clean(b);

  const a_is_positive = a[0] !== "-";
  const b_is_positive = b[0] !== "-";

  if (a_is_positive) {
    if (b_is_positive) {
      return compare_positive(a, b);
    } else {
      return ">";
    }
  } else if (b_is_positive) {
    return "<";
  } else {
    return compare_positive(b.substring(1), a.substring(1));
  }
}

module.exports = compare;
module.exports.default = compare;
