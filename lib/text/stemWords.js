const stemWords = (words, stemmers) => (words || []).map(word => stemmers.reduce((result, stemmer) => stemmer.stem(result), word));

module.exports = stemWords;
