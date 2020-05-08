const postRender = (hexo) =>
    function (data) {
        // Put information into page's metadata
        data.related_posts = (hexo.related_posts || {})[data.path] || [];
        return data;
    };

module.exports = postRender;
