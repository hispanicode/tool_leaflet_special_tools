module.exports = function truncate(n) {
  const i = n.indexOf(".");
  if (i === -1) return n;
  else return n.substring(0, i);
};
