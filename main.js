const TimePrecision = require('./boolean_search_modules/TimePrecision/time-precision');
const TextDocument = require('./boolean_search_modules/TextDocument/text-document');
const TextCollection = require('./boolean_search_modules/TextCollection/text-collection');
const InvertedIndex = require('./boolean_search_modules/InvertedIndex/inverted-index');
const Config = require('./main-cli-config.js');
const readline = require('readline');
const fse = require('fs-extra');
const events = require('events');
var eventEmitter = new events.EventEmitter();

console.log(Config.intro);

// get list of text files to index
const textFilePaths = Config.textFiles;

// get text transformation options
const textTransformOptions = Config.textCleaningFlags;

// define a TextCollection object
let textCollection = new TextCollection();

// define an InvertedIndex objet
let invertedIndex = new InvertedIndex();

// build collection of tokenized documents
let lastPathIdx = textFilePaths.length - 1;
textFilePaths.forEach((path, idx) => {
  let textDoc = new TextDocument(path);
  textDoc.tokenizeAndCountDocument(textTransformOptions, function () {
    textCollection.addDocument(textDoc);
    if (idx === lastPathIdx) eventEmitter.emit('tokenization:complete');
  });
});

// index TextDocuments once tokenization is complete
eventEmitter.on('tokenization:complete', function () {
  console.log('\nTokenization complete');
  const documentsToIndex = textCollection.getDocumentList();
  const documentIDs = Object.keys(documentsToIndex);
  documentIDs.forEach(id => invertedIndex.indexDocument(documentsToIndex[id]));
  invertedIndex.sortPostingsByFrequency();
  this.emit('indexing:complete');
});

// prompt user for search word once indexing is complete
eventEmitter.on('indexing:complete', function () {
  console.log('\nIndexing Complete');
  promptUser();
});


// create readline cli and define listeners
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '\nEnter a word to search for, or enter blank string to quit:\n'
});

rl.on('line', function (response) {
  if (response === '') this.close();
  else {
    console.log(invertedIndex.searchTerm(response));
    rl.prompt();
  }
}).on('close', function () {
  console.log('\n\nGoodbye\n\n');
});


// prompt user to enter a search word
function promptUser() {
  rl.prompt();
}
