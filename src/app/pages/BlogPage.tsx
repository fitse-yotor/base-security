/**
 * Feature 6: Blog / News Section
 */
import { useState } from 'react';
import { Link } from 'react-router';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const POSTS = [
  {
    id: 1,
    slug: 'top-5-security-tips-addis-abeba',
    title: '5 Essential Security Tips for Businesses in Addis Abeba',
    excerpt: 'With rapid urban growth comes increased security challenges. Here are the five most important steps every Addis Abeba business should take to protect their premises and staff.',
    category: 'Security Tips',
    date: '2026-04-15',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1681569685377-dd0dba4b0414?w=800&q=80',
    featured: true,
    content: `Security is not a luxury — it is a necessity for every business operating in Addis Abeba today. As the city grows, so do the risks. Here are five steps every business owner should take:\n\n**1. Conduct a Security Assessment**\nBefore deploying any guards or systems, understand your vulnerabilities. Walk your premises and identify entry points, blind spots, and high-value areas.\n\n**2. Hire Licensed, Trained Guards**\nAlways verify that your security provider is licensed by the Federal Police Commission. Untrained guards create liability, not security.\n\n**3. Install Access Control**\nLimit who can enter sensitive areas. Even a simple visitor log and ID check dramatically reduces internal theft and unauthorised access.\n\n**4. Brief Your Staff**\nSecurity is everyone's responsibility. Train your employees on what to do in an emergency, how to report suspicious activity, and who to contact.\n\n**5. Review and Update Regularly**\nThreats evolve. Review your security plan every six months and after any incident.`,
  },
  {
    id: 2,
    slug: 'importance-clean-workplace',
    title: 'Why a Clean Workplace Boosts Productivity by 20%',
    excerpt: 'Research consistently shows that a clean, well-maintained office environment directly impacts employee morale, health, and output. Here is what the data says.',
    category: 'Cleaning',
    date: '2026-04-08',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1775178120132-f0ff7fd5cb40?w=800&q=80',
    featured: false,
    content: `A clean workplace is more than aesthetics — it directly affects your bottom line.\n\n**The Research**\nStudies show employees in clean offices report 20% higher productivity and take 30% fewer sick days. Dust, clutter, and poor sanitation are leading causes of workplace illness.\n\n**What to Prioritise**\n- Daily desk and surface sanitization\n- Weekly deep cleaning of restrooms\n- Monthly floor care and carpet cleaning\n- Regular waste management\n\n**The BASE Approach**\nOur professional cleaning teams follow a structured checklist for every visit, ensuring nothing is missed. We use professional-grade products that are safe for office environments.`,
  },
  {
    id: 3,
    slug: 'guard-training-career-ethiopia',
    title: 'Building a Security Career in Ethiopia: What You Need to Know',
    excerpt: 'The security industry in Ethiopia is growing fast. Here is a complete guide to starting and advancing your career as a professional security guard.',
    category: 'Training',
    date: '2026-03-28',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1761064392859-2bfa734e9f3f?w=800&q=80',
    featured: false,
    content: `Ethiopia's security sector employs hundreds of thousands of people and is growing rapidly. Here is how to build a successful career.\n\n**Step 1: Get Certified**\nStart with a Basic Security Guard Training certificate. This is the minimum requirement for most employers and takes just 2 weeks.\n\n**Step 2: Gain Experience**\nWork in different environments — offices, hotels, events — to build a broad skill set.\n\n**Step 3: Advance Your Training**\nAfter 6 months, enrol in Advanced Security Professional training. This opens doors to supervisory roles and higher pay.\n\n**Step 4: Specialise**\nVIP Protection Specialist certification is the highest level and commands the best salaries in the industry.`,
  },
  {
    id: 4,
    slug: 'base-security-company-update-2026',
    title: 'BASE SECURITY Expands Operations Across Addis Abeba',
    excerpt: 'We are proud to announce the expansion of our services to new districts across Addis Abeba, bringing professional security and cleaning to more businesses.',
    category: 'Company News',
    date: '2026-03-15',
    readTime: '2 min read',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    featured: false,
    content: `BASE SECURITY, CLEANING & TRADING PLC is proud to announce the expansion of our service coverage across all major districts of Addis Abeba.\n\n**New Coverage Areas**\nWe now serve clients in Bole, Kirkos, Yeka, Nifas Silk-Lafto, Kolfe Keranio, and Gulele sub-cities.\n\n**New Services**\nWe have added post-construction cleaning and event security management to our service portfolio.\n\n**Growing Team**\nWe have hired 50 new trained security professionals and 30 cleaning specialists to meet growing demand.\n\nThank you to all our clients for your continued trust in BASE.`,
  },
  {
    id: 5,
    slug: 'hotel-security-cleaning-guide',
    title: 'The Complete Guide to Hotel Security & Housekeeping in Ethiopia',
    excerpt: 'Hotels face unique security and cleanliness challenges. This guide covers best practices for Ethiopian hospitality businesses.',
    category: 'Security Tips',
    date: '2026-03-01',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    featured: false,
    content: `Hotels must balance guest experience with security and cleanliness. Here is how to get it right.\n\n**Security Priorities**\n- 24/7 lobby security\n- CCTV coverage of all public areas\n- Secure key card access to floors\n- Regular security briefings for all staff\n\n**Housekeeping Standards**\n- Daily room cleaning and linen change\n- Deep cleaning between guest stays\n- Regular sanitization of high-touch surfaces\n- Quarterly deep cleaning of all areas\n\n**Why Outsource?**\nOutsourcing to a professional company like BASE ensures consistent standards, reduces HR burden, and provides trained, background-checked staff.`,
  },
  {
    id: 6,
    slug: 'event-security-checklist',
    title: 'Event Security Checklist: 10 Things to Verify Before Your Event',
    excerpt: 'Planning an event in Addis Abeba? Use this checklist to ensure your security arrangements are complete and professional.',
    category: 'Security Tips',
    date: '2026-02-20',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    featured: false,
    content: `Event security requires careful planning. Use this checklist before every event.\n\n1. Confirm guard count matches expected attendance\n2. Brief all guards on the event schedule and VIP list\n3. Establish clear communication channels\n4. Identify and mark emergency exits\n5. Coordinate with venue management\n6. Set up access control at all entry points\n7. Assign a dedicated security supervisor\n8. Prepare incident reporting forms\n9. Confirm first aid coverage\n10. Conduct a pre-event walkthrough`,
  },
];

const CATEGORIES = ['All', 'Security Tips', 'Cleaning', 'Training', 'Company News'];
const CATEGORY_COLORS: Record<string, string> = {
  'Security Tips': '#101C37',
  'Cleaning': '#BCA479',
  'Training': '#0369a1',
  'Company News': '#16a34a',
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<typeof POSTS[0] | null>(null);

  const filtered = activeCategory === 'All' ? POSTS : POSTS.filter((p) => p.category === activeCategory);
  const featured = POSTS.find((p) => p.featured);

  if (selectedPost) {
    return (
      <div>
        <section className="bg-secondary text-white py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <button onClick={() => setSelectedPost(null)} className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 text-sm font-semibold">
              ← Back to Blog
            </button>
            <Badge className="mb-4 text-xs" style={{ backgroundColor: CATEGORY_COLORS[selectedPost.category] || '#BCA479', color: '#fff' }}>
              {selectedPost.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{selectedPost.title}</h1>
            <div className="flex items-center gap-4 text-gray-300 text-sm">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(selectedPost.date).toLocaleDateString('en-ET', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{selectedPost.readTime}</span>
            </div>
          </div>
        </section>
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <ImageWithFallback src={selectedPost.image} alt={selectedPost.title} className="w-full h-64 object-cover rounded-2xl mb-8 shadow-lg" />
            <div className="prose max-w-none">
              {selectedPost.content.split('\n\n').map((para, i) => {
                if (para.startsWith('**') && para.endsWith('**')) {
                  return <h3 key={i} className="text-xl font-bold mt-6 mb-2 text-secondary">{para.replace(/\*\*/g, '')}</h3>;
                }
                if (para.startsWith('- ')) {
                  return <ul key={i} className="list-disc pl-6 space-y-1 text-muted-foreground">{para.split('\n').map((li, j) => <li key={j}>{li.replace('- ', '')}</li>)}</ul>;
                }
                return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{para.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
              })}
            </div>
            <div className="mt-12 p-6 bg-gray-50 rounded-xl border">
              <p className="font-semibold mb-2">Need professional security or cleaning services?</p>
              <Link to="/request-service">
                <Button className="bg-primary hover:bg-primary/90 text-white">Request a Service <ArrowRight className="ml-2 w-4 h-4" /></Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Insights</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Security tips, cleaning guides, company updates, and industry insights from the BASE team.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Featured post */}
          {featured && (
            <div className="max-w-5xl mx-auto mb-12">
              <div className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group" onClick={() => setSelectedPost(featured)}>
                <ImageWithFallback src={featured.image} alt={featured.title} className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8">
                  <Badge className="self-start mb-3 text-xs" style={{ backgroundColor: CATEGORY_COLORS[featured.category], color: '#fff' }}>
                    ⭐ Featured · {featured.category}
                  </Badge>
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">{featured.title}</h2>
                  <p className="text-gray-300 text-sm mb-3 max-w-2xl">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-gray-400 text-xs">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(featured.date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-primary/10 border border-gray-200'
                }`}
              >
                {cat !== 'All' && <Tag className="w-3 h-3" />}
                {cat}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filtered.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <Badge className="text-xs" style={{ backgroundColor: CATEGORY_COLORS[post.category] || '#BCA479', color: '#fff' }}>
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-secondary mb-2 leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-1 text-primary text-sm font-semibold mt-4">
                    Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
