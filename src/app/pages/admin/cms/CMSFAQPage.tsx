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
import { Plus, Pencil, Trash2, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import type { FAQItem } from '../../../lib/cms-store';

const CATS = ['General', 'Security', 'Cleaning', 'Pricing & Contracts', 'Training'];

export default function CMSFAQPage() {
  const { faqItems, addFAQItem, updateFAQItem, deleteFAQItem } = useCMSStore();
  const [editItem, setEditItem] = useState<FAQItem | null>(null);
  const [newItem, setNewItem] = useState({ category: 'General', question: '', answer: '', visible: true });
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? faqItems : faqItems.filter((f) => f.category === filter);
  const grouped = CATS.reduce((acc, cat) => { acc[cat] = filtered.filter((f) => f.category === cat); return acc; }, {} as Record<string, FAQItem[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-primary" />
          <div><h1 className="text-3xl font-bold">FAQ CMS</h1><p className="text-muted-foreground">Manage frequently asked questions</p></div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', ...CATS].map((c) => (
            <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${filter === c ? 'bg-primary text-white' : 'bg-white border hover:bg-gray-50'}`}>{c}</button>
          ))}
        </div>
      </div>

      {CATS.map((cat) => {
        const items = grouped[cat] || [];
        if (filter !== 'All' && filter !== cat) return null;
        return (
          <Card key={cat}>
            <CardHeader><CardTitle className="flex items-center gap-2">{cat} <Badge variant="outline">{items.length}</Badge></CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {items.length === 0 && <p className="text-muted-foreground text-sm">No questions in this category.</p>}
              {items.map((f) => (
                <div key={f.id} className={`border rounded-xl p-4 ${!f.visible ? 'opacity-50' : ''}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-semibold">{f.question}</p>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{f.answer}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Switch checked={f.visible} onCheckedChange={(v) => { updateFAQItem(f.id, { visible: v }); toast.success(v ? 'Visible' : 'Hidden'); }} />
                      <Button size="sm" variant="ghost" onClick={() => setEditItem({ ...f })}><Pencil className="w-4 h-4" /></Button>
                      <Button size="sm" variant="ghost" className="text-red-500" onClick={() => { deleteFAQItem(f.id); toast.success('Deleted'); }}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}

      <Card>
        <CardHeader><CardTitle>Add New FAQ</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1"><Label>Category</Label>
              <select className="w-full border rounded-md px-3 py-2 text-sm" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}>
                {CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1"><Label>Question *</Label><Input value={newItem.question} onChange={(e) => setNewItem({ ...newItem, question: e.target.value })} /></div>
          </div>
          <div className="space-y-1"><Label>Answer *</Label><Textarea value={newItem.answer} onChange={(e) => setNewItem({ ...newItem, answer: e.target.value })} rows={3} /></div>
          <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => { if (!newItem.question || !newItem.answer) { toast.error('Question and answer required'); return; } addFAQItem(newItem); setNewItem({ category: 'General', question: '', answer: '', visible: true }); toast.success('FAQ added!'); }}><Plus className="w-4 h-4 mr-2" />Add FAQ</Button>
        </CardContent>
      </Card>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent className="max-w-lg"><DialogHeader><DialogTitle>Edit FAQ</DialogTitle></DialogHeader>
          {editItem && <div className="space-y-3">
            <div className="space-y-1"><Label>Category</Label>
              <select className="w-full border rounded-md px-3 py-2 text-sm" value={editItem.category} onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}>
                {CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1"><Label>Question</Label><Input value={editItem.question} onChange={(e) => setEditItem({ ...editItem, question: e.target.value })} /></div>
            <div className="space-y-1"><Label>Answer</Label><Textarea value={editItem.answer} onChange={(e) => setEditItem({ ...editItem, answer: e.target.value })} rows={4} /></div>
            <div className="flex items-center gap-2"><Switch checked={editItem.visible} onCheckedChange={(v) => setEditItem({ ...editItem, visible: v })} /><Label>Visible on website</Label></div>
            <Button className="w-full bg-primary text-white" onClick={() => { updateFAQItem(editItem.id, editItem); setEditItem(null); toast.success('Saved!'); }}>Save</Button>
          </div>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
