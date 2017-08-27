const fse = require('fs-extra'),
  CleanTextStream = require('./boolean_search_modules/TransformStreams/clean-text-stream'),
  TimePrecision = require('./boolean_search_modules/TimePrecision/time-precision'),
  DocumentDictionary = require('./boolean_search_modules/DocumentDictionary/document-dictionary');

console.log('\n\nMAIN\n\n');

// eventually, collection will contain references to all Documents, including their DocID and term list
let collection = {
  1: {
    id: 1,
    path: 'colletion/document1.txt'
  },
  2: {
    id: 2,
    path: 'collection/document2.txt'
  },
  3: {
    id: 3,
    path: 'collection/document3.txt'
  }
};

// testing with document 3 temporarily
const docID = 3;
collection[docID].document = new DocumentDictionary(docID);
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
const readAndCleanStream = fse.createReadStream(filePath, 'utf-8').pipe(cleanTextStream)
  .on('data', chunk => {
    console.log('\n\nSTREAM CHUNK AFTER TRANSFORM: \n', chunk)
    // split the cleaned text by space, creating array of words
    // sort words to simplify merging
    sortAndTerm(chunk);
  })
  .on('end', function () {
    this.emit('textCleaning:complete');
  })
  .on('error', err => console.log('\n\nSTREAM ERROR AFTER TRANSFORM:\n ', err));

/*
 * Split text by word into array and sort array
 * We actually don't need to sort if using object (hash), but will leave as is for now
 */
function sortAndTerm(text) {
  text = text.split(/\s/).sort();
  collection[docID].document.addTerms(text);
  collection[docID].document.print();
  const end = TimePrecision.getTimeMS();
  console.log('\n\nReading text document, clearning, sorting, and counting terms took: ' + TimePrecision.getTimeDifference(start, end, 'ms'));
}
