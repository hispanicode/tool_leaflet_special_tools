const compare_positive = require("./compare_positive.js");
const clean = require("./clean.js");
const long_addition = require("./long_addition.js");
const long_subtraction = require("./long_subtraction.js");

function add(a, b) {
  a = clean(a);
  b = clean(b);

  const apos = a[0] !== "-";
  const bpos = b[0] !== "-";

  if (apos && bpos) {
    return long_addition(a, b);
  } else if (!apos && !bpos) {
    return "-" + long_addition(a.substring(1), b.substring(1));
  } else if (!apos && bpos) {
    a = a.substring(1);
    switch (compare_positive(a, b)) {
      case "=":
        return "0";
      case "<":
        return long_subtraction(b, a);
      case ">":
        return "-" + long_subtraction(a, b);
    }
  } else if (apos && !bpos) {
    b = b.substring(1);
    switch (compare_positive(a, b)) {
      case "=":
        return "0";
      case "<":
        return "-" + long_subtraction(b, a);
      case ">":
        return long_subtraction(a, b);
    }
  }
}

module.exports = add;
module.exports.default = add;
