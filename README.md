# arefiva.github.io

Personal blog hosted on [GitHub Pages](https://pages.github.com/) using [Jekyll](https://jekyllrb.com/).

Live site: **https://arefiva.github.io**

## Structure

```
├── _config.yml          # Jekyll configuration
├── _layouts/            # Page layouts (default, page, post, category)
├── _includes/           # Reusable partials (header, footer)
├── _posts/              # Blog posts (Markdown, YYYY-MM-DD-title.md)
├── assets/
│   ├── css/style.scss   # Custom theme (dark/light mode via CSS variables)
│   └── js/theme-toggle.js
├── index.md             # Home page
├── agentic-development.md
├── projects.md
└── about.md
```

## Writing a Post

Create a file in `_posts/` named `YYYY-MM-DD-my-title.md` with this front matter:

```yaml
---
layout: post
title: "My Post Title"
date: 2026-04-15 08:00:00 +0000
categories: [agentic-development]
tags: [optional, tags]
---

Post content in Markdown...
```

## Local Development

Two configuration modes:

### For local development (localhost):
```bash
# Install dependencies
bundle install

# Serve locally with live reload (uses _config.local.yml)
bundle exec jekyll serve --livereload --config _config.yml,_config.local.yml

# Visit http://localhost:4000
```

### For production build (GitHub Pages):
```bash
# Build for production (uses _config.yml with arefiva.github.io URL)
bundle exec jekyll build

# GitHub Pages will automatically build with production config
```

**Note:** The `_config.local.yml` file overrides the `url` setting for local development only. This ensures:
- Local links work on `http://localhost:4000`
- Production links work on `https://arefiva.github.io`
- `.gitignore` excludes `_config.local.yml` so it won't affect production

Requires Ruby ≥ 3.0. If you don't have `bundler`, run `gem install bundler` first.