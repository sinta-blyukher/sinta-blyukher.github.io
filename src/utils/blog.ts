import {
  createBlogPost,
  type BlogPost,
  type BlogPostFrontmatter,
} from './blog-post';

export type { BlogPost, BlogPostFrontmatter } from './blog-post';

// すべてのMarkdown投稿を取得
export async function getAllPosts(): Promise<BlogPost[]> {
  // Astro.glob()を使用してMarkdownファイルを取得
  const allPosts = import.meta.glob<{ frontmatter: BlogPostFrontmatter }>(
    '../pages/blog/posts/*.md',
    { eager: true }
  );

  const posts: BlogPost[] = [];

  for (const path in allPosts) {
    const post = allPosts[path];
    const normalizedPost = createBlogPost(path, post.frontmatter);
    if (normalizedPost) {
      posts.push(normalizedPost);
    }
  }

  // 公開日順でソート（新しい順）
  posts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return posts;
}

// カテゴリでフィルタリング
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.category === category);
}

// タグでフィルタリング
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}

// すべてのカテゴリ一覧を取得
export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const categories = new Set<string>();
  for (const post of allPosts) {
    if (post.category) {
      categories.add(post.category);
    }
  }
  return Array.from(categories).sort((a, b) => a.localeCompare(b));
}

// すべてのタグ一覧を取得
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tags = new Set<string>();
  for (const post of allPosts) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}
