const fse = require('fs-extra'),
  CleanTextStream = require('./boolean_search_modules/TransformStreams/clean-text-stream'),
  TimePrecision = require('./boolean_search_modules/TimePrecision/time-precision');

console.log('\n\nMAIN\n\n');

const filePath = 'collection/document3.txt';

// define transformation options to perform on data
const transformOptions = {
  toLowerCase: true,
  removePunctuation: true,
  removeWhiteSpace: true,
  thisOptionShouldntWork: true
}

// create transform stream for cleaning text
const cleanTextStream = new CleanTextStream(transformOptions);

// start time
const start = TimePrecision.getTimeMS();

// read from file and pipe into transform stream
const readAndCleanStream = fse.createReadStream(filePath, 'utf-8').pipe(cleanTextStream);

// bind listeners to stream
readAndCleanStream.on('data', chunk => console.log('\n\nSTREAM CHUNK AFTER TRANSFORM: \n', chunk))
  .on('end', () => {
    const end = TimePrecision.getTimeMS();
    console.log('\n\nreadStream.pipe(cleanTextStream) took: ' + TimePrecision.getTimeDifference(start, end, 'ms'));
  })
  .on('error', err => console.log('\n\nSTREAM ERROR AFTER TRANSFORM:\n ', err));
