import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Check, Sparkles, Snowflake, Droplet, FlaskConical, Flame, Wind, X, Star, Gift, Dices, ImagePlus } from 'lucide-react';
import mixesData from './data/mixes.json';
import { OrnamentDivider } from './components/PageShell';

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

const CATEGORY_STYLES: Record<string, { dot: string; pill: string }> = {
  'Fruity & Icy': {
    dot: 'bg-sky-400',
    pill: 'border-sky-400/40 text-sky-300 bg-sky-500/10',
  },
  'Fruity': {
    dot: 'bg-rose-400',
    pill: 'border-rose-400/40 text-rose-300 bg-rose-500/10',
  },
  'Sweet & Creamy': {
    dot: 'bg-amber-400',
    pill: 'border-amber-400/40 text-amber-300 bg-amber-500/10',
  },
  'Citrus & Refreshing': {
    dot: 'bg-lime-400',
    pill: 'border-lime-400/40 text-lime-300 bg-lime-500/10',
  },
};

const STANDARD_ITEMS = [
  { label: 'Crystalized Glass Bowl', icon: FlaskConical },
  { label: 'Russian HMD', icon: Wind },
  { label: 'Le Orange Premium Charcoal', icon: Sparkles },
  { label: 'Standard Disposable Hose', icon: Wind },
];

const ADDON_OPTIONS = [
  { id: 'ice-hose', label: 'Ice Hose', price: 8, icon: Snowflake, desc: 'Delivers a cooler, smoother draw for a crisp, refreshing session.', image: '/images/ice-tip.webp' },
  { id: 'ice-vase', label: 'Ice Vase', price: 5, icon: Droplet, desc: 'Keeps your hookah chilled longer for a cooler, smoother experience.', image: '/images/ice-vase.webp' },
  { id: 'cbd-oil', label: 'CBD Oil', price: 10, icon: FlaskConical, desc: 'Adds a CBD-infused touch for a more mellow, laid-back session.', image: '/cbd-oil.webp' },
  { id: 'thc-oil', label: 'THC Oil', price: 10, icon: Droplet, desc: 'Adds a THC-infused upgrade for a more elevated session experience.', image: '/thc-oil.webp' },
];

const BASE_PRICE = 45;

const STEPS = ['Meet Your Hookah', 'Select Your Flavor', 'Add-ons'] as const;

export default function BuildMyHookahPage() {
  const [step, setStep] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedMix, setSelectedMix] = useState<Mix | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [building, setBuilding] = useState(false);
  const flavorRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    document.title = 'Build My Hookah | Centerpiece Hookah Lounge';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Build your custom hookah at Centerpiece Hookah Lounge. Premium add-ons, ice hose, CBD, THC, and signature flavor mixes.');
  }, []);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  };

  const addonTotal = ADDON_OPTIONS.filter((a) => selectedAddons.includes(a.id)).reduce((sum, a) => sum + a.price, 0);
  const flavorPrice = BASE_PRICE;
  const totalPrice = flavorPrice + addonTotal;

  const handleReady = () => {
    setBuilding(true);
    setTimeout(() => {
      setBuilding(false);
      setShowSummary(true);
    }, 2200);
  };

  const canAdvance = true;

  useEffect(() => {
    if (selectedMix && flavorRefs.current[selectedMix.id]) {
      flavorRefs.current[selectedMix.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedMix]);

  return (
    <div className="min-h-screen bg-[#120d0b] text-sand-100 font-sans">
      {/* Header with back button */}
      <header className="sticky top-0 z-50 bg-[#120d0b]/95 backdrop-blur-sm border-b border-amber-900/30">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <a
            href="/menu"
            className="flex items-center gap-2 text-sand-300 hover:text-amber-300 transition-colors text-sm tracking-widest uppercase"
          >
            <ArrowLeft size={18} />
            Back
          </a>
          <div className="flex-1 text-center">
            <span className="font-serif text-amber-200 text-lg tracking-wide">Build My Hookah</span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      {/* Step indicator */}
      <div className="max-w-md mx-auto px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    i < step
                      ? 'bg-amber-600 border-amber-600 text-white'
                      : i === step
                        ? 'bg-amber-600/20 border-amber-500 text-amber-300'
                        : 'border-amber-800/40 text-amber-700/50'
                  }`}
                >
                  {i < step ? <Check size={14} /> : <span className="text-xs font-bold">{i + 1}</span>}
                </div>
                <span className={`text-[8px] tracking-widest uppercase whitespace-nowrap ${i === step ? 'text-amber-300' : i < step ? 'text-amber-500/70' : 'text-amber-800/40'}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-1.5 mb-5 transition-colors duration-300 ${i < step ? 'bg-amber-600/60' : 'bg-amber-900/30'}`} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-md mx-auto px-4 py-6 pb-28">
        {/* Step 0: Meet your hookah */}
        {step === 0 && (
          <div className="animate-fade-up">
            <div className="relative rounded-sm overflow-hidden border border-amber-500/30">
              <img
                src="/images/Wookah-hookah-square.webp"
                alt="Wookah hookah - handcrafted stainless steel and wood body"
                className="w-full h-[480px] object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#120d0b] to-transparent pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-serif text-amber-200 text-lg">Wookah Hookah</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Select your flavor */}
        {step === 1 && (
          <div className="animate-fade-up">
            <h2 className="font-serif text-2xl text-amber-100 mb-1">Select Your Flavor</h2>
            <p className="text-sand-400 text-sm mb-6">Pick from our handcrafted signature mixes.</p>

            <div className="flex items-center justify-between mb-4">
              <span className="text-amber-300/60 text-[10px] tracking-widest uppercase">
                {MIXES.length} flavors
              </span>
            </div>
            <div className="animate-fade-up">
              {MIXES.map((mix) => {
                  const isSelected = selectedMix?.id === mix.id;
              const category = mix.category;
              return (
                <div key={mix.id} ref={(el) => { flavorRefs.current[mix.id] = el; }} className="mb-4">
                      <button
                        onClick={() => setSelectedMix(mix)}
                        className={`relative w-full flex flex-col border rounded-sm overflow-hidden transition-all duration-300 text-left ${
                          isSelected
                            ? 'border-amber-400 ring-1 ring-amber-400/50'
                            : 'border-amber-600/50 hover:border-amber-400/80'
                        }`}
                      >
                        {mix.image_url && (
                          <div className="relative w-full h-64 overflow-hidden bg-[#0e0a08]">
                            <img src={mix.image_url} alt={mix.name} className="w-full h-full object-cover object-center" loading="lazy" />
                          </div>
                        )}
                        <div className="p-4 flex-1 relative z-[2]">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-serif text-amber-100 text-lg">{mix.name}</p>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] tracking-wider uppercase border ${CATEGORY_STYLES[category]?.pill ?? 'border-amber-400/40 text-amber-300 bg-amber-500/10'}`}>
                              {category}
                            </span>
                          </div>
                          <p className="text-amber-400/70 text-sm italic mt-1">{mix.tagline}</p>
                          <p className="text-sand-300/80 text-sm mt-2">{mix.description}</p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center shadow-lg z-[3]">
                            <Check size={16} className="text-white" />
                          </div>
                        )}
                    </button>
                  </div>
              );
            })}
            </div>
          </div>
        )}

        {/* Step 2: Add-ons */}
        {step === 2 && (
          <div className="animate-fade-up">
            <h2 className="font-serif text-2xl text-amber-100 mb-1">Add-ons</h2>
            <p className="text-sand-400 text-sm mb-6">Enhance your session. Select any you'd like, or skip to the next step.</p>
            <div className="space-y-3">
              {ADDON_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedAddons.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleAddon(opt.id)}
                    className={`w-full flex border rounded-sm overflow-hidden transition-all duration-300 text-left ${
                      isSelected
                        ? 'border-amber-500 bg-amber-600/15'
                        : 'border-amber-900/30 hover:border-amber-700/50 bg-[#1a1210]/60'
                    }`}
                  >
                    <div className="w-1/3 min-w-[100px] flex-shrink-0 bg-[#0e0a08] flex items-center justify-center border-r border-amber-900/40 relative overflow-hidden">
                      {opt.image ? (
                        <img src={opt.image} alt={opt.label} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <ImagePlus size={28} className="text-amber-800/60" />
                      )}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center shadow-lg">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-center">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-serif text-amber-100 text-base">{opt.label}</p>
                        <span className="text-amber-400 font-serif text-base font-bold flex-shrink-0">+${opt.price}</span>
                      </div>
                      <p className="text-sand-400 text-xs leading-relaxed mt-1">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#120d0b]/95 backdrop-blur-sm border-t border-amber-900/30">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm tracking-widest uppercase text-sand-300 hover:text-amber-300 transition-all duration-300"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          ) : (
            <span className="w-20" />
          )}

          {step < 2 ? (
            <div className="flex items-center gap-3">
              {step === 0 && (
                <span className="text-amber-300/70 text-[11px] tracking-wide animate-pulse">
                  No selection needed
                </span>
              )}
              {step === 1 && (
                <button
                  onClick={() => {
                    setSelectedMix(MIXES[Math.floor(Math.random() * MIXES.length)]);
                  }}
                  className="flex items-center gap-2 px-3 py-2.5 text-[11px] tracking-widest uppercase rounded-sm border border-amber-500/50 text-amber-300 hover:bg-amber-600/20 hover:border-amber-400 transition-all duration-300"
                >
                  <Dices size={14} />
                  <span className="hidden sm:inline">Can't decide? Surprise Me</span>
                  <span className="sm:hidden">Surprise Me</span>
                </button>
              )}
              <button
                onClick={() => canAdvance && setStep((s) => s + 1)}
                className={`flex items-center gap-2 px-6 py-2.5 text-sm tracking-widest uppercase rounded-sm transition-all duration-300 ${
                  canAdvance
                    ? 'bg-amber-600 hover:bg-amber-500 text-white font-semibold'
                    : 'bg-amber-900/20 text-amber-700/50 cursor-not-allowed'
                }`}
              >
                Next
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleReady}
                disabled={!selectedMix}
                className={`flex items-center gap-2 px-6 py-2.5 text-sm tracking-widest uppercase rounded-sm transition-all duration-300 ${
                  selectedMix
                    ? 'bg-amber-600 hover:bg-amber-500 text-white font-semibold'
                    : 'bg-amber-900/20 text-amber-700/50 cursor-not-allowed'
                }`}
              >
                <Sparkles size={16} />
                Ready to Smoke
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Building animation overlay */}
      {building && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-amber-700/30 border-t-amber-500 animate-spin" />
              <Flame className="absolute inset-0 m-auto text-amber-400" size={32} />
            </div>
            <p className="font-serif text-amber-200 text-lg tracking-wide animate-pulse">Building your hookah...</p>
          </div>
        </div>
      )}

      {/* Summary popup */}
      {showSummary && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowSummary(false)} aria-hidden="true" />
          <div className="relative w-full max-w-sm bg-[#150f0d] border border-amber-700/40 rounded-sm shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-[#150f0d]/95 backdrop-blur-sm border-b border-amber-900/30 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-500 text-xs tracking-[0.3em] uppercase">
                <Sparkles size={16} />
                Your Hookah Order
              </div>
              <button onClick={() => setShowSummary(false)} className="text-sand-400 hover:text-amber-300 transition-colors p-1" aria-label="Close">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 py-5">
              <OrnamentDivider />

              {/* Standard items */}
              <div className="mb-5">
                <p className="text-[10px] tracking-widest uppercase text-amber-300/60 mb-2">Premium Standard</p>
                <div className="space-y-1.5">
                  {STANDARD_ITEMS.map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <span className="text-sand-300">{item.label}</span>
                      <span className="text-amber-400/60 text-xs">Included</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              {selectedAddons.length > 0 && (
                <div className="mb-5">
                  <p className="text-[10px] tracking-widest uppercase text-amber-300/60 mb-2">Add-ons</p>
                  <div className="space-y-1.5">
                    {ADDON_OPTIONS.filter((a) => selectedAddons.includes(a.id)).map((addon) => (
                      <div key={addon.id} className="flex items-center justify-between text-sm">
                        <span className="text-sand-300">{addon.label}</span>
                        <span className="text-amber-400 font-serif">+${addon.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Flavor */}
              {selectedMix && (
                <div className="mb-5">
                  <p className="text-[10px] tracking-widest uppercase text-amber-300/60 mb-2">Flavor</p>
                  <div className="flex items-center gap-3 p-3 border border-amber-900/30 rounded-sm bg-[#1a1210]/60">
                    {selectedMix.image_url && (
                      <img src={selectedMix.image_url} alt={selectedMix.name} className="w-12 h-12 rounded-sm object-cover" />
                    )}
                    <div>
                      <p className="font-serif text-amber-100 text-sm">{selectedMix.name}</p>
                      <p className="text-amber-400/70 text-xs italic">{selectedMix.tagline}</p>
                      <p className="text-sand-300/70 text-xs mt-1">{selectedMix.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="border-t border-amber-900/30 pt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sand-400 text-sm">Standard Hookah</span>
                  <span className="text-sand-300 font-serif">${flavorPrice}</span>
                </div>
                {addonTotal > 0 && (
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sand-400 text-sm">Add-ons</span>
                    <span className="text-sand-300 font-serif">+${addonTotal}</span>
                  </div>
                )}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-amber-900/20">
                  <span className="font-serif text-amber-100 text-lg">Total</span>
                  <span className="font-serif text-amber-400 text-2xl font-bold">${totalPrice}</span>
                </div>
              </div>

              {/* Promo */}
              <div className="promo-shimmer-card mt-5 relative overflow-hidden rounded-sm border border-amber-400/50 bg-gradient-to-br from-amber-800/40 to-amber-600/15 p-4">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
                <div className="relative flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center flex-shrink-0">
                    <Gift size={16} className="text-amber-300" />
                  </div>
                  <div>
                    <p className="font-serif text-amber-200 text-sm font-semibold mb-1">Get 10% Off Your Order</p>
                    <p className="text-sand-300 text-xs leading-relaxed">
                      Write us a review on Google or any social media, show your server, and get 10% off.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-amber-400 text-amber-400" aria-hidden="true" />
                      ))}
                      <a
                        href="https://search.google.com/local/writereview?placeid=ChIJi-q_YJy7woARSXfqFxWEYDY"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-amber-300 hover:text-amber-200 text-xs tracking-widest uppercase underline transition-colors"
                      >
                        Review on Google
                      </a>
                    </div>
                    <p className="text-amber-300/80 text-xs font-serif mt-2">
                      With 10% off: <span className="font-bold text-amber-200">${(totalPrice * 0.9).toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-amber-200/90 italic text-sm text-center mt-5">
                Ask your server to build this for you.
              </p>
            </div>

            <div className="px-5 pb-5">
              <a
                href="/menu"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white text-sm tracking-widest uppercase font-semibold rounded-sm transition-all duration-300"
              >
                <Check size={16} />
                Done
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
