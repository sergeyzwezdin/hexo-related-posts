const cleanupMarkdownMarkup = (source) => String(source || '').replace(/```.*?[\r\n]+.+?```/sig, ' ').replace(/{%.+?%}/gi, ' ').replace(/\<.+?[^\<]\>/gis,' ');

module.exports = cleanupMarkdownMarkup;
