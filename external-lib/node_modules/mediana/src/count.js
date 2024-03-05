function count({ nums, no_data }) {
  let len = nums.length;
  const counts = {};
  let total = 0;
  if (no_data !== undefined) {
    for (let i = 0; i < len; i++) {
      const n = nums[i];
      if (n !== no_data) {
        total++;
        if (n in counts) counts[n].ct++;
        else counts[n] = { n, ct: 1 };
      }
    }
  } else {
    for (let i = 0; i < len; i++) {
      const n = nums[i];
      total++;
      if (n in counts) counts[n].ct++;
      else counts[n] = { n, ct: 1 };
    }
  }
  return { counts, total };
}

module.exports = count;
module.exports.default = count;
