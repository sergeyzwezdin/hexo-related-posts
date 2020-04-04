const natural = require('natural');

const resolveStemmer = (name) => {
    switch(name) {
        case 'nl':
            return natural.PorterStemmerNl;
        case 'en':
            return natural.PorterStemmer;
        case 'fr':
            return natural.PorterStemmerFr;
        case 'id':
            return natural.StemmerId;
        case 'it':
            return natural.PorterStemmerIt;
        case 'jp':
            return natural.StemmerJa;
        case 'no':
        case 'nb':
        case 'nn':
            return natural.PorterStemmerNo;
        case 'pt':
            return natural.PorterStemmerPt;
        case 'ru':
            return natural.PorterStemmerRu;
        case 'sv':
            return natural.PorterStemmerSv;
    }

    throw new Error(`Unknown stemmer: ${name}`);
};

module.exports = resolveStemmer;
