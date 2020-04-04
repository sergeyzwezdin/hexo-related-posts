const calculateTfIdfs = (tfs, idfs) => Object.keys(tfs).reduce((result, path) => {
    const values = tfs[path];

    result[path] = Object.keys(values).reduce((result, word) => {
        const tf = values[word];
        const idf = idfs[word];
        result[word] = tf * idf;
        return result;
    }, {});

    return result;
}, {});

module.exports = calculateTfIdfs;
