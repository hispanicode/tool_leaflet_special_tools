"use strict";

const add = require("./add.js");
const divide = require("./divide.js");
const multiply_rational = require("./multiply_rational.js");
const round = require("./round.js");
const subtract = require("./subtract.js");
const square = require("./square.js");

function ols(points, options) {
  const number_of_points = points.length;
  let sum_of_x = "0";
  let sum_of_x_squares = "0";
  let sum_of_y = "0";
  let sum_of_y_squares = "0";

  if (number_of_points === 0) throw Error("[preciso] zero points passed to linear_regression");

  for (let i = 0; i < number_of_points; i++) {
    const [x, y] = points[i];
    sum_of_x = add(sum_of_x, x);
    sum_of_x_squares = add(sum_of_x_squares, square(x));
    sum_of_y = add(sum_of_y, y);
    sum_of_y_squares = add(sum_of_y_squares, square(y));
  }

  const number_of_points_as_string = number_of_points.toString();
  const x_mean = divide(sum_of_x, number_of_points_as_string);
  const y_mean = divide(sum_of_y, number_of_points_as_string);

  // second pass to calculate errors
  let sum_of_errors = "0";
  let sum_of_residual_squares = "0";
  for (let i = 0; i < number_of_points; i++) {
    const [x, y] = points[i];

    const x_error = subtract(x, x_mean);
    const y_error = subtract(y, y_mean);
    const xy_error = multiply_rational([x_error, y_error]);
    sum_of_errors = add(sum_of_errors, xy_error);

    const x_error_square = square(x_error);
    sum_of_residual_squares = add(sum_of_residual_squares, x_error_square);
  }

  // y = m * x + b
  let m = divide(sum_of_errors, sum_of_residual_squares);
  let b = subtract(y_mean, multiply_rational(m, x_mean));

  if (options && typeof options.max_decimal_digits === "number") {
    m = round(m, { digits: options.max_decimal_digits });
    b = round(b, { digits: options.max_decimal_digits });
  }

  return { m, b };
}

module.exports = ols;
module.exports.default = ols;
