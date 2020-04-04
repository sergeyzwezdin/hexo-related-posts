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

TBD
