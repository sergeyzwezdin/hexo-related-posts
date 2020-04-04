const generateWordCountVector = require('./generateWordCountVector');

const generateWordVectors = (posts, reservedWords, stemmers) => {
    const wordVectors = {};

    for (const { raw, path } of posts) {
        const wordCountVector = generateWordCountVector(raw, reservedWords, stemmers);
        wordVectors[path] = wordCountVector;
    }

    return wordVectors;
}

module.exports = generateWordVectors;
