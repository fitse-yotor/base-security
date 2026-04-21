import { Shield, Target, Eye, Award, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export default function AboutUs() {
  const stats = [
    { icon: Users, label: 'Security Professionals', value: '500+' },
    { icon: Shield, label: 'Years of Experience', value: '15+' },
    { icon: Award, label: 'Satisfied Clients', value: '1,200+' },
    { icon: Clock, label: 'Hours of Protection', value: '2M+' },
  ];

  const team = [
    {
      name: 'Ato Girma Bekele',
      role: 'CEO & Founder',
      bio: 'Visionary leader with extensive experience in security management and business development in Ethiopia.',
    },
    {
      name: 'W/ro Tigist Alemu',
      role: 'Chief Operations Officer',
      bio: 'Expert in security systems and facility management, ensuring operational excellence across all deployments.',
    },
    {
      name: 'Ato Yonas Tesfaye',
      role: 'Training Director',
      bio: 'Certified security trainer with 15+ years developing professional security personnel in Ethiopia.',
    },
    {
      name: 'W/rt Hiwot Mengistu',
      role: 'Client Relations Director',
      bio: 'Dedicated to building lasting client relationships and delivering customized security solutions.',
    },
  ];

  return (
    <div>
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-5xl mb-6">About BASE SECURITY, CLEANING & TRADING PLC</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            ቤዝ ለላቀ የደህንነት አገልግሎት — Base Excellence Security Service, Addis Abeba
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  BASE SECURITY, CLEANING & TRADING PLC was established with a clear mission: to provide world-class security and facility management services that businesses and individuals in Ethiopia can trust.
                </p>
                <p>
                  Operating from our offices at Megenagna City Square Mall, 10th Floor, Addis Abeba, we have grown into one of Ethiopia's most respected security and cleaning firms, serving clients across multiple sectors.
                </p>
                <p>
                  Our commitment to excellence — ቤዝ ለላቀ የደህንነት አገልግሎት — continuous training, and client satisfaction has made us the preferred choice for organizations seeking reliable, professional security and cleaning solutions.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <Icon className="w-10 h-10 text-primary mx-auto mb-3" />
                      <div className="text-3xl mb-2 text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <Card className="bg-white">
                <CardContent className="p-8">
                  <Target className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To provide exceptional security and facility services that protect our clients' assets, people, and operations while maintaining the highest standards of professionalism and integrity.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-8">
                  <Eye className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To be the most trusted and innovative security services provider, setting industry standards for excellence, training, and customer satisfaction.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">Leadership Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to your security and success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl mb-1">{member.name}</h3>
                  <p className="text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Why Choose BASE SECURITY?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
            <div>
              <Award className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-xl mb-3">Certified Excellence</h3>
              <p className="opacity-90">
                All team members undergo rigorous training and background checks
              </p>
            </div>
            <div>
              <Shield className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-xl mb-3">Proven Track Record</h3>
              <p className="opacity-90">
                15+ years of protecting businesses and individuals
              </p>
            </div>
            <div>
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-xl mb-3">24/7 Support</h3>
              <p className="opacity-90">
                Round-the-clock availability and rapid response
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
