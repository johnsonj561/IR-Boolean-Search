## Boolean Search Application
#### A simple boolean search application that indexes documents as an inverted index with term frequencies

- documents are read from collection directory
- minimal text pre-processing is applied to each document (lowercase, remove whitespace, remove punctuation)
- documents are tokenized, constructing a term list for each document (term, frequency)
- inverted index is created such that inverted index includes list of all terms found in collection
	- each term points to a postings list, a list of documents that contain the term and the frequency of the term in given document
- enters prompt loop, requesting search term from user and providing results until terminates