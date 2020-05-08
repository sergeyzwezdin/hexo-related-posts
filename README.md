# hexo-related-posts ![Publish on NPM](https://github.com/sergeyzwezdin/hexo-related-posts/workflows/Publish%20on%20NPM/badge.svg) ![](https://img.shields.io/npm/v/hexo-related-posts)

`hexo-related-posts` is a plugin for Hexo static site generator that generates related posts list with TF/IDF algorithm.

* **Increases time** users spend on your website by suggesting related content.
* Supports **a few different languages**, including English, French, Russian, Italian, Japanese, and many others.
* Allows to define **"reserved" words** that won't be split during word normalize (e.g. `ASP.NET` will not be split into `ASP` and `NET`).
* **Highly customizable**. Allows to define weight for every component.


## How it works

1. The plugin scans all posts on the website and extracts words for every post.
2. For every word [stemmers](https://github.com/NaturalNode/natural#stemmers) are applied.
3. After normalizing of the words, they are grouped into a dictionary like `word → count` for every post.
4. [TF/IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) is calculated for every post.
5. Post title, description, keywords, tags, categories are also used to compare the posts.
6. The `related_posts` property added to every post so you can use it the template and display related posts 🎉.

## Requirements
- Hexo: 4.x
- Node 12+

## Usage

1. Install the plugin using npm:
```bash
$ npm install hexo-related-posts --save-dev
```
2. Add `related_posts` to Hexo config file (see details [below](#Configuration)).
3. The new `related_posts` property will appear in the `page` variable.

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

❗️ **IMPORTANT NOTE**. Before building the website for production you should run [`hexo clean`](https://hexo.io/docs/commands.html#clean) to re-invalidate all relations between the pages.

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
| `enable` | no | `true` | Flag to disable plugin execution. |
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
