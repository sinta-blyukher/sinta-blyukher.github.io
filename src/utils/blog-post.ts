export type BlogPostFrontmatter = {
  layout: string;
  title: string;
  author?: string;
  description?: string;
  image?: {
    url: string;
    alt?: string;
  };
  pubDate: Date | string;
  tags?: string[];
  category?: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  url: string;
  title: string;
  eyecatch: {
    url: string;
    alt?: string;
  };
  tags: string[];
  category?: string;
  description?: string;
  pubDate: Date;
  author?: string;
};

export function createBlogPost(
  path: string,
  frontmatter: BlogPostFrontmatter,
): BlogPost | undefined {
  const slug = path
    .split('/')
    .pop()
    ?.replace(/\.md$/, '') || '';

  if (!slug || !frontmatter.title) {
    return undefined;
  }

  const pubDate = typeof frontmatter.pubDate === 'string'
    ? new Date(frontmatter.pubDate)
    : frontmatter.pubDate;

  const tags = (frontmatter.tags || [])
    .filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0)
    .map((tag) => tag.trim());

  return {
    id: slug,
    slug,
    url: `/blog/posts/${slug}/`,
    title: frontmatter.title,
    eyecatch: {
      url: frontmatter.image?.url?.trim() || '',
      alt: frontmatter.image?.alt || frontmatter.title,
    },
    tags,
    category: frontmatter.category?.trim() || undefined,
    description: frontmatter.description?.trim() || undefined,
    pubDate,
    author: frontmatter.author,
  };
}
