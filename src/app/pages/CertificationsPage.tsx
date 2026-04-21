/**
 * Feature 5: Certifications & Licenses Page
 */
import { Shield, Award, CheckCircle, FileText, Star, Building2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';

const certifications = [
  {
    icon: Shield,
    title: 'Ethiopian Security Services License',
    issuer: 'Federal Police Commission of Ethiopia',
    year: '2015',
    status: 'Active',
    description: 'Fully licensed to provide professional security services across Ethiopia, including armed and unarmed guard deployment.',
    color: '#101C37',
  },
  {
    icon: Building2,
    title: 'Business Registration Certificate',
    issuer: 'Addis Abeba City Administration',
    year: '2014',
    status: 'Active',
    description: 'Officially registered as BASE SECURITY, CLEANING & TRADING PLC under Ethiopian commercial law.',
    color: '#1a6b3c',
  },
  {
    icon: Award,
    title: 'ISO 9001:2015 Quality Management',
    issuer: 'International Organization for Standardization',
    year: '2020',
    status: 'Active',
    description: 'Certified quality management system ensuring consistent, high-quality service delivery across all operations.',
    color: '#BCA479',
  },
  {
    icon: FileText,
    title: 'Cleaning Services Operating License',
    issuer: 'Ministry of Trade and Industry, Ethiopia',
    year: '2016',
    status: 'Active',
    description: 'Licensed to provide professional housekeeping and facility cleaning services to commercial and residential clients.',
    color: '#7c3aed',
  },
  {
    icon: GraduationCapIcon,
    title: 'Security Training Accreditation',
    issuer: 'Ethiopian Technical and Vocational Training Authority',
    year: '2018',
    status: 'Active',
    description: 'Accredited to deliver nationally recognised security guard training and certification programs.',
    color: '#0369a1',
  },
  {
    icon: Star,
    title: 'Tax Identification Certificate',
    issuer: 'Ethiopian Revenue and Customs Authority',
    year: '2014',
    status: 'Active',
    description: 'Registered taxpayer in good standing with the Ethiopian Revenue and Customs Authority.',
    color: '#b45309',
  },
];

function GraduationCapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

const achievements = [
  { value: '10+', label: 'Years in Operation' },
  { value: '200+', label: 'Satisfied Clients' },
  { value: '500+', label: 'Trained Professionals' },
  { value: '6', label: 'Active Certifications' },
];

export default function CertificationsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Award className="w-14 h-14 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Certifications & Licenses</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            BASE SECURITY operates with full legal compliance and internationally recognised quality standards.
          </p>
        </div>
      </section>

      {/* Achievement stats */}
      <section className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {achievements.map((a, i) => (
              <div key={i}>
                <div className="text-3xl font-bold">{a.value}</div>
                <div className="text-sm opacity-80 mt-1">{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-3">Our Credentials</h2>
            <p className="text-muted-foreground">Every certificate and license is maintained current and available for client verification upon request.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {certifications.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <Card key={i} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="h-2" style={{ backgroundColor: cert.color }} />
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl flex-shrink-0" style={{ backgroundColor: cert.color + '15' }}>
                        <Icon className="w-7 h-7" style={{ color: cert.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold text-secondary leading-tight">{cert.title}</h3>
                          <Badge className="text-xs flex-shrink-0 bg-green-100 text-green-700 border-green-200">
                            {cert.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-primary font-semibold mb-1">{cert.issuer}</p>
                        <p className="text-xs text-muted-foreground mb-3">Since {cert.year}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-secondary text-white rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Commitment to Compliance</h2>
                <p className="text-gray-300 mb-6">
                  BASE SECURITY maintains full compliance with all Ethiopian federal and Addis Abeba city regulations governing security services, cleaning operations, and vocational training. All licenses are renewed annually and available for client inspection.
                </p>
                <ul className="space-y-2">
                  {['All guards carry valid ID and license cards', 'Background checks on every employee', 'Regular compliance audits', 'Client confidentiality guaranteed'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                <Shield className="w-24 h-24 mx-auto text-primary mb-4 opacity-80" />
                <p className="text-gray-300 text-sm">To verify our credentials or request copies of our certificates, contact us directly.</p>
                <Link to="/contact" className="mt-4 inline-block">
                  <Button className="bg-primary hover:bg-primary/90 text-white mt-4">
                    Request Verification
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
