const cleanupLinks = (source) => String(source || '').replace(/(\w{2,5}):\/\/.+?([ "'\r\n]+)/gi, ' $2');

module.exports = cleanupLinks;
