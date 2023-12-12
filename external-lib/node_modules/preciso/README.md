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
- supports CJS and ESM
- supports TypeScript
- [imaginary numbers](https://en.wikipedia.org/wiki/Imaginary_number)

## basic usage
The following functions are supported:
- [absolute](#absolute)
- [add](#add)
- [binomial_coefficient](#binomial-coefficient)
- [ceil](#ceil)
- [compare](#compare)
- [cube_root](#cube-root)
- [divide](#divide)
- [exp](#exp)
- [factorial](#factorial)
- [flip_sign](#flip-sign)
- [floor](#floor)
- [hypotenuse](#hypotenuse)
- [max](#max)
- [mean](#mean)
- [min](#min)
- [multiply](#multiply)
- [ols](#ols)
- [pow](#pow)
- [remainder](#remainder)
- [round](#round)
- [root](#root)
- [sign](#sign)
- [softmax](#softmax)
- [sort](#sort)
- [square_root](#square-root)
- [subtract](#subtract)
- [sum](#sum)
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
- limited support for `Infinity` and `-Infinity`
- no support for `NaN`

### absolute
```js
import abs from "preciso/absolute.js";

abs("-10");
"10"
```

### add
Add two numbers together.
```js
import add from "preciso/add.js";

add("0.1", "0.2"); // 0.1 + 0.2
"0.3"

add("Infinity", "0.1");
"Infinity"

add("Infinity", "-Infinity");
"NaN"

add("Infinity", "-Infinity", { infinity_minus_infinity: null });
null
```

### binomial_coefficient
```js
import binomial_coefficient from "preciso/binomial_coefficient.js";

// 7 choose 3
binomial_coefficient("7", "3")
"35"
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

### ceil
```js
import ceil from "preciso/ceil.js";

ceil(46);
"46"

ceil(-7.000000000000000000000000000000000000004);
"-7"
```

### cube root
```js
import cube_root from "preciso/cube_root.js";

cube_root("8"); // "2"
```

### divide
```js
import divide from "preciso/divide.js";

divide("-714.7008086132632", "8135.725531"); // -714.7008086132632 / 8135.725531
// default is 100 decimal places of precision
'-0.0878472123832102762218908980055167989417759034280282678823325216230183564682007707223868489179001533'
```

### euler's number
Calculate [Euler's Number](https://en.wikipedia.org/wiki/E_(mathematical_constant)), also known as **_e_**.
```js
import e from "preciso/eulers_number.js";

e();
'2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274'

e({ max_decimal_digits: 10 });
'2.7182818286'
```

### exp
Raise [Euler's Number](https://en.wikipedia.org/wiki/E_(mathematical_constant)) to the given power
```js
import exp from "preciso/exp.js";

exp("-Infinity") // "0"
exp("-1") // "0.3678794411714423..."
exp("0") // "1"
exp("1") // "2.718281828459045..."
exp("2") // "7.389056098930650..."
exp("10") // "22026.46579480671..."
exp("Infinity") // "Infinity"
```

### factorial
```js
import factorial from "preciso/factorial.js";

factorial("0");
"1"

factorial("3");
"6"

factorial("10");
"3628800"
```

### flip_sign
```js
import flip_sign from "preciso/flip_sign.js";

flip_sign(10);
-10

flip_sign(-99)
99

// zero has no sign change
flip_sign(0)
0
```

### floor
```js
import floor from "preciso/floor.js";

floor("45.9523663245126542371265437612538671523854172437561258367152356412734512");
"45"
floor("-45.95126753876125376512437641236512473654126345126534712653476152437651243");
"-46"
```

### mean
```js
import mean from "preciso/mean.js";

mean(["1", "10", "4"])
"5"

mean(["1", "2", "8"], { max_decimal_digits: 3 })
"3.667"

mean(["1", "2", "8"], { ellipsis: true })
"3.666..."
```

### hypotenuse
Calculate Hypotenuse in two or more dimensions.  This was inspired by [Math.hypot](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot).
```js
import hypotenuse from "preciso/hypotenuse.js";

hypotenuse("3", "4")
"5"

// calculate in three or more dimensions
hypotenuse("3", "4", "5", { max_decimal_digits: 10 })
"7.0710678118"

// imaginary number support
hypotenuse("3i", "4i")
"5"
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

// multiply three or more numbers
multiply("2", "3", "4");
"24"

// pass in an array of numerical strings
multiply(["2", "3", "4", "5"]);
"120"

multiply(["2", "-Infinity"]);
"-Infinity"

multiply(["0", "-Infinity"]);
"NaN"

multiply(["0", "-Infinity"], { infinity_times_zero: null });
null
```

### ols
Use ordinary least squares for simple linear regression.
```js
ols(
  [
    ["25", "651"],
    ["28", "762"],
    ["35", "853"],
    ["40", "1062"],
    ["46", "1190"],
    ["53", "1293"]
  ],
  { max_decimal_digits: 5 }
);

// variables for equation y = m * x + b
{
  m: "23.41401", // slope
  b: "82.66978" // y-intercept
}
```

### pow (power)
```js
import pow from "preciso/pow.js";

pow("2", "3")
"8"

pow("-2", "-3")
"-0.125"

// fractional exponents
pow("8", "1/3")
"0.5"

// set zero to the power of zero
pow("0", "0", { zero_to_the_power_of_zero: undefined })
undefined
```

### reciprocal
Calculate [reciprocal](https://en.wikipedia.org/wiki/Multiplicative_inverse) or [multiplicative inverse](https://en.wikipedia.org/wiki/Multiplicative_inverse)
```js
import reciprocal from "preciso/reciprocal.js"

reciprocal("0.1");
"10"

// return fraction if applicable
reciprocal("3/4", { fraction: true })
"4/3"
```

### remainder
```js
import remainder from "preciso/truncate.js";

remainder("10", "3"); // 10 % 3
"1"

remainder("-0.5", "2"); // -0.5 % 2
"-0.5"
```

### root
Find the n-th root of a number
```js
import root from "preciso/root.js";

// 4th root of 4096
root("4096", "4"); // 8

// 7th root of 1024
root("1024", "7", { max_decimal_digits: 50 })
'2.69180038526471226388566520750188380873249405355495'

// imaginary number
root("-4", "2"); // "-2i"
```

### round
```js
import round from "preciso/round.js";

round("0.99")
"1"

round("0.12345");
"0"

// round to the specified number of digits
round("0.12345", { digits: 2 })
"0.12"
```

### sign
```js
import sign from "preciso/subtract.js";

sign("13e451");
"+"

sign("-0.123");
"-"

sign("-0.00");
""
```

### sort
```js
import sort from "preciso/sort.js"

// default is sorting in ascending order (smallest to greatest)
sort(["1", "2", "3"])
["1", "2", "3"]

// sort in descending order from greatest to smallest
sort(["1", "2", "3"], { direction: "descending" })
["3", "2", "1"]
```

### softmax
Calculate the [softmax function](https://en.wikipedia.org/wiki/Softmax_function)
```js
import softmax from "preciso/softmax.js";

// example data from https://en.wikipedia.org/wiki/Softmax_function
softmax(["1", "2", "3", "4", "1", "2", "3"], { max_decimal_digits: 8 });
["0.02364054", "0.06426166", "0.1746813", "0.474833", "0.02364054", "0.06426166", "0.1746813"]
```

### square root
```js
import square_root from "preciso/square_root.js";

square_root("0.25"); // "0.5"
square_root("16"); // "4"
square_root("-49"); // "7i"
```


### subtract
```js
import subtract from "preciso/subtract.js";

subtract("10", "2.14"); // 10 - 2.14
"7.86"

subtract("Infinity", "Infinity");
"NaN"

subtract("Infinity", "Infinity", { infinity_minus_infinity: "0" });
"0"
```

### sum
Similar to add, but can take an array of more than two numbers.
```js
import sum from "preciso/sum.js";

sum(["1", "2", "3"])
"6"
```

### truncate
```js
import truncate from "preciso/truncate.js";

truncate("-714.7008086132632"); // equivalent to Math.trunc(-714.7008086132632)
"-714"
```
