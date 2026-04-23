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
import { Plus, Pencil, Trash2, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import type { JobPosting } from '../../../lib/cms-store';

const DEPTS = ['Security', 'Cleaning', 'Training'];
const DEPT_COLORS: Record<string, string> = { Security: '#101C37', Cleaning: '#BCA479', Training: '#16a34a' };

const emptyJob = (): Omit<JobPosting, 'id'> => ({ title: '', department: 'Security', type: 'Full-time', location: 'Addis Abeba', description: '', requirements: [], benefits: [], active: true });

export default function CMSCareersPage() {
  const { jobPostings, addJobPosting, updateJobPosting, deleteJobPosting } = useCMSStore();
  const [editJob, setEditJob] = useState<JobPosting | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newJob, setNewJob] = useState(emptyJob());
  const [newReq, setNewReq] = useState('');
  const [newBen, setNewBen] = useState('');
  const [editReq, setEditReq] = useState('');
  const [editBen, setEditBen] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Briefcase className="w-6 h-6 text-primary" />
          <div><h1 className="text-3xl font-bold">Careers CMS</h1><p className="text-muted-foreground">Manage job postings</p></div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => setShowAdd(true)}><Plus className="w-4 h-4 mr-2" />New Job</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {jobPostings.map((j) => (
          <Card key={j.id} className={!j.active ? 'opacity-60' : ''}>
            <div className="h-1.5" style={{ backgroundColor: DEPT_COLORS[j.department] || '#101C37' }} />
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-lg">{j.title}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge className="text-xs" style={{ backgroundColor: DEPT_COLORS[j.department], color: '#fff' }}>{j.department}</Badge>
                    <Badge variant="outline" className="text-xs">{j.type}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Switch checked={j.active} onCheckedChange={(v) => { updateJobPosting(j.id, { active: v }); toast.success(v ? 'Active' : 'Inactive'); }} />
                  <Button size="sm" variant="ghost" onClick={() => setEditJob({ ...j, requirements: [...j.requirements], benefits: [...j.benefits] })}><Pencil className="w-4 h-4" /></Button>
                  <Button size="sm" variant="ghost" className="text-red-500" onClick={() => { deleteJobPosting(j.id); toast.success('Deleted'); }}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{j.description}</p>
              <p className="text-xs text-muted-foreground mt-2">📍 {j.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Job Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>New Job Posting</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label>Title *</Label><Input value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} /></div>
              <div className="space-y-1"><Label>Department</Label>
                <select className="w-full border rounded-md px-3 py-2 text-sm" value={newJob.department} onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}>
                  {DEPTS.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-1"><Label>Type</Label><Input value={newJob.type} onChange={(e) => setNewJob({ ...newJob, type: e.target.value })} placeholder="Full-time" /></div>
              <div className="space-y-1"><Label>Location</Label><Input value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} /></div>
            </div>
            <div className="space-y-1"><Label>Description</Label><Textarea value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} rows={2} /></div>
            <div>
              <Label>Requirements</Label>
              <div className="flex gap-2 mt-1"><Input value={newReq} onChange={(e) => setNewReq(e.target.value)} placeholder="Add requirement..." /><Button variant="outline" onClick={() => { if (!newReq) return; setNewJob({ ...newJob, requirements: [...newJob.requirements, newReq] }); setNewReq(''); }}><Plus className="w-4 h-4" /></Button></div>
              <div className="flex flex-wrap gap-1 mt-2">{newJob.requirements.map((r, i) => <Badge key={i} variant="outline" className="text-xs cursor-pointer" onClick={() => setNewJob({ ...newJob, requirements: newJob.requirements.filter((_, j) => j !== i) })}>{r} ×</Badge>)}</div>
            </div>
            <div>
              <Label>Benefits</Label>
              <div className="flex gap-2 mt-1"><Input value={newBen} onChange={(e) => setNewBen(e.target.value)} placeholder="Add benefit..." /><Button variant="outline" onClick={() => { if (!newBen) return; setNewJob({ ...newJob, benefits: [...newJob.benefits, newBen] }); setNewBen(''); }}><Plus className="w-4 h-4" /></Button></div>
              <div className="flex flex-wrap gap-1 mt-2">{newJob.benefits.map((b, i) => <Badge key={i} className="bg-green-100 text-green-700 text-xs cursor-pointer" onClick={() => setNewJob({ ...newJob, benefits: newJob.benefits.filter((_, j) => j !== i) })}>{b} ×</Badge>)}</div>
            </div>
            <div className="flex items-center gap-2"><Switch checked={newJob.active} onCheckedChange={(v) => setNewJob({ ...newJob, active: v })} /><Label>Active (visible on website)</Label></div>
            <Button className="w-full bg-primary text-white" onClick={() => { if (!newJob.title) { toast.error('Title required'); return; } addJobPosting(newJob); setNewJob(emptyJob()); setNewReq(''); setNewBen(''); setShowAdd(false); toast.success('Job posted!'); }}>Create Job Posting</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog open={!!editJob} onOpenChange={() => setEditJob(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>Edit Job</DialogTitle></DialogHeader>
          {editJob && <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label>Title</Label><Input value={editJob.title} onChange={(e) => setEditJob({ ...editJob, title: e.target.value })} /></div>
              <div className="space-y-1"><Label>Department</Label>
                <select className="w-full border rounded-md px-3 py-2 text-sm" value={editJob.department} onChange={(e) => setEditJob({ ...editJob, department: e.target.value })}>
                  {DEPTS.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-1"><Label>Type</Label><Input value={editJob.type} onChange={(e) => setEditJob({ ...editJob, type: e.target.value })} /></div>
              <div className="space-y-1"><Label>Location</Label><Input value={editJob.location} onChange={(e) => setEditJob({ ...editJob, location: e.target.value })} /></div>
            </div>
            <div className="space-y-1"><Label>Description</Label><Textarea value={editJob.description} onChange={(e) => setEditJob({ ...editJob, description: e.target.value })} rows={2} /></div>
            <div className="space-y-1"><Label>Requirements (one per line)</Label><Textarea value={editJob.requirements.join('\n')} onChange={(e) => setEditJob({ ...editJob, requirements: e.target.value.split('\n').filter(Boolean) })} rows={4} /></div>
            <div className="space-y-1"><Label>Benefits (one per line)</Label><Textarea value={editJob.benefits.join('\n')} onChange={(e) => setEditJob({ ...editJob, benefits: e.target.value.split('\n').filter(Boolean) })} rows={4} /></div>
            <div className="flex items-center gap-2"><Switch checked={editJob.active} onCheckedChange={(v) => setEditJob({ ...editJob, active: v })} /><Label>Active</Label></div>
            <Button className="w-full bg-primary text-white" onClick={() => { updateJobPosting(editJob.id, editJob); setEditJob(null); toast.success('Saved!'); }}>Save Changes</Button>
          </div>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
