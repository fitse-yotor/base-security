import { Link } from 'react-router';
import { GraduationCap, CheckCircle, Users, Award } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export default function GuardTrainingPage() {
  const features = [
    'Basic Security Guard Training',
    'Advanced Threat Assessment',
    'Emergency Response Protocols',
    'Customer Service Excellence',
    'Legal and Regulatory Compliance',
    'Physical Security Techniques',
  ];

  const programs = [
    {
      name: 'Basic Security Training',
      duration: '2 Weeks',
      price: 'ETB 18,000',
      features: [
        'Security fundamentals',
        'Observation and reporting',
        'Emergency procedures',
        'Certificate upon completion',
      ],
    },
    {
      name: 'Advanced Security Professional',
      duration: '4 Weeks',
      price: 'ETB 35,000',
      features: [
        'All basic training content',
        'Threat assessment',
        'Conflict resolution',
        'Leadership skills',
        'Advanced certification',
      ],
    },
    {
      name: 'VIP Protection Specialist',
      duration: '6 Weeks',
      price: 'ETB 55,000',
      features: [
        'Executive protection',
        'Tactical driving',
        'Intelligence gathering',
        'Crisis management',
        'Elite certification',
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
                <GraduationCap className="w-8 h-8 text-primary" />
                <span className="text-primary uppercase tracking-wider text-sm">Professional Development</span>
              </div>
              <h1 className="text-4xl md:text-5xl mb-6">Guard Training Programs</h1>
              <p className="text-xl text-gray-200 mb-8">
                Develop elite security professionals through our comprehensive, industry-leading training programs. Build skills, earn certifications, and advance your career.
              </p>
              <Link to="/training">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  View Training Programs
                </Button>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1761064392859-2bfa734e9f3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZWN1cml0eSUyMGd1YXJkJTIwdW5pZm9ybXxlbnwxfHx8fDE3NzY3NTI3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Security Training"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Training Curriculum</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive training covering all aspects of professional security
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
            <h2 className="text-3xl md:text-4xl mb-4">Training Programs</h2>
            <p className="text-lg text-muted-foreground">
              Choose the program that matches your career goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {programs.map((program, index) => (
              <Card key={index} className={index === 1 ? 'border-primary border-2 shadow-lg' : ''}>
                <CardHeader>
                  <CardTitle className="text-2xl">{program.name}</CardTitle>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-muted-foreground">{program.duration}</span>
                    <span className="text-2xl text-primary">{program.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {program.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/training">
                    <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                      Enroll Now
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
          <Award className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl mb-6">Start Your Security Career</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join our next training session and become a certified security professional.
          </p>
          <Link to="/training">
            <Button size="lg" variant="secondary" className="bg-white text-secondary hover:bg-gray-100">
              View Training Schedule
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
