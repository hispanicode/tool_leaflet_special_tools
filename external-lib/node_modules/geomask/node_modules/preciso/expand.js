// convert exponential notation to normal string
// not optimized yet and no support for big numbers
module.exports = function expand(n) {
  // remove + from beginning
  if (n[0] === "+") n = n.substring(1);

  const sign = n[0] === "-" ? "-" : "";
  if (sign === "-") n = n.substring(1);

  const index_of_e = n.indexOf("e");

  // number not in exponential notation
  if (index_of_e === -1) return sign + n;

  let index_of_dot = n.indexOf(".");

  // if number doesn't include a period dot
  // then just assume it at the end
  // such that 3e4 has index of dot at 1
  if (index_of_dot === -1) index_of_dot = index_of_e;

  const shift = Number(n.substring(index_of_e + 1));

  // remove old decimal place
  const base = n.substring(0, index_of_e).replace(".", "");

  // normalize shift to start of the string at index zero
  const normshift = index_of_dot + shift;

  const baselen = base.length;

  if (normshift >= baselen) {
    const zct = normshift - baselen;
    let result = base;
    for (let i = 0; i < zct; i++) result += "0";
    return sign + result;
  } else if (normshift < 0) {
    // need to add zeros in decimal places
    result = "0.";
    for (let i = 0; i > normshift; i--) result += "0";
    result += base;
    return sign + result;
  } else {
    // shifting within the base
    return sign + base.substring(0, normshift) + "." + base.substring(normshift);
  }
};
