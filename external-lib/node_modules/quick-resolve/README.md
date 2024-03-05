# quick-resolve
A Synchronous Promise.resolve.  Preserve Sync/Async.  Only Go Async If Necessary.

# install
```bash
npm install quick-resolve
```

# usage
```js
import quickResolve from "quick-resolve";

let resolved = false;
quickResolve(1).then(num => (resolved = true));
// resolved is true

let resolved = false;
quickResolve(fetch(url)).then(response => (resolved = true));
// resolved is false

let resolved = false;
await quickResolve(fetch(url)).then(response => (resolved = true));
// resolved is true
```