module.exports = function getDepth(arr) {
  const isArray = (arr) =>
    Array.isArray(arr) ||
    arr instanceof Int8Array ||
    arr instanceof Uint8Array ||
    arr instanceof Uint8ClampedArray ||
    arr instanceof Int16Array ||
    arr instanceof Uint16Array ||
    arr instanceof Int32Array ||
    arr instanceof Uint32Array ||
    arr instanceof Float32Array ||
    arr instanceof Float64Array ||
    arr instanceof BigInt64Array ||
    arr instanceof BigUint64Array;

  let depth = 0;
  let part = arr;
  while (isArray(part)) {
    depth++;
    part = part[0];
  }
  return depth;
};
