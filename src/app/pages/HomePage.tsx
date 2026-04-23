import { Link } from 'react-router';
import { CheckCircle, Star, ArrowRight, Phone, Shield, Sparkles, Building2, GraduationCap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { BaseLogo } from '../components/BaseLogo';
import { useEffect, useRef, useState } from 'react';
import { useCMSStore } from '../lib/cms-store';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0; const step = Math.ceil(target / 60);
    const timer = setInterval(() => { start += step; if (start >= target) { setCount(target); clearInterval(timer); } else setCount(start); }, 20);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>{children}</div>;
}

function ClientTicker({ clients }: { clients: { name: string; initials: string; color: string }[] }) {
  const doubled = [...clients, ...clients];
  return (
    <div className="overflow-hidden w-full">
      <div className="flex gap-8 w-max" style={{ animation: 'ticker 28s linear infinite' }}>
        {doubled.map((c, i) => (
          <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-md border border-gray-100 flex-shrink-0 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: c.color }}>{c.initials}</div>
            <span className="font-semibold text-secondary text-sm whitespace-nowrap">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const ICON_MAP: Record<string, React.ElementType> = { Security: Shield, Cleaning: Sparkles, Training: GraduationCap };

export default function HomePage() {
  const { heroContent, stats, testimonials, clientLogos, serviceCards } = useCMSStore();
  const visibleCards = serviceCards.filter((c) => c.visible);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary to-secondary/90 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url('${heroContent.bgImage}')` }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl" style={{ backgroundColor: '#BCA479' }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl" style={{ animation: 'heroSlideIn 0.8s ease both' }}>
              <Badge className="mb-6 text-sm px-4 py-1" style={{ backgroundColor: '#BCA479', color: '#101C37' }}>{heroContent.badge}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {heroContent.title}<br />
                <span style={{ color: '#F5C842' }}>{heroContent.highlightWord}</span> &<br />TRADING PLC
              </h1>
              <p className="text-lg text-gray-200 mb-8">{heroContent.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/request-service">
                  <Button size="lg" className="w-full sm:w-auto font-semibold text-secondary hover:scale-105 transition-transform" style={{ backgroundColor: '#F5C842' }}>
                    {heroContent.primaryBtn} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" className="w-full sm:w-auto font-semibold bg-white text-secondary hover:bg-gray-100 hover:scale-105 transition-transform">
                    <Phone className="mr-2 w-4 h-4" />{heroContent.secondaryBtn}
                  </Button>
                </Link>
              </div>
            </div>
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

      {/* Stats */}
      <section className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <FadeIn key={stat.id} delay={i * 100}>
                <div className="text-4xl font-bold"><Counter target={stat.value} suffix={stat.suffix} /></div>
                <div className="text-sm opacity-80 mt-1">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
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

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">All Our Services</h2>
              <p className="text-lg text-muted-foreground">Comprehensive security and cleaning solutions tailored to your needs</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleCards.map((service, index) => {
              const Icon = ICON_MAP[service.category] || Shield;
              return (
                <FadeIn key={service.id} delay={index * 100}>
                  <Card className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <Badge className="text-xs font-semibold" style={service.category === 'Cleaning' ? { backgroundColor: '#BCA479', color: '#fff' } : service.category === 'Training' ? { backgroundColor: '#4a90d9', color: '#fff' } : { backgroundColor: '#101C37', color: '#F5C842' }}>{service.category}</Badge>
                      </div>
                      <div className="absolute bottom-4 left-4"><div className="bg-primary p-2 rounded-lg shadow-lg"><Icon className="w-6 h-6 text-white" /></div></div>
                    </div>
                    <CardHeader><CardTitle className="text-lg">{service.title}</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                      <Link to={service.link}><Button variant="link" className="p-0 text-primary font-semibold">Learn More <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button></Link>
                    </CardContent>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-lg text-muted-foreground">Trusted by businesses and organizations across Addis Abeba</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <FadeIn key={t.id} delay={index * 120}>
                <Card className="bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex gap-1 mb-3">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}</div>
                    <p className="text-muted-foreground italic text-sm">"{t.content}"</p>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                    <div className="text-sm text-primary font-medium">{t.company}</div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <div style={{ animation: 'floatLogo 4s ease-in-out infinite' }} className="inline-block mb-6"><BaseLogo className="w-20 h-20 mx-auto" /></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">Whether you need security guards, cleaning staff, or both — BASE delivers professional on-demand services across Addis Abeba.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/request-service"><Button size="lg" className="w-full sm:w-auto font-semibold text-secondary hover:scale-105 transition-transform" style={{ backgroundColor: '#F5C842' }}>Request a Service <ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
              <Link to="/contact"><Button size="lg" className="w-full sm:w-auto font-semibold bg-white text-secondary hover:bg-gray-100 hover:scale-105 transition-transform"><Phone className="mr-2 w-4 h-4" />Contact Us</Button></Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Clients Ticker */}
      {clientLogos.length > 0 && (
        <section className="py-16 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4 mb-10">
            <FadeIn><div className="text-center"><h2 className="text-2xl md:text-3xl font-bold mb-2">Trusted By Leading Organizations</h2><p className="text-muted-foreground">Companies across Addis Abeba rely on BASE every day</p></div></FadeIn>
          </div>
          <div className="mb-4"><ClientTicker clients={clientLogos} /></div>
          <div className="overflow-hidden w-full">
            <div className="flex gap-8 w-max" style={{ animation: 'tickerReverse 22s linear infinite' }}>
              {[...clientLogos].reverse().concat([...clientLogos].reverse()).map((c, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-md border border-gray-100 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: c.color }}>{c.initials}</div>
                  <span className="font-semibold text-secondary text-sm whitespace-nowrap">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
