const median_of_a_lot = require("./median-of-a-lot.js");
const median_of_a_few = require("./median-of-a-few.js");

function calculate({ counts, nums, no_data, precise, threshold = 50, total }) {
  if (counts !== undefined || total !== undefined || nums.length > threshold) {
    return median_of_a_lot({ counts, no_data, nums, precise, total });
  } else {
    return median_of_a_few({ no_data, nums, precise });
  }
}

const mediana = { calculate };

if (typeof define === "function" && define.amd) {
  define(function () {
    return mediana;
  });
}

if (typeof module === "object") {
  module.exports = mediana;
  module.exports.default = { calculate };
}

if (typeof window === "object") {
  window.mediana = mediana;
}

if (typeof self === "object") {
  self.mediana = mediana;
}
