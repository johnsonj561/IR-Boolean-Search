const TimePrecision = require('./boolean_search_modules/TimePrecision/time-precision');
const TextDocument = require('./boolean_search_modules/TextDocument/text-document');
const TextCollection = require('./boolean_search_modules/TextCollection/text-collection');
const InvertedIndex = require('./boolean_search_modules/InvertedIndex/inverted-index');

console.log('\n\nMAIN\n\n');

// Store paths to text documents
const textFilePaths = [
  'collection/document1.txt',
  'collection/document2.txt',
  'collection/document3.txt',
];

// define a TextCollection object
let textCollection = new TextCollection();

// define an InvertedIndex objet
let invertedIndex = new InvertedIndex();

// define transformation options to perform on data
const transformOptions = {
  toLowerCase: true,
  removePunctuation: true,
  removeWhiteSpace: true,
  thisOptionShouldntWork: true
}

let msTimes = [];

for (let i = 0, l = textFilePaths.length; i < l; i++) {
  let time1 = TimePrecision.getTimeMS();
  let textDoc = new TextDocument(textFilePaths[i]);
  textDoc.tokenizeAndCountDocument(transformOptions, () => {
    textCollection.addDocument(textDoc);
    let time2 = TimePrecision.getTimeMS();
    console.log('Document with ID: + ' + textDoc.id + ' completed in \t' + TimePrecision.getTimeDifference(time1, time2, 'ms'));
    if (i === (l - 1)) collectionDone();
  });
}



function collectionDone() {
  console.log('\n\nTextCollection created with size: ', textCollection.documentListSize());
  const documentsToIndex = textCollection.getDocumentList();
  const documentIDs = Object.keys(documentsToIndex);
  documentIDs.forEach(id => invertedIndex.indexDocument(documentsToIndex[id]));
}
