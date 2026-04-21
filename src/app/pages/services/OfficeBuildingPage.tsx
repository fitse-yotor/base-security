import { Link } from 'react-router';
import { Building2, CheckCircle, Shield } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export default function OfficeBuildingPage() {
  const features = [
    'Access control management',
    'Perimeter security',
    'Visitor management systems',
    'CCTV monitoring',
    'Emergency response',
    'Security patrols',
  ];

  const packages = [
    {
      name: 'Small Office',
      description: 'For offices up to 10,000 sq ft',
      price: 'From ETB 45,000/month',
      features: ['1-2 Security guards', 'Basic access control', '12-hour coverage', 'Weekly reports'],
    },
    {
      name: 'Corporate Building',
      description: 'For buildings up to 50,000 sq ft',
      price: 'From ETB 120,000/month',
      features: [
        '3-5 Security guards',
        'Advanced access control',
        '24/7 coverage',
        'CCTV integration',
        'Daily reports',
      ],
    },
    {
      name: 'Enterprise Complex',
      description: 'For large facilities & campuses',
      price: 'Custom Quote',
      features: [
        'Full security team',
        'Comprehensive systems',
        '24/7 dedicated coverage',
        'Command center',
        'Real-time monitoring',
      ],
    },
  ];

  return (
    <div>
      <section className="relative bg-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-8 h-8 text-primary" />
                <span className="text-primary uppercase tracking-wider text-sm">Corporate Security</span>
              </div>
              <h1 className="text-4xl md:text-5xl mb-6">Office & Building Security</h1>
              <p className="text-xl text-gray-200 mb-8">
                Complete security solutions for corporate offices, commercial buildings, and business facilities. Protect your assets, employees, and operations.
              </p>
              <Link to="/request-service">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Request Security Assessment
                </Button>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1681569685377-dd0dba4b0414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZyUyMHNlY3VyaXR5fGVufDF8fHx8MTc3Njc1MjczMHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Office Security"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Security Services</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive protection for your business premises
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span className="text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Security Packages</h2>
            <p className="text-lg text-muted-foreground">
              Scalable solutions for businesses of all sizes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <Card key={index} className={index === 1 ? 'border-primary border-2 shadow-lg' : ''}>
                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <p className="text-muted-foreground">{pkg.description}</p>
                  <div className="text-3xl text-primary mt-4">{pkg.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/request-service">
                    <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl mb-6">Secure Your Business Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Get a free security assessment and custom proposal for your facility.
          </p>
          <Link to="/request-service">
            <Button size="lg" variant="secondary" className="bg-white text-secondary hover:bg-gray-100">
              Request Free Assessment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
