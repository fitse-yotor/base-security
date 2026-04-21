/**
 * Feature 10: Job Application / Careers Page
 */
import { useState } from 'react';
import { Briefcase, CheckCircle, Users, Shield, Sparkles, GraduationCap, ArrowRight, MapPin, Clock, X } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

const JOBS = [
  { id: 1, title: 'Security Guard', department: 'Security', type: 'Full-time', location: 'Addis Abeba (Multiple Sites)', icon: Shield, color: '#101C37', description: 'Join our professional security team and protect our clients\' premises across Addis Abeba.', requirements: ['18+ years old', 'High school diploma', 'Clean background check', 'Physical fitness', 'Basic security training (or willingness to train)'], benefits: ['Competitive ETB salary', 'Uniform provided', 'Free training & certification', 'Career advancement', 'Health coverage'] },
  { id: 2, title: 'VIP Protection Specialist', department: 'Security', type: 'Full-time', location: 'Addis Abeba', icon: Shield, color: '#BCA479', description: 'Provide elite protection services for high-profile executives and VIP clients.', requirements: ['3+ years security experience', 'Advanced security certification', 'Excellent physical condition', 'Driving license', 'Discretion and professionalism'], benefits: ['Premium ETB salary', 'Vehicle allowance', 'VIP training program', 'Performance bonuses', 'Health coverage'] },
  { id: 3, title: 'Cleaning Specialist', department: 'Cleaning', type: 'Full-time / Part-time', location: 'Addis Abeba (Multiple Sites)', icon: Sparkles, color: '#7c3aed', description: 'Deliver professional cleaning and housekeeping services to our corporate and hospitality clients.', requirements: ['Previous cleaning experience preferred', 'Attention to detail', 'Reliable and punctual', 'Good communication skills'], benefits: ['Competitive ETB salary', 'Cleaning supplies provided', 'Flexible shifts', 'Training provided', 'Career growth'] },
  { id: 4, title: 'Security Supervisor', department: 'Security', type: 'Full-time', location: 'Addis Abeba', icon: Users, color: '#0369a1', description: 'Lead and supervise a team of security guards across multiple client sites.', requirements: ['5+ years security experience', 'Leadership skills', 'Advanced certification', 'Report writing ability', 'Problem-solving skills'], benefits: ['Senior ETB salary', 'Management training', 'Company vehicle', 'Performance bonuses', 'Health coverage'] },
  { id: 5, title: 'Security Trainer', department: 'Training', type: 'Full-time', location: 'Addis Abeba', icon: GraduationCap, color: '#16a34a', description: 'Develop and deliver professional security training programs for new and existing guards.', requirements: ['5+ years security experience', 'Training/teaching experience', 'Certified trainer preferred', 'Excellent communication', 'Curriculum development skills'], benefits: ['Competitive ETB salary', 'Training materials provided', 'Professional development', 'Flexible schedule', 'Health coverage'] },
  { id: 6, title: 'Housekeeping Supervisor', department: 'Cleaning', type: 'Full-time', location: 'Addis Abeba', icon: Sparkles, color: '#b45309', description: 'Oversee cleaning operations and manage a team of cleaning specialists across client sites.', requirements: ['3+ years cleaning/housekeeping experience', 'Supervisory experience', 'Quality control skills', 'Inventory management'], benefits: ['Senior ETB salary', 'Management training', 'Performance bonuses', 'Career advancement', 'Health coverage'] },
];

const DEPT_COLORS: Record<string, string> = { Security: '#101C37', Cleaning: '#BCA479', Training: '#16a34a' };

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<typeof JOBS[0] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', position: '', experience: '', education: '', coverLetter: '', availability: '' });

  const filtered = filter === 'All' ? JOBS : JOBS.filter((j) => j.department === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.position) { toast.error('Please fill all required fields'); return; }
    toast.success('Application submitted! We will review it and contact you within 5 business days.');
    setForm({ fullName: '', email: '', phone: '', position: '', experience: '', education: '', coverLetter: '', availability: '' });
    setShowForm(false);
    setSelectedJob(null);
  };

  return (
    <div>
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Briefcase className="w-14 h-14 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join the BASE Team</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">Build a rewarding career in security, cleaning, or training with one of Addis Abeba's most trusted companies.</p>
          <Button className="bg-primary hover:bg-primary/90 text-white" size="lg" onClick={() => { setShowForm(true); setSelectedJob(null); }}>
            Apply Now <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {[{ icon: '💰', title: 'Competitive Pay', desc: 'ETB salaries above market rate' }, { icon: '📚', title: 'Free Training', desc: 'Certifications at no cost to you' }, { icon: '📈', title: 'Career Growth', desc: 'Clear promotion pathways' }, { icon: '🏥', title: 'Health Coverage', desc: 'Medical benefits for all staff' }].map((b, i) => (
              <div key={i} className="p-4">
                <div className="text-4xl mb-3">{b.icon}</div>
                <div className="font-bold text-secondary">{b.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Open Positions</h2>
            <p className="text-muted-foreground mb-6">We are actively hiring across all departments</p>
            <div className="flex gap-2 justify-center flex-wrap">
              {['All', 'Security', 'Cleaning', 'Training'].map((d) => (
                <button key={d} onClick={() => setFilter(d)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter === d ? 'bg-primary text-white shadow' : 'bg-white text-gray-600 hover:bg-primary/10 border border-gray-200'}`}>{d}</button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filtered.map((job) => {
              const Icon = job.icon;
              return (
                <Card key={job.id} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group" onClick={() => { setSelectedJob(job); setShowForm(false); }}>
                  <div className="h-1.5" style={{ backgroundColor: job.color }} />
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2.5 rounded-xl flex-shrink-0" style={{ backgroundColor: job.color + '15' }}>
                        <Icon className="w-6 h-6" style={{ color: job.color }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-secondary group-hover:text-primary transition-colors">{job.title}</h3>
                        <Badge className="text-xs mt-1" style={{ backgroundColor: DEPT_COLORS[job.department], color: '#fff' }}>{job.department}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                    </div>
                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedJob(job); setShowForm(true); setForm((f) => ({ ...f, position: job.title })); }}>
                      Apply for this Role
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job detail modal */}
      {selectedJob && !showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedJob(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b flex items-start justify-between" style={{ backgroundColor: selectedJob.color + '10' }}>
              <div className="flex items-center gap-3">
                <selectedJob.icon className="w-8 h-8" style={{ color: selectedJob.color }} />
                <div>
                  <h2 className="text-2xl font-bold text-secondary">{selectedJob.title}</h2>
                  <div className="flex gap-2 mt-1">
                    <Badge style={{ backgroundColor: DEPT_COLORS[selectedJob.department], color: '#fff' }}>{selectedJob.department}</Badge>
                    <Badge variant="outline">{selectedJob.type}</Badge>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedJob(null)} className="p-1 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-5">
              <p className="text-muted-foreground">{selectedJob.description}</p>
              <div>
                <h3 className="font-bold mb-2">Requirements</h3>
                <ul className="space-y-1">{selectedJob.requirements.map((r, i) => <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />{r}</li>)}</ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Benefits</h3>
                <ul className="space-y-1">{selectedJob.benefits.map((b, i) => <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />{b}</li>)}</ul>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-white" onClick={() => { setShowForm(true); setForm((f) => ({ ...f, position: selectedJob.title })); }}>Apply Now</Button>
                <Button variant="outline" onClick={() => setSelectedJob(null)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application form */}
      {showForm && (
        <section className="py-16 bg-white" id="apply-form">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">Submit Your Application</h2>
              <p className="text-muted-foreground mt-2">We review all applications within 5 business days</p>
            </div>
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name *</Label>
                      <Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Ato / W/ro Full Name" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number *</Label>
                      <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+251 91 123 4567" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address *</Label>
                    <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Position Applying For *</Label>
                    <Select value={form.position} onValueChange={(v) => setForm({ ...form, position: v })}>
                      <SelectTrigger><SelectValue placeholder="Select a position" /></SelectTrigger>
                      <SelectContent>
                        {JOBS.map((j) => <SelectItem key={j.id} value={j.title}>{j.title}</SelectItem>)}
                        <SelectItem value="General Application">General Application</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Years of Experience</Label>
                      <Select value={form.experience} onValueChange={(v) => setForm({ ...form, experience: v })}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {['No experience', '1 year', '2-3 years', '4-5 years', '5+ years'].map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Availability</Label>
                      <Select value={form.availability} onValueChange={(v) => setForm({ ...form, availability: v })}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {['Immediately', 'Within 1 week', 'Within 2 weeks', 'Within 1 month'].map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Education Level</Label>
                    <Select value={form.education} onValueChange={(v) => setForm({ ...form, education: v })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {['High School', 'TVET Certificate', 'Diploma', 'Degree', 'Masters or above'].map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Cover Letter / Why do you want to join BASE?</Label>
                    <Textarea value={form.coverLetter} onChange={(e) => setForm({ ...form, coverLetter: e.target.value })} placeholder="Tell us about yourself and why you want to work with BASE SECURITY..." rows={5} />
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-white">Submit Application</Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
