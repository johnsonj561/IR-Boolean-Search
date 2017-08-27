/*
 * Get Time in ms using process.hrtime()
 */
function getTimeMS() {
  var hrtime = process.hrtime();
  return (hrtime[0] * 1000000 + hrtime[1] / 1000) / 1000;
}

/*
 * Calculate and return difference in time
 * Appends units to time string if provided
 */
function getTimeDifference(start, end, units = '') {
  return (end - start) + units;
}

module.exports = {
  getTimeMS,
  getTimeDifference
}
