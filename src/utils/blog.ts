// Markdownファイルのフロントマター型定義
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

// すべてのMarkdown投稿を取得
export async function getAllPosts(): Promise<BlogPost[]> {
  // Astro.glob()を使用してMarkdownファイルを取得
  const allPosts = await import.meta.glob<{ frontmatter: BlogPostFrontmatter }>(
    '../pages/blog/posts/*.md',
    { eager: true }
  );

  const posts: BlogPost[] = [];

  for (const path in allPosts) {
    const post = allPosts[path];
    const frontmatter = post.frontmatter;

    // ファイル名からslugを抽出（例: ../pages/blog/posts/test.md -> test）
    const slug = path
      .split('/')
      .pop()
      ?.replace(/\.md$/, '') || '';

    if (!slug || !frontmatter.title) {
      continue; // 必須フィールドがない場合はスキップ
    }

    // pubDateをDateオブジェクトに変換
    const pubDate = frontmatter.pubDate
      ? (typeof frontmatter.pubDate === 'string'
          ? new Date(frontmatter.pubDate)
          : frontmatter.pubDate)
      : new Date();

    // タグをフィルタリング（空文字列やnullを除去）
    const tags = (frontmatter.tags || [])
      .filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0)
      .map(tag => tag.trim());

    // 画像URLが空の場合は処理をスキップ
    const imageUrl = frontmatter.image?.url?.trim() || '';
    
    posts.push({
      id: slug,
      slug: slug,
      url: `/blog/posts/${slug}/`,
      title: frontmatter.title,
      eyecatch: {
        url: imageUrl,
        alt: frontmatter.image?.alt || frontmatter.title,
      },
      tags: tags,
      category: frontmatter.category?.trim() || undefined,
      description: frontmatter.description?.trim() || undefined,
      pubDate: pubDate,
      author: frontmatter.author,
    });
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
