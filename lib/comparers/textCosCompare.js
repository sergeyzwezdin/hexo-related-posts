const vectorCosCompare = require('./vectorCosCompare');
const generateWordCountVector = require('./../tfidf/generateWordCountVector');

const textCosCompare = (text1, text2, reservedWords, stemmers) =>
    String(text1 || '').trim() && String(text2 || '').trim()
        ? vectorCosCompare(generateWordCountVector(text1, reservedWords, stemmers), generateWordCountVector(text2, reservedWords, stemmers))
        : 0;

module.exports = textCosCompare;
