const compare_positive = require("./compare_positive.js");
const add = require("./add.js");
const multiply = require("./multiply.js");
const subtract = require("./subtract.js");
const round_last_decimal = require("./round_last_decimal.js");

// given dividend and divisor are positive numberical strings
module.exports = function long_division(dividend, divisor, { max_decimal_digits = 100, ellipsis = false } = {}) {
  // remove unnecessary starting zeros
  // ex: 0.5 => .5
  if (dividend[0] === "0") dividend = dividend.substring(1);
  if (divisor[0] === "0") divisor = divisor.substring(1);

  const dividend_index_of_dot = dividend.indexOf(".");
  const divisor_index_of_dot = divisor.indexOf(".");

  const adjusted_dividend_index_of_dot = dividend_index_of_dot === -1 ? dividend.length : dividend_index_of_dot;
  const divisor_num_decimal_places = divisor_index_of_dot === -1 ? 0 : divisor.length - 1 - divisor_index_of_dot;

  // whether the result has a repeating decimal
  // e.g. 1/3 is repeating as in "0.333..."
  let repeating = false;

  // remove decimals
  dividend = dividend.replace(/\./, "");
  divisor = divisor.replace(/\./, "");

  const dividend_length = dividend.length;

  let current = "";
  let quotient = "";
  let comparison;
  let offset = -1 * divisor_num_decimal_places;
  let skip = 0;
  for (let i = 0; i < dividend_length; i++) {
    const char = dividend[i];

    current += char;

    comparison = compare_positive(current, divisor);

    if (comparison === ">") {
      // same as const times = Math.floor(current / divisor);
      // but without floating point problems
      let times = 1;
      let product = add(divisor, divisor);
      let passed_product = divisor;
      while (compare_positive(product, current) !== ">") {
        times++;
        passed_product = product;
        product = add(product, divisor);
      }
      times = times.toString();

      if (quotient !== "") {
        for (let i = times.length; i <= skip; i++) quotient += "0";
      }
      quotient += times; // string concatentation

      current = subtract(current, passed_product);

      skip = 0;
    } else if (comparison === "<") {
      if (quotient === "") {
        offset++;
      }
      skip++;

      // outside greater than inside
      continue;
    } else if (comparison === "=") {
      if (quotient !== "") {
        for (let i = 0; i < skip; i++) quotient += "0";
      }
      quotient += "1";
      current = "0";
      skip = 0;
    }
  }

  if (current.match(/^0+$/g)) {
    if (comparison === "<") {
      quotient += current.substring(0, current.length - 1);
    }
  } else {
    const previous = {};

    // keep dividing until we have an answer
    // figure out current place of decimal number
    const idot = adjusted_dividend_index_of_dot - offset;
    const qlen = quotient.length;
    // add 1 extra for rounding purposes
    const imax = idot - qlen + max_decimal_digits + 1;

    // reset skip if just "" so far because don't want to count 0 in 0.
    if (quotient === "") {
      skip = 0;
    }

    for (let i = 0; i < imax; i++) {
      current += "0";
      if (ellipsis) {
        if (current in previous) {
          previous[current]++;
          if (previous[current] > 3) {
            quotient += "...";
            repeating = true;
            break;
          }
        } else {
          previous[current] = 1;
        }
      }
      const comparison = compare_positive(current, divisor);

      if (comparison === ">") {
        // inside greater than outside

        // how many times the divisor goes into the current
        let times = 1;
        let product = add(divisor, divisor);
        let passed_product = divisor;
        while (compare_positive(product, current) !== ">") {
          times++;
          passed_product = product;
          product = add(product, divisor);
        }

        times = times.toString();

        // pad left zeros
        for (let i = times.length; i <= skip; i++) quotient += "0";
        quotient += times; // string concatentation
        current = subtract(current, passed_product);

        if (current === "0") {
          break;
        }

        skip = 0;
      } else if (comparison === "<") {
        // outside greater than inside
        skip++;
        continue;
      } else if (comparison === "=") {
        // fill in previous with zeros
        for (let i = 0; i < skip; i++) quotient += "0";
        quotient += "1";
        skip = 0;
        break;
      }
    }
  }

  // reinsert decimal place

  const idot = adjusted_dividend_index_of_dot - offset;
  const qlen = quotient.length;

  let num_decimals;

  if (idot === qlen) {
    // integer number so don't do anything
    num_decimals = 0;
  } else if (idot < 0) {
    quotient = "0." + "0".repeat(Math.abs(idot)) + quotient;
    num_decimals = qlen - idot; // idot is negative, so adding
  } else if (idot > qlen) {
    // add more zeros to integer
    for (let i = qlen; i < idot; i++) quotient += "0";
    num_decimals = 0;
  } else if (idot < qlen) {
    quotient = quotient.substring(0, idot) + "." + quotient.substring(idot);
    num_decimals = qlen - idot;
  } else if (idot === 0) {
    quotient = "0." + quotient;
    num_decimals = qlen;
  }

  // remove zeros from front
  // 03938.123 => 3938.123
  quotient = quotient.replace(/^0+/, "");

  // remove extra zeros from the end
  quotient = quotient.replace(/\.\d+0+$/, "");

  // round if necessary
  if (!repeating) {
    const extra_decimals = num_decimals - max_decimal_digits;
    if (extra_decimals > 0) {
      quotient = round_last_decimal(quotient.substring(0, quotient.length - extra_decimals + 1));
    }
  }

  if (quotient[0] === ".") quotient = "0" + quotient;

  return quotient;
};
