import { useState } from 'react';
import { useCMSStore } from '../../../lib/cms-store';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Plus, Pencil, Trash2, Save, Info } from 'lucide-react';
import { toast } from 'sonner';
import type { TeamMember } from '../../../lib/cms-store';

export default function CMSAboutPage() {
  const { aboutContent, updateAboutContent, teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useCMSStore();
  const [story, setStory] = useState([...aboutContent.story]);
  const [mission, setMission] = useState(aboutContent.mission);
  const [vision, setVision] = useState(aboutContent.vision);
  const [editMember, setEditMember] = useState<TeamMember | null>(null);
  const [newMember, setNewMember] = useState({ name: '', role: '', bio: '' });

  const saveStory = () => { updateAboutContent({ story, mission, vision }); toast.success('About content saved!'); };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Info className="w-6 h-6 text-primary" />
        <div><h1 className="text-3xl font-bold">About Us CMS</h1><p className="text-muted-foreground">Manage About page content</p></div>
      </div>

      <Tabs defaultValue="story">
        <TabsList>
          <TabsTrigger value="story">Story & Mission</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
        </TabsList>

        <TabsContent value="story">
          <Card>
            <CardHeader><CardTitle>Company Story & Mission</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              {story.map((para, i) => (
                <div key={i} className="space-y-1">
                  <Label>Paragraph {i + 1}</Label>
                  <Textarea value={para} onChange={(e) => { const s = [...story]; s[i] = e.target.value; setStory(s); }} rows={3} />
                </div>
              ))}
              <Button variant="outline" onClick={() => setStory([...story, ''])}><Plus className="w-4 h-4 mr-2" />Add Paragraph</Button>
              <div className="space-y-1"><Label>Mission Statement</Label><Textarea value={mission} onChange={(e) => setMission(e.target.value)} rows={3} /></div>
              <div className="space-y-1"><Label>Vision Statement</Label><Textarea value={vision} onChange={(e) => setVision(e.target.value)} rows={3} /></div>
              <Button onClick={saveStory} className="bg-primary hover:bg-primary/90 text-white"><Save className="w-4 h-4 mr-2" />Save All</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader><CardTitle>Leadership Team</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {teamMembers.map((m) => (
                  <div key={m.id} className="border rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div><p className="font-bold">{m.name}</p><p className="text-sm text-primary">{m.role}</p></div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => setEditMember({ ...m })}><Pencil className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" className="text-red-500" onClick={() => { deleteTeamMember(m.id); toast.success('Deleted'); }}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{m.bio}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold mb-3">Add Team Member</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-1"><Label>Name</Label><Input value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} /></div>
                  <div className="space-y-1"><Label>Role</Label><Input value={newMember.role} onChange={(e) => setNewMember({ ...newMember, role: e.target.value })} /></div>
                  <div className="space-y-1 md:col-span-2"><Label>Bio</Label><Textarea value={newMember.bio} onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })} rows={2} /></div>
                </div>
                <Button className="mt-3 bg-primary hover:bg-primary/90 text-white" onClick={() => { if (!newMember.name) return; addTeamMember(newMember); setNewMember({ name: '', role: '', bio: '' }); toast.success('Added!'); }}><Plus className="w-4 h-4 mr-2" />Add Member</Button>
              </div>
            </CardContent>
          </Card>
          <Dialog open={!!editMember} onOpenChange={() => setEditMember(null)}>
            <DialogContent><DialogHeader><DialogTitle>Edit Team Member</DialogTitle></DialogHeader>
              {editMember && <div className="space-y-3">
                <div className="space-y-1"><Label>Name</Label><Input value={editMember.name} onChange={(e) => setEditMember({ ...editMember, name: e.target.value })} /></div>
                <div className="space-y-1"><Label>Role</Label><Input value={editMember.role} onChange={(e) => setEditMember({ ...editMember, role: e.target.value })} /></div>
                <div className="space-y-1"><Label>Bio</Label><Textarea value={editMember.bio} onChange={(e) => setEditMember({ ...editMember, bio: e.target.value })} rows={3} /></div>
                <Button className="w-full bg-primary text-white" onClick={() => { updateTeamMember(editMember.id, editMember); setEditMember(null); toast.success('Saved!'); }}>Save</Button>
              </div>}
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}
