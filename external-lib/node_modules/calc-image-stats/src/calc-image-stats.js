const calcStats = require("calc-stats");
const guessImageLayout = require("guess-image-layout");
const xdim = require("xdim");

const range = ct => new Array(ct).fill(0).map((_, i) => i);

/**
 * @name calcImageStats
 * @param {Array} values - multi-dimensional array of numbers
 * @param {options} options - Options
 * @param {options} options.bands - number of bands (3 for RGB, 4 for RGBA)
 * @param {options} options.height - height of image
 * @param {options} options.precise - calculate using floating point arithmetic or precise numerical strings. default is false
 * @param {options} options.stats - array of stats to calculate. see https://github.com/danieljdufour/calc-stats#specify-calculations
 * @param {options} options.width - width of image
 * @param {options} options.layout - layout of values (using xdim layout syntax)
 */
function calcImageStats(
  values,
  { bands, height, precise = false, stats, width, layout, ...rest } = {}
) {
  if (typeof values.then === "function") {
    throw new Error(
      "[calc-image-stats] you passed in a promise as the data values.  please resolve the promise first before calling calcImageStats"
    );
  }

  const result = guessImageLayout({
    bands,
    data: values,
    height,
    layout,
    width
  });
  bands ??= result.bands;
  height ??= result.height;
  layout ??= result.layout;
  width ??= result.width;

  const bandRange = range(bands);

  const bandStats = bandRange.map(bandIndex => {
    let band;
    const options = { precise, stats, ...rest };
    if (["[band][row,column]", "[band][column,row]"].includes(layout)) {
      band = values[bandIndex];
    } else if (
      ["[band][row][column]", "[band][column][row]"].includes(layout)
    ) {
      band = values[bandIndex];
      options.chunked = true;
    } else if (
      bands === 1 &&
      [
        "[band,row,column]",
        "[row,column,band]",
        "[column,band,row]",
        "[column,row,band]"
      ].includes(layout)
    ) {
      band = values;
    } else {
      const rect = { band: [bandIndex, bandIndex] };
      const sizes = { band: bands, column: width, row: height };
      band = xdim.iterClip({ data: values, layout, rect, sizes });
    }
    return calcStats(band, options);
  });

  return { depth: bands, height, width, bands: bandStats };
}

if (typeof define === "function" && define.amd) {
  define(function () {
    return calcImageStats;
  });
}

if (typeof module === "object") {
  module.exports = calcImageStats;
  module.exports.default = calcImageStats;
  module.exports.calcImageStats = calcImageStats;
}

if (typeof self === "object") {
  self.calcImageStats = calcImageStats;
}

if (typeof window === "object") {
  self.calcImageStats = calcImageStats;
}
