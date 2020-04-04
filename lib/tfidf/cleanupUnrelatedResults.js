const cleanupUnrelatedResults = (matrix, threshold) =>
    Object.keys(matrix).reduce((result, path1) => {
        result[path1] = Object.keys(matrix[path1]).reduce((result, path2) => {
            if (matrix[path1][path2] > threshold) {
                result[path2] = matrix[path1][path2];
            }

            return result;
        }, {});

        return result;
    }, {});

module.exports = cleanupUnrelatedResults;
