const calculateTf = require('./calculateTf');

const calculateTfs = (wordVectors) => Object.keys(wordVectors).reduce((result, path) => {
    const wordCountVector = wordVectors[path];
    result[path] = calculateTf(wordCountVector);
    return result;
}, {});

module.exports = calculateTfs;
