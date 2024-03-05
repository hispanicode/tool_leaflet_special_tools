const clean = require("./clean.js");
module.exports = function absolute(n) {
  n = clean(n);
  if (n[0] === "-") return n.substring(1);
  else return n;
};
