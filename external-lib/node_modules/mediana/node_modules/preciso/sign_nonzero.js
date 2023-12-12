// assume n is not zero
module.exports = function sign_nonzero(n) {
  return n[0] === "-" ? "-" : "+";
};
