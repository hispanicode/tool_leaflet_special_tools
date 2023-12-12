# guess-image-layout
Guess the Layout of Image Pixels.  Returns layout in [xdim layout syntax](https://github.com/danieljdufour/xdim).

# install
```bash
npm install guess-image-layout
```

# basic usage
```js
import guessImageLayout from "guess-image-layout";

const rgba = [123, 234, 42, 255, 124, 42, 42, 255, ...];
guessImageLayout({ data: rgba, bands: 4, height: 768  });
// { layout: "[row,column,band]", bands: 4, height: 768, width: 1024 }

const bands = [
  [123, 124, ...], // red band
  [234, 42, ...], // green band
  [42, 42, ...], // blue band
  [255, 255, ...] // alpha band
];
guessImageLayout({ data: bands });
// { layout: "[band][row,column]", bands: 4, height: undefined, width: undefined }
```

# advanced usage
If you already know the array of layout of the data, you can pass that in and it will calculate what it can.
```js
import guessImageLayout from "guess-image-layout";

const rgba = [123, 234, 42, 255, 124, 42, 42, 255, ...];

guessImageLayout({ data: rgba, layout: "[band][row,column]" })
// { "bands": 4, "layout": "[band][row,column]", height: undefined, width: undefined }
```