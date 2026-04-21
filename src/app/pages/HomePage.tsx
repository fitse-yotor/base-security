import { Link } from 'react-router';
import { Shield, Sparkles, CheckCircle, Star, ArrowRight, Building2, GraduationCap, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { BaseLogo } from '../components/BaseLogo';
import { useEffect, useRef, useState } from 'react';

/* ─── Scroll-reveal hook ─────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Animated counter ───────────────────────────────────────────── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Fade-in wrapper ────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Infinite marquee ticker ────────────────────────────────────── */
function ClientTicker({ clients }: { clients: { name: string; initials: string; color: string }[] }) {
  const doubled = [...clients, ...clients];
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-8 w-max"
        style={{ animation: 'ticker 28s linear infinite' }}
      >
        {doubled.map((c, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-md border border-gray-100 flex-shrink-0 hover:shadow-lg transition-shadow"
          >
            {/* Logo placeholder — coloured circle with initials */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ backgroundColor: c.color }}
            >
              {c.initials}
            </div>
            <span className="font-semibold text-secondary text-sm whitespace-nowrap">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const services = [
    {
      title: 'Private Security (VIP)',
      description: 'Elite protection for high-profile individuals, executives, and special events',
      icon: Shield,
      link: '/services/private-security',
      image: 'https://images.unsplash.com/photo-1687400104522-c9f94fa7540a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWSVAlMjBleGVjdXRpdmUlMjBwcm90ZWN0aW9ufGVufDF8fHx8MTc3Njc1MjczMHww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Security',
    },
    {
      title: 'Office & Building Security',
      description: 'Complete security solutions for corporate offices and commercial properties',
      icon: Building2,
      link: '/services/office-building',
      image: 'https://images.unsplash.com/photo-1681569685377-dd0dba4b0414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZyUyMHNlY3VyaXR5fGVufDF8fHx8MTc3Njc1MjczMHww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Security',
    },
    {
      title: 'Housekeeping & Cleaning',
      description: 'Professional cleaning and facility maintenance for offices, hotels, and commercial spaces',
      icon: Sparkles,
      link: '/services/housekeeping',
      image: 'https://images.unsplash.com/photo-1775178120132-f0ff7fd5cb40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjbGVhbmluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzc2Njc0MzcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Cleaning',
    },
    {
      title: 'Guard Training Programs',
      description: 'Comprehensive training to develop certified, professional security personnel',
      icon: GraduationCap,
      link: '/services/guard-training',
      image: 'https://images.unsplash.com/photo-1761064392859-2bfa734e9f3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZWN1cml0eSUyMGd1YXJkJTIwdW5pZm9ybXxlbnwxfHx8fDE3NzY3NTI3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Training',
    },
  ];

  const cleaningFeatures = [
    'Office & corporate cleaning',
    'Hotel & hospitality housekeeping',
    'Post-construction cleaning',
    'Floor care & polishing',
    'Restroom deep sanitization',
    'Waste management',
  ];

  const securityFeatures = [
    'VIP & executive protection',
    'Office & building security',
    'Event security management',
    'Access control systems',
    'CCTV monitoring',
    '24/7 guard deployment',
  ];

  const testimonials = [
    {
      name: 'Ato Dawit Bekele',
      company: 'Ethio Telecom',
      role: 'Security Manager',
      content: 'BASE SECURITY has been protecting our headquarters for over a year. Their professionalism and reliability are unmatched in Addis Abeba.',
      rating: 5,
    },
    {
      name: 'W/ro Meron Tadesse',
      company: 'Hilton Addis Abeba',
      role: 'Operations Director',
      content: 'Their housekeeping and cleaning team keeps our hotel spotless. Punctual, thorough, and always professional.',
      rating: 5,
    },
    {
      name: 'Ato Abebe Girma',
      company: 'Commercial Bank of Ethiopia',
      role: 'Facilities Director',
      content: 'Both the cleaning and security services transformed our workplace. We rely on BASE for everything facility-related.',
      rating: 5,
    },
  ];

  const clients = [
    { name: 'Ethio Telecom', initials: 'ET', color: '#0066cc' },
    { name: 'Hilton Addis Abeba', initials: 'HA', color: '#003087' },
    { name: 'Commercial Bank of Ethiopia', initials: 'CB', color: '#006633' },
    { name: 'Ethiopian Airlines', initials: 'EA', color: '#009900' },
    { name: 'Sheraton Addis', initials: 'SA', color: '#8B0000' },
    { name: 'Awash Bank', initials: 'AB', color: '#FF6600' },
    { name: 'Dashen Bank', initials: 'DB', color: '#003366' },
    { name: 'Bole International Hotel', initials: 'BI', color: '#6B3A2A' },
    { name: 'Addis Abeba University', initials: 'AU', color: '#4B0082' },
    { name: 'Safaricom Ethiopia', initials: 'SE', color: '#4CAF50' },
  ];

  const stats = [
    { value: 500, suffix: '+', label: 'Trained Professionals' },
    { value: 200, suffix: '+', label: 'Satisfied Clients' },
    { value: 10, suffix: '+', label: 'Years Experience' },
    { value: 24, suffix: '/7', label: 'Service Availability' },
  ];

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary to-secondary/90 text-white py-24 md:py-32 overflow-hidden">
        {/* background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1761064392859-2bfa734e9f3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZWN1cml0eSUyMGd1YXJkJTIwdW5pZm9ybXxlbnwxfHx8fDE3NzY3NTI3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080')" }}
        />
        {/* decorative glow blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl" style={{ backgroundColor: '#BCA479' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5 blur-3xl" style={{ backgroundColor: '#F5C842' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div
              className="max-w-xl"
              style={{ animation: 'heroSlideIn 0.8s ease both' }}
            >
              <Badge className="mb-6 text-sm px-4 py-1" style={{ backgroundColor: '#BCA479', color: '#101C37' }}>
                ቤዝ ለላቀ የደህንነት አገልግሎት
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                BASE SECURITY,<br />
                <span style={{ color: '#F5C842' }}>CLEANING</span> &<br />
                TRADING PLC
              </h1>
              <p className="text-lg text-gray-200 mb-8">
                Your trusted partner for professional <strong>security services</strong> and <strong>cleaning solutions</strong> in Addis Abeba. On-demand, reliable, and certified.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/request-service">
                  <Button size="lg" className="w-full sm:w-auto font-semibold text-secondary hover:scale-105 transition-transform" style={{ backgroundColor: '#F5C842' }}>
                    Request a Service
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" className="w-full sm:w-auto font-semibold bg-white text-secondary hover:bg-gray-100 hover:scale-105 transition-transform">
                    <Phone className="mr-2 w-4 h-4" />
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>

            {/* Logo */}
            <div className="hidden md:flex items-center justify-center" style={{ animation: 'heroLogoIn 1s ease both 0.3s' }}>
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-3xl opacity-25" style={{ backgroundColor: '#BCA479' }} />
                <div style={{ animation: 'floatLogo 4s ease-in-out infinite' }}>
                  <BaseLogo className="w-72 h-72 relative z-10 drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Animated Stats Bar ───────────────────────────────────────── */}
      <section className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="text-4xl font-bold">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm opacity-80 mt-1">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Badges ─────────────────────────────────────────────── */}
      <section className="bg-white py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Licensed & Insured', 'Background Checked Staff', '24/7 Support Available', 'Certified Professionals'].map((cert, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="flex items-center justify-center gap-2 text-center">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{cert}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dual Focus: Security + Cleaning ──────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Two Core Services, One Trusted Company</h2>
              <p className="text-lg text-muted-foreground">
                BASE delivers both professional security and cleaning services — manage your entire facility with one reliable partner.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FadeIn delay={0}>
              <Card className="overflow-hidden border-2 hover:border-primary hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="bg-secondary text-white p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary p-2 rounded-lg">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Security Services</h3>
                  </div>
                  <p className="text-gray-300 text-sm">Professional guards, VIP protection, and building security — deployed on demand across Addis Abeba.</p>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-2 mb-6">
                    {securityFeatures.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/services/private-security">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Explore Security Services <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={150}>
              <Card className="overflow-hidden border-2 hover:border-primary hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="p-6 text-white" style={{ background: 'linear-gradient(135deg, #BCA479, #8a6d3b)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Cleaning Services</h3>
                  </div>
                  <p className="text-white/80 text-sm">Thorough, professional housekeeping and facility cleaning for offices, hotels, and commercial buildings.</p>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-2 mb-6">
                    {cleaningFeatures.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/services/housekeeping">
                    <Button className="w-full text-white hover:opacity-90" style={{ backgroundColor: '#BCA479' }}>
                      Explore Cleaning Services <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── All Services Grid ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">All Our Services</h2>
              <p className="text-lg text-muted-foreground">Comprehensive security and cleaning solutions tailored to your needs</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <FadeIn key={index} delay={index * 100}>
                  <Card className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <Badge
                          className="text-xs font-semibold"
                          style={
                            service.category === 'Cleaning'
                              ? { backgroundColor: '#BCA479', color: '#fff' }
                              : service.category === 'Training'
                              ? { backgroundColor: '#4a90d9', color: '#fff' }
                              : { backgroundColor: '#101C37', color: '#F5C842' }
                          }
                        >
                          {service.category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-primary p-2 rounded-lg shadow-lg">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                      <Link to={service.link}>
                        <Button variant="link" className="p-0 text-primary font-semibold group-hover:gap-2 transition-all">
                          Learn More <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-lg text-muted-foreground">Trusted by businesses and organizations across Addis Abeba</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={index} delay={index * 120}>
                <Card className="bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic text-sm">"{testimonial.content}"</p>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-primary font-medium">{testimonial.company}</div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <div style={{ animation: 'floatLogo 4s ease-in-out infinite' }} className="inline-block mb-6">
              <BaseLogo className="w-20 h-20 mx-auto" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
              Whether you need security guards, cleaning staff, or both — BASE delivers professional on-demand services across Addis Abeba.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/request-service">
                <Button size="lg" className="w-full sm:w-auto font-semibold text-secondary hover:scale-105 transition-transform" style={{ backgroundColor: '#F5C842' }}>
                  Request a Service
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto font-semibold bg-white text-secondary hover:bg-gray-100 hover:scale-105 transition-transform">
                  <Phone className="mr-2 w-4 h-4" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Clients Ticker ───────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 mb-10">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Trusted By Leading Organizations</h2>
              <p className="text-muted-foreground">Companies across Addis Abeba rely on BASE every day</p>
            </div>
          </FadeIn>
        </div>

        {/* Row 1 — left to right */}
        <div className="mb-4">
          <ClientTicker clients={clients} />
        </div>

        {/* Row 2 — right to left */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-8 w-max"
            style={{ animation: 'tickerReverse 22s linear infinite' }}
          >
            {[...clients].reverse().concat([...clients].reverse()).map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-md border border-gray-100 flex-shrink-0 hover:shadow-lg transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: c.color }}
                >
                  {c.initials}
                </div>
                <span className="font-semibold text-secondary text-sm whitespace-nowrap">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
