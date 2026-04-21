/**
 * Feature 3: Photo Gallery / Portfolio
 */
import { useState } from 'react';
import { X, ZoomIn, Shield, Sparkles, GraduationCap } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const CATEGORIES = ['All', 'Security', 'Cleaning', 'Training', 'Events'] as const;
type Category = typeof CATEGORIES[number];

const photos = [
  { id: 1, category: 'Security', title: 'VIP Executive Protection', src: 'https://images.unsplash.com/photo-1687400104522-c9f94fa7540a?w=800&q=80', desc: 'Elite VIP protection detail for corporate executives' },
  { id: 2, category: 'Security', title: 'Office Building Security', src: 'https://images.unsplash.com/photo-1681569685377-dd0dba4b0414?w=800&q=80', desc: 'Professional security deployment at corporate headquarters' },
  { id: 3, category: 'Cleaning', title: 'Professional Office Cleaning', src: 'https://images.unsplash.com/photo-1775178120132-f0ff7fd5cb40?w=800&q=80', desc: 'Thorough office cleaning and sanitization services' },
  { id: 4, category: 'Training', title: 'Guard Training Session', src: 'https://images.unsplash.com/photo-1761064392859-2bfa734e9f3f?w=800&q=80', desc: 'Intensive security guard training program in progress' },
  { id: 5, category: 'Security', title: 'Event Security Management', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', desc: 'Crowd management and event security operations' },
  { id: 6, category: 'Cleaning', title: 'Hotel Housekeeping', src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', desc: 'Premium housekeeping services for hospitality sector' },
  { id: 7, category: 'Training', title: 'Emergency Response Drill', src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80', desc: 'Emergency response and first aid training exercises' },
  { id: 8, category: 'Events', title: 'Corporate Event Security', src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', desc: 'Security management for high-profile corporate events' },
  { id: 9, category: 'Cleaning', title: 'Floor Care & Polishing', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', desc: 'Professional floor care and maintenance services' },
  { id: 10, category: 'Security', title: 'Access Control Systems', src: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80', desc: 'Modern access control and visitor management' },
  { id: 11, category: 'Events', title: 'VIP Event Protection', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', desc: 'Discreet VIP protection at high-profile events' },
  { id: 12, category: 'Training', title: 'Certification Ceremony', src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80', desc: 'Guard certification and graduation ceremony' },
];

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Security: Shield,
  Cleaning: Sparkles,
  Training: GraduationCap,
};

export default function GalleryPage() {
  const [active, setActive] = useState<Category>('All');
  const [lightbox, setLightbox] = useState<typeof photos[0] | null>(null);

  const filtered = active === 'All' ? photos : photos.filter((p) => p.category === active);

  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Work in Action</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A glimpse into BASE's professional security, cleaning, and training operations across Addis Abeba.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                    active === cat
                      ? 'bg-primary text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-primary/10 hover:text-primary border border-gray-200'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((photo, i) => (
              <div
                key={photo.id}
                className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => setLightbox(photo)}
              >
                <ImageWithFallback
                  src={photo.src}
                  alt={photo.title}
                  className="w-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <Badge className="self-start mb-2 text-xs" style={{ backgroundColor: '#BCA479' }}>
                    {photo.category}
                  </Badge>
                  <h3 className="text-white font-bold text-sm">{photo.title}</h3>
                  <p className="text-gray-300 text-xs mt-1">{photo.desc}</p>
                  <ZoomIn className="absolute top-4 right-4 w-6 h-6 text-white" />
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">No photos in this category yet.</div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-secondary rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <ImageWithFallback src={lightbox.src} alt={lightbox.title} className="w-full max-h-[70vh] object-cover" />
            <div className="p-6">
              <Badge className="mb-2 text-xs" style={{ backgroundColor: '#BCA479', color: '#fff' }}>{lightbox.category}</Badge>
              <h3 className="text-white text-xl font-bold">{lightbox.title}</h3>
              <p className="text-gray-300 mt-1">{lightbox.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
