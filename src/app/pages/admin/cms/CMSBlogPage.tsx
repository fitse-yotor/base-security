import { useState } from 'react';
import { useCMSStore } from '../../../lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Plus, Pencil, Trash2, BookOpen, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import type { BlogPost } from '../../../lib/cms-store';

const CATS = ['Security Tips', 'Cleaning', 'Training', 'Company News'];
const CAT_COLORS: Record<string, string> = { 'Security Tips': '#101C37', 'Cleaning': '#BCA479', 'Training': '#0369a1', 'Company News': '#16a34a' };

const emptyPost = (): Omit<BlogPost, 'id'> => ({ slug: '', title: '', excerpt: '', category: 'Security Tips', date: new Date().toISOString().split('T')[0], readTime: '3 min read', image: '', featured: false, published: true, content: '' });

export default function CMSBlogPage() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useCMSStore();
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newPost, setNewPost] = useState(emptyPost());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-primary" />
          <div><h1 className="text-3xl font-bold">Blog CMS</h1><p className="text-muted-foreground">Manage blog posts and news</p></div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => setShowAdd(true)}><Plus className="w-4 h-4 mr-2" />New Post</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-gray-50"><th className="text-left p-4">Title</th><th className="text-left p-4">Category</th><th className="text-left p-4">Date</th><th className="text-center p-4">Featured</th><th className="text-center p-4">Published</th><th className="text-center p-4">Actions</th></tr></thead>
              <tbody>
                {blogPosts.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-semibold max-w-xs truncate">{p.title}</div>
                      <div className="text-xs text-muted-foreground">{p.readTime}</div>
                    </td>
                    <td className="p-4"><Badge className="text-xs" style={{ backgroundColor: CAT_COLORS[p.category] || '#BCA479', color: '#fff' }}>{p.category}</Badge></td>
                    <td className="p-4 text-muted-foreground">{p.date}</td>
                    <td className="p-4 text-center"><Switch checked={p.featured} onCheckedChange={(v) => { updateBlogPost(p.id, { featured: v }); toast.success(v ? 'Set as featured' : 'Removed from featured'); }} /></td>
                    <td className="p-4 text-center"><Switch checked={p.published} onCheckedChange={(v) => { updateBlogPost(p.id, { published: v }); toast.success(v ? 'Published' : 'Unpublished'); }} /></td>
                    <td className="p-4">
                      <div className="flex gap-1 justify-center">
                        <Button size="sm" variant="ghost" onClick={() => setEditPost({ ...p })}><Pencil className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" className="text-red-500" onClick={() => { deleteBlogPost(p.id); toast.success('Deleted'); }}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Post Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>New Blog Post</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label>Title *</Label><Input value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} /></div>
              <div className="space-y-1"><Label>Category</Label>
                <select className="w-full border rounded-md px-3 py-2 text-sm" value={newPost.category} onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}>
                  {CATS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-1"><Label>Date</Label><Input type="date" value={newPost.date} onChange={(e) => setNewPost({ ...newPost, date: e.target.value })} /></div>
              <div className="space-y-1"><Label>Read Time</Label><Input value={newPost.readTime} onChange={(e) => setNewPost({ ...newPost, readTime: e.target.value })} placeholder="3 min read" /></div>
              <div className="space-y-1 col-span-2"><Label>Image URL</Label><Input value={newPost.image} onChange={(e) => setNewPost({ ...newPost, image: e.target.value })} /></div>
            </div>
            <div className="space-y-1"><Label>Excerpt</Label><Textarea value={newPost.excerpt} onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })} rows={2} /></div>
            <div className="space-y-1"><Label>Content</Label><Textarea value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} rows={6} placeholder="Use **bold** for headings, - for bullet points" /></div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2"><Switch checked={newPost.featured} onCheckedChange={(v) => setNewPost({ ...newPost, featured: v })} /><Label>Featured</Label></div>
              <div className="flex items-center gap-2"><Switch checked={newPost.published} onCheckedChange={(v) => setNewPost({ ...newPost, published: v })} /><Label>Published</Label></div>
            </div>
            <Button className="w-full bg-primary text-white" onClick={() => { if (!newPost.title) { toast.error('Title required'); return; } addBlogPost(newPost); setNewPost(emptyPost()); setShowAdd(false); toast.success('Post created!'); }}>Create Post</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={!!editPost} onOpenChange={() => setEditPost(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>Edit Post</DialogTitle></DialogHeader>
          {editPost && <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label>Title</Label><Input value={editPost.title} onChange={(e) => setEditPost({ ...editPost, title: e.target.value })} /></div>
              <div className="space-y-1"><Label>Category</Label>
                <select className="w-full border rounded-md px-3 py-2 text-sm" value={editPost.category} onChange={(e) => setEditPost({ ...editPost, category: e.target.value })}>
                  {CATS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-1"><Label>Date</Label><Input type="date" value={editPost.date} onChange={(e) => setEditPost({ ...editPost, date: e.target.value })} /></div>
              <div className="space-y-1"><Label>Read Time</Label><Input value={editPost.readTime} onChange={(e) => setEditPost({ ...editPost, readTime: e.target.value })} /></div>
              <div className="space-y-1 col-span-2"><Label>Image URL</Label><Input value={editPost.image} onChange={(e) => setEditPost({ ...editPost, image: e.target.value })} /></div>
            </div>
            <div className="space-y-1"><Label>Excerpt</Label><Textarea value={editPost.excerpt} onChange={(e) => setEditPost({ ...editPost, excerpt: e.target.value })} rows={2} /></div>
            <div className="space-y-1"><Label>Content</Label><Textarea value={editPost.content} onChange={(e) => setEditPost({ ...editPost, content: e.target.value })} rows={8} /></div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2"><Switch checked={editPost.featured} onCheckedChange={(v) => setEditPost({ ...editPost, featured: v })} /><Label>Featured</Label></div>
              <div className="flex items-center gap-2"><Switch checked={editPost.published} onCheckedChange={(v) => setEditPost({ ...editPost, published: v })} /><Label>Published</Label></div>
            </div>
            <Button className="w-full bg-primary text-white" onClick={() => { updateBlogPost(editPost.id, editPost); setEditPost(null); toast.success('Saved!'); }}>Save Changes</Button>
          </div>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
