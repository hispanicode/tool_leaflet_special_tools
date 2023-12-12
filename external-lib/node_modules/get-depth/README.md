# get-depth
 > Get the Depth of a Multi-Dimensional Array

# install
```bash
npm install get-depth
```

# usage
```javascript
const getDepth = require('get-depth');

const table = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8 ], // first row
    [0, 1, 2, 3, 4, 5, 6, 7, 8 ] // second row
];

const depth = getDepth(table);
// depth is 2
```