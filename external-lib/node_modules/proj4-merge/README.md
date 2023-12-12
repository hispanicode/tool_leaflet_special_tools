# proj4-merge
Merge Multiple Proj4 Instances

# install
```bash
npm install proj4-merge
```

# usage
```js
import merge from "proj4-merge";

import proj4 from "proj4";
import proj4FullyLoaded from "proj4-fully-loaded";
import proj4AnotherOne from "proj4-another-one";

// target is the proj4 that will be updated
const target = proj4;

// sources supply extra definitions
const sources = [proj4FullyLoaded, proj4AnotherOne];

// adds the projection definitions from the sources to the target
merge(target, sources);

// you can also merge using spread arguments
merge(target, proj4FullyLoaded, proj4AnotherOne);
```

# references:
- proj4js: https://github.com/proj4js/proj4js