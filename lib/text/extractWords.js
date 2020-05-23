const removeNonAlphaChars = require('./removeNonAlphaChars');

const extractWords = (source, reservedWords, wordLength) =>
    removeNonAlphaChars(source)
        .split(' ')
        .map((word) => word.trim())
        .filter((word) => Object.keys(reservedWords).indexOf(word) !== -1 || (word.length >= wordLength && !/^\d+$/i.test(word)));

module.exports = extractWords;
