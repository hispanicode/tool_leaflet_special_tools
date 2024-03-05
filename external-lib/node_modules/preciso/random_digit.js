"use strict";

function random_digit() {
  const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return nums[Math.floor(Math.random() * 10)];
}

module.exports = random_digit;
module.exports.default = random_digit;
