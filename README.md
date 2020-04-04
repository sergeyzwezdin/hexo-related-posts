# hexo-related-posts

![Publish on NPM](https://github.com/sergeyzwezdin/hexo-related-posts/workflows/Publish%20on%20NPM/badge.svg) ![](https://img.shields.io/npm/v/hexo-related-posts)

[Hexo](https://hexo.io/) plugin that generates related posts list with TF/IDF algorithm.

## Requirements
- Hexo: 4.x
- Node 12+

## Installation

```bash
$ npm install hexo-related-posts --save-dev
```

## Usage

After installation, add `related_posts` to Hexo config file (see details [below](#Configuration)).

Once the plugin installed and configured, you can use it in post's template. The new `related_posts` property will appear in `page` variable.

The example of post layout that generates list of related post:

```ejs
<% if (page.related_posts && page.related_posts.length > 0) { %>
    <section>
        <h2>Related posts</h2>
        <ul>
        <% for (const path of page.related_posts) { %>
            <% const url = url_for(path) %>
            <% if (url) { %>
                <li><a href="<%= url %>"><%= url %></a></li>
            <% } %>
        <% } %>
        </ul>
    </section>
<% } %>
```

## Configuration

To configure the plugin add `related_posts` to Hexo config file. Example:

```yaml
related_posts:
    enabled: true
    enable_env_name: prod
    filter_threshold: 0.3
    related_count: 3
    weight:
        title: 0.05
        description: 0.05
        keywords: 0.01
        tags: 0.005
        categories: 0.005
        text: 1
    stemmers:
      - en
      - ru
    reserved:
      - asp.net
      - vs.net
      - ado.net
      - .net
```

| Key | Required | Default value | Description |
| --- | --- | --- | --- |
| `enabled` | no | `true` | Flag to disable plugin execution. |
| `enable_env_name` | no | | It's possible to disable plugin execution depending on env variable. For example, if you want to calculate related post only for production build, you can set this parameter to `prod`. In this case, related post will be generated only if you put `prod` key during running Hexo, i.e. `hexo generate -- --prod` |
| `filter_threshold` | no | `0.2` | During related posts calculation some number is going to be calculated. The more value means that the posts more similar. So, if you see that it calculates "unrelated" posts, you can slightly increase this value. |
| `related_count` | no | `5` | Number of posts that will be included into final list of related posts. |
| `weight` | no | | The plugin compares title, description, keywords, tags, categories and text. You can adjust each component value in final estimate by increasing/descreasing corresponding value. |
| `weight.title` | no | `0.05` | Weight for post's title. |
| `weight.description` | no | `0.05` | Weight for post's description. |
| `weight.keywords` | no | `0.01` | Weight for post's keywords. |
| `weight.tags` | no | `0.005` | Weight for post's tags. |
| `weight.categories` | no | `0.005` | Weight for post's categories. |
| `weight.text` | no | `1` | Weight for post's content. |
| `stemmers` | no | `[en, ru]` | Before final comparision plugin "normailze" the text by clearing symbols from initial text. One of the technique is stemming. This param defines which languages should be used to stem the words. Possible values: `nl`, `en`, `fr`, `id`, `it`, `jp`, `no`/`nb`/`nn`, `pt`, `ru`, `sv`. Check [Natural](https://github.com/NaturalNode/natural#stemmers) library for more details. |
| `reserved` | no | `[]` | The array of the reserved words that won't be processed during words normalization. For example, `ASP.NET` will be splitted into `ASP` and `NET` by default. If you want to preserve this, you need to add this to `reserved` config. |
