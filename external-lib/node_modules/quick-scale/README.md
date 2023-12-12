# quick-scale
> Create a Fast Linear Scaling Function

### features
- CPU Optimized
- Reversible
- Rounding

### install
```bash
npm install quick-scale
```

### basic usage
In this basic example, we scale values from an unsigned 16-bit range
(common in satellite imagery) to an unsigned 8-bit range (common in JPG and PNG files).
```js
import { createScaleFunction } from "quick-scale";

// the [min, max] values for a 16-bit image
const old_range = [0, 65536];

// the [min, max] values for an 8-bit RGB image
const new_range = [0, 255];

const scale = createScaleFunction(old_range, new_range);

// apply this scale function to a bunch of numbers
scale(65535); // highest possible input value
255

scale(0); // lowest possible input value
0

scale(32767); // a value close to the middle
127.49805447470817
```

### advanced usages
We can round, flip and do more advanced things by passing in an options object:
```js
const scale = createScaleFunction(old_range, new_range, {
  // flip the scale, so higher and lower values are reversed
  // the typical use case is if you want higher data values to appear
  // darker in an RGB(A) image
  flip: true,

  // sometimes the difference between the min and max of a source range
  // will be zero, like when an image transparency band is all 255
  // if you'd like to provide a value to return in this case, set no_range_value
  no_range_value: -99,

  // if your input range is zero and you don't set no_range_value,
  // then quick-scale will return the "highest", "lowest", or "middle" value of the new range
  // the default is to return the highest value of the new range
  no_range_value_strategy: "lowest",

  // round the result
  round: true
});

scale(65535);
0 // the highest value becomes the lowest because flip was set to true

scale(0);
255 // the lowest value becomes the highest because flip was set to true

scale(32767);
128 // rounded result
```
