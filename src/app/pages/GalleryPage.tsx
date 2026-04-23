import { useState } from 'react';
import { X, ZoomIn, Shield, Sparkles, GraduationCap } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useCMSStore } from '../lib/cms-store';

const CATEGORIES = ['All', 'Security', 'Cleaning', 'Training', 'Events'] as const;
type Category = typeof CATEGORIES[number];
const CATEGORY_ICONS: Record<string, React.ElementType> = { Security: Shield, Cleaning: Sparkles, Training: GraduationCap };

export default function GalleryPage() {
  const { galleryPhotos } = useCMSStore();
  const [active, setActive] = useState<Category>('All');
  const [lightbox, setLightbox] = useState<typeof galleryPhotos[0] | null>(null);

  const visible = galleryPhotos.filter((p) => p.visible);
  const filtered = active === 'All' ? visible : visible.filter((p) => p.category === active);

  return (
    <div>
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Work in Action</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">A glimpse into BASE's professional security, cleaning, and training operations across Addis Abeba.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat];
              return (
                <button key={cat} onClick={() => setActive(cat)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${active === cat ? 'bg-primary text-white shadow-lg scale-105' : 'bg-white text-gray-600 hover:bg-primary/10 hover:text-primary border border-gray-200'}`}>
                  {Icon && <Icon className="w-4 h-4" />}{cat}
                </button>
              );
            })}
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((photo, i) => (
              <div key={photo.id} className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: `${i * 60}ms` }} onClick={() => setLightbox(photo)}>
                <ImageWithFallback src={photo.src} alt={photo.title} className="w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <Badge className="self-start mb-2 text-xs" style={{ backgroundColor: '#BCA479' }}>{photo.category}</Badge>
                  <h3 className="text-white font-bold text-sm">{photo.title}</h3>
                  <p className="text-gray-300 text-xs mt-1">{photo.desc}</p>
                  <ZoomIn className="absolute top-4 right-4 w-6 h-6 text-white" />
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <div className="text-center py-20 text-muted-foreground">No photos in this category yet.</div>}
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="relative max-w-4xl w-full bg-secondary rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition-colors" onClick={() => setLightbox(null)}><X className="w-5 h-5" /></button>
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
