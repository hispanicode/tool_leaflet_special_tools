⚠️ This library is currently in beta, so the function signatures are subject to change.

---

# pixel-utils
> Minimalist Utility Functions for Pixels

## features
- no data values
- optional mutability for fast memory-preserving operations
- optimized for speed
- range flipping
- simple conversion between RGB and RGBA
- support for CommonJS and ES Modules
- typescript

## install
```bash
npm install pixel-utils
```

## functions
- **conversion**
  - [`rawToRgb`](https://github.com/DanielJDufour/pixel-converters/tree/main/src/raw-to-rgb) - convert a raw unprocessed pixel value to RGB
  - [`rawToRgba`](https://github.com/DanielJDufour/pixel-converters/tree/main/src/raw-to-rgba) - convert a raw unprocessed pixel value to RGBA
  - [`rgbToRgba`](https://github.com/DanielJDufour/pixel-converters/tree/main/src/rgb-to-rgba) - convert from RGB to RGBA
  - [`rgbaToRgb`](https://github.com/DanielJDufour/pixel-converters/tree/main/src/rgba-to-rgb) - convert from RGBA to RGB
- **no data**
  - `makeNoDataRgb` - create a no data RGB pixel
  - `makeNoDataRgba` - create a no data RGB pixel
- **iteration**
  - [`eachPixel`](https://github.com/DanielJDufour/pixel-converters/tree/main/src/each-pixel) - call a callback for each pixel
- **selection**
  - [`select`](https://github.com/DanielJDufour/pixel-converters/tree/main/src/select-pixel) - select a pixel from image data of arbitrary dimensions
- **transparency**
  - [`addAlpha`](https://github.com/DanielJDufour/pixel-converters/tree/main/src/add-alpha) - add an alpha transparency channel
  - [`isHidden`](https://github.com/DanielJDufour/pixel-converters/tree/main/src/is-hidden) - check if an RGBA pixel is transparent
  - [`setHidden`](https://github.com/DanielJDufour/pixel-converters/tree/main/src/set-hidden) - mutates input pixel, setting alpha channel to visible
  - [`showRGBA`](https://github.com/DanielJDufour/pixel-converters/tree/main/src/show-rgba) - make RGBA visible
- **[and many more](https://github.com/DanielJDufour/pixel-utils/tree/main/src)**

## core assumptions and constraints
An RGB pixel has these assumed properties:
- array of 3 numbers between zero and 255
- no data is represented by either black or white

An RGBA pixel has these assumed properties:
- array of 4 numbers between zero and 255
- the first 3 numbers are "data" values and the last value is an alpha tranparency value
- an alpha value of 0 indicates that at least one of the data bands is "no data"
- there may be a per-band no data value, but it is not required

A raw (unscaled) pixel value has these assumed properties:
- between 1 and inifinity number of bands
- number can be any valid number
- no data value must be the same for each band (we don't love this, but it's a common constraint)
- there is no transparency channel/band (we may work to remove this constraint)

## comparison
There are several other pixel manipulation libraries, including [p5js](https://p5js.org/) and [fabricjs](http://fabricjs.com/), 
however pixel-utils provides some unique features not found in other libraries:
- raw image data support: most (if not all) alternatives assume that an image is a 8-bit 0-255 RGBA data
- arbitrary image layout support: most (if not all) alternatives assume that your data is in a flat Uint8ClampedArray, but pixel-utils support all possible data layouts thanks to the [xdmin](https://github.com/danieljdufour/xdim) layout syntax.
