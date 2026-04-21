import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAppStore } from '../lib/store';

export default function RequestServicePage() {
  const navigate = useNavigate();
  const addServiceRequest = useAppStore((state) => state.addServiceRequest);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    location: '',
    numberOfGuards: '',
    duration: '',
    specialRequirements: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addServiceRequest({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      serviceType: formData.serviceType,
      location: formData.location,
      numberOfGuards: parseInt(formData.numberOfGuards) || 1,
      duration: formData.duration,
      specialRequirements: formData.specialRequirements,
      status: 'pending',
    });

    toast.success('Service request submitted successfully! Our team will contact you within 24 hours.');
    setFormData({
      name: '',
      phone: '',
      email: '',
      serviceType: '',
      location: '',
      numberOfGuards: '',
      duration: '',
      specialRequirements: '',
    });

    // Optionally navigate to home or show a confirmation
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div>
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-5xl mb-6">Request Security Service</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Fill out the form below and our team will contact you to discuss your security needs
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Service Request Form</CardTitle>
                <p className="text-muted-foreground">
                  Please provide as much detail as possible to help us serve you better
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john.doe@company.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Service Details</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Service Type *</Label>
                      <Select value={formData.serviceType} onValueChange={(value) => setFormData({ ...formData, serviceType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Private Security (VIP)">Private Security (VIP Protection)</SelectItem>
                          <SelectItem value="Office & Building Security">Office & Building Security</SelectItem>
                          <SelectItem value="Guard Training Programs">Guard Training Programs</SelectItem>
                          <SelectItem value="Housekeeping Services">Housekeeping Services</SelectItem>
                          <SelectItem value="Event Security">Event Security</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location/Address *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="123 Business St, City, State, ZIP"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="numberOfGuards">Number of Guards Required *</Label>
                        <Input
                          id="numberOfGuards"
                          type="number"
                          min="1"
                          value={formData.numberOfGuards}
                          onChange={(e) => setFormData({ ...formData, numberOfGuards: e.target.value })}
                          placeholder="e.g., 3"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration *</Label>
                        <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1 day">1 Day</SelectItem>
                            <SelectItem value="1 week">1 Week</SelectItem>
                            <SelectItem value="2 weeks">2 Weeks</SelectItem>
                            <SelectItem value="1 month">1 Month</SelectItem>
                            <SelectItem value="3 months">3 Months</SelectItem>
                            <SelectItem value="6 months">6 Months</SelectItem>
                            <SelectItem value="1 year">1 Year</SelectItem>
                            <SelectItem value="Ongoing">Ongoing Contract</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialRequirements">Special Requirements</Label>
                      <Textarea
                        id="specialRequirements"
                        value={formData.specialRequirements}
                        onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                        placeholder="Any specific requirements, certifications needed, special skills, or additional information we should know..."
                        rows={5}
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>Note:</strong> This is not a final contract. Our team will review your request and contact you within 24 hours to discuss details, pricing, and availability.
                    </p>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                    Submit Request
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">Need immediate assistance?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+15551234567">
                  <Button variant="outline" className="border-primary text-primary">
                    Call Us: +1 (555) 123-4567
                  </Button>
                </a>
                <a href="mailto:info@securepro.com">
                  <Button variant="outline" className="border-primary text-primary">
                    Email: info@securepro.com
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
