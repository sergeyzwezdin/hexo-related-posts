const removeNonAlphaChars = require('./removeNonAlphaChars');

const prepareReservedWords = (reservedWords) =>
    (reservedWords || [])
        .map(word => String(word || '').trim().toLowerCase())
        .filter(word => Boolean(word))
        .sort((a, b) => b.length - a.length)
        .reduce((result, reservedWord) => {
            result[removeNonAlphaChars(reservedWord).replace(/[ ]+/g, '')] = reservedWord;
            return result;
        }, {});

module.exports = prepareReservedWords;
