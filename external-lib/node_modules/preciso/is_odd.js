const clean = require("./clean.js");
const is_integer = require("./is_integer.js");

function is_odd(n) {
  n = clean(n);

  if (!is_integer(n)) throw new Error("can't call is_odd on decimal");

  return ["1", "3", "5", "7", "9"].includes(n.charAt(n.length - 1));
}

module.exports = is_odd;
module.exports.default = is_odd;
