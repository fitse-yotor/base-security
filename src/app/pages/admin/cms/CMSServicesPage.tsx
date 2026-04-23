import { useState } from 'react';
import { useCMSStore } from '../../../lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Switch } from '../../../components/ui/switch';
import { Badge } from '../../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Plus, Pencil, Trash2, Save, Shield } from 'lucide-react';
import { toast } from 'sonner';
import type { ServicePageContent, PricingTier, TrainingCourse } from '../../../lib/cms-store';

const uid = () => `tier-${Date.now()}`;

function ServiceEditor({ label, page, onSave }: { label: string; page: ServicePageContent; onSave: (p: ServicePageContent) => void }) {
  const [data, setData] = useState({ ...page, features: [...page.features], pricingTiers: page.pricingTiers.map((t) => ({ ...t, features: [...t.features] })) });
  const [editTier, setEditTier] = useState<PricingTier | null>(null);
  const [newFeature, setNewFeature] = useState('');
  const [newTier, setNewTier] = useState({ name: '', description: '', price: '', features: [] as string[], highlighted: false });
  const [newTierFeature, setNewTierFeature] = useState('');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Hero Section — {label}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Title</Label><Input value={data.heroTitle} onChange={(e) => setData({ ...data, heroTitle: e.target.value })} /></div>
            <div className="space-y-1"><Label>Image URL</Label><Input value={data.heroImage} onChange={(e) => setData({ ...data, heroImage: e.target.value })} /></div>
          </div>
          <div className="space-y-1"><Label>Subtitle</Label><Textarea value={data.heroSubtitle} onChange={(e) => setData({ ...data, heroSubtitle: e.target.value })} rows={2} /></div>
          {data.heroImage && <img src={data.heroImage} alt="preview" className="h-28 rounded-lg object-cover" />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Features List</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {data.features.map((f, i) => (
            <div key={i} className="flex gap-2">
              <Input value={f} onChange={(e) => { const arr = [...data.features]; arr[i] = e.target.value; setData({ ...data, features: arr }); }} />
              <Button size="sm" variant="ghost" className="text-red-500 flex-shrink-0" onClick={() => setData({ ...data, features: data.features.filter((_, j) => j !== i) })}><Trash2 className="w-4 h-4" /></Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Input value={newFeature} onChange={(e) => setNewFeature(e.target.value)} placeholder="New feature..." />
            <Button variant="outline" onClick={() => { if (!newFeature) return; setData({ ...data, features: [...data.features, newFeature] }); setNewFeature(''); }}><Plus className="w-4 h-4" /></Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Pricing Tiers</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {data.pricingTiers.map((tier) => (
              <div key={tier.id} className={`border-2 rounded-xl p-4 ${tier.highlighted ? 'border-primary' : 'border-gray-200'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div><p className="font-bold">{tier.name}</p><p className="text-primary font-semibold">{tier.price}</p></div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => setEditTier({ ...tier, features: [...tier.features] })}><Pencil className="w-3 h-3" /></Button>
                    <Button size="sm" variant="ghost" className="text-red-500" onClick={() => setData({ ...data, pricingTiers: data.pricingTiers.filter((t) => t.id !== tier.id) })}><Trash2 className="w-3 h-3" /></Button>
                  </div>
                </div>
                {tier.highlighted && <Badge className="bg-primary text-white text-xs mb-2">Featured</Badge>}
                <ul className="text-xs text-muted-foreground space-y-1">{tier.features.map((f, i) => <li key={i}>• {f}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <p className="font-semibold mb-3">Add Pricing Tier</p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-1"><Label>Name</Label><Input value={newTier.name} onChange={(e) => setNewTier({ ...newTier, name: e.target.value })} /></div>
              <div className="space-y-1"><Label>Price</Label><Input value={newTier.price} onChange={(e) => setNewTier({ ...newTier, price: e.target.value })} placeholder="From ETB 10,000/month" /></div>
              <div className="space-y-1 md:col-span-2"><Label>Description</Label><Input value={newTier.description} onChange={(e) => setNewTier({ ...newTier, description: e.target.value })} /></div>
            </div>
            <div className="flex gap-2 mt-2">
              <Input value={newTierFeature} onChange={(e) => setNewTierFeature(e.target.value)} placeholder="Add feature to tier..." />
              <Button variant="outline" onClick={() => { if (!newTierFeature) return; setNewTier({ ...newTier, features: [...newTier.features, newTierFeature] }); setNewTierFeature(''); }}><Plus className="w-4 h-4" /></Button>
            </div>
            {newTier.features.length > 0 && <div className="flex flex-wrap gap-1 mt-2">{newTier.features.map((f, i) => <Badge key={i} variant="outline" className="text-xs">{f}</Badge>)}</div>}
            <div className="flex items-center gap-2 mt-2"><Switch checked={newTier.highlighted} onCheckedChange={(v) => setNewTier({ ...newTier, highlighted: v })} /><Label>Featured tier</Label></div>
            <Button className="mt-3 bg-primary hover:bg-primary/90 text-white" onClick={() => { if (!newTier.name) return; setData({ ...data, pricingTiers: [...data.pricingTiers, { ...newTier, id: uid() }] }); setNewTier({ name: '', description: '', price: '', features: [], highlighted: false }); toast.success('Tier added!'); }}><Plus className="w-4 h-4 mr-2" />Add Tier</Button>
          </div>
        </CardContent>
      </Card>

      <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => { onSave(data); toast.success(`${label} saved!`); }}><Save className="w-4 h-4 mr-2" />Save {label}</Button>

      <Dialog open={!!editTier} onOpenChange={() => setEditTier(null)}>
        <DialogContent className="max-w-lg"><DialogHeader><DialogTitle>Edit Pricing Tier</DialogTitle></DialogHeader>
          {editTier && <div className="space-y-3">
            <div className="space-y-1"><Label>Name</Label><Input value={editTier.name} onChange={(e) => setEditTier({ ...editTier, name: e.target.value })} /></div>
            <div className="space-y-1"><Label>Price</Label><Input value={editTier.price} onChange={(e) => setEditTier({ ...editTier, price: e.target.value })} /></div>
            <div className="space-y-1"><Label>Description</Label><Input value={editTier.description} onChange={(e) => setEditTier({ ...editTier, description: e.target.value })} /></div>
            <div className="space-y-1"><Label>Features (one per line)</Label><Textarea value={editTier.features.join('\n')} onChange={(e) => setEditTier({ ...editTier, features: e.target.value.split('\n').filter(Boolean) })} rows={4} /></div>
            <div className="flex items-center gap-2"><Switch checked={editTier.highlighted} onCheckedChange={(v) => setEditTier({ ...editTier, highlighted: v })} /><Label>Featured</Label></div>
            <Button className="w-full bg-primary text-white" onClick={() => { setData({ ...data, pricingTiers: data.pricingTiers.map((t) => t.id === editTier.id ? editTier : t) }); setEditTier(null); toast.success('Saved!'); }}>Save</Button>
          </div>}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TrainingEditor() {
  const { trainingCourses, addTrainingCourse, updateTrainingCourse, deleteTrainingCourse } = useCMSStore();
  const [editCourse, setEditCourse] = useState<TrainingCourse | null>(null);
  const [newCourse, setNewCourse] = useState({ name: '', duration: '', price: '', description: '', requirements: [] as string[], nextStart: '', features: [] as string[] });
  const [newReq, setNewReq] = useState('');
  const [newFeat, setNewFeat] = useState('');

  return (
    <div className="space-y-4">
      {trainingCourses.map((c) => (
        <Card key={c.id}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div><p className="font-bold text-lg">{c.name}</p><p className="text-primary font-semibold">{c.price} · {c.duration}</p><p className="text-sm text-muted-foreground mt-1">{c.description}</p></div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => setEditCourse({ ...c, requirements: [...c.requirements], features: [...c.features] })}><Pencil className="w-4 h-4" /></Button>
                <Button size="sm" variant="ghost" className="text-red-500" onClick={() => { deleteTrainingCourse(c.id); toast.success('Deleted'); }}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Card>
        <CardHeader><CardTitle>Add New Course</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1"><Label>Name</Label><Input value={newCourse.name} onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} /></div>
            <div className="space-y-1"><Label>Duration</Label><Input value={newCourse.duration} onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })} placeholder="2 Weeks" /></div>
            <div className="space-y-1"><Label>Price</Label><Input value={newCourse.price} onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })} placeholder="ETB 18,000" /></div>
            <div className="space-y-1"><Label>Next Start Date</Label><Input value={newCourse.nextStart} onChange={(e) => setNewCourse({ ...newCourse, nextStart: e.target.value })} placeholder="May 1, 2026" /></div>
            <div className="space-y-1 md:col-span-2"><Label>Description</Label><Textarea value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} rows={2} /></div>
          </div>
          <div className="flex gap-2"><Input value={newReq} onChange={(e) => setNewReq(e.target.value)} placeholder="Add requirement..." /><Button variant="outline" onClick={() => { if (!newReq) return; setNewCourse({ ...newCourse, requirements: [...newCourse.requirements, newReq] }); setNewReq(''); }}><Plus className="w-4 h-4" /></Button></div>
          {newCourse.requirements.length > 0 && <div className="flex flex-wrap gap-1">{newCourse.requirements.map((r, i) => <Badge key={i} variant="outline" className="text-xs">{r}</Badge>)}</div>}
          <div className="flex gap-2"><Input value={newFeat} onChange={(e) => setNewFeat(e.target.value)} placeholder="Add course feature..." /><Button variant="outline" onClick={() => { if (!newFeat) return; setNewCourse({ ...newCourse, features: [...newCourse.features, newFeat] }); setNewFeat(''); }}><Plus className="w-4 h-4" /></Button></div>
          {newCourse.features.length > 0 && <div className="flex flex-wrap gap-1">{newCourse.features.map((f, i) => <Badge key={i} className="bg-primary text-white text-xs">{f}</Badge>)}</div>}
          <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => { if (!newCourse.name) return; addTrainingCourse(newCourse); setNewCourse({ name: '', duration: '', price: '', description: '', requirements: [], nextStart: '', features: [] }); toast.success('Course added!'); }}><Plus className="w-4 h-4 mr-2" />Add Course</Button>
        </CardContent>
      </Card>
      <Dialog open={!!editCourse} onOpenChange={() => setEditCourse(null)}>
        <DialogContent className="max-w-lg"><DialogHeader><DialogTitle>Edit Course</DialogTitle></DialogHeader>
          {editCourse && <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label>Name</Label><Input value={editCourse.name} onChange={(e) => setEditCourse({ ...editCourse, name: e.target.value })} /></div>
              <div className="space-y-1"><Label>Duration</Label><Input value={editCourse.duration} onChange={(e) => setEditCourse({ ...editCourse, duration: e.target.value })} /></div>
              <div className="space-y-1"><Label>Price</Label><Input value={editCourse.price} onChange={(e) => setEditCourse({ ...editCourse, price: e.target.value })} /></div>
              <div className="space-y-1"><Label>Next Start</Label><Input value={editCourse.nextStart} onChange={(e) => setEditCourse({ ...editCourse, nextStart: e.target.value })} /></div>
            </div>
            <div className="space-y-1"><Label>Description</Label><Textarea value={editCourse.description} onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })} rows={2} /></div>
            <div className="space-y-1"><Label>Requirements (one per line)</Label><Textarea value={editCourse.requirements.join('\n')} onChange={(e) => setEditCourse({ ...editCourse, requirements: e.target.value.split('\n').filter(Boolean) })} rows={3} /></div>
            <div className="space-y-1"><Label>Features (one per line)</Label><Textarea value={editCourse.features.join('\n')} onChange={(e) => setEditCourse({ ...editCourse, features: e.target.value.split('\n').filter(Boolean) })} rows={3} /></div>
            <Button className="w-full bg-primary text-white" onClick={() => { updateTrainingCourse(editCourse.id, editCourse); setEditCourse(null); toast.success('Saved!'); }}>Save</Button>
          </div>}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function CMSServicesPage() {
  const { privateSecurityPage, updatePrivateSecurityPage, officeBuildingPage, updateOfficeBuildingPage, housekeepingPage, updateHousekeepingPage } = useCMSStore();
  const [active, setActive] = useState('private');

  const pages = [
    { id: 'private', label: 'Private Security', page: privateSecurityPage, onSave: updatePrivateSecurityPage },
    { id: 'office', label: 'Office & Building', page: officeBuildingPage, onSave: updateOfficeBuildingPage },
    { id: 'housekeeping', label: 'Housekeeping', page: housekeepingPage, onSave: updateHousekeepingPage },
    { id: 'training', label: 'Training Courses', page: null, onSave: () => {} },
  ];

  const current = pages.find((p) => p.id === active)!;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-primary" />
        <div><h1 className="text-3xl font-bold">Services CMS</h1><p className="text-muted-foreground">Manage all service page content</p></div>
      </div>
      <div className="flex flex-wrap gap-2">
        {pages.map((p) => (
          <button key={p.id} onClick={() => setActive(p.id)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${active === p.id ? 'bg-primary text-white shadow' : 'bg-white border hover:bg-gray-50'}`}>{p.label}</button>
        ))}
      </div>
      {current.id === 'training' ? <TrainingEditor /> : current.page && <ServiceEditor label={current.label} page={current.page} onSave={current.onSave} />}
    </div>
  );
}
