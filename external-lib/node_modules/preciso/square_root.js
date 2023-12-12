"use strict";

const root = require("./root.js");

function square_root(radicand, options) {
  return root(radicand, "2", options);
}

module.exports = square_root;
module.exports.default = square_root;
