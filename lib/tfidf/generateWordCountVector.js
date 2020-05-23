const groupWords = require('./../text/groupWords');
const stemWords = require('./../text/stemWords');
const extractWords = require('./../text/extractWords');
const preserveReservedWords = require('./../text/preserveReservedWords');
const cleanupLinks = require('./../text/cleanupLinks');
const cleanupMarkdownMarkup = require('./../text/cleanupMarkdownMarkup');
const cleanupYamlFrontmatter = require('./../text/cleanupYamlFrontmatter');

const generateWordCountVector = (source, reservedWords, stemmers, wordLength) =>
    groupWords(
        stemWords(
            extractWords(
                preserveReservedWords(cleanupLinks(cleanupMarkdownMarkup(cleanupYamlFrontmatter(source))), reservedWords),
                reservedWords,
                wordLength === undefined ? 5 : wordLength
            ),
            stemmers
        )
    );

module.exports = generateWordCountVector;
