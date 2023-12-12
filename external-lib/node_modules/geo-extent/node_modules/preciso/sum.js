"use strict";

const add = require("./add.js");

function sum(nums) {
  let total = "0";
  // using iterator protocol
  for (let num of nums) {
    total = add(total, num);
  }
  return total;
}

module.exports = sum;
module.exports.default = sum;
