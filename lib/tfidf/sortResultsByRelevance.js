const sortResultsByRelevance = (matrix, maxPostCount) =>
    Object.keys(matrix).reduce((result, path1) => {
        result[path1] = Object.keys(matrix[path1])
            .map(path2 => ({
                    path: path2,
                    value: matrix[path1][path2]
                }))
            .sort((a, b) => b.value - a.value)
            .map(({ path }) => path)
            .slice(0, maxPostCount);

        return result;
    }, {});

module.exports = sortResultsByRelevance;
