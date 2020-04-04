const vectorCosCompare = (vector1, vector2) => {
    const words1 = Object.keys(vector1);
    const words2 = Object.keys(vector2);
    const allWords = [...new Set([...words1, ...words2])];
    const intersectWords = words1.filter(word => words2.indexOf(word) !== -1);

    const sum = intersectWords.reduce((result, word) => result + vector1[word] * vector2[word], 0);
    const len = Math.sqrt(allWords.reduce((result, word) => result + (vector1[word] ? vector1[word] : 0), 0)) *
        Math.sqrt(allWords.reduce((result, word) => result + (vector2[word] ? vector2[word] : 0), 0));

    return (sum > 0) && (len > 0) ? sum / len : 0;
}

module.exports = vectorCosCompare;
