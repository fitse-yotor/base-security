import { Link } from 'react-router';
import { Shield, CheckCircle, Clock, Award } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export default function PrivateSecurityPage() {
  const features = [
    'Executive and VIP protection',
    'Threat assessment and risk analysis',
    'Secure transportation services',
    'Event security management',
    'Personal security details',
    'Residential security',
  ];

  const pricingTiers = [
    {
      name: 'Basic Protection',
      description: 'Single guard detail for standard events',
      price: 'From ETB 4,500/hour',
      features: ['1 Security Professional', 'Standard threat assessment', 'Event duration coverage'],
    },
    {
      name: 'Executive Detail',
      description: 'Comprehensive protection for executives',
      price: 'From ETB 9,000/hour',
      features: [
        '2-3 Security Professionals',
        'Advanced threat assessment',
        'Secure transportation',
        '24/7 availability',
      ],
    },
    {
      name: 'VIP Premium',
      description: 'Elite protection for high-profile clients',
      price: 'Custom Quote',
      features: [
        'Full security team',
        'Intelligence gathering',
        'Advance planning',
        'Crisis management',
        'Complete discretion',
      ],
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Consultation',
      description: 'We assess your security needs and risks',
    },
    {
      step: 2,
      title: 'Planning',
      description: 'Custom security plan developed for you',
    },
    {
      step: 3,
      title: 'Team Assignment',
      description: 'Highly trained professionals assigned',
    },
    {
      step: 4,
      title: 'Execution',
      description: 'Professional protection delivered',
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-8 h-8 text-primary" />
                <span className="text-primary uppercase tracking-wider text-sm">Premium Service</span>
              </div>
              <h1 className="text-4xl md:text-5xl mb-6">Private Security & VIP Protection</h1>
              <p className="text-xl text-gray-200 mb-8">
                Elite protection services for executives, high-profile individuals, and special events. Discretion, professionalism, and safety are our priorities.
              </p>
              <Link to="/request-service">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Request Protection Service
                </Button>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1687400104522-c9f94fa7540a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWSVAlMjBleGVjdXRpdmUlMjBwcm90ZWN0aW9ufGVufDF8fHx8MTc3Njc1MjczMHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="VIP Protection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Our VIP Security Services</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive protection tailored to your specific needs
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

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Flexible Pricing Options</h2>
            <p className="text-lg text-muted-foreground">
              Choose the level of protection that fits your requirements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={index === 1 ? 'border-primary border-2 shadow-lg' : ''}>
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <p className="text-muted-foreground">{tier.description}</p>
                  <div className="text-3xl text-primary mt-4">{tier.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, fIndex) => (
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

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Our Service Process</h2>
            <p className="text-lg text-muted-foreground">
              From initial consultation to ongoing protection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <Award className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl mb-6">Need Elite Protection?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contact us today for a confidential consultation and custom security assessment.
          </p>
          <Link to="/request-service">
            <Button size="lg" variant="secondary" className="bg-white text-secondary hover:bg-gray-100">
              Request VIP Protection
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
