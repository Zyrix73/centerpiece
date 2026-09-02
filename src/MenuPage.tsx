import { useRef, useState, useEffect, useCallback } from 'react';
import { Flame, Coffee, UtensilsCrossed, FileText, Download, ChefHat, ImagePlus } from 'lucide-react';
import PageShell, { OrnamentDivider } from './components/PageShell';
import mixesData from './data/mixes.json';
import foodData from './data/food.json';
import drinksData from './data/drinks.json';

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

interface FoodItem {
  name: string;
  desc: string;
  price: string;
  category: string;
  featured?: boolean;
  image_url?: string | null;
}

interface FoodSize {
  label: string;
  price: string;
}

interface DisplayFoodItem {
  name: string;
  desc: string;
  category: string;
  featured?: boolean;
  image_url?: string | null;
  sizes: FoodSize[];
}

interface DrinkItem {
  name: string;
  desc: string;
  price: string;
  type: string;
  category: string;
  featured?: boolean;
  image_url?: string | null;
}

const MIXES: Mix[] = (mixesData as { mixes: Mix[] }).mixes;
const FOOD: FoodItem[] = (foodData as { foods: FoodItem[] }).foods;
const DRINKS: DrinkItem[] = (drinksData as { drinks: DrinkItem[] }).drinks;

const MIXES_BY_CATEGORY = (() => {
  const groups: { category: string; items: Mix[] }[] = [];
  for (const mix of MIXES) {
    const cat = mix.category || 'Other';
    let group = groups.find((g) => g.category === cat);
    if (!group) {
      group = { category: cat, items: [] };
      groups.push(group);
    }
    group.items.push(mix);
  }
  groups.forEach((g) => g.items.sort((a, b) => a.sort_order - b.sort_order));
  return groups;
})();

const FOOD_BY_CATEGORY = (() => {
  const groups: { category: string; items: DisplayFoodItem[] }[] = [];
  for (const item of FOOD) {
    const cat = item.category || 'Other';
    let group = groups.find((g) => g.category === cat);
    if (!group) {
      group = { category: cat, items: [] };
      groups.push(group);
    }

    const sizeMatch = item.name.match(/\s*-\s*(Small|Large)\s*$/i);
    if (sizeMatch) {
      const baseName = item.name.slice(0, sizeMatch.index).trim();
      const sizeLabel = sizeMatch[1].charAt(0).toUpperCase() + sizeMatch[1].slice(1).toLowerCase();
      const existing = group.items.find((g) => g.name === baseName);
      if (existing) {
        existing.sizes.push({ label: sizeLabel, price: item.price });
        continue;
      }
      group.items.push({
        name: baseName,
        desc: item.desc,
        category: cat,
        featured: item.featured,
        image_url: item.image_url,
        sizes: [{ label: sizeLabel, price: item.price }],
      });
    } else {
      group.items.push({
        name: item.name,
        desc: item.desc,
        category: cat,
        featured: item.featured,
        image_url: item.image_url,
        sizes: [{ label: '', price: item.price }],
      });
    }
  }
  return groups;
})();

const DRINK_TYPE_ORDER = ['Hot Drink', 'Cold Drink'];

const DRINKS_BY_TYPE = DRINK_TYPE_ORDER.flatMap((type) => {
  const typeItems = DRINKS.filter((d) => d.type === type);
  if (typeItems.length === 0) return [];
  const categories: { category: string; items: DrinkItem[] }[] = [];
  for (const item of typeItems) {
    const cat = item.category || 'Other';
    let group = categories.find((g) => g.category === cat);
    if (!group) {
      group = { category: cat, items: [] };
      categories.push(group);
    }
    group.items.push(item);
  }
  return [{ type, categories }];
}).filter((g) => g.categories.length > 0);

const FLAVOR_PILL_CLASSES =
  'inline-block px-2.5 py-1 text-xs rounded-full bg-amber-100/10 text-amber-200/80 border border-amber-300/20';

type SectionId = 'food' | 'drinks' | 'hookah';

const SECTIONS: { id: SectionId; label: string; icon: typeof Flame }[] = [
  { id: 'food', label: 'Food & Snacks', icon: UtensilsCrossed },
  { id: 'drinks', label: 'Drinks & Tea', icon: Coffee },
  { id: 'hookah', label: 'Build My Hookah', icon: Flame },
];

function FeaturedBadge({ label }: { label: string }) {
  return (
    <span className="absolute top-3 right-3 text-[10px] tracking-widest uppercase text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-sm bg-[#1a1210]/80 z-10">
      {label}
    </span>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12 text-sand-500 text-sm italic">
      {message}
    </div>
  );
}

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

export default function MenuPage() {
  const [activeSection, setActiveSection] = useState<SectionId>('food');
  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    food: null,
    drinks: null,
    hookah: null,
  });
  const minaRef = useInView();

  const scrollToSection = useCallback((id: SectionId) => {
    const el = sectionRefs.current[id];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const handleSectionClick = useCallback((id: SectionId) => {
    if (id === 'hookah') {
      window.location.href = '/build-my-hookah';
    } else {
      scrollToSection(id);
    }
  }, [scrollToSection]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section') as SectionId | null;
            if (id) setActiveSection(id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );
    (Object.keys(sectionRefs.current) as SectionId[]).forEach((id) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Centerpiece Hookah Lounge Menu",
    "hasMenuSection": [
      {
        "@type": "MenuSection",
        "name": "Drinks & Tea",
        "hasMenuItem": DRINKS.map((item) => ({
          "@type": "MenuItem",
          "name": item.name,
          "description": item.desc || undefined,
          "offers": { "@type": "Offer", "price": item.price.replace('$', '') }
        }))
      },
      {
        "@type": "MenuSection",
        "name": "Food & Snacks",
        "hasMenuItem": FOOD.map((item) => ({
          "@type": "MenuItem",
          "name": item.name,
          "description": item.desc || undefined,
          "offers": { "@type": "Offer", "price": item.price.replace('$', '') }
        }))
      },
      {
        "@type": "MenuSection",
        "name": "Signature Mixes",
        "hasMenuItem": MIXES_BY_CATEGORY.flatMap((group) =>
          group.items.map((mix) => ({
            "@type": "MenuItem",
            "name": mix.name,
            "description": mix.description
          }))
        )
      }
    ]
  };

  return (
    <PageShell
      pageTitle="Menu | Centerpiece Hookah Lounge — Hookah, Drinks & Food in Westwood"
      pageDescription="Explore the full Centerpiece Hookah Lounge menu: premium hookah flavors, drinks, tea, and food. Visit us in Westwood, Los Angeles CA 90024."
      jsonLd={jsonLd}
    >
      <div className="bg-[#120d0b] text-sand-100">
        {/* Hero */}
        <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/7973045/pexels-photo-7973045.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Glowing hookah coals — the heart of our menu"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-[#120d0b]/70" />
          </div>
          <div className="relative z-10 text-center px-6">
            <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">Signature Collection</p>
            <h1 className="font-serif text-4xl md:text-6xl text-amber-100 mb-4 whitespace-nowrap">Our Menu</h1>
            <OrnamentDivider />
            <p className="text-sand-300/90 max-w-xl mx-auto text-base leading-relaxed">
              Premium hookah flavors, traditional tea service, and kitchen favorites —
              all crafted to complement your shisha experience.
            </p>
          </div>
        </section>

        {/* Sticky filter + all sections */}
        <section className="pt-10 pb-16 px-6 bg-[#120d0b] relative">
          <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
          <div className="max-w-5xl mx-auto relative z-10">
            {/* Sticky filter buttons */}
            <div className="sticky top-[64px] z-30 -mx-6 px-6 py-4 bg-[#120d0b]/95 backdrop-blur-sm border-b border-amber-900/30 mb-10">
              <div className="flex flex-row items-center justify-center gap-2 sm:gap-3">
                {SECTIONS.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2.5 sm:px-6 sm:py-3.5 text-[11px] sm:text-sm tracking-widest uppercase transition-all duration-300 rounded-sm border ${
                        isActive
                          ? 'bg-amber-600 border-amber-600 text-white font-semibold'
                          : 'border-amber-700/40 text-sand-300 hover:text-amber-400 hover:border-amber-600/60 bg-[#1a1210]/60'
                      }`}
                    >
                      <Icon size={16} aria-hidden="true" />
                      {section.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Food & Snacks */}
            <div
              ref={(el) => { sectionRefs.current.food = el; }}
              data-section="food"
              className="scroll-mt-24 mb-16"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-l from-amber-700/40 to-transparent" aria-hidden="true" />
                <h2 className="font-serif text-2xl text-amber-200 text-center px-4">Food & Snacks</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-amber-700/40 to-transparent" aria-hidden="true" />
              </div>
              {FOOD.length === 0 ? (
                <EmptyState message="Food menu coming soon." />
              ) : (
                <div className="space-y-7">
                  {FOOD_BY_CATEGORY.map((group) => (
                    <div key={group.category}>
                      <div className="flex items-center gap-4 mb-6">
                        <h3 className="font-serif text-xl text-amber-400/80">{group.category}</h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-amber-700/30 to-transparent" aria-hidden="true" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {group.items.map((item, i) => (
                          <article
                            key={item.name}
                            className={`group relative p-0 border rounded-sm transition-all duration-500 shadow-sm overflow-hidden flex flex-col ${
                              item.featured
                                ? 'border-amber-500/50 bg-[#1e150f]/80'
                                : 'border-amber-900/25 hover:border-amber-700/50 bg-[#1a1210]/60 hover:bg-[#1e150f]/80'
                            }`}
                            style={{ transitionDelay: `${i * 40}ms` }}
                          >
                            {item.featured && <FeaturedBadge label="Guest Favorite" />}
                            {item.image_url ? (
                              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#1a1210]">
                                <img
                                  src={item.image_url}
                                  alt={item.name}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                  loading="lazy"
                                />
                              </div>
                            ) : (
                              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#1a1210] to-[#241814] flex items-center justify-center">
                                <ImagePlus size={32} className="text-amber-700/30" aria-hidden="true" />
                              </div>
                            )}
                            <div className="flex items-start justify-between gap-4 p-5 flex-1">
                              <div className="flex-1">
                                <h3 className="font-serif text-lg text-amber-100 group-hover:text-amber-50 transition-colors mb-1">{item.name}</h3>
                                {item.desc && <p className="text-sand-400 text-sm leading-relaxed">{item.desc}</p>}
                              </div>
                              {item.sizes.length > 1 ? (
                                <div className="flex items-center gap-3 flex-shrink-0">
                                  {item.sizes.map((size, si) => (
                                    <span key={size.label} className="flex items-center gap-3">
                                      {si > 0 && <span className="w-px h-8 bg-amber-700/40" aria-hidden="true" />}
                                      <span className="flex flex-col items-end">
                                        <span className="text-[10px] tracking-widest uppercase text-amber-300/70">{size.label}</span>
                                        <span className="text-amber-400 font-serif text-lg font-bold">${size.price.replace(/\$/g, '')}</span>
                                      </span>
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-amber-400 font-serif text-lg font-bold flex-shrink-0">${item.sizes[0].price.replace(/\$/g, '')}</span>
                              )}
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Drinks & Tea */}
            <div
              ref={(el) => { sectionRefs.current.drinks = el; }}
              data-section="drinks"
              className="scroll-mt-24 mb-16"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-l from-amber-700/40 to-transparent" aria-hidden="true" />
                <h2 className="font-serif text-2xl text-amber-200 text-center px-4">Drinks & Tea</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-amber-700/40 to-transparent" aria-hidden="true" />
              </div>
              {DRINKS.length === 0 ? (
                <EmptyState message="Drinks menu coming soon." />
              ) : (
                <div className="space-y-10">
                  {DRINKS_BY_TYPE.map((typeGroup) => (
                    <div key={typeGroup.type}>
                      <div className="flex items-center gap-4 mb-6">
                        <h3 className="font-serif text-xl text-amber-400/80">{typeGroup.type}s</h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-amber-700/30 to-transparent" aria-hidden="true" />
                      </div>
                      <div className="space-y-7">
                        {typeGroup.categories.map((catGroup) => (
                          <div key={catGroup.category}>
                            <div className="flex items-center gap-4 mb-4">
                              <h4 className="font-serif text-base text-sand-300/80 italic">{catGroup.category}</h4>
                              <div className="flex-1 h-px bg-gradient-to-r from-amber-800/20 to-transparent" aria-hidden="true" />
                            </div>
                            {catGroup.category === 'Organic Tea' && (
                              <>
                                <article className="group relative p-0 border border-amber-500/50 rounded-sm bg-[#1e150f]/80 transition-all duration-500 shadow-lg overflow-hidden flex flex-col mb-5 max-w-sm mx-auto">
                                  <FeaturedBadge label="Signature" />
                                  <div className="relative w-full aspect-video overflow-hidden bg-[#1a1210]">
                                    <img
                                      src="/images/karak-chai.webp"
                                      alt="Karak Chai — creamy spiced tea with cardamom"
                                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                      loading="lazy"
                                    />
                                  </div>
                                  <div className="p-5 flex-1">
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="flex-1">
                                        <h3 className="font-serif text-lg text-amber-100 group-hover:text-amber-50 transition-colors mb-1">Karak Chai</h3>
                                        <p className="text-sand-400 text-sm leading-relaxed">Creamy spiced tea with warm notes of cardamom.</p>
                                      </div>
                                      <span className="text-amber-400 font-serif text-lg font-bold flex-shrink-0">$8</span>
                                    </div>
                                  </div>
                                </article>
                                <div className="mb-5 border border-amber-500/50 bg-[#2a1b0d] px-4 py-3 text-center text-amber-100 text-base font-semibold italic tracking-wide shadow-lg space-y-1">
                                  <p>One small pot $6 serves 1</p>
                                  <p>One large pot $12 serves 2</p>
                                </div>
                              </>
                            )}
                            {catGroup.items.some((item) => item.featured && item.image_url) && (
                              <div className="mb-5 flex justify-center">
                                {(() => {
                                  const featured = catGroup.items.find((item) => item.featured && item.image_url)!;
                                  return (
                                    <article className="group relative p-0 border border-amber-500/50 rounded-sm bg-[#1e150f]/80 transition-all duration-500 shadow-lg overflow-hidden flex flex-col w-full max-w-sm">
                                      <FeaturedBadge label="Signature" />
                                      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#1a1210]">
                                        <img
                                          src={featured.image_url!}
                                          alt={`${featured.name}${featured.desc ? ` — ${featured.desc}` : ''}`}
                                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                          loading="lazy"
                                        />
                                      </div>
                                      <div className="p-5 flex-1">
                                        <div className="flex items-start justify-between gap-4">
                                          <div className="flex-1">
                                            <h3 className="font-serif text-lg text-amber-100 group-hover:text-amber-50 transition-colors mb-1">{featured.name}</h3>
                                            {featured.desc && <p className="text-sand-400 text-sm leading-relaxed">{featured.desc}</p>}
                                          </div>
                                          <span className="text-amber-400 font-serif text-lg font-bold flex-shrink-0">${featured.price.replace(/\$/g, '')}</span>
                                        </div>
                                      </div>
                                    </article>
                                  );
                                })()}
                              </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {catGroup.items.filter((item) => !(catGroup.category === 'Organic Tea' && item.name === 'Karak Tea') && !(item.featured && item.image_url)).map((item, i) => (
                                <article
                                  key={item.name}
                                  className="group relative p-5 border border-amber-900/25 hover:border-amber-700/50 rounded-sm transition-all duration-500 shadow-sm bg-[#1a1210]/60 hover:bg-[#1e150f]/80 overflow-hidden flex flex-col"
                                  style={{ transitionDelay: `${i * 40}ms` }}
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                      <h3 className="font-serif text-lg text-amber-100 group-hover:text-amber-50 transition-colors mb-1">{item.name}</h3>
                                      {item.desc && <p className="text-sand-400 text-sm leading-relaxed">{item.desc}</p>}
                                    </div>
                                    {catGroup.category !== 'Organic Tea' && (
                                      <span className="text-amber-400 font-serif text-lg font-bold flex-shrink-0">${item.price.replace(/\$/g, '')}</span>
                                    )}
                                  </div>
                                </article>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Hookah Flavors */}
            <div
              ref={(el) => { sectionRefs.current.hookah = el; }}
              data-section="hookah"
              className="scroll-mt-24"
            >
              <div className="space-y-7">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-gradient-to-l from-amber-700/40 to-transparent" aria-hidden="true" />
                  <h2 className="font-serif text-2xl text-amber-200 text-center px-4">Hookah Flavors</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-amber-700/40 to-transparent" aria-hidden="true" />
                </div>
                {MIXES.length === 0 ? (
                  <EmptyState message="Hookah flavors coming soon." />
                ) : (
                  <>
                    {MIXES_BY_CATEGORY.map((group) => (
                      <div key={group.category}>
                        <div className="flex items-center gap-4 mb-6">
                          <h2 className="font-serif text-xl text-amber-400/80">{group.category}</h2>
                          <div className="flex-1 h-px bg-gradient-to-r from-amber-700/30 to-transparent" aria-hidden="true" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {group.items.map((mix, i) => (
                            <article
                              key={mix.id}
                              className="group relative p-0 border border-amber-900/25 hover:border-amber-700/50 rounded-sm bg-[#1a1210]/60 hover:bg-[#1e150f]/80 transition-all duration-500 shadow-sm overflow-hidden flex flex-col"
                              style={{ transitionDelay: `${i * 40}ms` }}
                            >
                              {mix.image_url ? (
                                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#1a1210]">
                                  <img
                                    src={mix.image_url}
                                    alt={`${mix.name} — ${mix.tagline}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1210]/50 via-transparent to-transparent" aria-hidden="true" />
                                </div>
                              ) : (
                                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#1a1210] to-[#241814] flex items-center justify-center">
                                  <ImagePlus size={32} className="text-amber-700/30" aria-hidden="true" />
                                </div>
                              )}
                              <div className="p-5 flex-1">
                                <h3 className="font-serif text-lg text-amber-100 group-hover:text-amber-50 transition-colors mb-1">
                                  {mix.name}
                                </h3>
                                <p className="text-amber-400/80 text-sm italic mb-3">{mix.tagline}</p>
                                <p className="text-sand-400 text-sm leading-relaxed mb-3">{mix.description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {mix.flavors.split(' • ').map((flavor) => (
                                    <span key={flavor} className={FLAVOR_PILL_CLASSES}>
                                      {flavor}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    ))}
                    <p className="text-center text-sand-500 text-sm pt-4">
                      Ask your server for the full list and daily specials.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* PDF download */}
            <div className="mt-12 text-center">
              <a
                href="/centerpiece-menu.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-amber-600/50 text-amber-400 text-sm tracking-widest uppercase hover:bg-amber-600 hover:text-white transition-all duration-300 rounded-sm"
              >
                <Download size={16} aria-hidden="true" />
                Download PDF Menu
              </a>
            </div>
          </div>
        </section>

        {/* Meet Mina */}
        <section className="py-20 px-6 bg-[#150f0d] relative overflow-hidden">
          <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
          <div ref={minaRef.ref} className={`max-w-5xl mx-auto transition-all duration-700 relative z-10 ${minaRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
              {/* Image slot */}
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-amber-700/30 bg-[#1a1210]/60">
                  <img
                    src="/images/centerpiece-hero.webp"
                    alt="Mina — founder and hookah connoisseur at Centerpiece Hookah Lounge"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150f0d]/60 via-transparent to-transparent" aria-hidden="true" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-amber-600/40 rounded-sm pointer-events-none" aria-hidden="true" />
                <div className="absolute -top-3 -left-3 w-16 h-16 border-l-2 border-t-2 border-amber-600/40 rounded-sm pointer-events-none" aria-hidden="true" />
              </div>

              {/* Text */}
              <div>
                <div className="flex items-center gap-2 text-amber-500 text-xs tracking-[0.3em] uppercase mb-4">
                  <ChefHat size={16} aria-hidden="true" />
                  Meet Your Curator
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-amber-100 mb-4 leading-tight">
                  Mina &amp; the Pursuit of the Perfect Bowl
                </h2>
                <OrnamentDivider />
                <div className="space-y-4 text-sand-300 text-base leading-relaxed mt-5">
                  <p>
                    Mina didn't start Centerpiece to open another hookah lounge. He started it
                    because the hookah he wanted to smoke didn't exist anywhere else — so he
                    had to build it himself.
                  </p>
                  <p>
                    Trained in the traditions of Egyptian and Russian hookah culture, Mina treats
                    every bowl like a chef treats a tasting course: balanced, intentional, and
                    built around the person sitting in front of him. He studies the leaf, tests
                    the heat, and iterates the flavor until it's worth serving.
                  </p>
                  <p className="text-amber-200/90 italic">
                    "Most lounges ask what flavor you want. I ask what you need to feel right now."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-6 bg-[#120d0b] relative overflow-hidden">
          <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl text-amber-100 mb-6">
              Ready to Taste It?
            </h2>
            <OrnamentDivider />
            <p className="text-sand-300 text-lg leading-relaxed mb-8">
              The menu is best experienced in person. Visit us in Westwood and let our hookah masters craft your perfect bowl.
            </p>
            <a
              href="/visit-us"
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 rounded-sm shadow-lg"
            >
              <FileText size={16} aria-hidden="true" />
              Plan Your Visit
            </a>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
