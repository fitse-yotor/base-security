import { useState } from 'react';
import { Link } from 'react-router';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useCMSStore } from '../lib/cms-store';

const CATEGORY_COLORS: Record<string, string> = { 'Security Tips': '#101C37', 'Cleaning': '#BCA479', 'Training': '#0369a1', 'Company News': '#16a34a' };

export default function BlogPage() {
  const { blogPosts } = useCMSStore();
  const published = blogPosts.filter((p) => p.published);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<typeof published[0] | null>(null);

  const categories = ['All', ...Array.from(new Set(published.map((p) => p.category)))];
  const filtered = activeCategory === 'All' ? published : published.filter((p) => p.category === activeCategory);
  const featured = published.find((p) => p.featured);

  if (selectedPost) {
    return (
      <div>
        <section className="bg-secondary text-white py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <button onClick={() => setSelectedPost(null)} className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 text-sm font-semibold">← Back to Blog</button>
            <Badge className="mb-4 text-xs" style={{ backgroundColor: CATEGORY_COLORS[selectedPost.category] || '#BCA479', color: '#fff' }}>{selectedPost.category}</Badge>
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
                if (para.startsWith('**') && para.endsWith('**')) return <h3 key={i} className="text-xl font-bold mt-6 mb-2 text-secondary">{para.replace(/\*\*/g, '')}</h3>;
                if (para.startsWith('- ')) return <ul key={i} className="list-disc pl-6 space-y-1 text-muted-foreground">{para.split('\n').map((li, j) => <li key={j}>{li.replace('- ', '')}</li>)}</ul>;
                return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{para.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
              })}
            </div>
            <div className="mt-12 p-6 bg-gray-50 rounded-xl border">
              <p className="font-semibold mb-2">Need professional security or cleaning services?</p>
              <Link to="/request-service"><Button className="bg-primary hover:bg-primary/90 text-white">Request a Service <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Insights</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Security tips, cleaning guides, company updates, and industry insights from the BASE team.</p>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {featured && (
            <div className="max-w-5xl mx-auto mb-12">
              <div className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group" onClick={() => setSelectedPost(featured)}>
                <ImageWithFallback src={featured.image} alt={featured.title} className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8">
                  <Badge className="self-start mb-3 text-xs" style={{ backgroundColor: CATEGORY_COLORS[featured.category], color: '#fff' }}>⭐ Featured · {featured.category}</Badge>
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
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-primary/10 border border-gray-200'}`}>
                {cat !== 'All' && <Tag className="w-3 h-3" />}{cat}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filtered.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group" onClick={() => setSelectedPost(post)}>
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3"><Badge className="text-xs" style={{ backgroundColor: CATEGORY_COLORS[post.category] || '#BCA479', color: '#fff' }}>{post.category}</Badge></div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-secondary mb-2 leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-1 text-primary text-sm font-semibold mt-4">Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
