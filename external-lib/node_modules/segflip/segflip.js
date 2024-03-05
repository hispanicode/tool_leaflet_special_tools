// [ [0, 11], [58, 59] ],
// [ [-1, 12], [57, 60] ] // subtract one from start and add one to end
// [ 0, -1, 12, 57, 60, 255 ] // flatten
// [ [0, -1], [12, 57], [60, 255] ] // pair
// [ [12, 57], [60, 255] ] // discard bad like [0, -1]

function segflip({ segments: segs, min = -Infinity, max = Infinity, debug = false }) {
  if (debug) console.log("[segflip] segs:", segs);
  if (segs === undefined || segs === null || (Array.isArray(segs) && segs.length === 0)) {
    if (debug) console.log("[segflip] segments are empty so return the whole row flipped");
    return [[min, max]];
  }

  const nums = segs.map(([start, end]) => [start - 1, end + 1]).flat();
  nums.unshift(min);
  nums.push(max);

  if (debug) console.log("flattened nums:", nums);

  const results = [];
  for (let i = 1; i < nums.length; i += 2) {
    const start = nums[i - 1];
    const end = nums[i];
    if (start > end) continue; // e.g. [0, -1]
    results.push([start, end]);
  }
  return results;
}

if (typeof define === "function" && define.amd)
  define(function () {
    return segflip;
  });
if (typeof module === "object") module.exports = segflip;
if (typeof window === "object") window.segflip = segflip;
if (typeof self === "object") self.segflip = segflip;
