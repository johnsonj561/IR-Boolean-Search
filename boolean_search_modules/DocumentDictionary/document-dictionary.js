function DocumentDictionary(id) {
  console.log('Document Dictionary created: ' + id);
  this.id = id;
  this.terms = {};
}

/*
 * Add Terms to this Document Dictionary
 * If term already exists, given term's frequency is updated
 */
DocumentDictionary.prototype.addTerms = function (termList) {
  console.log('attempting to add to terms object: ', this.terms);
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
 * Print Document Terms and their corresponding frequency
 */
DocumentDictionary.prototype.print = function () {
  console.log('\n\n\nPrinting Dictionary with ID: ' + this.id);
  Object.keys(this.terms).forEach(key => console.log('Term: ' + key + ', Frequency: ' + this.terms[key].frequency));
};

module.exports = DocumentDictionary;
