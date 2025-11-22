import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { SeoData, PostDraft } from '@/types';
import { cn } from '@/lib/utils';
import { readDrafts, saveDraft, publishDraft, upsertPostAndDraftsSync, ensureSlug } from '@/lib/api';
import { readPosts } from '@/lib/api';

export const BlogEditor: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [seo, setSeo] = useState<SeoData>({ metaTitle: '', metaDescription: '' });
  const [scheduledFor, setScheduledFor] = useState<string | null>(null);
  const [status, setStatus] = useState<'draft'|'scheduled'|'published'>('draft');
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    // load posts for internal linking suggestions
    (async () => {
      const p = await readPosts();
      setPosts(p);
    })();
  }, []);

  const slug = useMemo(() => ensureSlug(title || 'untitled'), [title]);

  const save = async () => {
    const draft: any = {
      id: 'draft_' + Date.now(),
      title,
      slug,
      content,
      seo,
      createdAt: new Date().toISOString(),
      scheduledFor: scheduledFor || null,
      status: status,
      author: 'CurrentUser',
    };
    await saveDraft(draft);
  };

  const publish = async () => {
    if (!title) return;
    const draft: any = {
      id: 'draft_' + Date.now(),
      title,
      slug,
      content,
      seo,
      createdAt: new Date().toISOString(),
      scheduledFor: scheduledFor || null,
      status: 'published',
      author: 'CurrentUser',
    };
    await saveDraft(draft);
    await publishDraft(draft.id);
  };

  // Simple internal linking suggestions: find post titles in content
  const suggestions = useMemo(() => {
    if (!content) return [] as string[];
    const titles = posts.map((p) => p.title.toLowerCase());
    const found = titles.filter((t) => content.toLowerCase().includes(t));
    return found;
  }, [content, posts]);

  return (
    <section aria-label="Blog Editor">
      <div className="container py-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Card title="Drafts">
            <div className={cn('space-y-2') as any}>
              <Input id="title" label="Post Title" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter title" />
              <div>
                <label className="block mb-1 text-sm text-gray-300">Content</label>
                <textarea className="w-full h-40 p-2 rounded border border-gray-700 bg-black text-white" value={content} onChange={(e)=>setContent(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input id="slug" label="Slug" value={slug} onChange={()=>{}} placeholder="auto" />
                <Input id="seoTitle" label="SEO Title" value={seo.metaTitle} onChange={(e)=>setSeo(e => ({...e, metaTitle: e.target.value}))} placeholder="SEO title" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input id="seoDesc" label="SEO Description" value={seo.metaDescription} onChange={(e)=>setSeo(e => ({...e, metaDescription: e.target.value}))} placeholder="SEO description" />
                <Input id="schedule" label="Schedule" value={scheduledFor || ''} onChange={(e)=>setScheduledFor(e.target.value)} placeholder="YYYY-MM-DD" />
              </div>
              <div className="flex gap-2 mt-2">
                <Button variant="primary" onClick={save}>Save Draft</Button>
                <Button variant="secondary" onClick={publish}>Publish</Button>
              </div>
            </div>
          </Card>
          <Card title="SEO & Links">
            <div className="space-y-2 text-sm text-gray-300">
              <div>
                <strong>Meta Title:</strong>
                <div className="text-xs mt-1">{seo.metaTitle || '(empty)'}</div>
              </div>
              <div>
                <strong>Meta Description:</strong>
                <div className="text-xs mt-1">{seo.metaDescription || '(empty)'}</div>
              </div>
              <div>
                <strong>Internal Linking Suggestions:</strong>
                <ul className="list-disc list-inside mt-1">
                  {suggestions.length === 0 ? (
                    <li className="text-gray-500">Add content to see suggestions</li>
                  ) : suggestions.map((s) => (
                    <li key={s} className="text-white">{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export const BlogEditorMemo = React.memo(BlogEditor);

export default BlogEditor;
