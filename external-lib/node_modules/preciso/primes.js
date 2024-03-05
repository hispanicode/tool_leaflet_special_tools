"use strict";

const compare_positive = require("./compare_positive.js");
const divide = require("./divide.js");
const is_integer = require("./is_integer.js");
const long_addition = require("./long_addition.js");

/**
 *
 * @param {String} start - numerical string
 * @param {String} end - numerical end
 * @returns {Array.<string>} primes - array of prime numbers as strings
 */
function primes(start = "0", end = "100") {
  const prime_single_digits = ["2", "3", "5", "7", "11"];
  const results = prime_single_digits.filter(n => compare_positive(n, start) !== "<" && compare_positive(n, end) !== ">");

  let num = "13";

  while (compare_positive(num, end) !== ">") {
    // don't even bother checking if ends with 5 or all one number
    if (!(/^\d+5/.test(num) || /^(\d)\1+/.test(num))) {
      if (["9", "7", "3"].every(digit => !is_integer(divide(num, digit)))) {
        results.push(num);
      }
    }
    num = long_addition(num, "2");
  }
  return results;
}

module.exports = primes;
module.exports.default = primes;
