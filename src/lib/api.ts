import { PostDraft, SeoData } from '@/types';

const DRAFTS_KEY = 'rf_drafts_v1';
const POSTS_KEY = 'rf_posts_v1';

export const readDrafts = async (): Promise<PostDraft[]> => {
  const raw = localStorage.getItem(DRAFTS_KEY);
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as PostDraft[];
    return data;
  } catch {
    return [];
  }
};

export const saveDraft = async (draft: PostDraft): Promise<void> => {
  const drafts = await readDrafts();
  const index = drafts.findIndex((d) => d.id === draft.id);
  if (index >= 0) drafts[index] = draft; else drafts.push(draft);
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
};

export const publishDraft = async (id: string): Promise<void> => {
  const drafts = await readDrafts();
  const postIndex = drafts.findIndex((d) => d.id === id);
  if (postIndex >= 0) {
    const draft = drafts[postIndex];
    // Move to posts (simple archival)
    const existing = await readPosts();
    existing.push({
      id: draft.id,
      title: draft.title,
      slug: draft.slug,
      content: draft.content,
      seo: draft.seo,
      createdAt: draft.createdAt,
      publishedAt: new Date().toISOString(),
      author: draft.author,
    } as any);
    localStorage.setItem(POSTS_KEY, JSON.stringify(existing));
    drafts.splice(postIndex, 1);
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  }
};

export const readPosts = async (): Promise<any[]> => {
  const raw = localStorage.getItem(POSTS_KEY);
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as any[];
    return data;
  } catch {
    return [];
  }
};

export const upsertPostAndDraftsSync = async (draft: PostDraft): Promise<void> => {
  await saveDraft(draft);
};

export type RawPost = any;

export const ensureSlug = (title: string): string => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export type { PostDraft } from '@/types';
