import { GraduationCap, Clock, Users, Award, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';

export default function TrainingSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    experience: '',
  });

  const programs = [
    {
      name: 'Basic Security Guard Training',
      duration: '2 Weeks',
      price: 'ETB 18,000',
      requirements: ['High school diploma or equivalent', 'Clean background check', '18 years or older'],
      nextStart: 'May 1, 2026',
      description: 'Foundational training covering security principles, observation, reporting, and emergency response.',
    },
    {
      name: 'Advanced Security Professional',
      duration: '4 Weeks',
      price: 'ETB 35,000',
      requirements: ['Basic security training certificate', '6 months experience', 'Clean background check'],
      nextStart: 'May 15, 2026',
      description: 'Advanced training in threat assessment, conflict resolution, and leadership skills.',
    },
    {
      name: 'VIP Protection Specialist',
      duration: '6 Weeks',
      price: 'ETB 55,000',
      requirements: ['2+ years security experience', 'Advanced training certificate', 'Physical fitness test'],
      nextStart: 'June 1, 2026',
      description: 'Elite training in executive protection, tactical operations, and crisis management.',
    },
  ];

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
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Become a certified security professional through our comprehensive training programs. Industry-recognized certifications and hands-on experience.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">Available Courses</h2>
            <p className="text-lg text-muted-foreground">
              Choose the program that aligns with your career goals
            </p>
          </div>

          <div className="grid gap-8 max-w-5xl mx-auto">
            {programs.map((program, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid md:grid-cols-3 gap-6 p-6">
                  <div className="md:col-span-2">
                    <CardHeader className="p-0">
                      <CardTitle className="text-2xl mb-2">{program.name}</CardTitle>
                      <p className="text-muted-foreground">{program.description}</p>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-primary" />
                          <span>Duration: {program.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-primary" />
                          <span>Next Start: {program.nextStart}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary" />
                          <span className="text-2xl text-primary">{program.price}</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Requirements:</h4>
                    <ul className="space-y-2">
                      {program.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
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
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl mb-4">Apply for Training</h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll contact you with more details
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="program">Training Program *</Label>
                      <Select value={formData.program} onValueChange={(value) => setFormData({ ...formData, program: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic Security Guard Training</SelectItem>
                          <SelectItem value="advanced">Advanced Security Professional</SelectItem>
                          <SelectItem value="vip">VIP Protection Specialist</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Previous Experience</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="Tell us about your background and experience in security (if any)"
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
