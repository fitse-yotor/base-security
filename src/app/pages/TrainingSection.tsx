import { GraduationCap, Clock, Users, Award, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';
import { useCMSStore } from '../lib/cms-store';

export default function TrainingSection() {
  const { trainingCourses } = useCMSStore();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', program: '', experience: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Application submitted successfully! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', program: '', experience: '' });
  };

  return (
    <div>
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-5xl mb-6">Security Training Programs</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">Become a certified security professional through our comprehensive training programs.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16"><h2 className="text-3xl md:text-4xl mb-4">Available Courses</h2></div>
          <div className="grid gap-8 max-w-5xl mx-auto">
            {trainingCourses.map((program) => (
              <Card key={program.id} className="overflow-hidden">
                <div className="grid md:grid-cols-3 gap-6 p-6">
                  <div className="md:col-span-2">
                    <CardHeader className="p-0">
                      <CardTitle className="text-2xl mb-2">{program.name}</CardTitle>
                      <p className="text-muted-foreground">{program.description}</p>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /><span>Duration: {program.duration}</span></div>
                        <div className="flex items-center gap-2"><Award className="w-5 h-5 text-primary" /><span>Next Start: {program.nextStart}</span></div>
                        <div className="flex items-center gap-2"><Users className="w-5 h-5 text-primary" /><span className="text-2xl text-primary">{program.price}</span></div>
                      </div>
                    </CardContent>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Requirements:</h4>
                    <ul className="space-y-2">
                      {program.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /><span>{req}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl mb-4">Apply for Training</h2></div>
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label htmlFor="name">Full Name *</Label><Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
                    <div className="space-y-2"><Label htmlFor="email">Email *</Label><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label htmlFor="phone">Phone Number *</Label><Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required /></div>
                    <div className="space-y-2"><Label htmlFor="program">Training Program *</Label>
                      <Select value={formData.program} onValueChange={(value) => setFormData({ ...formData, program: value })}>
                        <SelectTrigger><SelectValue placeholder="Select a program" /></SelectTrigger>
                        <SelectContent>{trainingCourses.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2"><Label htmlFor="experience">Previous Experience</Label><Textarea id="experience" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} placeholder="Tell us about your background and experience in security (if any)" rows={4} /></div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Submit Application</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
