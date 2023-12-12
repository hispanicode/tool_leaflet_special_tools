# segflip
Flip the Inside and Outside of Segments on a Single-Dimensional Integer Line

# install
### command line
```bash
npm install segflip
```
### browser
```html
<script src="https://unpkg.com/segflip"></script>
```

# usage
```js
import segflip from "segflip";

// 21st century recessions in the United States
// from https://en.wikipedia.org/wiki/List_of_recessions_in_the_United_States
const recessions = [
  [2001, 2001], // Early 2000s recession
  [2007, 2009], // Great Recession
  [2020, 2020] // COVID-19 recession
];

const results = segflip({
  segments: recessions,
  
  // smallest possible integer
  // default is -Infinity
  min: 2000,
  
  // largest possible integer
  // default is Infinity
  max: 2022
});
```
results is an array of year ranges when there wasn't a recession
```js
[
  [2000, 2000],
  [2002, 2006],
  [2010, 2019],
  [2021, 2022]
]
```
