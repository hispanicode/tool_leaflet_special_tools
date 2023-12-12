# calc-image-stats
> Calculate Band Statistics for an Image

## features
🦺 memory-safe: uses iterators to avoid copying pixel value arrays  
🚀 fast: uses [calc-stats](https://github.com/danieljdufour/calc-stats), which avoids intermediary calculations  
♦️  dynamic: works on numerical image data in any layout (by using [xdim](https://github.com/danieljdufour/xdim))  
🧭 precise: support for super precise calculations (by using [preciso](https://github.com/danieljdufour/preciso))  
⭐ type-safe: supports [TypeScript](https://www.typescriptlang.org/)

## bash
```bash
npm install calc-image-stats
```

## basic usage
```js
import calcImageStats from "calc-image-stats";

// array of RGBA values of 10x10 image
const data = [
   52,  70,  42, 255, 56,  72, 53, 255,  45,  60,  45, 255,
   37,  54,  30, 255, 62,  85, 48, 255,  70,  88,  53, 255,
   // ... 376 more items
];

const stats = calcImageStats(data, { height: 10, width: 10 });
```
stats will be the following object:
```js
{
  depth: 4, // number of bands
  height: 10,
  width: 10,
  bands: [
    {
      // red band
      count: 100,
      valid: 100,
      invalid: 0,
      median: 87,
      min: 9,
      max: 220,
      sum: 10489,
      range: 211,
      mean: 104.89,
      std: 53.908792418305936,
      modes: [51, 69, 87, 190],
      mode: 99.25
    },
    { ... }, // green band
    { ... }, // blue band
    {
      // alpha band
      count: 100,
      valid: 100,
      invalid: 0,
      median: 255,
      min: 255,
      max: 255,
      sum: 25500,
      range: 0,
      mean: 255,
      std: 0,
      modes: [255],
      mode: 255
    }
  ]
};
```

## advanced usage
```js
const stats = calcImageStats(data, {
   height: 123456,
   precise: true, // calculate using super precise numerical strings
   stats: ["variance"], // choose which stats to calculate
   width: 123456
});

{
  depth: 1, // only 1 band of data
  height: 123456,
  width: 123456,
  bands: [
    {
      // super precise result because we set precise to true
      variance: "1321.41725347154236125321387514273412736"
    }
  ]
}   
```
