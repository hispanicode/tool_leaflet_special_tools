module.exports = function is_zero(n) {
  return /^[-+]?0(\.0+)?(e[\.\d]+)?$/.test(n);
};
