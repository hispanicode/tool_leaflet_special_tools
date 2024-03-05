const absolute = require("./absolute.js");
const add = require("./add.js");
const clean = require("./clean.js");
const compare_positive = require("./compare_positive.js");
const divide = require("./divide.js");
const long_division = require("./long_division.js");
const multiply = require("./multiply.js");
const subtract = require("./subtract.js");
const truncate = require("./truncate.js");

function remainder(dividend, divisor) {
  // console.log("\n\nremainder");
  dividend = clean(dividend);
  divisor = clean(divisor);

  const sign = dividend[0] === "-" ? "-" : "";

  dividend = absolute(dividend);
  divisor = absolute(divisor);

  const comparison = compare_positive(dividend, divisor);
  if (comparison === "=") return "0";

  // if dividend is less than the divisor, just return the dividend
  if (comparison === "<") {
    if (dividend[0] === ".") dividend = "0" + dividend;
    return sign + dividend;
  }

  // can use long_division because know that
  // dividend and divisor are positive numerical strings
  const quotient = long_division(dividend, divisor, { max_decimal_places: 0 });

  const times = truncate(quotient);

  const product = multiply(divisor, times);

  return sign + subtract(dividend, product);
}

module.exports = remainder;
module.exports.default = remainder;
