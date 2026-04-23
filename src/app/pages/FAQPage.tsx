import { useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { useCMSStore } from '../lib/cms-store';

const CATEGORIES = ['All', 'General', 'Security', 'Cleaning', 'Pricing & Contracts', 'Training'];

export default function FAQPage() {
  const { faqItems } = useCMSStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const visible = faqItems.filter((f) => f.visible);
  const filtered = visible.filter((f) => {
    const matchCat = activeCategory === 'All' || f.category === activeCategory;
    const matchSearch = search === '' || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">Everything you need to know about BASE's services, pricing, and operations.</p>
          <div className="max-w-md mx-auto relative">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions..." className="w-full px-5 py-3 rounded-full text-foreground bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-primary pr-12" />
            <svg className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-primary/10 border border-gray-200'}`}>{cat}</button>
            ))}
          </div>
          <div className="space-y-3">
            {filtered.length === 0 && <div className="text-center py-16 text-muted-foreground">No questions match your search. <button className="text-primary underline" onClick={() => setSearch('')}>Clear search</button></div>}
            {filtered.map((faq) => (
              <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200">
                <button className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors" onClick={() => setOpenIndex(openIndex === faq.id ? null : faq.id)}>
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-0.5 flex-shrink-0">{faq.category}</span>
                    <span className="font-semibold text-secondary">{faq.question}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-primary flex-shrink-0 ml-3 transition-transform duration-200 ${openIndex === faq.id ? 'rotate-180' : ''}`} />
                </button>
                {openIndex === faq.id && <div className="px-5 pb-5 text-muted-foreground leading-relaxed border-t border-gray-100 pt-4">{faq.answer}</div>}
              </div>
            ))}
          </div>
          <div className="mt-16 bg-secondary text-white rounded-2xl p-8 text-center">
            <Phone className="w-10 h-10 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-gray-300 mb-6">Our team is ready to help. Reach out directly.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"><Button className="bg-primary hover:bg-primary/90 text-white">Contact Us</Button></Link>
              <a href="https://wa.me/251911234038" target="_blank" rel="noopener noreferrer"><Button variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">WhatsApp Us</Button></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
