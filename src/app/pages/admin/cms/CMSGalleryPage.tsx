import { useState } from 'react';
import { useCMSStore } from '../../../lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Plus, Pencil, Trash2, Eye, EyeOff, Image } from 'lucide-react';
import { toast } from 'sonner';
import type { GalleryPhoto } from '../../../lib/cms-store';

const CATS = ['Security', 'Cleaning', 'Training', 'Events'];

export default function CMSGalleryPage() {
  const { galleryPhotos, addGalleryPhoto, updateGalleryPhoto, deleteGalleryPhoto } = useCMSStore();
  const [editPhoto, setEditPhoto] = useState<GalleryPhoto | null>(null);
  const [newPhoto, setNewPhoto] = useState({ category: 'Security', title: '', src: '', desc: '', visible: true });
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? galleryPhotos : galleryPhotos.filter((p) => p.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Image className="w-6 h-6 text-primary" />
          <div><h1 className="text-3xl font-bold">Gallery CMS</h1><p className="text-muted-foreground">Manage gallery photos</p></div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', ...CATS].map((c) => (
            <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${filter === c ? 'bg-primary text-white' : 'bg-white border hover:bg-gray-50'}`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <div key={p.id} className={`border-2 rounded-xl overflow-hidden ${!p.visible ? 'opacity-50' : ''}`}>
            <div className="relative h-36">
              <img src={p.src} alt={p.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image'; }} />
              <div className="absolute top-2 left-2"><Badge className="text-xs" style={{ backgroundColor: '#BCA479', color: '#fff' }}>{p.category}</Badge></div>
              <div className="absolute top-2 right-2">
                <button onClick={() => { updateGalleryPhoto(p.id, { visible: !p.visible }); toast.success(p.visible ? 'Hidden' : 'Visible'); }} className="bg-black/50 text-white rounded-full p-1 hover:bg-black/70">
                  {p.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="font-semibold text-sm truncate">{p.title}</p>
              <p className="text-xs text-muted-foreground truncate">{p.desc}</p>
              <div className="flex gap-1 mt-2">
                <Button size="sm" variant="ghost" className="flex-1 h-7 text-xs" onClick={() => setEditPhoto({ ...p })}><Pencil className="w-3 h-3 mr-1" />Edit</Button>
                <Button size="sm" variant="ghost" className="flex-1 h-7 text-xs text-red-500" onClick={() => { deleteGalleryPhoto(p.id); toast.success('Deleted'); }}><Trash2 className="w-3 h-3 mr-1" />Del</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Add New Photo</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1"><Label>Title</Label><Input value={newPhoto.title} onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })} /></div>
            <div className="space-y-1"><Label>Category</Label>
              <select className="w-full border rounded-md px-3 py-2 text-sm" value={newPhoto.category} onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}>
                {CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1 md:col-span-2"><Label>Image URL</Label><Input value={newPhoto.src} onChange={(e) => setNewPhoto({ ...newPhoto, src: e.target.value })} placeholder="https://..." /></div>
            <div className="space-y-1 md:col-span-2"><Label>Description</Label><Input value={newPhoto.desc} onChange={(e) => setNewPhoto({ ...newPhoto, desc: e.target.value })} /></div>
          </div>
          {newPhoto.src && <img src={newPhoto.src} alt="preview" className="h-28 rounded-lg object-cover" />}
          <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => { if (!newPhoto.title || !newPhoto.src) { toast.error('Title and image URL required'); return; } addGalleryPhoto(newPhoto as any); setNewPhoto({ category: 'Security', title: '', src: '', desc: '', visible: true }); toast.success('Photo added!'); }}><Plus className="w-4 h-4 mr-2" />Add Photo</Button>
        </CardContent>
      </Card>

      <Dialog open={!!editPhoto} onOpenChange={() => setEditPhoto(null)}>
        <DialogContent className="max-w-lg"><DialogHeader><DialogTitle>Edit Photo</DialogTitle></DialogHeader>
          {editPhoto && <div className="space-y-3">
            <div className="space-y-1"><Label>Title</Label><Input value={editPhoto.title} onChange={(e) => setEditPhoto({ ...editPhoto, title: e.target.value })} /></div>
            <div className="space-y-1"><Label>Category</Label>
              <select className="w-full border rounded-md px-3 py-2 text-sm" value={editPhoto.category} onChange={(e) => setEditPhoto({ ...editPhoto, category: e.target.value })}>
                {CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1"><Label>Image URL</Label><Input value={editPhoto.src} onChange={(e) => setEditPhoto({ ...editPhoto, src: e.target.value })} /></div>
            <div className="space-y-1"><Label>Description</Label><Input value={editPhoto.desc} onChange={(e) => setEditPhoto({ ...editPhoto, desc: e.target.value })} /></div>
            {editPhoto.src && <img src={editPhoto.src} alt="preview" className="h-28 rounded-lg object-cover" />}
            <div className="flex items-center gap-2"><Switch checked={editPhoto.visible} onCheckedChange={(v) => setEditPhoto({ ...editPhoto, visible: v })} /><Label>Visible on website</Label></div>
            <Button className="w-full bg-primary text-white" onClick={() => { updateGalleryPhoto(editPhoto.id, editPhoto); setEditPhoto(null); toast.success('Saved!'); }}>Save</Button>
          </div>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
