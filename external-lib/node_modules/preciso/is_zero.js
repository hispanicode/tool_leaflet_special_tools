"use strict";

function is_zero(n) {
  return /^[-+]?0(\.0+)?(e[\.\d]+)?$/.test(n);
}

module.exports = is_zero;
module.exports.default = is_zero;
