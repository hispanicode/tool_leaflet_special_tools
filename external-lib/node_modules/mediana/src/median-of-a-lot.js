const count = require("./count");
const mean = require("./mean");

function median_of_a_lot({ counts, nums, no_data, precise = false, total }) {
  if (counts === undefined || total === undefined) {
    ({ counts, total } = count({ nums, no_data }));
  }

  // sort counts by value
  const countArray = Object.values(counts).sort((a, b) => a.n - b.n);
  const half = total / 2;
  const number_of_unique_values = countArray.length;
  if (number_of_unique_values === 0) {
    return undefined;
  } else if (number_of_unique_values === 1) {
    return precise ? countArray[0].n.toString() : countArray[0].n;
  } else {
    let x = 0;

    if (total % 2 === 0) {
      for (let i = 0; i < number_of_unique_values; i++) {
        const { n, ct } = countArray[i];
        x += ct;
        if (x > half) {
          // handle if odd or even
          // just barely pass cut off
          if (x - ct === half) {
            return mean(countArray[i - 1].n, n, { precise });
          } else {
            return precise ? n.toString() : n;
          }
        }
      }
    } else {
      for (let i = 0; i < number_of_unique_values; i++) {
        const { n, ct } = countArray[i];
        x += ct;
        if (x > half) return precise ? n.toString() : n;
      }
    }
  }
}

module.exports = median_of_a_lot;
module.exports.default = median_of_a_lot;
