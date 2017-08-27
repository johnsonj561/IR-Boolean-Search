const Transform = require('stream').Transform;
const util = require('util');
const CleanTextUtils = require('../CleanText/clean-text-utils');


/*
 * CleanTextStream constructor
 */
const CleanTextStream = function (options = {}, customFunctions = []) {
  // call super constructor
  Transform.call(this, {
    objectMode: true
  });

  // validate user's options
  // warn user if option does not exist
  this.options = options;
  if (typeof options === 'object') {
    this.options = Object.keys(this.options).reduce((memo, value) => {
      if (CleanTextUtils[value]) {
        memo[value] = true;
      } else console.log('\nInvalid option: ' + value + ' not found in CleanTextUtils.');
      return memo;
    }, {});
  } else console.log('\nInvalid options argument. Ensure options is valid object');

  // validate user's custom functions
  this.customFunctions = customFunctions;
  if (Array.isArray(customFunctions)) {
    if (customFunctions.length) {
      this.customFunctions = customFunctions.reduce((memo, value) => {
        if (typeof value === 'function') memo.push(value)
      }, []);
    }
  } else console.log('\nInvalid customFunctions argument. Ensure argument is array of functions.');
};


/*
 * Inherit from Transform duplex stream
 */
util.inherits(CleanTextStream, Transform);


/*
 * Stream Transform Function
 * Applies transformations in user defined options and user defined customFunctions
 */
CleanTextStream.prototype._transform = function (chunk, encoding, callback) {
  // Process transformations as defined in this.options
  Object.keys(this.options).forEach(key => chunk = CleanTextUtils[key](chunk));
  // Process transformations as defined in customFunctions
  this.customFunctions.forEach(func => chunk = func(chunk));
  // Data out
  this.push(chunk);
  callback();
}


module.exports = CleanTextStream;
