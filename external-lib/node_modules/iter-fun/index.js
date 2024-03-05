function addSymbolIterator(obj) {
  try {
    obj[Symbol.iterator] = function () {
      return this;
    };
  } catch (error) {
    // pass
  }
}

function addSymbolIteratorFallback(obj) {
  obj["@@iterator"] = function () {
    return this;
  };
}

function wrapNextFunction(next) {
  const iter = { next };
  addSymbolIterator(iter);
  addSymbolIteratorFallback(iter);
  return iter;
}

function isArray(data) {
  try {
    return data.constructor.name.endsWith("Array");
  } catch {
    return false;
  }
}

function hasNext(data) {
  try {
    return typeof data.next === "function";
  } catch {
    return false;
  }
}

function hasIterator(data) {
  try {
    return "@@iterator" in data;
  } catch {
    return false;
  }
}

function hasSymbolIterator(data) {
  try {
    return Symbol.iterator in data.constructor.prototype;
  } catch {
    return false;
  }
}

function isIterator(data) {
  try {
    return (
      Symbol.iterator in data &&
      typeof data.next === "function" &&
      data.propertyIsEnumerable("next") === false
    );
  } catch {
    return false;
  }
}

function getIterator(data) {
  const iter = data["@@iterator"];
  if (hasNext(iter)) {
    return iter;
  } else if (typeof iter === "function") {
    return iter();
  }
}

function createIterator(data) {
  let i = 0;
  let len = data.length;
  const next = () =>
    i++ < len ? { value: data[i], done: false } : { done: true };
  return wrapNextFunction(next);
}

function getOrCreateIterator(data) {
  if (isIterator(data)) {
    return data;
  } else if (hasSymbolIterator(data)) {
    return data[Symbol.iterator]();
  } else if (hasNext(data)) {
    return wrapNextFunction(data.next);
  } else if (hasIterator(data)) {
    return getIterator(data);
  } else if (typeof data === "string" || isArray(data)) {
    return createIterator(data);
  } else {
    throw "[iter-fun] unable to determine iterator";
  }
}

function zip(iters) {
  // convert input to iters just in case
  iters = iters.map(getOrCreateIterator);

  return wrapNextFunction(function next() {
    const values = iters.map(iter => iter.next());
    // if they are all done, stop
    if (values.every(({ done }) => done)) {
      return { done: true };
    } else {
      return {
        done: false,
        value: values.map(({ value }) => value)
      };
    }
  });
}

if (typeof module === "object") {
  module.exports = {
    addSymbolIterator,
    addSymbolIteratorFallback,
    isIterator,
    isArray,
    hasNext,
    hasSymbolIterator,
    hasIterator,
    getIterator,
    createIterator,
    getOrCreateIterator,
    wrapNextFunction,
    zip
  };
}
