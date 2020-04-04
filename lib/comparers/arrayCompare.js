const vectorCosCompare = require('./vectorCosCompare');

const arrayCompare = (array1, array2) => {
    const vector1 = array1.reduce((result, current) => {
        result[current] = 1;
        return result;
    }, {});

    const vector2 = array2.reduce((result, current) => {
        result[current] = 1;
        return result;
    }, {});

    return vectorCosCompare(vector1, vector2);
};

module.exports = arrayCompare;
