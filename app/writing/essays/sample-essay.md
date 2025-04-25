---
layout: post
title: "Sample Essay Migrated from Jekyll"
date: 2023-07-15
excerpt: "This is a sample essay that demonstrates how Jekyll-formatted markdown files can be used in Next.js."
cover_image: "/images/sample-cover.jpg"
tags: [nextjs, markdown, jekyll, "Business"]
---

# Sample Essay

This is a sample essay that demonstrates how Jekyll-formatted markdown files can be used in Next.js.

## Front Matter

Jekyll uses YAML front matter at the top of markdown files, which is demarcated by three dashes (`---`). Common front matter variables include:

- `layout`: The template to use (not needed in Next.js)
- `title`: The title of the post
- `date`: The publication date
- `categories` or `tags`: For categorization
- Custom variables like `excerpt`, `cover_image`, etc.

## Markdown Formatting

Jekyll and Next.js both support standard markdown syntax:

### Code Blocks

```javascript
function hello() {
  console.log("Hello, world!");
}
```

### Lists

1. First item
2. Second item
3. Third item

### Links

[Link to Next.js](https://nextjs.org)

## Jekyll-Specific Features

Jekyll includes some specific features that we've replaced:

### Liquid Templates

Jekyll uses Liquid templates like `{% include file.html %}` or `{{ variable }}`. In our Next.js implementation, these would need to be converted to JSX components.

### Permalinks

Jekyll has a permalink system that is replaced by Next.js file-based routing.

## Conclusion

With the utilities we've built, Jekyll markdown files can be seamlessly integrated into a Next.js site, preserving the content while adapting the rendering to Next.js conventions. 