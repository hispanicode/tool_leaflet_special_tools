function merge() {
  const instances = [];

  const isEmpty = it => typeof it === "object" && Object.keys(it).length === 0 && JSON.stringify(it) === "{}";

  const add = it => {
    if (!it) return;
    if (Array.isArray(it)) return it.forEach(add);
    if (it.default) it = it.default;
    if (isEmpty(it)) return;
    instances.push(it);
  };

  Array.from(arguments).forEach(add);

  if (instances.length === 0) throw Error("[proj4-merge] merge called with zero instances of proj4");

  const [first, ...rest] = instances;

  rest.forEach(instance => {
    first.defs(Object.entries(instance.defs));
  });

  return first;
}

if (typeof define === "function" && define.amd) {
  define(function () {
    return merge;
  });
}

if (typeof module === "object") {
  module.exports = merge;
  module.exports.default = merge;
}
