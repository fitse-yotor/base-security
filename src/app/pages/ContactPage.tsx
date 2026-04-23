import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';
import { useCMSStore } from '../lib/cms-store';

export default function ContactPage() {
  const { contactInfo } = useCMSStore();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will respond within 24 hours.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactCards = [
    { icon: MapPin, title: 'Address', details: contactInfo.address },
    { icon: Phone, title: 'Phone', details: contactInfo.phone },
    { icon: Mail, title: 'Email', details: contactInfo.email },
    { icon: Clock, title: 'Business Hours', details: contactInfo.hours },
  ];

  return (
    <div>
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-6">Contact Us</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">Get in touch with our team for inquiries, quotes, or support</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2"><Label htmlFor="name">Full Name *</Label><Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
                      <div className="space-y-2"><Label htmlFor="email">Email *</Label><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required /></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2"><Label htmlFor="phone">Phone Number</Label><Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /></div>
                      <div className="space-y-2"><Label htmlFor="subject">Subject *</Label><Input id="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required /></div>
                    </div>
                    <div className="space-y-2"><Label htmlFor="message">Message *</Label><Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="How can we help you?" rows={6} required /></div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              {contactCards.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg"><Icon className="w-6 h-6 text-primary" /></div>
                        <div>
                          <h3 className="font-semibold mb-2">{info.title}</h3>
                          {info.details.map((detail, i) => <p key={i} className="text-sm text-muted-foreground">{detail}</p>)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-0 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="h-[450px] bg-gray-200 rounded-lg overflow-hidden">
            <iframe src={contactInfo.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="BASE SECURITY Location" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Need Immediate Assistance?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">Our 24/7 emergency response team is always ready to help</p>
          <Button size="lg" variant="secondary" className="bg-white text-secondary hover:bg-gray-100">
            Call Us: {contactInfo.phone[0]}
          </Button>
        </div>
      </section>
    </div>
  );
}
