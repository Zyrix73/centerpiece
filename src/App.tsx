import { useState, useEffect, useRef } from 'react';
import { Menu, X, Star, Instagram, Facebook, Twitter, ImagePlus } from 'lucide-react';
import mixesData from './data/mixes.json';

interface Mix {
  id: number;
  name: string;
  flavors: string;
  description: string;
  tagline: string;
  category: string;
  sort_order: number;
  image_url?: string;
}

const MIXES: Mix[] = (mixesData as { mixes: Mix[] }).mixes;

const CATEGORY_ACCENTS: Record<string, { color: string; accent: string }> = {
  'Sweet & Creamy': { color: 'from-amber-900/50 to-orange-900/40', accent: '#fbbf24' },
  'Fruity': { color: 'from-rose-900/40 to-amber-900/40', accent: '#e8bc72' },
  'Fruity & Icy': { color: 'from-teal-900/50 to-rose-900/40', accent: '#2dd4bf' },
  'Citrus & Refreshing': { color: 'from-lime-900/40 to-teal-900/40', accent: '#a3e635' },
};

const DEFAULT_ACCENT = { color: 'from-amber-900/50 to-orange-900/40', accent: '#fbbf24' };

const NAV_LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'Who We Are', href: '/who-we-are' },
  { label: 'Premium Hookah', href: '/premium-hookah' },
  { label: 'Visit Us', href: '/visit-us' },
  { label: 'Private Events', href: '/private-events' },
];

const EXPERIENCES = [
  {
    icon: '✦',
    title: 'Craft Shisha',
    desc: 'Over 15 years mixing flavors by hand — dark leaf and premium blends you will not taste anywhere else, built on Darkside, Must Have, Sebero, and Tangiers.',
  },
  {
    icon: '✦',
    title: 'Premium Equipment',
    desc: 'Wookah, Amy Deluxe, Alpha Hookah and top Russian setups, glass bowls, Alpha HMD heat management, and only the highest-quality natural charcoal.',
  },
  {
    icon: '✦',
    title: 'A Huge Tea Selection',
    desc: 'A deep menu of teas to pair with your session — the perfect slow companion to a refined bowl.',
  },
  {
    icon: '✦',
    title: 'Live Ambiance',
    desc: 'Easy, chill music on weeknights. Come the weekend it turns up — louder, curated live by our house DJ.',
  },
];

const FALLBACK_REVIEWS = [
  {
    name: 'Mia R.',
    rating: 5,
    date: 'June 2025',
    text: "My go-to for sure. This place is amazing. Mina is a class act. Definitely makes you feel like you're sitting in your living room enjoying yourself with A+ customer service.",
    source: 'Google',
  },
  {
    name: 'Jason K.',
    rating: 5,
    date: 'May 2025',
    text: 'Great hookah spot with a really good vibe. The music was on point all night and the atmosphere was chill and welcoming. Mustafa was super friendly and made the experience even better.',
    source: 'Google',
  },
  {
    name: 'Priya S.',
    rating: 5,
    date: 'April 2025',
    text: 'Lovely staff and good hookah. Our server was sweet and attentive. Will be coming back of course!',
    source: 'Google',
  },
  {
    name: 'Derek M.',
    rating: 5,
    date: 'March 2025',
    text: 'Great hookah, nice chill music, the wings are fire and service was pretty quick. Very nice place — much recommended.',
    source: 'Yelp',
  },
  {
    name: 'Layla N.',
    rating: 5,
    date: 'February 2025',
    text: 'Spacious lounge with comfortable sofa seats and nice decoration that creates a cozy, chill vibe. Music plays well and complements the relaxed atmosphere. 10/10.',
    source: 'Yelp',
  },
  {
    name: 'Carlos V.',
    rating: 5,
    date: 'January 2025',
    text: 'The service there was very good — the fellow who attended to me was friendly and attentive. Great vibes, great hookah. This is my new spot in LA.',
    source: 'Google',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Where is Centerpiece Hookah Lounge located?',
    a: 'We are located at 1446 Westwood Blvd, Los Angeles, CA 90024 — in the heart of Westwood, West Los Angeles, just minutes from UCLA.',
  },
  {
    q: 'What are your hours?',
    a: 'Monday–Thursday: 2 PM – 2 AM · Friday: 2 PM – 4 AM · Saturday: 3 PM – 4 AM · Sunday: 2 PM – 2:30 AM. Holiday hours may vary.',
  },
  {
    q: 'Do I need a reservation?',
    a: 'Reservations are strongly recommended on weekends. Walk-ins are welcome based on availability. Reserved tables are held for 15 minutes.',
  },
  {
    q: 'What is the minimum age to enter?',
    a: 'Guests must be 21 years of age or older to enter. Valid photo ID is required.',
  },
  {
    q: 'What hookah flavors do you offer?',
    a: 'We carry 50+ premium shisha flavors sourced from Indonesia, Turkey, and Egypt — from florals and mint to bold double-apple classics and exotic signatures.',
  },
  {
    q: 'Can I book Centerpiece for a private event?',
    a: 'Yes! Our private suite is available for birthdays, corporate gatherings, and celebrations of all kinds. Fully customizable with dedicated service. Call us to plan your event.',
  },
  {
    q: 'What neighborhoods is Centerpiece near?',
    a: "We are easily accessible from Westwood, UCLA, West LA, Sawtelle, Brentwood, Westwood Village, Century City, Bel Air, Beverly Hills, Mar Vista, Palms, Culver City, Santa Monica, Venice, Beverly Grove, Fairfax, Mid-City, West Hollywood, Hollywood, Pacific Palisades, Koreatown, Sherman Oaks, Encino, Tarzana, Silver Lake, Echo Park, Los Feliz, Downtown LA, and beyond. We're the top hookah lounge in West LA.",
  },
  {
    q: 'Is Centerpiece good for studying?',
    a: 'Yes. Centerpiece is designed for both relaxation and focus. We offer a quiet atmosphere, premium WiFi, and comfortable seating — perfect for students and professionals who want to study or work while enjoying a hookah session.',
  },
  {
    q: 'Can I work and smoke hookah at Centerpiece?',
    a: 'Absolutely. Many of our guests work or study while they enjoy their hookah. Our quiet lounge areas, comfortable seating, and free WiFi make Centerpiece a popular study spot for UCLA students and West LA professionals.',
  },
  {
    q: 'Do you have WiFi for students?',
    a: 'Yes, we offer complimentary WiFi throughout the lounge. Students and professionals are welcome to study, work, and relax with premium hookah in our quiet, comfortable seating areas.',
  },
  {
    q: 'Is the hookah clean and hygienic?',
    a: "Yes. Every hookah is thoroughly washed and sanitized after each use, and every guest smokes through a fresh, single-use disposable hose — never shared, never reused. Our hookahs are also assigned to specific flavor profiles, so you're never getting cross-contaminated notes from a previous blend. Hygiene isn't an afterthought here; it's part of how every session is built from the ground up.",
  },
  {
    q: 'What is a Wookah hookah, and why do you use it?',
    a: "Wookah is a premium, handcrafted hookah made in Europe from high-grade 1.4301 (V2A) stainless steel with a hand-finished wood accent — chosen for its durability, resistance to corrosion, and the fact that it doesn't retain smells between sessions the way lesser metals do. Each Wookah includes a downstem with a demountable diffuser, which softens and quiets the draw for a smooth, undisturbed session; guests who prefer the traditional, louder pull can simply remove it. We use Wookah because it's built to be washed, trusted, and reused — not mass-produced and discarded — which is part of why every session at Centerpiece feels consistent from your first draw to your last.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function OrnamentDivider() {
  return (
    <div className="flex items-center gap-4 justify-center my-6">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-600/50" />
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none" aria-hidden="true">
        <path d="M16 2 L20 8 L16 14 L12 8 Z" fill="#c9a84c" opacity="0.9" />
        <circle cx="4" cy="8" r="2" fill="#c9a84c" opacity="0.5" />
        <circle cx="28" cy="8" r="2" fill="#c9a84c" opacity="0.5" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-600/50" />
    </div>
  );
}

function BalineseBorder() {
  return (
    <div className="w-full flex justify-center py-2 opacity-30" aria-hidden="true">
      <svg width="200" height="20" viewBox="0 0 200 20">
        <pattern id="p" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <polygon points="10,1 19,10 10,19 1,10" fill="none" stroke="#c9a84c" strokeWidth="0.8" />
          <circle cx="10" cy="10" r="2" fill="#c9a84c" />
        </pattern>
        <rect width="200" height="20" fill="url(#p)" />
      </svg>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [reviews] = useState(FALLBACK_REVIEWS);

  const experienceSection = useInView();
  const menuSection = useInView();
const reviewsSection = useInView();
  const faqSection = useInView();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#120d0b] text-sand-100 font-sans overflow-x-hidden" data-amenities="WiFi, Study seating, Quiet areas, Premium hookah" data-audience="students, professionals, locals">

      {/* ── HEADER / NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav
          aria-label="Main navigation"
          className={`transition-all duration-500 ${
            scrolled ? 'bg-[#120d0b] border-b border-amber-900/30 py-3' : 'bg-transparent py-5'
          }`
          }
        >
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 items-center">
            <a href="/" aria-label="Centerpiece Hookah Lounge – home" className="flex items-center gap-3 group">
              <img
                src="/images/centerpiece_icon_transparent_no_text_cropped.webp"
                alt=""
                aria-hidden="true"
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col leading-none">
                <span className="font-serif text-2xl font-bold text-amber-400 tracking-wider group-hover:text-amber-300 transition-colors">
                  CENTERPIECE
                </span>
                <span className="text-[10px] tracking-[0.35em] text-amber-600/80 uppercase">Hookah Lounge</span>
              </div>
            </a>

            <div className="hidden md:flex items-center justify-center gap-5 lg:gap-8">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-xs md:text-sm tracking-widest uppercase text-sand-300 hover:text-amber-400 transition-colors duration-300 relative group whitespace-nowrap"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            <div className="flex items-center justify-end gap-4 col-span-2 md:col-span-1">
              <div className="hidden md:flex items-center gap-4">
                <a href="https://www.instagram.com/centerpiecehookahlounge/" target="_blank" rel="noopener noreferrer" aria-label="Centerpiece on Instagram" className="text-amber-400/70 hover:text-amber-300 transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://www.facebook.com/Centerpiecehookahlounge" target="_blank" rel="noopener noreferrer" aria-label="Centerpiece on Facebook" className="text-amber-400/70 hover:text-amber-300 transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="https://www.tiktok.com/@centerpiecehookahlounge" target="_blank" rel="noopener noreferrer" aria-label="Centerpiece on TikTok" className="text-amber-400/70 hover:text-amber-300 transition-colors">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
                </a>
              </div>
              <button
                className="text-amber-400 p-1 md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
            aria-hidden={!menuOpen}
          >
            <div className="relative border-t border-amber-900/30 px-6 py-4 flex flex-col gap-4 bg-[#120d0b]/95">
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: 'radial-gradient(ellipse at top, rgba(201,168,76,0.12) 0%, transparent 60%), radial-gradient(ellipse at bottom, rgba(80,50,10,0.15) 0%, transparent 50%)' }} />
              <div className="relative z-10 flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm tracking-widest uppercase text-sand-300 hover:text-amber-400 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center gap-5 pt-2">
                <a href="https://www.instagram.com/centerpiecehookahlounge/" target="_blank" rel="noopener noreferrer" aria-label="Centerpiece on Instagram" className="text-amber-400/70 hover:text-amber-300 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://www.facebook.com/Centerpiecehookahlounge" target="_blank" rel="noopener noreferrer" aria-label="Centerpiece on Facebook" className="text-amber-400/70 hover:text-amber-300 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="https://www.tiktok.com/@centerpiecehookahlounge" target="_blank" rel="noopener noreferrer" aria-label="Centerpiece on TikTok" className="text-amber-400/70 hover:text-amber-300 transition-colors">
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
                </a>
              </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Happy Hour Banner */}
        <div className="happy-hour-banner relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-3 py-1.5 sm:py-2 px-4">
            <span className="text-amber-50 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase whitespace-nowrap">
              Happy Hour 2–6 PM · 7 Days a Week
            </span>
            <span className="text-amber-200/60 text-xs hidden sm:inline" aria-hidden="true">|</span>
            <span className="text-amber-100 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">
              Hookah $35
            </span>
          </div>
        </div>
      </header>

      <main>
        {/* ── HERO ── */}
        <section id="hero" aria-label="Centerpiece Hookah Lounge – welcome" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="/images/centerpiece-hero.webp"
              alt="Centerpiece Hookah Lounge study seating, Westwood near UCLA"
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#120d0b]/70 via-[#120d0b]/40 to-[#120d0b]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#120d0b]/50 via-transparent to-[#120d0b]/50" />
          </div>

          {/* Smoke particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full blur-3xl animate-smoke"
                style={{
                  width: `${80 + i * 40}px`,
                  height: `${80 + i * 40}px`,
                  left: `${20 + i * 25}%`,
                  top: `${30 + (i % 3) * 15}%`,
                  background: 'rgba(255,255,255,0.04)',
                  animationDelay: `${i * 1.5}s`,
                  animationDuration: `${7 + i}s`,
                  willChange: 'transform, opacity',
                }}
              />
            ))}
          </div>

          {/* Flickering lantern light blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div
              className="absolute flicker-a"
              style={{
                width: '50vw', height: '45vh',
                top: '-10%', left: '50%', transform: 'translateX(-50%)',
                background: 'radial-gradient(ellipse, rgba(255,180,50,0.16) 0%, rgba(255,140,20,0.05) 40%, transparent 70%)',
                filter: 'blur(18px)',
                willChange: 'opacity',
              }}
            />
            <div
              className="absolute flicker-b"
              style={{
                width: '32vw', height: '40vh',
                top: '5%', left: '-6%',
                background: 'radial-gradient(ellipse, rgba(255,160,40,0.12) 0%, rgba(220,120,20,0.04) 45%, transparent 70%)',
                filter: 'blur(22px)',
                animationDelay: '1.3s',
                willChange: 'opacity',
              }}
            />
          </div>

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
            {/* Visually hidden H1 for search engines — the logo image conveys this visually */}
            <h1 className="sr-only">Centerpiece Hookah Lounge — Premium Shisha Bar in Westwood, West Los Angeles</h1>

            <div
              className="animate-fade-up flex justify-center w-full"
              style={{ animationDelay: '0.2s' }}
            >
              <img
                src="/images/centerpiece_logo_transparent_no_circle copy.webp"
                alt="Centerpiece Hookah Lounge logo"
                className="w-full max-w-2xl neon-breathe -translate-y-[20%] md:-translate-y-[15%]"
                loading="eager"
                decoding="async"
              />
            </div>

            <p
              className="text-sand-300/90 text-lg md:text-xl max-w-xl mx-auto mt-2 mb-5 leading-relaxed font-light tracking-wide animate-fade-up"
              style={{ animationDelay: '0.4s' }}
            >
              Refined smoke. Exclusive blends. An unforgettable experience —
              crafted over 20 years in the heart of West LA.
            </p>

            {/* Rating summary */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < 5 ? 'fill-amber-400 text-amber-400' : 'text-amber-400/30'} aria-hidden="true" />
                ))}
                <span className="text-sand-400 text-sm ml-2">4.7 · 117 reviews on Google</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-amber-900/40" aria-hidden="true" />
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < 5 ? 'fill-amber-400 text-amber-400' : 'text-amber-400/30'} aria-hidden="true" />
                ))}
                <span className="text-sand-400 text-sm ml-2">4.9 · 119 reviews on Yelp</span>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float" aria-hidden="true">
            <div className="w-px h-10 bg-gradient-to-b from-amber-500/60 to-transparent" />
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" aria-labelledby="experience-heading" className="py-14 px-6 bg-[#120d0b] relative overflow-hidden">
          <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />

          <div ref={experienceSection.ref} className={`max-w-6xl mx-auto transition-all duration-700 ${experienceSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-8">
              <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">The Experience</p>
              <h2 id="experience-heading" className="font-serif text-4xl md:text-5xl text-amber-100 mb-4">
                Refined Smoke. Exclusive Blends.
              </h2>
              <OrnamentDivider />
              <p className="text-sand-400 max-w-xl mx-auto text-base leading-relaxed mt-4">
                For over 20 years we have obsessed over one thing: the perfect session.
                Premium hookahs, high-quality tobacco, natural charcoal, and impeccable
                service — brought together in a sophisticated, immersive room in the
                heart of West Los Angeles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EXPERIENCES.map((item, i) => (
                <article
                  key={item.title}
                  className="group relative p-7 border border-amber-900/30 rounded-sm hover:border-amber-600/50 transition-all duration-500 bg-[#1a1210]/60 hover:bg-[#1e150f]/80"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                  <div className="text-amber-500 text-2xl mb-4 font-serif" aria-hidden="true">{item.icon}</div>
                  <h3 className="font-serif text-lg text-amber-200 mb-2 group-hover:text-amber-100 transition-colors">{item.title}</h3>
                  <p className="text-sand-400 text-sm leading-relaxed">{item.desc}</p>
                </article>
              ))}
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { val: '50+', label: 'Flavor Profiles' },
                { val: '20+', label: 'Years of Mastery' },
                { val: 'DJ', label: 'Live on Weekends' },
                { val: '∞', label: 'Exclusive Blends' },
              ].map((s) => (
                <div key={s.label} className="group">
                  <div className="font-serif text-4xl md:text-5xl text-amber-400 font-bold mb-1 group-hover:text-amber-300 transition-colors">
                    {s.val}
                  </div>
                  <div className="text-sand-500 text-xs tracking-widest uppercase">{s.label}</div>
                </div>
              ))}
            </div>

            {/* The Vibe story block */}
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
              <div>
                <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">The Vibe</p>
                <h3 className="font-serif text-3xl md:text-4xl text-amber-100 mb-4 leading-tight">
                  A Room That Reads Your Night
                </h3>
                <OrnamentDivider />
                <div className="space-y-4 text-sand-300 text-base leading-relaxed mt-6">
                  <p>
                    On weeknights, Centerpiece slows down. The music stays low and easy,
                    the lighting soft — a place to sink into the couch, share a bowl, and
                    let the conversation stretch late into the evening.
                  </p>
                  <p>
                    Come the weekend, the room turns up. Our house DJ takes over, the
                    sound gets louder and more curated, and the energy lifts into something
                    you feel. Same refined craft, a completely different pulse.
                  </p>
                  <p className="text-amber-200/90 italic text-lg leading-relaxed">
                    Elevated music. Curated Happy Hour. An atmosphere designed to be felt,
                    not just heard.
                  </p>
                </div>
              </div>
              <div className="relative max-w-md mx-auto md:mx-0 w-full">
                <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-amber-700/30 bg-[#1a1210]/60">
                  <img
                    src="/images/centerpiece-hero.webp"
                    alt="Centerpiece Hookah Lounge room with warm lighting, premium hookahs, and seating in West Los Angeles"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120d0b]/60 via-transparent to-transparent" aria-hidden="true" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-14 h-14 border-r-2 border-b-2 border-amber-600/40 rounded-sm pointer-events-none" aria-hidden="true" />
                <div className="absolute -top-3 -left-3 w-14 h-14 border-l-2 border-t-2 border-amber-600/40 rounded-sm pointer-events-none" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* ── MENU / FLAVORS ── */}
        <section id="menu" aria-labelledby="menu-heading" className="py-14 px-6 bg-[#150f0d] relative overflow-hidden">
          <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />

          <div ref={menuSection.ref} className={`max-w-6xl mx-auto transition-all duration-700 ${menuSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-8">
              <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">Signature Collection</p>
              <h2 id="menu-heading" className="font-serif text-4xl md:text-5xl text-amber-100 mb-4">
                Curated Flavors
              </h2>
              <OrnamentDivider />
              <p className="text-sand-400 max-w-xl mx-auto text-base leading-relaxed mt-4">
                From smooth blonde leaf to bold, complex dark leaf — plus exclusive
                in-house blends mixed over 15 years and found nowhere else. The best
                hookah near UCLA and the West LA area.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {MIXES.map((mix, i) => {
                const theme = CATEGORY_ACCENTS[mix.category] ?? DEFAULT_ACCENT;
                const cardBg = 'relative bg-gradient-to-br ' + theme.color + ' p-7 z-10 flex-1';
                return (
                  <article
                    key={mix.id}
                    className="group relative overflow-hidden rounded-sm border border-amber-900/25 hover:border-amber-700/50 transition-all duration-500 cursor-default flex flex-col"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#1a1210]">
                      {mix.image_url ? (
                        <img
                          src={mix.image_url}
                          alt={`${mix.name} — ${mix.tagline}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1210] to-[#241814]">
                          <ImagePlus size={32} className="text-amber-700/30" aria-hidden="true" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#150f0d]/50 via-[#150f0d]/15 to-transparent" aria-hidden="true" />
                    </div>
                    <div className={cardBg}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span
                            className="text-[10px] tracking-[0.3em] uppercase font-medium mb-1 block"
                            style={{ color: theme.accent }}
                          >
                            {mix.category}
                          </span>
                          <h3 className="font-serif text-xl text-amber-100 group-hover:text-white transition-colors">
                            {mix.name}
                          </h3>
                        </div>
                        <div
                          className="w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 mt-1"
                          style={{ borderColor: theme.accent + '60', background: theme.accent + '15' }}
                          aria-hidden="true"
                        >
                          <span style={{ color: theme.accent }} className="text-xs">✦</span>
                        </div>
                      </div>
                      <p className="text-amber-300/80 text-xs italic mb-2">{mix.tagline}</p>
                      <p className="text-sand-400 text-sm leading-relaxed">{mix.description}</p>
                      <div
                        className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500"
                        style={{ background: 'linear-gradient(90deg, ' + theme.accent + '80, transparent)' }}
                        aria-hidden="true"
                      />
                    </div>
                  </article>
                );
              })}
            </div>

            <p className="text-center mt-6 text-sand-500 text-sm">
              View our complete menu of <span className="text-amber-400">50+ flavor profiles</span> at the bar.
            </p>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section id="reviews" aria-labelledby="reviews-heading" className="py-14 px-6 bg-[#120d0b] relative overflow-hidden">
          <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />

          <div ref={reviewsSection.ref} className={`max-w-6xl mx-auto transition-all duration-700 ${reviewsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-8">
              <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">What Guests Say</p>
              <h2 id="reviews-heading" className="font-serif text-4xl md:text-5xl text-amber-100 mb-4">
                Guest Reviews
              </h2>
              <OrnamentDivider />
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-6">
                {/* Google */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex items-center gap-1.5" aria-label="4.7 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className={i < 5 ? 'fill-amber-400 text-amber-400' : 'text-amber-400/30'} aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-amber-300 font-serif text-2xl font-bold">4.7</p>
                  <p className="text-sand-500 text-sm">117 reviews on Google</p>
                </div>
                <div className="hidden sm:block w-px h-16 bg-amber-900/30" aria-hidden="true" />
                {/* Yelp */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex items-center gap-1.5" aria-label="4.9 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className={i < 5 ? 'fill-amber-400 text-amber-400' : 'text-amber-400/30'} aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-amber-300 font-serif text-2xl font-bold">4.9</p>
                  <p className="text-sand-500 text-sm">119 reviews on Yelp</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews.map((review, i) => (
                <article
                  key={review.name}
                  className="group relative p-7 border border-amber-900/25 hover:border-amber-700/40 rounded-sm bg-[#1a1210]/60 hover:bg-[#1e150f]/80 transition-all duration-500 flex flex-col gap-4"
                  style={{ transitionDelay: `${i * 60}ms` }}
                  itemScope
                  itemType="https://schema.org/Review"
                >
                  <div itemProp="itemReviewed" itemScope itemType="https://schema.org/LocalBusiness" style={{ display: 'none' }}>
                    <meta itemProp="name" content="Centerpiece Hookah Lounge" />
                    <meta itemProp="url" content="https://centerpiecehookahlounge.com/" />
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

                  <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`} itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    <meta itemProp="ratingValue" content={String(review.rating)} />
                    <meta itemProp="bestRating" content="5" />
                    <meta itemProp="worstRating" content="1" />
                    {[...Array(review.rating)].map((_, s) => (
                      <Star key={s} size={13} className="fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>

                  <blockquote className="text-sand-300 text-sm leading-relaxed flex-1 relative" itemProp="reviewBody">
                    <span className="absolute -top-2 -left-1 text-amber-600/30 font-serif text-5xl leading-none select-none" aria-hidden="true">"</span>
                    <span className="relative z-10">{review.text}</span>
                  </blockquote>

                  <div className="flex items-center justify-between pt-3 border-t border-amber-900/20">
                    <div>
                      <p className="text-amber-200 text-sm font-medium" itemProp="author" itemScope itemType="https://schema.org/Person"><span itemProp="name">{review.name}</span></p>
                      <p className="text-sand-600 text-xs" itemProp="datePublished">{review.date}</p>
                    </div>
                    <span className="text-[10px] tracking-widest uppercase text-sand-600 border border-sand-800 px-2 py-1 rounded-sm">
                      {review.source}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-6">
              <a
                href="https://www.google.com/maps/search/centerpiece+hookah+lounge+westwood+los+angeles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm tracking-wide border border-amber-700/40 hover:border-amber-600/70 px-6 py-3 rounded-sm transition-all duration-300"
              >
                <Star size={14} className="fill-amber-400" aria-hidden="true" />
                See all reviews on Google
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" aria-labelledby="faq-heading" className="py-14 px-6 bg-[#150f0d] relative overflow-hidden">
          <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />

          <div ref={faqSection.ref} className={`max-w-3xl mx-auto transition-all duration-700 ${faqSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-8">
              <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">Have Questions?</p>
              <h2 id="faq-heading" className="font-serif text-4xl md:text-5xl text-amber-100 mb-4">
                Frequently Asked Questions
              </h2>
              <OrnamentDivider />
            </div>

            <dl className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="border border-amber-900/30 rounded-sm bg-[#1a1210]/60 overflow-hidden"
                >
                  <dt>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      className="w-full flex items-center justify-between px-6 py-5 text-left text-amber-200 hover:text-amber-100 transition-colors group"
                    >
                      <span className="font-serif text-base pr-4">{item.q}</span>
                      <span
                        className={`flex-shrink-0 w-5 h-5 rounded-full border border-amber-700/50 flex items-center justify-center text-amber-500 text-xs transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      >
                        ▾
                      </span>
                    </button>
                  </dt>
                  <dd
                    className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="px-6 pb-5 text-sand-400 text-sm leading-relaxed">{item.a}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0d0907] border-t border-amber-900/20 py-14 px-6" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div>
              <a href="/" aria-label="Centerpiece Hookah Lounge – home" className="flex items-center gap-3 mb-4">
                <img
                  src="/images/centerpiece_icon_transparent_no_text_cropped.webp"
                  alt=""
                  aria-hidden="true"
                  className="h-12 w-auto object-contain"
                  loading="lazy"
                />
                <div>
                  <div className="font-serif text-2xl font-bold text-amber-400 tracking-wider leading-none">CENTERPIECE</div>
                  <div className="text-[10px] tracking-[0.35em] text-amber-600/70 uppercase mt-0.5">Hookah Lounge</div>
                </div>
              </a>
              <p className="text-sand-500 text-sm leading-relaxed max-w-xs">
                Refined smoke, exclusive blends, and the craft of premium hookah in
                Westwood, Los Angeles, CA 90024. Where every visit becomes a memory.
              </p>
            </div>

            <nav aria-label="Footer navigation">
              <h4 className="text-amber-400 text-xs tracking-widest uppercase mb-4">Navigate</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Experience', href: '#experience' },
                  { label: 'Menu', href: '/menu' },
                  { label: 'Reviews', href: '#reviews' },
                  { label: 'FAQ', href: '#faq' },
                  { label: 'Who We Are', href: '/who-we-are' },
                  { label: 'Premium Hookah', href: '/premium-hookah' },
                  { label: 'Study-friendly lounge with WiFi', href: '/visit-us' },
                  { label: 'Private Events', href: '/private-events' },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sand-500 hover:text-amber-400 text-sm transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h4 className="text-amber-400 text-xs tracking-widest uppercase mb-4">Connect</h4>
              <address className="not-italic space-y-2 text-sand-500 text-sm mb-5" itemScope itemType="https://schema.org/LocalBusiness">
                <meta itemProp="name" content="Centerpiece Hookah Lounge" />
                <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <p itemProp="streetAddress">1446 Westwood Blvd</p>
                  <p><span itemProp="addressLocality">Los Angeles</span>, <span itemProp="addressRegion">CA</span> <span itemProp="postalCode">90024</span></p>
                </div>
                <p>
                  <a href="tel:+13109770780" itemProp="telephone" className="text-sand-300 hover:text-amber-400 transition-colors">(310) 977-0780</a>
                </p>
              </address>
              <div className="flex items-center gap-4">
                {[
                  { icon: <Instagram size={18} aria-hidden="true" />, label: 'Instagram', href: 'https://www.instagram.com/centerpiecehookahlounge/' },
                  { icon: <Facebook size={18} aria-hidden="true" />, label: 'Facebook', href: 'https://www.facebook.com/Centerpiecehookahlounge' },
                  { icon: <Twitter size={18} aria-hidden="true" />, label: 'Twitter', href: '#' },
                  { icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>, label: 'TikTok', href: 'https://www.tiktok.com/@centerpiecehookahlounge' },
                ].map(({ icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href !== '#' ? '_blank' : undefined}
                    rel={href !== '#' ? 'noopener noreferrer' : undefined}
                    aria-label={`Centerpiece on ${label}`}
                    className="text-sand-600 hover:text-amber-400 transition-colors"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <BalineseBorder />

          {/* Google Maps embed */}
          <div className="mt-8 mb-8 rounded-sm overflow-hidden border border-amber-900/30">
            <iframe
              title="Centerpiece Hookah Lounge location on Google Maps"
              src="https://www.google.com/maps?q=Centerpiece+Hookah+Lounge,+1446+Westwood+Blvd,+Los+Angeles,+CA+90024&output=embed"
              width="100%"
              height="240"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="flex flex-col items-center gap-3 mt-6 text-sand-600 text-xs">
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3">
              <p>© 2026 Centerpiece Hookah Lounge. All rights reserved.</p>
              <p>Must be 21+ to enter.</p>
            </div>
            <a href="https://getzyrix.com" target="_blank" rel="noopener noreferrer" aria-label="Designed by Get Zyrix" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <span className="hover:text-amber-400 transition-colors">designed by Get Zyrix</span>
              <img src="/images/get-zyrix-footer.png" alt="Get Zyrix" className="h-6 w-auto object-contain" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
