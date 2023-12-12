const add = require("preciso/add");
const divide = require("preciso/divide");

function mean(a, b, { precise = false } = { precise: false }) {
  if (precise) {
    return divide(add(a.toString(), b.toString()), "2");
  } else {
    return (a + b) / 2;
  }
}

module.exports = mean;
module.exports.default = mean;
