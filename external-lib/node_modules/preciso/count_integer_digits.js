"use strict";

const absolute = require("./absolute.js");
const clean = require("./clean.js");

function count_integer_digits(n) {
  n = absolute(clean(n));

  const i = n.indexOf(".");

  return (i === -1 ? n.length : i).toString();
}

module.exports = count_integer_digits;
module.exports.default = count_integer_digits;
