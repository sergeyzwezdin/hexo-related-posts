const calculateTf = (vector) => {
    const result = {};
    const total = Object.keys(vector).reduce((result, word) => result + vector[word], 0);

    for (const word of Object.keys(vector)) {
        result[word] = vector[word] / total;
    }

    return result;
}

module.exports = calculateTf;
