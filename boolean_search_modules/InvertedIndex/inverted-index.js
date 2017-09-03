/*
 * The Inverted Index contains a list of unique terms (types), and a pointer to that terms Postings List
 * This implementation utilizes hashtable-like data structure to allow for constant term look up time
 * Future implementations will utilize B Trees, and the Hash Table vs B Tree performance will be analyzed
 * One major advantage of the tree implementation will be the handling of wild card queries
 */

const PostingsList = require('../PostingsList/postings-list');
var INVERTED_INDEX_ID = 1;

/*
 * Constructs a new InvertedIndex
 */
const InvertedIndex = function () {
  this.index = {};
  this.id = INVERTED_INDEX_ID++;
  console.log('\nInverted Index created with ID: ' + this.id);
}


InvertedIndex.prototype.indexDocument = function (document) {
  const thisIndex = this;
  if (!document.isTokenized) {
    return console.log('\nUnable to index document ' + document.id + ', please tokenize document before indexing');
  } else {
    const terms = document.getTerms();
    Object.keys(terms).forEach(function (term) {
      // if this term does not exist, add it to index and create empty PostingsList
      if (!thisIndex.index[term]) {
        thisIndex.index[term] = new PostingsList();
      }
      thisIndex.index[term].addPosting(document.id, term.frequency);
    });
  }
}

module.exports = InvertedIndex;
