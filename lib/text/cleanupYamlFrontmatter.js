const cleanupYamlFrontmatter = (source) => String(source || '').replace(/^\-\-\-.+?\-\-\-/s, '');

module.exports = cleanupYamlFrontmatter;
