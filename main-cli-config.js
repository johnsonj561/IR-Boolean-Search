const intro = `\n\n
                              Inverted Index CLI
--------------------------------------------------------------------------------
- Applies text pre-processing and tokinization to array of text files 
- Constructs a collection of searchable text documents
- Indexes documents using Inverted Index methodology
--------------------------------------------------------------------------------
`;


const InvertedIndexConfig = {

  /*
   * List of all text file paths to be indexed
   * Currently only supporting plain text files
   */
  textFiles: [
    'collection/document1.txt',
    'collection/document2.txt',
    'collection/document3.txt'
  ],

  /*
   * Text pre-processing settings, to be applied to all text documents and queries
   * true = on / false = off
   */
  textCleaningFlags: {
    toLowerCase: true,
    removePunctuation: true,
    removeWhiteSpace: true
  },


  /*
   * Define custom text pre-processing to be performed on all text documents and queries
   */
  customTextCleaningFunctions: {
    // define methods in the form:
    // method1: function(inputText) {
    //  return transformedText;
    // },
    // method2: function(inputText) {
    //  return transformedText;
    // },   
    // method3: function(inputText) {
    //  return transformedText;
    // },
  },

  intro: intro
}


module.exports = InvertedIndexConfig;
