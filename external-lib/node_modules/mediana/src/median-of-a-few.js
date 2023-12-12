const mean = require("./mean");

function median_of_a_few({ nums, no_data, precise = false }) {
  nums = nums.filter(n => n !== no_data).sort((a, b) => a - b);
  switch (nums.length) {
    case 0:
      return undefined;
    case 1:
      return precise ? nums[0].toString() : nums[0];
    default:
      const mid = nums.length / 2;
      if (nums.length % 2 === 0) {
        return mean(nums[mid - 1], nums[mid], { precise });
      } else {
        const i = Math.floor(mid);
        return precise ? nums[i].toString() : nums[i];
      }
  }
}

module.exports = median_of_a_few;
module.exports.default = median_of_a_few;
