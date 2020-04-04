const calculateIdfs = (wordVectors) => {
    const allWords = [...new Set(Object.values(wordVectors).reduce((result, current) => [...result, ...Object.keys(current)], []))];
    const allDocumentCount = Object.keys(wordVectors).length;

    return allWords.reduce((result, word) => {
        const documentCount = Object.values(wordVectors).filter(document => Object.keys(document).indexOf(word) !== -1).length;
        result[word] = Math.log(allDocumentCount / documentCount);
        return result;
    }, {});
};

module.exports = calculateIdfs;
