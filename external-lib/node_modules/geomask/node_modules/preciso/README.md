# preciso
> Precise Mathematical Functions

### features:
- no floating point arithmetic errors
- relatively fast
- functional programming (no class methods to learn)
- simple input and output (simple numerical strings)
- import only what you need
- tested on ten thousand random numbers
- supports scientific exponential notation

## basic usage
The following functions are supported:
- [absolute](#absolute)
- [add](#add)
- [compare](#compare)
- [divide](#divide)
- [max](#max)
- [min](#min)
- [multiply](#multiply)
- [remainder](#remainder)
- [subtract](#subtract)
- [truncate](#truncate)

## install
You typically want to install preciso using the [NPM CLI](https://docs.npmjs.com/cli/v8), [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/), or something similar.
```bash
npm install preciso
```
If you don't have access to a bundler, you can "install" preciso using an HTML script tag,
which will set a global preciso variable.
```html
<script src="https://unpkg.com/preciso"></script>
<script>
  console.log(preciso.abs("-10"));
  // "10"
</script>
```

### limitations
- no support for `Infinity`, `-Infinity`, or `NaN`

### absolute
```js
import abs from "preciso/absolute.js";

abs("-10");
"10"
```

### add
```js
import add from "preciso/add.js";

add("0.1", "0.2"); // 0.1 + 0.2
"0.3"
```

### compare
```js
import compare from "preciso/compare.js";

compare("0.1", "0.2");
"<"

compare("0.1", "-0.2");
">"

compare("0.1", "+.1");
"="
```

### divide
```js
import divide from "preciso/divide.js";

divide("-714.7008086132632", "8135.725531"); // -714.7008086132632 / 8135.725531
// default is 100 decimal places of precision
'-0.0878472123832102762218908980055167989417759034280282678823325216230183564682007707223868489179001533'
```

### max
```js
import max from "preciso/min.js";

max("0.1", "0.2"); // or max(["0.1", "0.2"]);
"0.2"
```

### min
```js
import min from "preciso/min.js";

min("0.1", "0.2"); // or min(["0.1", "0.2"]);
"0.1"
```

### multiply
```js
import multiply from "preciso/multiply.js";

multiply("-714.7008086132632", "8135.725531"); // -714.7008086132632 * 8135.725531
"-5814609.6156612701214627592"
``` 

### remainder
```js
import remainder from "preciso/truncate.js";

remainder("10", "3"); // 10 % 3
"1"

remainder("-0.5", "2"); // -0.5 % 2
"-0.5"
```

### subtract
```js
import subtract from "preciso/subtract.js";

subtract("10", "2.14"); // 10 - 2.14
"7.86"
```

### truncate
```js
import truncate from "preciso/truncate.js";

truncate("-714.7008086132632"); // equivalent to Math.trunc(-714.7008086132632)
"-714"
```
