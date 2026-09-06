import { useState, useRef, useEffect } from 'react';
import { PartyPopper, Briefcase, Film, Phone, Sparkles, Users, Camera, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageShell, { OrnamentDivider, BalineseBorder } from './components/PageShell';

const EVENT_TRACKS = [
  {
    icon: PartyPopper,
    title: 'Private Parties',
    desc: 'Birthdays, celebrations, and get-togethers in a moody, one-of-a-kind Moroccan-styled lounge unlike anywhere else in West LA.',
  },
  {
    icon: Briefcase,
    title: 'Corporate Events',
    desc: 'Team offsites, client entertaining, and after-hours gatherings minutes from UCLA and West LA offices.',
  },
  {
    icon: Film,
    title: 'Film & Photo Production',
    desc: 'A visually distinctive, ready-to-shoot location — dark neon accents, Moroccan architectural detail (horseshoe arches, zellige tile, moucharabieh lattice) — built-in production design without the build.',
  },
];

const WHY_FEATURES = [
  {
    icon: Users,
    title: 'One Open Floor, Total Flexibility',
    desc: 'The entire space is open floor plan with no fixed partitions, so it can be configured however your event demands — lounge seating, standing reception, staged presentation, or a full camera setup for production.',
  },
  {
    icon: Camera,
    title: 'Production-Ready Aesthetic',
    desc: 'Horseshoe arches, zellige tile, moucharabieh lattice screens, and warm neon accents give every frame depth and character. No set dressing required — the space is the set.',
  },
  {
    icon: MapPin,
    title: 'Minutes from UCLA & West LA',
    desc: 'Located at 1446 Westwood Blvd in the heart of Westwood — easy access for guests, crew, and equipment trucks. Parking available in the public lot behind the building.',
  },
  {
    icon: Sparkles,
    title: 'Hookah & Tea Service In-House',
    desc: 'Full hookah and tea service available for your guests — 50+ premium shisha flavors, signature mixes, and traditional tea service. No outside vendors needed.',
  },
];

const GALLERY_IMAGES = [
  { src: '/images/centerpiece-hero.webp', alt: 'Centerpiece Hookah Lounge main room with warm lighting and Moroccan decor' },
  { src: '/images/who-we-are-no-text.webp', alt: 'Lounge seating area with ambient lighting and architectural details' },
  { src: '/images/lantern.webp', alt: 'Moroccan lantern casting warm light in the lounge' },
  { src: '/images/hookah-building.webp', alt: 'Exterior of Centerpiece Hookah Lounge building on Westwood Blvd' },
  { src: '/images/karak-chai.webp', alt: 'Traditional karak chai tea service at Centerpiece' },
  { src: '/images/Who-we-are.webp', alt: 'Interior detail of the Moroccan-styled hookah lounge' },
];

const FAQS = [
  {
    q: 'Can I rent Centerpiece Hookah Lounge for a private event?',
    a: 'Yes, full-space buyouts are available for private parties and corporate events. Call (310) 977-0780 for pricing.',
  },
  {
    q: 'Does Centerpiece Hookah Lounge allow filming or photo shoots?',
    a: 'Yes, the lounge is available for film, TV, and photo production bookings. Contact Mina directly to discuss your production\'s needs.',
  },
  {
    q: 'What is the capacity for private events?',
    a: 'Contact us for current capacity information.',
  },
  {
    q: 'How do I book a private event or film shoot?',
    a: 'Call (310) 977-0780 and ask for Mina.',
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function EventsPage() {
  const tracksSection = useInView();
  const whySection = useInView();
  const gallerySection = useInView();
  const faqSection = useInView();
  const ctaSection = useInView();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? null : (i + 1) % GALLERY_IMAGES.length));
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Venue Rental",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Centerpiece Hookah Lounge",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1446 Westwood Blvd",
          "addressLocality": "Los Angeles",
          "addressRegion": "CA",
          "postalCode": "90024",
          "addressCountry": "US"
        },
        "telephone": "(310) 977-0780",
        "url": "https://centerpiecehookahlounge.com/private-events"
      },
      "areaServed": "Los Angeles, CA",
      "url": "https://centerpiecehookahlounge.com/private-events"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    }
  ];

  return (
    <PageShell
      pageTitle="Private Events, Corporate Parties & Filming Location | Centerpiece Hookah Lounge, Westwood"
      pageDescription="Book Centerpiece Hookah Lounge in Westwood, Los Angeles for private parties, corporate events, and film or photo productions. Open-floor Moroccan-styled lounge minutes from UCLA. Call Mina at (310) 977-0780 for a custom quote."
      jsonLd={jsonLd}
    >
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/centerpiece-hero.webp"
            alt="Centerpiece Hookah Lounge — Moroccan-styled interior available for private events and filming"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#120d0b]/80 via-[#120d0b]/50 to-[#120d0b]" />
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">Private Events &amp; Production Bookings</p>
          <h1 className="font-serif text-4xl md:text-6xl text-amber-100 mb-4">Host Your Event at Centerpiece</h1>
          <OrnamentDivider />
          <p className="text-sand-300 max-w-xl mx-auto text-base leading-relaxed">
            A full-space buyout in the heart of Westwood — private parties, corporate gatherings, and a cinematic backdrop built for film and photo production.
          </p>
          <a
            href="tel:+13109770780"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 mt-8 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 rounded-sm shadow-lg"
          >
            <Phone size={16} aria-hidden="true" />
            Call (310) 977-0780
          </a>
        </div>
      </section>

      {/* Three-Track Grid */}
      <section className="py-16 px-6 bg-[#120d0b] relative overflow-hidden">
        <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
        <div ref={tracksSection.ref} className={`max-w-5xl mx-auto transition-all duration-700 relative z-10 ${tracksSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">What You Can Book</p>
            <h2 className="font-serif text-3xl md:text-4xl text-amber-100 mb-4">Three Ways to Use the Space</h2>
            <OrnamentDivider />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EVENT_TRACKS.map((track, i) => {
              const Icon = track.icon;
              return (
                <article
                  key={track.title}
                  className="group p-7 border border-amber-900/25 md:hover:border-amber-700/50 rounded-sm bg-[#1a1210]/60 hover:bg-[#1e150f]/80 transition-all duration-500"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-amber-600/40 bg-amber-950/30 mb-5">
                    <Icon size={22} className="text-amber-500" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl text-amber-200 mb-3 group-hover:text-amber-100 transition-colors">{track.title}</h3>
                  <p className="text-sand-400 text-sm leading-relaxed">{track.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Centerpiece — alternating 2-column sections */}
      <section className="py-16 px-6 bg-[#150f0d] relative overflow-hidden">
        <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
        <div ref={whySection.ref} className={`max-w-5xl mx-auto transition-all duration-700 relative z-10 ${whySection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">Why Centerpiece</p>
            <h2 className="font-serif text-3xl md:text-4xl text-amber-100 mb-4">A Space Built for More Than Hookah</h2>
            <OrnamentDivider />
          </div>

          <div className="space-y-12">
            {WHY_FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              const isImageRight = i % 2 === 0;
              return (
                <div key={feature.title} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
                  <div className={isImageRight ? 'md:order-1' : 'md:order-2'}>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-amber-600/40 bg-amber-950/30 mb-5">
                      <Icon size={22} className="text-amber-500" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-2xl text-amber-100 mb-4">{feature.title}</h3>
                    <OrnamentDivider />
                    <p className="text-sand-300 text-base leading-relaxed mt-5">{feature.desc}</p>
                  </div>
                  <div className={isImageRight ? 'md:order-2' : 'md:order-1'}>
                    <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-amber-700/30 bg-[#1a1210]/60">
                      <img
                        src={['/images/who-we-are-no-text.webp', '/images/lantern.webp', '/images/centerpiece-hero.webp', '/images/who-we-are-no-text.webp'][i]}
                        alt={feature.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#150f0d]/60 via-transparent to-transparent" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-6 bg-[#120d0b] relative overflow-hidden">
        <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
        <div ref={gallerySection.ref} className={`max-w-6xl mx-auto transition-all duration-700 relative z-10 ${gallerySection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">The Space</p>
            <h2 className="font-serif text-3xl md:text-4xl text-amber-100 mb-4">A Look Inside</h2>
            <OrnamentDivider />
            <p className="text-sand-300 max-w-xl mx-auto text-sm leading-relaxed mt-4">
              Moroccan architectural detail, warm neon accents, and an open floor plan — every angle tells a story.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setLightboxIndex(i)}
                className={`group relative overflow-hidden rounded-sm border border-amber-900/30 bg-[#1a1210]/60 ${i === 0 ? 'col-span-2 md:col-span-2 row-span-2' : ''}`}
                aria-label={`View photo: ${img.alt}`}
              >
                <div className={`${i === 0 ? 'aspect-[16/9] md:aspect-auto md:h-full' : 'aspect-square'}`}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#120d0b]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" aria-hidden="true" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera size={18} className="text-amber-400" aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#120d0b]/95 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-5 right-5 text-amber-400 hover:text-amber-300 transition-colors p-2"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close gallery"
          >
            <X size={28} aria-hidden="true" />
          </button>
          <button
            className="absolute left-3 md:left-6 text-amber-400 hover:text-amber-300 transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)); }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={32} aria-hidden="true" />
          </button>
          <figure className="max-w-4xl w-full px-12 md:px-16" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY_IMAGES[lightboxIndex].src}
              alt={GALLERY_IMAGES[lightboxIndex].alt}
              className="w-full max-h-[80vh] object-contain rounded-sm border border-amber-900/30"
            />
            <figcaption className="text-center text-sand-400 text-sm mt-4">
              {lightboxIndex + 1} / {GALLERY_IMAGES.length} — {GALLERY_IMAGES[lightboxIndex].alt}
            </figcaption>
          </figure>
          <button
            className="absolute right-3 md:right-6 text-amber-400 hover:text-amber-300 transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? null : (i + 1) % GALLERY_IMAGES.length)); }}
            aria-label="Next photo"
          >
            <ChevronRight size={32} aria-hidden="true" />
          </button>
        </div>
      )}

      {/* FAQ */}
      <section className="py-16 px-6 bg-[#120d0b] relative overflow-hidden">
        <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
        <div ref={faqSection.ref} className={`max-w-3xl mx-auto transition-all duration-700 relative z-10 ${faqSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">Questions</p>
            <h2 className="font-serif text-3xl md:text-4xl text-amber-100 mb-4">Frequently Asked</h2>
            <OrnamentDivider />
          </div>

          <div className="border border-amber-900/30 rounded-sm bg-[#1a1210]/60 overflow-hidden">
            <dl className="divide-y divide-amber-900/20">
              {FAQS.map((faq) => (
                <div key={faq.q} className="px-6 py-5 hover:bg-[#1e150f]/50 transition-colors">
                  <dt className="font-serif text-lg text-amber-200 mb-2">{faq.q}</dt>
                  <dd className="text-sand-400 text-sm leading-relaxed">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#150f0d] relative overflow-hidden">
        <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
        <div ref={ctaSection.ref} className={`max-w-2xl mx-auto text-center transition-all duration-700 relative z-10 ${ctaSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-serif text-3xl md:text-4xl text-amber-100 mb-6">
            Ready to Book?
          </h2>
          <OrnamentDivider />
          <p className="text-sand-300 text-lg leading-relaxed mb-8">
            Call Mina to discuss your event, production, or private party. Every booking is custom-quoted based on your needs.
          </p>
          <a
            href="tel:+13109770780"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 rounded-sm shadow-lg"
          >
            <Phone size={16} aria-hidden="true" />
            Call (310) 977-0780
          </a>
          <div className="mt-8">
            <BalineseBorder />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
