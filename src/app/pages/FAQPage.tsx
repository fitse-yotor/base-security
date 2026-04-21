/**
 * Feature 4: FAQ Page
 */
import { useState } from 'react';
import { ChevronDown, Shield, Sparkles, GraduationCap, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';

interface FAQ { q: string; a: string; category: string; }

const faqs: FAQ[] = [
  // General
  { category: 'General', q: 'What services does BASE SECURITY offer?', a: 'BASE SECURITY, CLEANING & TRADING PLC provides three core services: professional security (VIP protection, office/building security, event security), housekeeping & cleaning (office cleaning, hotel housekeeping, post-construction cleaning), and guard training programs (basic, advanced, and VIP specialist certifications).' },
  { category: 'General', q: 'Where is BASE SECURITY located?', a: 'Our office is at Megenagna City Square Mall, 10th Floor, Addis Abeba, Ethiopia. You can reach us at +251 91 123 4038 or basesc4@gmail.com.' },
  { category: 'General', q: 'How quickly can you deploy services?', a: 'For standard security deployments we can mobilise within 24–48 hours. For urgent situations, contact us directly on +251 91 123 4038 and we will do our best to respond same-day.' },
  { category: 'General', q: 'Do you operate 24/7?', a: 'Yes. Our security services operate 24/7 including weekends and public holidays. Our office support team is available Monday–Friday 8AM–6PM and Saturday 9AM–3PM.' },
  // Security
  { category: 'Security', q: 'Are your security guards licensed and trained?', a: 'All our guards hold valid Ethiopian security licenses and complete our in-house training program before deployment. Senior guards hold advanced certifications in threat assessment, first aid, and crisis management.' },
  { category: 'Security', q: 'What is included in a VIP protection package?', a: 'VIP packages include a dedicated security detail, advance route planning, threat assessment, secure transportation coordination, and 24/7 availability. Packages are fully customised to the client\'s needs and risk profile.' },
  { category: 'Security', q: 'How are guards supervised during deployment?', a: 'Each deployment has a designated supervisor who conducts regular check-ins. Our admin team monitors attendance daily and clients receive weekly reports on guard performance and any incidents.' },
  { category: 'Security', q: 'Can I request a specific number of guards?', a: 'Yes. You specify the number of guards required in your service request. Our team will advise on the optimal number based on your location size and risk assessment.' },
  // Cleaning
  { category: 'Cleaning', q: 'What cleaning services do you provide?', a: 'We offer office and corporate cleaning, hotel and hospitality housekeeping, post-construction cleaning, floor care and polishing, restroom deep sanitization, window cleaning, and waste management.' },
  { category: 'Cleaning', q: 'Do you use eco-friendly cleaning products?', a: 'Yes. Our premium cleaning packages use environmentally friendly, non-toxic products. Standard packages use professional-grade commercial cleaning agents that are safe for office environments.' },
  { category: 'Cleaning', q: 'How often will cleaning staff visit?', a: 'Frequency depends on your package: Basic (weekly), Professional (daily), Premium (multiple times daily). Custom schedules can be arranged to fit your operational hours.' },
  { category: 'Cleaning', q: 'Are cleaning staff background-checked?', a: 'Yes. All cleaning staff undergo thorough background checks, identity verification, and reference checks before joining BASE. They also receive training in professional conduct and client confidentiality.' },
  // Pricing
  { category: 'Pricing & Contracts', q: 'How is pricing calculated?', a: 'Pricing is in Ethiopian Birr (ETB) and depends on service type, number of personnel, coverage hours, and contract duration. Security starts from ETB 4,500/hour, cleaning from ETB 8,000/month. Contact us for a custom quote.' },
  { category: 'Pricing & Contracts', q: 'What contract lengths do you offer?', a: 'We offer flexible contracts: 1 day, 1 week, 1 month, 3 months, 6 months, 1 year, or ongoing. Longer contracts receive preferential rates.' },
  { category: 'Pricing & Contracts', q: 'Is there a minimum contract period?', a: 'For recurring services (office security, cleaning) the minimum is 1 month. For one-off events or short-term needs, we can accommodate from a single day.' },
  { category: 'Pricing & Contracts', q: 'How do I pay?', a: 'We accept bank transfers to our CBE account, mobile banking (CBE Birr, Telebirr), and cheque payments. Invoices are issued monthly in ETB.' },
  // Training
  { category: 'Training', q: 'Who can enrol in guard training?', a: 'Anyone 18 years or older with a high school diploma or equivalent and a clean background check can enrol in the Basic program. Advanced and VIP programs have additional experience requirements.' },
  { category: 'Training', q: 'Are training certificates recognised?', a: 'Yes. Our certificates are issued by BASE SECURITY, CLEANING & TRADING PLC and are recognised by employers across Ethiopia. Advanced and VIP certificates meet national security licensing requirements.' },
  { category: 'Training', q: 'How long are the training programs?', a: 'Basic Security Guard Training: 2 weeks (ETB 18,000). Advanced Security Professional: 4 weeks (ETB 35,000). VIP Protection Specialist: 6 weeks (ETB 55,000).' },
];

const CATEGORIES = ['All', 'General', 'Security', 'Cleaning', 'Pricing & Contracts', 'Training'];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === 'All' || f.category === activeCategory;
    const matchSearch = search === '' || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Everything you need to know about BASE's services, pricing, and operations.
          </p>
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full px-5 py-3 rounded-full text-foreground bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-primary pr-12"
            />
            <svg className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-primary/10 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ accordion */}
          <div className="space-y-3">
            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                No questions match your search. <button className="text-primary underline" onClick={() => setSearch('')}>Clear search</button>
              </div>
            )}
            {filtered.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200"
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-0.5 flex-shrink-0">
                      {faq.category}
                    </span>
                    <span className="font-semibold text-secondary">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 ml-3 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5 text-muted-foreground leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still have questions CTA */}
          <div className="mt-16 bg-secondary text-white rounded-2xl p-8 text-center">
            <Phone className="w-10 h-10 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-gray-300 mb-6">Our team is ready to help. Reach out directly.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-white">Contact Us</Button>
              </Link>
              <a href="https://wa.me/251911234038" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
