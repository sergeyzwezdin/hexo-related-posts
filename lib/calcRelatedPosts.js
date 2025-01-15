let magenta, blue;
import('chalk').then(({ default: chalk }) => {
    ({ magenta, blue } = chalk);
});
const prepareReservedWords = require('./text/prepareReservedWords');
const generateWordVectors = require('./tfidf/generateWordVectors');
const calculateTfs = require('./tfidf/calculateTfs');
const calculateIdfs = require('./tfidf/calculateIdfs');
const calculateTfIdfs = require('./tfidf/calculateTfIdfs');
const matrixHasValue = require('./tfidf/matrixHasValue');
const fillMatrix = require('./tfidf/fillMatrix');
const vectorCosCompare = require('./comparers/vectorCosCompare');
const textCosCompare = require('./comparers/textCosCompare');
const arrayCompare = require('./comparers/arrayCompare');
const cleanupUnrelatedResults = require('./tfidf/cleanupUnrelatedResults');
const sortResultsByRelevance = require('./tfidf/sortResultsByRelevance');
const resolveStemmer = require('./tfidf/resolveStemmer');

const calcRelatedPosts = (hexo) =>
    function () {
        const { log } = hexo;

        hexo.locals.invalidate();

        const config = hexo.config.related_posts;

        const threshold = config.filter_threshold;
        const maxPostCount = config.related_count;
        const weights = config.weight;
        const stemmersList = config.stemmers;
        const reservedWords = prepareReservedWords(config.reserved);

        const stemmers = stemmersList.map(resolveStemmer);

        const posts = hexo.locals.get('posts').data.map(({ title, author, keywords, description, raw, tags, categories, path }) => ({
            title,
            author,
            keywords,
            description,
            raw,
            path,
            tags: tags.data.map((tag) => tag.name),
            categories: categories.data.map((category) => category.name)
        }));

        const postsDictionary = posts.reduce((result, post) => {
            result[post.path] = post;
            return result;
        }, {});

        log.info('Calculating of related posts is enabled. Start processing...');

        const wordVectors = generateWordVectors(posts, reservedWords, stemmers); // document → word → count
        const tfs = calculateTfs(wordVectors); // document → word → tf
        const idfs = calculateIdfs(wordVectors); // word → idf
        const tfidfs = calculateTfIdfs(tfs, idfs); // document → word → tfidf

        log.info('TF/IDF is calculated');

        const postsMatrix = {};

        for (const { path: path1 } of posts) {
            for (const { path: path2 } of posts) {
                if (path1 !== path2 && !matrixHasValue(postsMatrix, path1, path2)) {
                    const {
                        title: title1,
                        author: author1,
                        description: description1,
                        keywords: keywords1,
                        tags: tags1,
                        categories: categories1
                    } = postsDictionary[path1];
                    const {
                        title: title2,
                        author: author2,
                        description: description2,
                        keywords: keywords2,
                        tags: tags2,
                        categories: categories2
                    } = postsDictionary[path2];

                    const titleWeight = (weights.title || 0.05);
                    const authorWeight = (weights.author || 0);
                    const descriptionWeight = (weights.description || 0.05);
                    const keywordsWeight = (weights.keywords || 0.01);
                    const tagsWeight = (weights.tags || 0.005);
                    const categoriesWeight = (weights.categories || 0.005);
                    const textWeight = (weights.text || 1);

                    // calculate compare values only if weight is not 0
                    const titleCompare = titleWeight > 0 ? textCosCompare(title1, title2, reservedWords, stemmers) : 0;
                    const authorCompare = authorWeight > 0 ? textCosCompare(author1, author2, reservedWords, stemmers) : 0;
                    const descriptionCompare = descriptionWeight > 0 ? textCosCompare(description1, description2, reservedWords, stemmers) : 0;
                    const keywordsCompare = keywordsWeight > 0 ? textCosCompare(keywords1, keywords2, reservedWords, stemmers) : 0;
                    const tagsCompare = tagsWeight > 0 ? arrayCompare(tags1, tags2) : 0;
                    const categoriesCompare = categoriesWeight > 0 ? arrayCompare(categories1, categories2) : 0;
                    const tfIdfCompare = textWeight > 0 ? vectorCosCompare(tfidfs[path1], tfidfs[path2]) * 50 : 0;
                    log.debug('Comparison between %s and %s details: ' +
                        'title: %s, author: %s, description: %s, ' +
                        'keywords: %s, tags: %s, categories: %s, tfIdf: %s',
                        magenta(path1), magenta(path2),
                        blue(titleCompare), blue(authorCompare), blue(descriptionCompare),
                        blue(keywordsCompare), blue(tagsCompare), blue(categoriesCompare), blue(tfIdfCompare)
                    );

                    const value =
                        titleCompare * titleWeight +
                        authorCompare * authorWeight +
                        descriptionCompare * descriptionWeight +
                        keywordsCompare * keywordsWeight +
                        tagsCompare * tagsWeight +
                        categoriesCompare * categoriesWeight +
                        tfIdfCompare * textWeight;

                    log.debug('Comparison between %s and %s is done with result: %s', magenta(path1), magenta(path2), blue(value));

                    fillMatrix(postsMatrix, path1, path2, value);
                }
            }
        }

        hexo.related_posts = sortResultsByRelevance(cleanupUnrelatedResults(postsMatrix, threshold), maxPostCount) || {};
        log.info('Related post processing done');
    };

module.exports = calcRelatedPosts;
