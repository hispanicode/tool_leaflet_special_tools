"use strict";

// const lookup = {};
// const vals = [undefined, 0, 1, 2, 3, 4, 5, 6, 8, 9];
// vals.forEach(top => {
//   lookup[top] = {};
//   vals.forEach(bottom => {
//     lookup[top][bottom] = (top || 0) - (bottom || 0);
//   })
// });

const { MAX_SAFE_INTEGER_LENGTH } = require("./constants.js");

// assumes (1) both a and b are positive numbers
// and (2) a is larger than b
function long_subtraction(a, b) {
  const alen = a.length;
  const blen = b.length;

  const aidx = a.indexOf(".");
  const bidx = b.indexOf(".");

  // basically where would the dot be
  // if we add a dot at the end of integers
  // like 123.
  const a_adjusted_dot_index = aidx === -1 ? alen : aidx;
  const b_adjusted_dot_index = bidx === -1 ? blen : bidx;
  // console.log({a_adjusted_dot_index, b_adjusted_dot_index});

  // how much you need to shift the second number
  // to line up the decimal with the first
  //        0.12345
  //    12345.0

  // just use floating point arithmetic for small integers
  if (aidx === -1 && bidx === -1 && alen < MAX_SAFE_INTEGER_LENGTH && blen < MAX_SAFE_INTEGER_LENGTH) {
    return (Number(a) - Number(b)).toFixed();
  }

  const offset = a_adjusted_dot_index - b_adjusted_dot_index;
  // console.log("offset:", offset);

  let left = Math.max(a_adjusted_dot_index, b_adjusted_dot_index);
  // console.log("left:", left);

  let right = Math.max(alen - a_adjusted_dot_index - 1, blen - b_adjusted_dot_index - 1);
  // console.log("right:", right);

  let aoffset = offset < 0 ? -1 * offset : 0;
  let boffset = offset <= 0 ? 0 : offset;
  // console.log({aoffset, boffset});

  let imax = left + 1 + right - 1; // -1 for zero-index
  // console.log({imax});

  let result = "";

  // number of borrowings
  let borrowed = 0;

  // to the right of the period
  //  100.5  6  7
  //    2.2  9  3
  //        (-3 + 10)  4
  let i = imax;
  if (right > 0) {
    while (i > imax - right) {
      // console.log("\n\n", {i});
      let top = a[i - aoffset] || "0";
      let bottom = b[i - boffset] || "0";

      // console.log("pre borrowing", {top, bottom});
      top -= borrowed;
      borrowed = 0;

      // console.log("after borrowing", {top, bottom});
      let n = top - bottom;

      // console.log({n});
      if (n < 0) {
        while (n < 0) {
          borrowed++;
          n += 10;
        }
      } else if (borrowed) {
        borrowed--;
      }
      // console.log({n});
      if (result !== "" || n !== 0) {
        result = n + result;
      }
      i--;
    }
    if (result !== "") {
      result = "." + result;
    }
    i--; // substract 1 for dot
  }

  // console.log({result});

  if (left > 0) {
    while (i > 0) {
      // console.log("\n\n", {i});
      let top = a[i - aoffset] || "0";
      let bottom = b[i - boffset] || "0";

      // console.log("pre borrowing", {top, bottom});
      top -= borrowed;
      borrowed = 0;

      // console.log("after borrowing", {top, bottom});
      let n = top - bottom;

      // console.log({n});
      if (n < 0) {
        while (n < 0) {
          borrowed++;
          n += 10;
        }
      } else if (borrowed) {
        borrowed--;
      }
      // console.log({n});
      result = n + result;
      i--;
    }

    // console.log({borrowed});
    // special rule for last one
    const achar = a[0 - aoffset] || "0";
    const bchar = b[0 - boffset] || "0";
    let n = Number(achar) - (borrowed > 0 ? 1 : 0) - Number(bchar);
    if (n !== 0) {
      result = n + result;
    }

    // remove any zeros in front like in 0123
    result = result.replace(/^0+/, "");
  }

  // if decimal number add zero
  if (result[0] === ".") result = "0" + result;

  return result;
}

module.exports = long_subtraction;
module.exports.default = long_subtraction;
