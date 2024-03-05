"use strict";

const square = require("./square.js");
const square_root = require("./square_root.js");
const sum = require("./sum.js");

function hypotenuse() {
  const args = Array.from(arguments);
  const options = typeof args[args.length - 1] === "object" ? args[args.length - 1] : undefined;
  const nums = Array.isArray(args[0]) ? args[0] : options ? args.slice(0, args.length - 1) : args;
  const squares = nums.map(n => square(n));
  return square_root(sum(squares), options);
}

module.exports = hypotenuse;
module.exports.default = hypotenuse;
