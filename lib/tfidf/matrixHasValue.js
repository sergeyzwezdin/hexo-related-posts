const matrixHasValue = (matrix, key1, key2) => Boolean((matrix[key1] && matrix[key1][key2]) || (matrix[key2] && matrix[key2][key1] ));

module.exports = matrixHasValue;
