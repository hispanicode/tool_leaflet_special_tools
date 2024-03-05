const absolute = require("./absolute.js");
const ceil = require("./ceil.js");
const clean = require("./clean.js");
const compare = require("./compare.js");
const compare_positive = require("./compare_positive.js");
const constants = require("./constants.js");

const floor = require("./floor.js");

const is_zero = require("./is_zero.js");

const min = require("./min.js");
const max = require("./max.js");
const expand = require("./expand.js");

const add = require("./add.js");
const long_addition = require("./long_addition.js");

const divide = require("./divide.js");
const long_division = require("./long_division.js");

const remainder = require("./remainder.js");

const round_last_decimal = require("./round_last_decimal.js");

const subtract = require("./subtract.js");
const long_subtraction = require("./long_subtraction.js");

const multiply = require("./multiply.js");
const long_multiplication = require("./long_multiplication.js");

const sign = require("./sign.js");
const sign_nonzero = require("./sign_nonzero.js");

const truncate = require("./truncate.js");

const module_exports = {
  absolute,
  ceil,
  clean,

  compare,
  compare_positive,

  constants,

  floor,

  is_zero,

  min,
  max,

  expand,
  add,
  long_addition,

  divide,
  long_division,

  multiply,
  long_multiplication,

  remainder,

  round_last_decimal,

  sign,
  sign_nonzero,

  subtract,
  long_subtraction,

  truncate
};

if (typeof define === "function" && define.amd)
  define(function () {
    return module_exports;
  });
if (typeof module === "object") module.exports = module_exports;
if (typeof window === "object") window.preciso = module_exports;
if (typeof self === "object") self.preciso = module_exports;
