const clean = require("./clean.js");
const compare = require("./compare.js");

module.exports = function min(nums) {
  // called like min(n1, n2, n3...)
  if (typeof nums === "string") nums = Array.prototype.slice.call(arguments);
  let result = clean(nums[0]);
  const len = nums.length;
  for (let i = 1; i < len; i++) {
    const n = nums[i];
    if (compare(n, result) === "<") {
      result = n;
    }
  }
  return result;
};
