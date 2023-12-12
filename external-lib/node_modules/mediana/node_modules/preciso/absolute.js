const clean = require("./clean.js");

function absolute(n) {
  n = clean(n);
  if (n[0] === "-") return n.substring(1);
  else return n;
}

module.exports = absolute;
module.exports.default = absolute;
