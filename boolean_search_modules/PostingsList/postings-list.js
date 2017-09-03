var POSTINGS_LIST_ID = 1;

const PostingsList = function () {
  this.id = POSTINGS_LIST_ID++;
  this.list = [];
}

const Posting = function (documentID, frequency) {
  this.documentID = documentID;
  this.frequency = frequency;
}

PostingsList.prototype.addPosting = function (documentID, frequency) {
  this.list.push(new Posting(documentID, frequency));
}

PostingsList.prototype.removePosting = function (documentID) {
  const remove = this.indexOfPosting(documentID);
  if (remove > -1) {
    this.list.splice(remove, 1);
  } else {
    console.log('\nPosting with document ID: ' + documentID + ' not found, unable to remove.');
  }
}

PostingsList.prototype.indexOfPosting = function (documentID) {
  this.list.forEach(function (posting, idx) {
    if (posting.id === documentID) return idx;
  });
  return -1;
}

PostingsList.prototype.sort = function () {
  this.list.sort(function (a, b) {
    if (a.frequency < b.frequency) return -1;
    else if (a.frequency > b.frequency) return 1;
    else return 0;
  });
}

module.exports = PostingsList;
