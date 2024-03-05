# iter-fun
Fun with Iterables

# install
```bash
npm install iter-fun
```

# usage
```js
import { getOrCreateIterator } from "iter-fun";
// if the object has an iterator, return it
// if not, create one from the object
const iter = getOrCreateIterator(obj);

import { isArray } from "iter-fun";
isArray([1, 2, 3]); // true

import { isIterator } from "iter-fun";
isIterator([1, 2, 3][Symbol.iterator]()); // true

import { hasNext } from "iter-fun";
hasNext({ next: () => {...} }); // true

import { hasIterator } from "iter-fun";
hasIterator({ "@@iterator": ... }); // true

import { hasSymbolIterator } from "iter-fun";
hasSymbolIterator(Array); // true

import { getIterator } from "iter-fun";
const iter = getIterator([1, 2]);
iter.next(); // { value: 1, done: false }
iter.next(); // { value: 2, done: false }
iter.next() // { done: true }

import { createIterator } from "iter-fun";
// obj must have a length property
// and index-addressable data like obj[123]
const iter = createIterator(obj);

import { addSymbolIterator } from "iter-fun";
const obj = { next: () => {...} };
addSymbolIterator(obj);
// modifies the object in-place adding a [Symbol.iterator] key

import { addSymbolIteratorFallback } from "iter-fun";
const obj = { next: () => {...} };
addSymbolIteratorFallback(obj);
// modifies the object in-place adding a "@@iterator" string key
// helpful if you are running in an old browser

import { wrapNextFunction } from "iter-fun";
const next = () => { ... };
const iter = wrapNextFunction(next);
// converts a next function into a fully functioning iterable

import { zip } from "iter-fun";
const zeros = [0, 0, 0, ...];
const twos = [2, 2, 2, ...];
const sixties = [60, 60, 60, ...];
const iters = [zeros, twos, sixties];
const zipped = zip(iters);
zipped.next();
// { done: false, value: [0, 2, 60] }
```
