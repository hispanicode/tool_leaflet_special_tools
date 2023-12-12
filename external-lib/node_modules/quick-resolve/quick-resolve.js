module.exports = function resolve(it) {
  if (typeof it === "object" && typeof it.then === "function") {
    // it appears to be a promise
    return it;
  } else {
    return { then: func => func(it) };
  }
};
