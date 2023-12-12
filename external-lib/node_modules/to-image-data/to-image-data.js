const guessImageLayout = require("guess-image-layout");
const xdim = require("xdim");

module.exports = function toImageData(input, meta = {}) {
  let height, width, data, bands, in_layout;

  if (input.data) data = input.data;
  else if (input.pixels) data = input.pixels;
  else data = input;

  if (input.height) height = input.height;
  else if (data.height) height = data.height;
  else if (meta.height) height = meta.height;

  if (input.width) width = input.width;
  else if (data.width) width = data.width;
  else if (meta.width) width = meta.width;

  if (input.layout) in_layout = input.layout;
  else if (meta.layout) in_layout = meta.layout;

  const guessed = guessImageLayout({ data, height, width });
  if (!bands) bands = guessed.bands;
  if (!height) height = guessed.height;
  if (!width) width = guessed.width;
  if (!in_layout) in_layout = guessed.layout;

  if (!height + !width + !bands >= 2) {
    throw new Error(
      "[to-image-data] unable to determine image layout without more information. please pass in an object with a height and/or width property"
    );
  }

  const arr = new Uint8ClampedArray(4 * height * width).fill(255);

  const select = xdim.prepareSelect({
    data,
    layout: in_layout,
    sizes: { band: bands, row: height, column: width }
  });

  const update = xdim.prepareUpdate({
    data: arr,
    layout: "[row,column,band]",
    sizes: { band: 4, row: height, column: width }
  });

  for (let b = 0; b < bands; b++) {
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        const point = { band: b, row: r, column: c };
        const { value } = select({ point });
        update({ point, value });
      }
    }
  }

  let result;
  if (typeof ImageData !== "undefined") {
    try {
      result = new ImageData(arr, width, height);
    } catch (error) {
      // pass
    }
  }

  if (!result) {
    // above failed for whatever reason
    // so return an ImageData-like object
    result = { data: arr, width, height };
  }

  return result;
};
