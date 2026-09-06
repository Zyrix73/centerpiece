import { useState, useEffect, type ReactNode } from 'react';
import { Menu, X, Instagram, Facebook } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'Who We Are', href: '/who-we-are' },
  { label: 'Premium Hookah', href: '/premium-hookah' },
  { label: 'Visit Us', href: '/visit-us' },
  { label: 'Private Events', href: '/private-events' },
];

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

interface PageShellProps {
  children: ReactNode;
  pageTitle: string;
  pageDescription: string;
  jsonLd?: object;
}

export default function PageShell({ children, pageTitle, pageDescription, jsonLd }: PageShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.title = pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', pageDescription);
  }, [pageTitle, pageDescription]);

  useEffect(() => {
    const existing = document.getElementById('page-jsonld');
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'page-jsonld';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => {
      const cleanup = document.getElementById('page-jsonld');
      if (cleanup) cleanup.remove();
    };
  }, [jsonLd]);

  return (
    <div className="min-h-screen bg-[#120d0b] text-sand-100 font-sans overflow-x-clip">
      <header>
        <nav
          aria-label="Main navigation"
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled ? 'bg-[#120d0b] border-b border-amber-900/30 py-3' : 'bg-transparent py-5'
          }`}
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

          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            aria-hidden={!menuOpen}
          >
            <div className="relative border-t border-amber-900/30 px-6 py-4 flex flex-col gap-4 bg-[#120d0b]/95">
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
      </header>

      <main className="pt-20">
        {children}
      </main>

      <footer className="bg-[#0d0907] border-t border-amber-900/20 py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div>
              <a href="/" aria-label="Centerpiece Hookah Lounge – home" className="flex items-center gap-3 mb-4">
                <img
                  src="/images/centerpiece_icon_transparent_no_text_cropped.webp"
                  alt=""
                  aria-hidden="true"
                  className="h-12 w-auto object-contain"
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
                  { label: 'Home', href: '/' },
                  ...NAV_LINKS,
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
                <a href="https://www.instagram.com/centerpiecehookahlounge/" target="_blank" rel="noopener noreferrer" aria-label="Centerpiece on Instagram" className="text-sand-600 hover:text-amber-400 transition-colors">
                  <Instagram size={18} aria-hidden="true" />
                </a>
                <a href="https://www.facebook.com/Centerpiecehookahlounge" target="_blank" rel="noopener noreferrer" aria-label="Centerpiece on Facebook" className="text-sand-600 hover:text-amber-400 transition-colors">
                  <Facebook size={18} aria-hidden="true" />
                </a>
                <a href="https://www.tiktok.com/@centerpiecehookahlounge" target="_blank" rel="noopener noreferrer" aria-label="Centerpiece on TikTok" className="text-sand-600 hover:text-amber-400 transition-colors">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <BalineseBorder />

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
              <p>&copy; 2026 Centerpiece Hookah Lounge. All rights reserved.</p>
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

export { OrnamentDivider, BalineseBorder, NAV_LINKS };
