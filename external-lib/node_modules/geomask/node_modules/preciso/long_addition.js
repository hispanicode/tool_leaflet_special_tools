// assumes both numbers are positive integers
module.exports = function long_addition(a, b) {
  // assuming both positive for now

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

  let right = Math.max(alen - a_adjusted_dot_index - 1, blen - b_adjusted_dot_index - 1);

  let aoffset = offset < 0 ? -1 * offset : 0;
  let boffset = offset <= 0 ? 0 : offset;

  let imax = left + 1 + right - 1; // -1 for zero-index

  let result = "";

  let carried = 0;

  // to the right of the period
  //        0.12345
  //    12345.0
  let i = imax;
  if (right > 0) {
    while (i > imax - right) {
      const achar = a[i - aoffset] || "0";
      const bchar = b[i - boffset] || "0";
      let n = Number(achar) + Number(bchar) + carried;
      if (n >= 10) {
        n -= 10;
        carried = 1;
      } else {
        carried = 0;
      }
      if (result !== "" || n !== 0) {
        result = n + result;
      }
      i--;
    }
    if (result) result = "." + result;
    i--; // substract 1 for dot
  }

  if (left > 0) {
    while (i >= 0) {
      const achar = a[i - aoffset] || "0";
      const bchar = b[i - boffset] || "0";
      let n = Number(achar) + Number(bchar) + carried;
      if (n >= 10) {
        n -= 10;
        carried = 1;
      } else {
        carried = 0;
      }
      result = n + result;
      i--;
    }
  }

  if (carried === 1) {
    result = carried + result;
  }

  return result;
};
