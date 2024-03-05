"use strict";

const multiply_array = require("./multiply_array.js");

function multiply() {
  const args = Array.from(arguments);
  const options = typeof args[args.length - 1] === "object" ? args[args.length - 1] : undefined;
  const nums = Array.isArray(args[0]) ? args[0] : options ? args.slice(0, args.length - 1) : args;
  return multiply_array(nums, options);
}

module.exports = multiply;
module.exports.default = multiply;
