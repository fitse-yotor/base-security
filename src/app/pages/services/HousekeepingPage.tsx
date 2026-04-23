import { Link } from 'react-router';
import { Sparkles, CheckCircle, Award } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useCMSStore } from '../../lib/cms-store';

export default function HousekeepingPage() {
  const { housekeepingPage: p } = useCMSStore();
  return (
    <div>
      <section className="relative bg-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4"><Sparkles className="w-8 h-8 text-primary" /><span className="text-primary uppercase tracking-wider text-sm">Facility Services</span></div>
              <h1 className="text-4xl md:text-5xl mb-6">{p.heroTitle}</h1>
              <p className="text-xl text-gray-200 mb-8">{p.heroSubtitle}</p>
              <Link to="/request-service"><Button size="lg" className="bg-primary hover:bg-primary/90">Request Cleaning Service</Button></Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <ImageWithFallback src={p.heroImage} alt={p.heroTitle} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12"><h2 className="text-3xl md:text-4xl mb-4">Our Services</h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {p.features.map((f, i) => <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg"><CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" /><span className="text-lg">{f}</span></div>)}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12"><h2 className="text-3xl md:text-4xl mb-4">Service Packages</h2></div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {p.pricingTiers.map((pkg) => (
              <Card key={pkg.id} className={pkg.highlighted ? 'border-primary border-2 shadow-lg' : ''}>
                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <p className="text-muted-foreground">{pkg.description}</p>
                  <div className="text-3xl text-primary mt-4">{pkg.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">{pkg.features.map((f, i) => <li key={i} className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span>{f}</span></li>)}</ul>
                  <Link to="/request-service"><Button className="w-full mt-6 bg-primary hover:bg-primary/90">Get Started</Button></Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <Award className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl mb-6">Experience Professional Cleaning</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">Contact us for a free consultation and customized cleaning plan.</p>
          <Link to="/request-service"><Button size="lg" variant="secondary" className="bg-white text-secondary hover:bg-gray-100">Request Free Quote</Button></Link>
        </div>
      </section>
    </div>
  );
}
