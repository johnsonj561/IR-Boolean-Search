const fse = require('fs-extra');
const CleanTextStream = require('../TransformStreams/clean-text-stream');

var DOCUMENT_ID = 1;

function TextDocument(path) {
  if (!path) {
    console.log('\nUnable to create TextDocument, invalid path: ', path);
  } else {
    console.log('\nNew TextDocument created with ID: ' + DOCUMENT_ID);
    this.id = DOCUMENT_ID++;
    this.path = path;
    this.terms = {};
    this.isTokenized = false;
    this.wordCount = 0;
  }
}

/*
 * Add Terms to this Document Dictionary
 * If term already exists, given term's frequency is updated
 */
TextDocument.prototype.addTerms = function (termList) {
  console.log('\nAdding new terms to TextDocument with ID: ', this.id);
  let termsObject = this.terms;
  termList.forEach(function (term) {
    // if the term exists, increment frequency
    if (termsObject[term]) {
      termsObject[term].frequency++;
    }
    // else, create term with frequency set to 1
    else termsObject[term] = {
      frequency: 1
    };
  });
};


/*
 * Returns true of document contains the term
 * Does not perform any text transformations/processing
 */
TextDocument.prototype.containsTerm = function (term) {
  return !!this.terms[term];
}

/*
 * Print Document Terms and their corresponding frequency
 */
TextDocument.prototype.print = function () {
  console.log('\nPrinting TextDocument with ID: ' + this.id);
  Object.keys(this.terms).forEach(key => console.log('Term: ' + key + ', Frequency: ' + this.terms[key].frequency));
};


/*
 * Tokenize the TextDocuments text into terms and frequencies
 * Assumes document is well defined with valid file path
 * 
 */
TextDocument.prototype.tokenizeAndCountDocument = function (options, callback) {
  let td = this;
  let wordCount = 0;
  // create transform stream for cleaning text
  const cleanTextStream = new CleanTextStream(options);
  const readAndCleanStream = fse.createReadStream(this.path, 'utf-8')
    .pipe(cleanTextStream)
    .on('data', function (chunk) {
      chunk = chunk.split(/\s/);
      wordCount += chunk.length;
      td.addTerms(chunk);
    })
    .on('end', () => {
      td.isTokenized = true;
      td.wordCount += wordCount;
      if (typeof callback === 'function') callback();
    })
    .on('error', err => console.log('\n\nSTREAM ERROR AFTER TRANSFORM:\n ', err));
}


TextDocument.prototype.getWordCount = function () {
  if (this.isTokenized) return wordCount;
  else console.log('\nDocument not yet tokenized, word count not yet calculated.');
}


module.exports = TextDocument;
