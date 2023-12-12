const clean = require("./clean.js");

// given:
//  - a and b are positive numbers
//  - a and b have been cleaned (i.e. no + or leading zeros)
module.exports = function compare_positive(a, b) {
  const alen = a.length;
  const blen = b.length;

  const aidx = a.indexOf(".");
  const bidx = b.indexOf(".");

  // basically where would the dot be
  // if we add a dot at the end of integers
  // like 123.
  const a_adjusted_dot_index = aidx === -1 ? alen : aidx;
  const b_adjusted_dot_index = bidx === -1 ? blen : bidx;

  // how much you need to shift the second number
  // to line up the decimal with the first
  //        0.12345
  //    12345.0

  const offset = a_adjusted_dot_index - b_adjusted_dot_index;

  let left = Math.max(a_adjusted_dot_index, b_adjusted_dot_index);

  let right = Math.max(alen - a_adjusted_dot_index, blen - b_adjusted_dot_index);

  let aoffset = offset < 0 ? -1 * offset : 0;
  let boffset = offset <= 0 ? 0 : offset;

  let imax = left + 1 + right - 1; // -1 for zero-index

  let i = 0;
  while (i < imax) {
    const achar = a[i - aoffset] || "0";
    const bchar = b[i - boffset] || "0";
    if (achar !== bchar) {
      if (achar > bchar) return ">";
      else if (achar < bchar) return "<";
    }
    i++;
  }

  return "=";
};
