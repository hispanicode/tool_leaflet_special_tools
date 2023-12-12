const getDepth = require("get-depth");

function guessImageLayout({ bands, data, height, layout, width }) {
  const depth = getDepth(data);
  if (layout === "[row,column,band]" || depth === 1) {
    // guess interleaved rgba ImageData.data
    return {
      layout: "[row,column,band]",
      bands: bands ? bands : height && width ? data.length / (height * width) : undefined,
      height: height ? height : bands && width ? data.length / (bands * width) : undefined,
      width: width ? width : bands && height ? data.length / (bands * height) : undefined
    };
  } else if (depth === 2) {
    if (height && width) {
      if (data[0].length === height * width) {
        return { layout: "[band][row,column]", bands: data.length, height, width };
      } else if (data.length === height * width) {
        return { layout: "[row,column][band]", bands: data[0].length, height, width };
      }
    } else {
      // assume have more grid cells than bands
      if (data.length < data[0].length) {
        return {
          bands: data.length,
          layout: "[band][row,column]",
          height: height ? height : width ? data[0].length / width : undefined,
          width: width ? width : height ? data[0].length / height : undefined
        };
      } else {
        return {
          bands: data[0].length,
          layout: "[row,column][band]",
          height: height ? height : width ? data.length / width : undefined,
          width: width ? width : height ? data.length / height : undefined
        };
      }
    }
  } else if (depth === 3) {
    const len1 = data.length;
    const len2 = data[0].length;
    const len3 = data[0][0].length;
    if (height && width) {
      if (len1 === height && len2 === width) {
        return { layout: "[row][column][band]", bands: len3, height, width };
      } else if (len2 === height && len3 === width) {
        return { layout: "[band][row][column]", bands: len1, height, width };
      }
    } else {
      // assume band count is smaller than height and width
      if (len1 < len2 && len1 < len3) {
        return { layout: "[band][row][column]", bands: len1, height: len2, width: len3 };
      } else if (len3 < len1 && len3 < len2) {
        return { layout: "[row][column][band]", bands: len3, height: len1, width: len2 };
      }
    }
  }
}

if (typeof define === "function" && define.amd) {
  define(function () {
    return guessImageLayout;
  });
}

if (typeof module === "object") {
  module.exports = guessImageLayout;
  module.exports.default = guessImageLayout;
  module.exports.guessImageLayout = guessImageLayout;
}

if (typeof window === "object") {
  window.guessImageLayout = guessImageLayout;
}

if (typeof self === "object") {
  self.guessImageLayout = guessImageLayout;
}
