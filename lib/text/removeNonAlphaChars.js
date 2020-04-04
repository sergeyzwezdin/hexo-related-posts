const removeNonAlphaChars = (source) => String(source || '').toLowerCase().replace(/«/g, ' ').replace(/»/g, ' ').replace(/{/g, ' ').replace(/}/g, ' ').replace(/[^a-zа-я一-龠ぁ-ゔァ-ヴーａ-ｚＡ-Ｚ０-９々〆〤a-åa-ö0-9]+/gi, ' ');

module.exports = removeNonAlphaChars;
