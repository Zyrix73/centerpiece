import { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Clock, Star, Navigation, Car } from 'lucide-react';
import PageShell, { OrnamentDivider, BalineseBorder } from './components/PageShell';

const HOURS = [
  { day: 'Monday', hours: '2 PM – 2 AM' },
  { day: 'Tuesday', hours: '2 PM – 2 AM' },
  { day: 'Wednesday', hours: '2 PM – 2 AM' },
  { day: 'Thursday', hours: '2 PM – 2 AM' },
  { day: 'Friday', hours: '2 PM – 4 AM' },
  { day: 'Saturday', hours: '3 PM – 4 AM' },
  { day: 'Sunday', hours: '2 PM – 2:30 AM' },
];

const NEIGHBORHOODS = [
  { name: 'Westwood', distance: '0 miles' },
  { name: 'UCLA Campus', distance: '0.5 miles' },
  { name: 'West Los Angeles', distance: '1 mile' },
  { name: 'Sawtelle', distance: '1.5 miles' },
  { name: 'Brentwood', distance: '2.5 miles' },
  { name: 'Westwood Village', distance: '0.3 miles' },
  { name: 'Century City', distance: '3 miles' },
  { name: 'Bel Air', distance: '3.5 miles' },
  { name: 'Beverly Hills', distance: '3.5 miles' },
  { name: 'Mar Vista', distance: '4 miles' },
  { name: 'Palms', distance: '4 miles' },
  { name: 'Culver City', distance: '5 miles' },
  { name: 'Santa Monica', distance: '5 miles' },
  { name: 'Venice', distance: '6 miles' },
  { name: 'Beverly Grove', distance: '5 miles' },
  { name: 'Fairfax District', distance: '5.5 miles' },
  { name: 'Mid-City Los Angeles', distance: '5.5 miles' },
  { name: 'West Hollywood', distance: '6 miles' },
  { name: 'Hollywood', distance: '7 miles' },
  { name: 'Pacific Palisades', distance: '7 miles' },
  { name: 'Mid-Wilshire', distance: '6 miles' },
  { name: 'Koreatown', distance: '7 miles' },
  { name: 'Sherman Oaks', distance: '7 miles' },
  { name: 'Encino', distance: '8 miles' },
  { name: 'Tarzana', distance: '9 miles' },
  { name: 'Echo Park', distance: '8 miles' },
  { name: 'Silver Lake', distance: '8 miles' },
  { name: 'Los Feliz', distance: '8 miles' },
  { name: 'Downtown Los Angeles', distance: '9 miles' },
  { name: 'Glassell Park', distance: '10 miles' },
  { name: 'Atwater Village', distance: '10 miles' },
  { name: 'Highland Park', distance: '11 miles' },
];

const PARKING_TIPS = [
  { title: 'Street Parking', desc: 'Free metered parking after 8 PM on Westwood Blvd and surrounding streets.' },
  { title: 'Lot Parking', desc: 'Public lot available behind the building. Enter from the alley off Weyburn Ave.' },
  { title: 'Rideshare Drop-off', desc: 'Pull up directly to our entrance at 1446 Westwood Blvd for easy drop-off.' },
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

export default function VisitUsPage() {
  const infoSection = useInView();
  const hoursSection = useInView();
  const neighborhoodsSection = useInView();

  const jsonLd = {
    "@context": "https://schema.org",
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
    "url": "https://centerpiecehookahlounge.com/visit-us",
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday"], "opens": "14:00", "closes": "02:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday"], "opens": "14:00", "closes": "04:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "15:00", "closes": "04:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Sunday"], "opens": "14:00", "closes": "02:30" }
    ],
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "WiFi", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Study-friendly", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Quiet atmosphere", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Study seating available", "value": true }
    ],
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "studyFriendly", "value": true },
      { "@type": "PropertyValue", "name": "quietLounge", "value": true }
    ]
  };

  return (
    <PageShell
      pageTitle="Visit Us | Centerpiece Hookah Lounge — Westwood, Los Angeles CA 90024"
      pageDescription="Hours, WiFi, study-friendly seating at Centerpiece Hookah Lounge, Westwood, 90024. Open nightly until 2–4 AM. Free parking after 8 PM. Walk-ins welcome. Must be 18+."
      jsonLd={jsonLd}
    >
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/24304636/pexels-photo-24304636.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Centerpiece Hookah Lounge study area with comfortable seating and WiFi for Westwood students"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#120d0b]/80 via-[#120d0b]/50 to-[#120d0b]" />
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">Find Us</p>
          <h1 className="font-serif text-4xl md:text-6xl text-amber-100 mb-4 whitespace-nowrap">Visit Us</h1>
          <OrnamentDivider />
          <p className="text-sand-300 max-w-xl mx-auto text-base leading-relaxed">
            In the heart of Westwood, Los Angeles — your destination for premium hookah near UCLA and all of West LA.
          </p>
        </div>
      </section>

      {/* Address + Contact */}
      <section className="py-12 px-6 bg-[#120d0b] relative overflow-hidden">
        <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
        <div ref={infoSection.ref} className={`max-w-5xl mx-auto transition-all duration-700 ${infoSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-amber-100 mb-4">Our Location</h2>
                <OrnamentDivider />
                <address className="not-italic space-y-4 text-lg" itemScope itemType="https://schema.org/LocalBusiness">
                  <meta itemProp="name" content="Centerpiece Hookah Lounge" />
                  <div className="flex items-start gap-3 text-sand-300">
                    <MapPin size={20} className="text-amber-500 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                      <p className="text-sand-200 font-medium text-xl" itemProp="streetAddress">1446 Westwood Blvd</p>
                      <p className="text-lg"><span itemProp="addressLocality">Los Angeles</span>, <span itemProp="addressRegion">CA</span> <span itemProp="postalCode">90024</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sand-300">
                    <Phone size={20} className="text-amber-500 flex-shrink-0" aria-hidden="true" />
                    <a href="tel:+13109770780" itemProp="telephone" className="text-sand-200 hover:text-amber-400 transition-colors text-lg">(310) 977-0780</a>
                  </div>
                </address>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Centerpiece+Hookah+Lounge+1446+Westwood+Blvd+Los+Angeles+CA+90024"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-[#120d0b] font-semibold text-sm tracking-widest uppercase transition-all duration-300 rounded-sm"
                >
                  <Navigation size={16} aria-hidden="true" />
                  Get Directions
                </a>
                <a
                  href="tel:+13109770780"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-amber-500/60 text-amber-400 text-sm tracking-widest uppercase hover:bg-amber-500/10 transition-all duration-300 rounded-sm"
                >
                  <Phone size={16} aria-hidden="true" />
                  Call Us
                </a>
              </div>
            </div>

            <div className="rounded-sm overflow-hidden border border-amber-900/30 h-full min-h-[300px]">
              <iframe
                title="Centerpiece Hookah Lounge Google Maps location"
                src="https://www.google.com/maps?q=Centerpiece+Hookah+Lounge,+1446+Westwood+Blvd,+Los+Angeles,+CA+90024&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hours */}
      <section className="py-12 px-6 bg-[#150f0d] relative overflow-hidden">
        <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
        <div ref={hoursSection.ref} className={`max-w-3xl mx-auto transition-all duration-700 ${hoursSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-6">
            <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">When We're Open</p>
            <h2 className="font-serif text-4xl md:text-5xl text-amber-100 mb-4">Hours of Operation</h2>
            <OrnamentDivider />
          </div>

          <div className="border border-amber-900/30 rounded-sm bg-[#1a1210]/60 overflow-hidden">
            <dl className="divide-y divide-amber-900/20">
              {HOURS.map((row) => (
                <div key={row.day} className="flex items-center justify-between px-6 py-4 hover:bg-[#1e150f]/50 transition-colors">
                  <dt className="flex items-center gap-3 text-sand-200 font-medium">
                    <Clock size={16} className="text-amber-500" aria-hidden="true" />
                    {row.day}
                  </dt>
                  <dd className="text-sand-400 text-sm tracking-wide">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="text-amber-500/70 text-xs tracking-wide text-center mt-4">Holiday hours may vary. Call to confirm.</p>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-12 px-6 bg-[#120d0b] relative overflow-hidden">
        <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
        <div ref={neighborhoodsSection.ref} className={`max-w-5xl mx-auto transition-all duration-700 ${neighborhoodsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-6">
            <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">Nearby</p>
            <h2 className="font-serif text-4xl md:text-5xl text-amber-100 mb-4">Neighborhoods We Serve</h2>
            <OrnamentDivider />
            <p className="text-sand-400 max-w-xl mx-auto text-base leading-relaxed mt-4">
              The best hookah lounge near you in West LA — conveniently located in Westwood, just minutes from UCLA and surrounding neighborhoods.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {NEIGHBORHOODS.map((n, i) => (
              <div
                key={n.name}
                className="group p-5 border border-amber-900/25 rounded-sm bg-[#1a1210]/60 hover:bg-[#1e150f]/80 hover:border-amber-700/40 transition-all duration-500"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <p className="font-serif text-lg text-amber-200 group-hover:text-amber-100 transition-colors">{n.name}</p>
                <p className="text-sand-500 text-xs tracking-wide mt-1">{n.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parking */}
      <section className="py-12 px-6 bg-[#150f0d] relative overflow-hidden">
        <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">Getting Here</p>
            <h2 className="font-serif text-4xl md:text-5xl text-amber-100 mb-4">Parking &amp; Access</h2>
            <OrnamentDivider />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PARKING_TIPS.map((tip, i) => (
              <article
                key={tip.title}
                className="group relative p-7 border border-amber-900/30 rounded-sm bg-[#1a1210]/60 hover:bg-[#1e150f]/80 transition-all duration-500"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <Car size={24} className="text-amber-500 mb-4" aria-hidden="true" />
                <h3 className="font-serif text-lg text-amber-200 mb-2 group-hover:text-amber-100 transition-colors">{tip.title}</h3>
                <p className="text-sand-400 text-sm leading-relaxed">{tip.desc}</p>
              </article>
            ))}
          </div>

          <BalineseBorder />

          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 px-6 py-4 border border-amber-900/40 rounded-sm bg-amber-950/20">
              <Star size={16} className="fill-amber-400 text-amber-400" aria-hidden="true" />
              <p className="text-sand-300 text-sm">
                <span className="text-amber-300 font-medium">Walk-ins welcome</span> based on availability.
                Must be 18+ to enter. Valid photo ID required.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
