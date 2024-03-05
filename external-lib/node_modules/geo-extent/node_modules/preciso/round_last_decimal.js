"use strict";

const add = require("./add.js");
const truncate_decimal = require("./truncate_decimal.js");

// given n is a positive decimal number
const up = ["5", "6", "7", "8", "9"];

function round_last_decimal(n) {
  // will round up to an integer
  if (n.match(/\.9+$/)) {
    return add(truncate_decimal(n), "1");
  }

  // remove + from beginning
  if (n[0] === "+") n = n.substring(1);

  //console.log("rounding:", {n});
  const len = n.length;
  //console.log({len});
  let result = "";

  const last_char = n[n.length - 1];
  //console.log({last_char});

  if (up.includes(last_char)) {
    let i;
    for (i = len - 2; i >= 0; i--) {
      const char = n[i];
      //console.log({char});
      // skip over . or -
      if (char === "." || char === "-") continue;

      const nchar = Number(char) + 1;
      //console.log({nchar});

      if (nchar === 10) {
        result = "0" + result;
        // keep rounding up
      } else {
        result = nchar + result;
        break;
      }
    }
    //console.log({i});
    if (i > 0) result = n.substring(0, i) + result;
  } else {
    result = n.substring(0, len - 1);
  }

  if (result[result.length - 1] === ".") result = result.substring(0, result.length - 1);

  // remove trailing zeros in decimal number
  // 0.50 => 0.5
  if (result.indexOf(".") > -1) result = result.replace(/0+$/, "");

  return result;
}

module.exports = round_last_decimal;
module.exports.default = round_last_decimal;
