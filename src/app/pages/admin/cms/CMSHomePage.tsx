import { useState } from 'react';
import { useCMSStore } from '../../../lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Plus, Pencil, Trash2, Save, Home } from 'lucide-react';
import { toast } from 'sonner';
import type { StatItem, Testimonial, ClientLogo, ServiceCard } from '../../../lib/cms-store';

export default function CMSHomePage() {
  const {
    heroContent, updateHeroContent,
    stats, addStat, updateStat, deleteStat,
    testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
    clientLogos, addClientLogo, updateClientLogo, deleteClientLogo,
    serviceCards, addServiceCard, updateServiceCard, deleteServiceCard,
  } = useCMSStore();

  const [hero, setHero] = useState({ ...heroContent });
  const [editStat, setEditStat] = useState<StatItem | null>(null);
  const [newStat, setNewStat] = useState({ value: 0, suffix: '+', label: '' });
  const [editTestimonial, setEditTestimonial] = useState<Testimonial | null>(null);
  const [newTestimonial, setNewTestimonial] = useState({ name: '', company: '', role: '', content: '', rating: 5 });
  const [editLogo, setEditLogo] = useState<ClientLogo | null>(null);
  const [newLogo, setNewLogo] = useState({ name: '', initials: '', color: '#101C37' });
  const [editCard, setEditCard] = useState<ServiceCard | null>(null);
  const [newCard, setNewCard] = useState({ title: '', description: '', category: 'Security', link: '', image: '', visible: true });

  const saveHero = () => { updateHeroContent(hero); toast.success('Hero section saved!'); };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Home className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Homepage CMS</h1>
          <p className="text-muted-foreground">Manage all homepage content</p>
        </div>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="services">Service Cards</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="clients">Client Logos</TabsTrigger>
        </TabsList>

        {/* ── HERO ── */}
        <TabsContent value="hero">
          <Card>
            <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Badge Text</Label><Input value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} /></div>
                <div className="space-y-2"><Label>Title</Label><Input value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} /></div>
                <div className="space-y-2"><Label>Highlight Word (gold color)</Label><Input value={hero.highlightWord} onChange={(e) => setHero({ ...hero, highlightWord: e.target.value })} /></div>
                <div className="space-y-2"><Label>Primary Button Text</Label><Input value={hero.primaryBtn} onChange={(e) => setHero({ ...hero, primaryBtn: e.target.value })} /></div>
                <div className="space-y-2"><Label>Secondary Button Text</Label><Input value={hero.secondaryBtn} onChange={(e) => setHero({ ...hero, secondaryBtn: e.target.value })} /></div>
                <div className="space-y-2"><Label>Background Image URL</Label><Input value={hero.bgImage} onChange={(e) => setHero({ ...hero, bgImage: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label>Subtitle</Label><Textarea value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} rows={3} /></div>
              {hero.bgImage && <img src={hero.bgImage} alt="preview" className="h-32 rounded-lg object-cover" />}
              <Button onClick={saveHero} className="bg-primary hover:bg-primary/90 text-white"><Save className="w-4 h-4 mr-2" />Save Hero</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── STATS ── */}
        <TabsContent value="stats">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Stats Bar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b"><th className="text-left p-2">Value</th><th className="text-left p-2">Suffix</th><th className="text-left p-2">Label</th><th className="p-2">Actions</th></tr></thead>
                  <tbody>
                    {stats.map((s) => (
                      <tr key={s.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-bold text-primary">{s.value}</td>
                        <td className="p-2">{s.suffix}</td>
                        <td className="p-2">{s.label}</td>
                        <td className="p-2 flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => setEditStat({ ...s })}><Pencil className="w-4 h-4" /></Button>
                          <Button size="sm" variant="ghost" className="text-red-500" onClick={() => { deleteStat(s.id); toast.success('Deleted'); }}><Trash2 className="w-4 h-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold mb-3">Add New Stat</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1"><Label>Value</Label><Input type="number" value={newStat.value} onChange={(e) => setNewStat({ ...newStat, value: +e.target.value })} /></div>
                  <div className="space-y-1"><Label>Suffix</Label><Input value={newStat.suffix} onChange={(e) => setNewStat({ ...newStat, suffix: e.target.value })} placeholder="+" /></div>
                  <div className="space-y-1"><Label>Label</Label><Input value={newStat.label} onChange={(e) => setNewStat({ ...newStat, label: e.target.value })} placeholder="Clients" /></div>
                </div>
                <Button className="mt-3 bg-primary hover:bg-primary/90 text-white" onClick={() => { if (!newStat.label) return; addStat(newStat); setNewStat({ value: 0, suffix: '+', label: '' }); toast.success('Stat added!'); }}><Plus className="w-4 h-4 mr-2" />Add Stat</Button>
              </div>
            </CardContent>
          </Card>
          <Dialog open={!!editStat} onOpenChange={() => setEditStat(null)}>
            <DialogContent><DialogHeader><DialogTitle>Edit Stat</DialogTitle></DialogHeader>
              {editStat && <div className="space-y-3">
                <div className="space-y-1"><Label>Value</Label><Input type="number" value={editStat.value} onChange={(e) => setEditStat({ ...editStat, value: +e.target.value })} /></div>
                <div className="space-y-1"><Label>Suffix</Label><Input value={editStat.suffix} onChange={(e) => setEditStat({ ...editStat, suffix: e.target.value })} /></div>
                <div className="space-y-1"><Label>Label</Label><Input value={editStat.label} onChange={(e) => setEditStat({ ...editStat, label: e.target.value })} /></div>
                <Button className="w-full bg-primary text-white" onClick={() => { updateStat(editStat.id, editStat); setEditStat(null); toast.success('Saved!'); }}>Save</Button>
              </div>}
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* ── SERVICE CARDS ── */}
        <TabsContent value="services">
          <Card>
            <CardHeader><CardTitle>Service Cards</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {serviceCards.map((c) => (
                  <div key={c.id} className="border rounded-xl p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold">{c.title}</p>
                        <Badge className="text-xs mt-1" style={{ backgroundColor: c.category === 'Cleaning' ? '#BCA479' : c.category === 'Training' ? '#0369a1' : '#101C37', color: '#fff' }}>{c.category}</Badge>
                      </div>
                      <div className="flex gap-1">
                        <Switch checked={c.visible} onCheckedChange={(v) => { updateServiceCard(c.id, { visible: v }); toast.success(v ? 'Visible' : 'Hidden'); }} />
                        <Button size="sm" variant="ghost" onClick={() => setEditCard({ ...c })}><Pencil className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" className="text-red-500" onClick={() => { deleteServiceCard(c.id); toast.success('Deleted'); }}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{c.description}</p>
                    {c.image && <img src={c.image} alt={c.title} className="h-24 w-full object-cover rounded-lg" />}
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold mb-3">Add New Service Card</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-1"><Label>Title</Label><Input value={newCard.title} onChange={(e) => setNewCard({ ...newCard, title: e.target.value })} /></div>
                  <div className="space-y-1"><Label>Category</Label>
                    <select className="w-full border rounded-md px-3 py-2 text-sm" value={newCard.category} onChange={(e) => setNewCard({ ...newCard, category: e.target.value })}>
                      <option>Security</option><option>Cleaning</option><option>Training</option>
                    </select>
                  </div>
                  <div className="space-y-1"><Label>Link</Label><Input value={newCard.link} onChange={(e) => setNewCard({ ...newCard, link: e.target.value })} placeholder="/services/..." /></div>
                  <div className="space-y-1"><Label>Image URL</Label><Input value={newCard.image} onChange={(e) => setNewCard({ ...newCard, image: e.target.value })} /></div>
                  <div className="space-y-1 md:col-span-2"><Label>Description</Label><Textarea value={newCard.description} onChange={(e) => setNewCard({ ...newCard, description: e.target.value })} rows={2} /></div>
                </div>
                <Button className="mt-3 bg-primary hover:bg-primary/90 text-white" onClick={() => { if (!newCard.title) return; addServiceCard(newCard as any); setNewCard({ title: '', description: '', category: 'Security', link: '', image: '', visible: true }); toast.success('Card added!'); }}><Plus className="w-4 h-4 mr-2" />Add Card</Button>
              </div>
            </CardContent>
          </Card>
          <Dialog open={!!editCard} onOpenChange={() => setEditCard(null)}>
            <DialogContent className="max-w-lg"><DialogHeader><DialogTitle>Edit Service Card</DialogTitle></DialogHeader>
              {editCard && <div className="space-y-3">
                <div className="space-y-1"><Label>Title</Label><Input value={editCard.title} onChange={(e) => setEditCard({ ...editCard, title: e.target.value })} /></div>
                <div className="space-y-1"><Label>Description</Label><Textarea value={editCard.description} onChange={(e) => setEditCard({ ...editCard, description: e.target.value })} rows={2} /></div>
                <div className="space-y-1"><Label>Image URL</Label><Input value={editCard.image} onChange={(e) => setEditCard({ ...editCard, image: e.target.value })} /></div>
                <div className="space-y-1"><Label>Link</Label><Input value={editCard.link} onChange={(e) => setEditCard({ ...editCard, link: e.target.value })} /></div>
                {editCard.image && <img src={editCard.image} alt="preview" className="h-24 w-full object-cover rounded-lg" />}
                <Button className="w-full bg-primary text-white" onClick={() => { updateServiceCard(editCard.id, editCard); setEditCard(null); toast.success('Saved!'); }}>Save</Button>
              </div>}
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* ── TESTIMONIALS ── */}
        <TabsContent value="testimonials">
          <Card>
            <CardHeader><CardTitle>Testimonials</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {testimonials.map((t) => (
                <div key={t.id} className="border rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div><p className="font-bold">{t.name}</p><p className="text-sm text-muted-foreground">{t.role} · {t.company}</p></div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => setEditTestimonial({ ...t })}><Pencil className="w-4 h-4" /></Button>
                      <Button size="sm" variant="ghost" className="text-red-500" onClick={() => { deleteTestimonial(t.id); toast.success('Deleted'); }}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <p className="text-sm italic text-muted-foreground">"{t.content}"</p>
                  <div className="flex gap-0.5 mt-2">{[1,2,3,4,5].map((s) => <span key={s} className={s <= t.rating ? 'text-primary' : 'text-gray-300'}>★</span>)}</div>
                </div>
              ))}
              <div className="border-t pt-4">
                <p className="font-semibold mb-3">Add New Testimonial</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-1"><Label>Name</Label><Input value={newTestimonial.name} onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })} /></div>
                  <div className="space-y-1"><Label>Company</Label><Input value={newTestimonial.company} onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })} /></div>
                  <div className="space-y-1"><Label>Role</Label><Input value={newTestimonial.role} onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })} /></div>
                  <div className="space-y-1"><Label>Rating (1-5)</Label><Input type="number" min={1} max={5} value={newTestimonial.rating} onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: +e.target.value })} /></div>
                  <div className="space-y-1 md:col-span-2"><Label>Content</Label><Textarea value={newTestimonial.content} onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })} rows={3} /></div>
                </div>
                <Button className="mt-3 bg-primary hover:bg-primary/90 text-white" onClick={() => { if (!newTestimonial.name) return; addTestimonial(newTestimonial); setNewTestimonial({ name: '', company: '', role: '', content: '', rating: 5 }); toast.success('Added!'); }}><Plus className="w-4 h-4 mr-2" />Add</Button>
              </div>
            </CardContent>
          </Card>
          <Dialog open={!!editTestimonial} onOpenChange={() => setEditTestimonial(null)}>
            <DialogContent><DialogHeader><DialogTitle>Edit Testimonial</DialogTitle></DialogHeader>
              {editTestimonial && <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1"><Label>Name</Label><Input value={editTestimonial.name} onChange={(e) => setEditTestimonial({ ...editTestimonial, name: e.target.value })} /></div>
                  <div className="space-y-1"><Label>Company</Label><Input value={editTestimonial.company} onChange={(e) => setEditTestimonial({ ...editTestimonial, company: e.target.value })} /></div>
                  <div className="space-y-1"><Label>Role</Label><Input value={editTestimonial.role} onChange={(e) => setEditTestimonial({ ...editTestimonial, role: e.target.value })} /></div>
                  <div className="space-y-1"><Label>Rating</Label><Input type="number" min={1} max={5} value={editTestimonial.rating} onChange={(e) => setEditTestimonial({ ...editTestimonial, rating: +e.target.value })} /></div>
                </div>
                <div className="space-y-1"><Label>Content</Label><Textarea value={editTestimonial.content} onChange={(e) => setEditTestimonial({ ...editTestimonial, content: e.target.value })} rows={3} /></div>
                <Button className="w-full bg-primary text-white" onClick={() => { updateTestimonial(editTestimonial.id, editTestimonial); setEditTestimonial(null); toast.success('Saved!'); }}>Save</Button>
              </div>}
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* ── CLIENT LOGOS ── */}
        <TabsContent value="clients">
          <Card>
            <CardHeader><CardTitle>Client Logos (Ticker)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {clientLogos.map((c) => (
                  <div key={c.id} className="border rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: c.color }}>{c.initials}</div>
                    <div className="flex-1 min-w-0"><p className="font-semibold text-sm truncate">{c.name}</p></div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => setEditLogo({ ...c })}><Pencil className="w-3 h-3" /></Button>
                      <Button size="sm" variant="ghost" className="text-red-500" onClick={() => { deleteClientLogo(c.id); toast.success('Deleted'); }}><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold mb-3">Add New Client</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1"><Label>Name</Label><Input value={newLogo.name} onChange={(e) => setNewLogo({ ...newLogo, name: e.target.value })} /></div>
                  <div className="space-y-1"><Label>Initials</Label><Input value={newLogo.initials} onChange={(e) => setNewLogo({ ...newLogo, initials: e.target.value })} maxLength={3} /></div>
                  <div className="space-y-1"><Label>Color</Label><input type="color" value={newLogo.color} onChange={(e) => setNewLogo({ ...newLogo, color: e.target.value })} className="w-full h-10 rounded border cursor-pointer" /></div>
                </div>
                <Button className="mt-3 bg-primary hover:bg-primary/90 text-white" onClick={() => { if (!newLogo.name) return; addClientLogo(newLogo); setNewLogo({ name: '', initials: '', color: '#101C37' }); toast.success('Added!'); }}><Plus className="w-4 h-4 mr-2" />Add Client</Button>
              </div>
            </CardContent>
          </Card>
          <Dialog open={!!editLogo} onOpenChange={() => setEditLogo(null)}>
            <DialogContent><DialogHeader><DialogTitle>Edit Client Logo</DialogTitle></DialogHeader>
              {editLogo && <div className="space-y-3">
                <div className="space-y-1"><Label>Name</Label><Input value={editLogo.name} onChange={(e) => setEditLogo({ ...editLogo, name: e.target.value })} /></div>
                <div className="space-y-1"><Label>Initials</Label><Input value={editLogo.initials} onChange={(e) => setEditLogo({ ...editLogo, initials: e.target.value })} maxLength={3} /></div>
                <div className="space-y-1"><Label>Color</Label><input type="color" value={editLogo.color} onChange={(e) => setEditLogo({ ...editLogo, color: e.target.value })} className="w-full h-10 rounded border cursor-pointer" /></div>
                <Button className="w-full bg-primary text-white" onClick={() => { updateClientLogo(editLogo.id, editLogo); setEditLogo(null); toast.success('Saved!'); }}>Save</Button>
              </div>}
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}
