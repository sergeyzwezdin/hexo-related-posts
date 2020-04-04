const fillMatrix = (matrix, key1, key2, value) => {
    if (!matrix[key1]) {
        matrix[key1] = {};
    }
    if (!matrix[key2]) {
        matrix[key2] = {};
    }

    matrix[key1][key2] = value;
    matrix[key2][key1] = value;

    return matrix;
}

module.exports = fillMatrix;
