// Internet Explorer doesn't support Number.MAX_SAFE_INTEGER
// so we just define the constant ourselves
const MAX_SAFE_INTEGER = 9007199254740991;

// the greatest number of digits an integer can have
// and be guaranteed to be stored safely as a floating point.
// subtract 1 because MAX_SAFE_INTEGER isn't all 9's
const MAX_SAFE_INTEGER_LENGTH = MAX_SAFE_INTEGER.toString().length - 1;

module.exports = {
  MAX_SAFE_INTEGER,
  MAX_SAFE_INTEGER_LENGTH
};
