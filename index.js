hexo.extend.filter.register('before_generate', require('./lib/calcRelatedPosts')(hexo), 9);
hexo.extend.filter.register('before_post_render', require('./lib/postRender')(hexo), 10);