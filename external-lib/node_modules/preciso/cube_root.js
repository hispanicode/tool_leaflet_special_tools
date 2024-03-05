"use strict";

const root = require("./root.js");

function cube_root(radicand, options) {
  return root(radicand, "3", options);
}

module.exports = cube_root;
module.exports.default = cube_root;
