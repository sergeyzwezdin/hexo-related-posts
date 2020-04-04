const preserveReservedWords = (source, reservedWords) => {
    let result = String(source || '').toLowerCase();

    for (const replacement of Object.keys(reservedWords).sort((a, b) => b.length - a.length)) {
        const reservedWord = reservedWords[replacement];

        let prevResult = undefined;
        while (result !== prevResult) {
            prevResult = result;
            result = result.replace(reservedWord, replacement);
        }
    }

    return result;
}

module.exports = preserveReservedWords;
