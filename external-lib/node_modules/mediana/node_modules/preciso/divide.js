const absolute = require("./absolute.js");
const clean = require("./clean.js");
const long_division = require("./long_division.js");

function divide(dividend, divisor, options) {
  dividend = clean(dividend);
  divisor = clean(divisor);

  if (divisor === "0") throw new Error("[preciso] division by zero");

  // sometimes dividend can be cleaned to ""
  if (dividend === "" || dividend === "0") return "0";

  const dividend_is_positive = dividend[0] !== "-";
  const divisor_is_positive = divisor[0] !== "-";

  const out_sign = dividend_is_positive !== divisor_is_positive ? "-" : "";

  if (!dividend_is_positive) dividend = absolute(dividend);
  if (!divisor_is_positive) divisor = absolute(divisor);

  return out_sign + long_division(dividend, divisor, options);
}

module.exports = divide;
module.exports.default = divide;
