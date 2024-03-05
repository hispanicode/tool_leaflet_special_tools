"use strict";

const divide = require("./divide.js");
const exp = require("./exp.js");
const sum = require("./sum.js");

function softmax(vector, { max_decimal_digits }) {
  vector = vector.map(n => exp(n, { max_decimal_digits }));

  const total = sum(vector);

  return vector.map(n => divide(n, total, { max_decimal_digits, ellipsis: false }));
}

module.exports = softmax;
module.exports.default = softmax;
