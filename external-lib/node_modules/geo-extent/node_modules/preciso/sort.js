"use strict";

const compare = require("./compare");

function sort(nums, { direction = "ascending" } = { direction: "ascending" }) {
  const op = direction === "desc" || direction === "descending" ? "<" : ">";
  return nums.sort((a, b) => (compare(a, b) === op ? 1 : -1));
}

module.exports = sort;
module.exports.default = sort;
