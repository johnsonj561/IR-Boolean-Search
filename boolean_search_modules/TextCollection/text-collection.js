var COLLECTION_ID = 1;

/*
 * Text Collection Constructor
 * Initializes TextCollection object with an empty document list
 */
const TextCollection = function () {
  this.documentList = {};
  this.id = COLLECTION_ID++;
  console.log('\nNew TextCollection created\nID: ' + this.id);
}


/*
 * Add new document to TextCollecton if it does not already exist
 * Does nothing if file exists
 */
TextCollection.prototype.addDocument = function (documentObject) {
  if (!this.documentList[documentObject.id]) {
    console.log('\nAdding document to collection\nCollection ID: ' + this.id + '\nDocument ID: ' + documentObject.id);
    this.documentList[documentObject.id] = documentObject;
  } else console.log('\nocumentObject.id ' + documentObject.id + ' already exists, no document added to collection.');
}


/*
 * Remove document from TextCollection
 * Does nothing if file does noe exist
 */
TextCollection.prototype.removeDocument = function (documentID) {
  if (this.documentList[documentID]) {
    console.log('\nRemoving document from collection\nCollection ID: ' + this.id + '\nDocument ID: ' + documentObject.id);
    delete this.documentList[documentID];
  } else console.log('\nDocument ID ' + documentID + ' not found, no document removed from collection.');
}


/*
 * Return reference to document path
 */
TextCollection.prototype.getDocument = function (documentID) {
  if (this.documentList[documentID]) return this.documentList[documentID];
  else console.log('\nUnable to get document with ID: ' + documentID + ', documentID does not exist.');
}


/*
 * Return the TextCollection's document list
 */
TextCollection.prototype.getDocumentList = function () {
  return this.documentList;
}


/*
 * Write TextCollection content to readable string
 */
TextCollection.prototype.toString = function () {
  console.log('You should write some fancy console print here');
}

/*
 * Return documentList length
 */
TextCollection.prototype.documentListSize = function () {
  return Object.keys(this.documentList).length;
}

module.exports = TextCollection;
