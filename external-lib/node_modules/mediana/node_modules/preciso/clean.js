const expand = require("./expand.js");

module.exports = function clean(n) {
  // remove + from beginning
  if (n[0] === "+") n = n.substring(1);

  n = expand(n);

  // remove extra zero in front
  // 03938.123 => 3938.123
  n = n.replace(/^0+(?=\d)/, "");

  // remove extra zero at end
  if (n.includes(".")) n = n.replace(/\.?0+$/, "");

  // should improve this, so it identifies zero earlier
  if (n === "") n = "0";

  return n;
};
