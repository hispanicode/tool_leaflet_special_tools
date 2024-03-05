"use strict";

const add = require("./add.js");
const divide = require("./divide.js");

function mean(nums, options) {
  let count = 0;
  let total = "0";
  for (let num of nums) {
    count++;
    total = add(total, num);
  }
  return divide(total, count.toString(), options);
}

module.exports = mean;
module.exports.default = mean;
