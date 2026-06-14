import { describe, expect, it } from 'vitest';

import { createBlogPost, type BlogPostFrontmatter } from './blog-post';

const baseFrontmatter: BlogPostFrontmatter = {
  layout: '../../../layouts/BlogPost.astro',
  title: 'Test post',
  pubDate: '2026-06-15',
};

describe('createBlogPost', () => {
  it('normalizes a Markdown post', () => {
    const post = createBlogPost('../pages/blog/posts/example.md', {
      ...baseFrontmatter,
      author: 'sinta',
      description: '  Description  ',
      image: {
        url: ' /image.png ',
      },
      tags: [' Astro ', '', 'TypeScript'],
      category: ' Web ',
    });

    expect(post).toEqual({
      id: 'example',
      slug: 'example',
      url: '/blog/posts/example/',
      title: 'Test post',
      eyecatch: {
        url: '/image.png',
        alt: 'Test post',
      },
      tags: ['Astro', 'TypeScript'],
      category: 'Web',
      description: 'Description',
      pubDate: new Date('2026-06-15'),
      author: 'sinta',
    });
  });

  it('preserves an existing Date and image alt text', () => {
    const pubDate = new Date('2026-01-30T00:00:00Z');
    const post = createBlogPost('post.md', {
      ...baseFrontmatter,
      pubDate,
      image: {
        url: '/image.png',
        alt: 'Cover image',
      },
    });

    expect(post?.pubDate).toBe(pubDate);
    expect(post?.eyecatch.alt).toBe('Cover image');
  });

  it('skips posts without a slug or title', () => {
    expect(createBlogPost('', baseFrontmatter)).toBeUndefined();
    expect(createBlogPost('post.md', {
      ...baseFrontmatter,
      title: '',
    })).toBeUndefined();
  });
});
