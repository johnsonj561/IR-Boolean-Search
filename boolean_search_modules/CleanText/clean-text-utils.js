/*
 * Strips punctuation from text
 */
const removePunctuation = text => text.replace(/[&!#$%^&.*(),'"]/g, "");

/*
 * Covnert all text to lower case
 */
const toLowerCase = text => text.toLowerCase();

/*
 * Convert all text to upper case
 */
const toUpperCase = text => text.toUpperCase();

/*
 * Collapse all whitespace to single space
 */
const removeWhiteSpace = text => text.replace(/\s+/g, " ");

/*
 * Split text into array of words
 */
const splitOnSpace = text => text.split(/\s/);



module.exports = {
  removePunctuation,
  removeWhiteSpace,
  toUpperCase,
  toLowerCase,
  splitOnSpace
};
