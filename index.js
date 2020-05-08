hexo.config.related_posts = Object.assign(
    {
        enable: true,
        enable_env_name: undefined,
        filter_threshold: 0.2,
        related_count: 5,
        weight: {
            title: 0.05,
            description: 0.05,
            keywords: 0.01,
            tags: 0.05,
            categories: 0.05,
            text: 1
        },
        stemmers: ['en', 'ru'],
        reserved: []
    },
    hexo.config.related_posts
);

const enable =
    (hexo.config.related_posts.enable || hexo.config.related_posts.enable === undefined) &&
    (hexo.config.related_posts.enable_env_name !== undefined ? hexo.env.args[hexo.config.related_posts.enable_env_name] : true);

if (enable) {
    hexo.extend.filter.register('before_generate', require('./lib/calcRelatedPosts')(hexo), 9);
    hexo.extend.filter.register('before_post_render', require('./lib/postRender')(hexo), 10);
}
