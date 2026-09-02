import { useState, useRef, useEffect } from 'react';
import {
  FlaskConical, Wine, Wrench, Leaf, Sparkles, ArrowRight, MapPin, Calendar,
  Star, ChefHat, Search, Beaker, MessageCircle, Moon, Users, Compass,
  Check, X, Globe, Cpu, Layers, TrendingUp, Heart, Zap,
} from 'lucide-react';
import PageShell, { OrnamentDivider, BalineseBorder } from './components/PageShell';

const MICHELIN_PARALLELS = [
  { icon: Search, chef: 'Sources ingredients obsessively', mina: 'Sources rare leaf from around the world' },
  { icon: Beaker, chef: 'Tests combinations for months', mina: 'Tests flavor combinations that don\'t exist yet' },
  { icon: Heart, chef: 'Matches every dish to the diner\'s mood', mina: 'Matches your hookah to your emotional state' },
  { icon: X, chef: 'Rejects shortcuts and mass production', mina: 'Uses only premium equipment — Wookah, Russian, LeOrange' },
  { icon: Sparkles, chef: 'Constantly evolves and experiments', mina: 'Experiments every single week' },
  { icon: ChefHat, chef: 'Treats equipment as sacred', mina: 'Refuses to be another trend-following lounge' },
];

const R_AND_D_CARDS = [
  { icon: Leaf, title: 'Rare Leaf Combinations', desc: 'Sourcing leaves most lounges have never heard of — and pairing them in ways that haven\'t been tried.' },
  { icon: FlaskConical, title: 'Flavor Pairings That Don\'t Exist', desc: 'Commercial blends are the floor, not the ceiling. We create flavors that have never been tasted before.' },
  { icon: Zap, title: 'Smoking Techniques', desc: 'Heat, airflow, pack density, water level — every variable tested to enhance the experience.' },
  { icon: Cpu, title: 'Equipment Configurations', desc: 'Maximizing pull, flavor, and smoke ratio through precise equipment tuning per session.' },
];

const SOMMELIER_QUESTIONS = [
  { icon: MessageCircle, question: 'What are you feeling today?' },
  { icon: Heart, question: 'What mood are you in?' },
  { icon: Compass, question: 'Are you seeking depth, adventure, or smoothness?' },
];

const SOMMELIER_PAIRINGS = [
  {
    icon: Moon,
    mood: 'Feeling contemplative?',
    pairing: 'Dark leaf with a Russian hookah designed for pull and meditation.',
    result: 'A slow, intentional experience.',
    accent: '#FFB347',
  },
  {
    icon: Users,
    mood: 'Feeling social?',
    pairing: 'Blonde leaf with a Wookah designed for smooth, easy draws.',
    result: 'Connection and flow.',
    accent: '#16484F',
  },
  {
    icon: Compass,
    mood: 'Feeling adventurous?',
    pairing: 'An experimental blend we tested this month. Rare. Unrepeated.',
    result: 'Designed to surprise.',
    accent: '#C9922E',
  },
];

const EQUIPMENT = [
  {
    num: '01',
    name: 'Wookah Hookahs',
    desc: 'German-engineered for precision airflow. Every draw is designed, not accidental. Built for flavor intensity and smoke production.',
    icon: Cpu,
  },
  {
    num: '02',
    name: 'Russian Hookahs',
    desc: 'Mastered over decades for durability and pull. Engineered for ease of draw, minimal resistance. The gold standard for pure smoking experience.',
    icon: Layers,
  },
  {
    num: '03',
    name: 'LeOrange Premium Coconut Hookah',
    desc: 'High-end coal with minimal ash. Ash clouds dilute flavor and ruin smoke ratio. We don\'t compromise.',
    icon: Zap,
  },
];

const LEAF_TYPES = [
  {
    name: 'Dark Leaf',
    label: 'The Rich Course',
    origin: 'Middle East',
    originNote: 'The historical heart of hookah',
    character: 'Bold, earthy, complex, sophisticated',
    bestFor: 'Depth seekers, contemplative smokers, evening sessions',
    technique: 'Slower, more intentional. Dark leaf rewards patience.',
    pairing: 'Russian hookah for pull and endurance. Perfect for the meditator.',
    accent: '#FFB347',
    icon: Moon,
  },
  {
    name: 'Blonde Leaf',
    label: 'The Light Course',
    origin: 'Turkey, Jordan',
    originNote: 'The modern refinement',
    character: 'Fruity, smooth, forgiving, playful',
    bestFor: 'Social sessions, explorers, all-day smoking',
    technique: 'Faster, more social. Blonde leaf is forgiving.',
    pairing: 'Wookah for smooth, easy draws. Perfect for the socializer.',
    accent: '#16484F',
    icon: Users,
  },
  {
    name: 'Experimental Blends',
    label: 'The Surprise Course',
    origin: 'Created in-house',
    originNote: 'Never repeated',
    character: 'Never tried before. Designed to challenge your palate.',
    bestFor: 'The adventurous. The curious. The seeker.',
    technique: 'Unpredictable. That\'s the point.',
    pairing: 'Custom built to the blend. Every time is different.',
    accent: '#C9922E',
    icon: Compass,
  },
];

const PURSUIT_CARDS = [
  { icon: Globe, title: 'Better Leaf Sourcing', desc: 'Exploring new regions and rare varietals most lounges never access.' },
  { icon: FlaskConical, title: 'Better Flavor Combinations', desc: 'Monthly R&D sessions that push boundaries and create new signatures.' },
  { icon: Wrench, title: 'Better Equipment', desc: 'Testing new hookahs, charcoal, and configurations as they emerge.' },
  { icon: Heart, title: 'Better Curation', desc: 'Understanding customer moods and reading the room with precision.' },
  { icon: ChefHat, title: 'Better Technique', desc: 'Training staff to read the room and curate with intention, not habit.' },
];

function useInView(threshold = 0.15, initialInView = false) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(initialInView);

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

function SectionWrapper({ children, bg = '#120d0b', inView, refEl, maxW = 'max-w-5xl' }: {
  children: React.ReactNode;
  bg?: string;
  inView?: boolean;
  refEl?: React.RefObject<HTMLDivElement | null>;
  maxW?: string;
}) {
  return (
    <section className="py-16 px-6 relative overflow-hidden" style={{ backgroundColor: bg }}>
      <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
      <div ref={refEl} className={`${maxW} mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {children}
      </div>
    </section>
  );
}

function SectionHeader({ kicker, title, icon: Icon }: { kicker: string; title: string; icon?: React.ComponentType<{ size?: number; className?: string }> }) {
  return (
    <div className="text-center mb-10">
      {Icon && (
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-amber-600/40 bg-amber-950/30 mb-4">
          <Icon size={26} className="text-amber-500" aria-hidden="true" />
        </div>
      )}
      <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3">{kicker}</p>
      <h2 className="font-serif text-3xl md:text-4xl text-amber-100 mb-4">{title}</h2>
      <OrnamentDivider />
    </div>
  );
}

export default function WhoWeArePage() {
  const minaStorySection = useInView(0.15, true);
  const michelinSection = useInView();
  const rdSection = useInView();
  const sommelierSection = useInView();
  const equipmentSection = useInView();
  const leafSection = useInView();
  const pursuitSection = useInView();
  const ctaSection = useInView();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Centerpiece Hookah Lounge",
    "description": "Premium experimental hookah lounge in Westwood curated like a Michelin restaurant. Mina, a hookah connoisseur, treats every hookah like a tasting menu.",
    "founder": {
      "@type": "Person",
      "name": "Mina",
      "expertise": ["Hookah Curation", "Flavor Development", "Premium Hookah Selection"],
      "yearsOfExperience": 9,
      "knownFor": "Michelin-level obsession with hookah quality and experiential curation"
    },
    "knowsAbout": [
      "Wookah Hookahs", "Russian Hookahs", "Dark Leaf", "Blonde Leaf",
      "Experimental Flavor Development", "LeOrange Premium Coconut Hookah",
      "Hookah Curation", "Experiential Design"
    ],
    "specialization": "Experience-based hookah curation with Michelin-level attention to detail",
    "areaServed": "Westwood, West Los Angeles",
    "address": { "@type": "PostalAddress", "postalCode": "90024" }
  };

  return (
    <PageShell
      pageTitle="Who We Are | Centerpiece Hookah Lounge — Where Curation Meets Craft"
      pageDescription="Centerpiece: The only experimental premium hookah lounge in Southern California. Mina curates experiences like a Michelin chef since 2015. Wookah, Russian hookahs, rare flavors."
      jsonLd={jsonLd}
    >
      {/* ════════════════ HERO ════════════════ */}
      <section className="relative min-h-[65vh] flex items-start justify-center overflow-hidden px-6 pt-[2vh] md:pt-[3vh]">
        <div className="absolute inset-0">
          <img
            src="/images/who-we-are-no-text.webp"
            alt="Centerpiece Hookah Lounge blend lab with experimental flavors, premium hookahs, and handcrafted design notes"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[#0E0C10]/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0C10]/70 via-transparent to-[#0E0C10]/90" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <p className="text-amber-500 text-[10px] sm:text-xs tracking-[0.45em] uppercase mb-5">Who We Are</p>
          <h1 className="font-serif text-[2.75rem] leading-[1.05] sm:text-5xl md:text-7xl text-amber-100 mb-5">
            <span className="block">Crafted by Curiosity.</span>
            <span className="block italic text-amber-100">
              Defined by <span className="text-amber-400">Experience.</span>
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6" aria-hidden="true">
            <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-500/70" />
            <span className="w-1.5 h-1.5 rotate-45 bg-amber-500" />
            <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-500/70" />
          </div>
          <div className="mx-auto max-w-xl space-y-1 text-amber-300/90 text-xs sm:text-sm leading-relaxed tracking-wide">
            <p>We experiment. We refine. We reimagine.</p>
            <p>From rare tobacco blends to innovative hookah designs,</p>
            <p>every detail is tested, perfected, and shared with purpose.</p>
            <p>This is not just hookah—this is our craft.</p>
          </div>
        </div>
      </section>

      {/* ════════════════ SECTION 0: MINA'S STORY ════════════════ */}
      <section className="py-20 px-6 bg-[#0E0C10] relative overflow-hidden">
        <div className="absolute inset-0 bg-bali-pattern opacity-100 pointer-events-none" aria-hidden="true" />
        <div
          ref={minaStorySection.ref}
          className={`max-w-6xl mx-auto transition-all duration-700 ${minaStorySection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
            {/* Portrait — left-aligned, sticky on desktop */}
            <aside className="md:col-span-4">
              <div className="md:sticky md:top-28">
                <div className="relative max-w-[320px] mx-auto md:mx-0">
                  <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-amber-700/30 bg-[#1a1210]/60">
                    <img
                      src="/images/mina-profile.png"
                      alt="Mina — founder and hookah connoisseur at Centerpiece Hookah Lounge"
                      className="w-full h-full object-cover object-[center_35%]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C10]/60 via-transparent to-transparent" aria-hidden="true" />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-14 h-14 border-r-2 border-b-2 border-amber-600/40 rounded-sm pointer-events-none" aria-hidden="true" />
                  <div className="absolute -top-3 -left-3 w-14 h-14 border-l-2 border-t-2 border-amber-600/40 rounded-sm pointer-events-none" aria-hidden="true" />
                  <figcaption className="mt-5 text-center md:text-left">
                    <p className="font-serif text-lg text-amber-200">Mina</p>
                    <p className="text-sand-500 text-xs tracking-[0.25em] uppercase mt-1">Founder &amp; Curator</p>
                  </figcaption>
                </div>
              </div>
            </aside>

            {/* Story header + body */}
            <div className="md:col-span-8">
              <div className="inline-flex items-center gap-2 text-amber-400/70 text-xs tracking-[0.3em] uppercase mb-4">
                <ChefHat size={16} aria-hidden="true" />
                The Man Behind the Bowl
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-amber-100 mb-4 leading-tight">
                Mina's Story
              </h2>
              <OrnamentDivider />
              <div className="space-y-4 text-sand-300 text-base leading-relaxed mt-6">
                <p>
                  Mina's path to hookah began in an unexpected place: an art gallery.
                  Raised in Egypt with an appreciation for beauty, craftsmanship, and detail,
                  Mina learned early that a space could shape the way people felt. The objects
                  inside it mattered. The furniture, artwork, lighting, and atmosphere all
                  worked together to create an experience.
                </p>
                <p>
                  In the early 2000s, he brought that perspective to Westwood and Santa Monica.
                  As an importer of Balinese artifacts, Mediterranean furniture, and Middle
                  Eastern artwork, Mina carefully selected pieces for his showrooms based on
                  their character and quality. Nothing was there simply to fill space. Each
                  piece had a purpose.
                </p>
                <p>
                  Over time, he began to see another possibility. The galleries were beautiful,
                  but people would walk through, admire the pieces, and leave. Mina wanted to
                  create a place where people could actually enjoy the surroundings. Somewhere
                  they could sit, relax, have a conversation, and spend time together.
                </p>
                <p>That idea eventually led him to hookah.</p>
                <p>
                  He began learning the craft from the ground up. He studied different tobacco
                  brands, flavors, preparation methods, hookahs, heat management, and the
                  small details that could completely change the quality of a session. The same
                  attention he once gave to selecting artwork and furniture became part of the
                  way he approached hookah.
                </p>
                <p>In 2015, Mina transformed his gallery into Centerpiece Hookah Lounge.</p>
                <p>
                  Rather than building a traditional hookah lounge, he kept much of what made
                  the gallery special. Balinese pieces, Mediterranean furniture, Middle Eastern
                  influences, and carefully selected decor became part of the atmosphere. He
                  introduced premium hookahs, experimented with flavors, and focused heavily on
                  preparation, consistency, and service.
                </p>
                <p>
                  Centerpiece quickly became a familiar destination in West Los Angeles because
                  it offered something different. Guests were not simply coming in for a hookah.
                  They were spending time in a space that had been personally built and curated
                  over many years.
                </p>
                <p>
                  Mina still approaches Centerpiece much the same way today. He personally
                  evaluates brands, develops flavor combinations, pays attention to how each
                  hookah is prepared, and constantly looks for ways to improve the experience.
                </p>
                <p>For him, the goal has always been simple.</p>
                <blockquote className="border-l-2 border-amber-500/60 pl-5 py-2 my-6">
                  <p className="text-amber-200/90 italic text-lg leading-relaxed">
                    "I didn't want to just serve hookah," Mina says. "I wanted people to come in,
                    relax, enjoy the atmosphere, and remember the experience."
                  </p>
                </blockquote>
                <p className="text-amber-100 font-serif text-xl">That philosophy is still at the heart of Centerpiece today.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ SECTION 1: THE MICHELIN STANDARD ════════════════ */}
      <SectionWrapper bg="#0E0C10" inView={michelinSection.inView} refEl={michelinSection.ref} maxW="max-w-5xl">
        <SectionHeader kicker="The Michelin Standard" title="How Mina Approaches Hookah" icon={ChefHat} />

        {/* Intro card */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-sand-300 text-lg leading-relaxed">
            Michelin-starred chefs don't accept 'good enough.' Neither does Mina.
            Every hookah at Centerpiece follows the same obsession that drives a three-star kitchen.
          </p>
        </div>

        {/* Comparison cards: Chef vs Mina */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {/* Chef column header */}
          <div className="hidden md:block text-center mb-2">
            <div className="inline-flex items-center gap-2 text-amber-400/70 text-xs tracking-[0.3em] uppercase">
              <ChefHat size={16} aria-hidden="true" />
              Three-Star Chef
            </div>
          </div>
          <div className="hidden md:block text-center mb-2">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs tracking-[0.3em] uppercase">
              <Star size={16} className="fill-amber-500/30" aria-hidden="true" />
              Mina at Centerpiece
            </div>
          </div>

          {MICHELIN_PARALLELS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="contents">
                <div
                  className="p-5 border border-amber-900/25 rounded-sm bg-[#1a1210]/40 flex items-start gap-3"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <Icon size={20} className="text-sand-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sand-400 text-sm leading-relaxed">{item.chef}</p>
                </div>
                <div
                  className="group p-5 border border-amber-700/30 rounded-sm bg-[#1e150f]/70 hover:border-amber-500/50 hover:bg-[#241a12]/80 transition-all duration-400 flex items-start gap-3"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <Icon size={20} className="text-amber-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <p className="text-sand-200 text-sm leading-relaxed font-medium">{item.mina}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight quote card */}
        <div className="relative p-8 border border-amber-600/30 rounded-sm bg-gradient-to-br from-amber-950/30 to-[#1a1210]/60 text-center overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" aria-hidden="true" />
          <p className="text-amber-200 font-serif text-xl md:text-2xl leading-relaxed mb-3">
            Centerpiece isn't a hookah lounge trying to be fancy.
          </p>
          <p className="text-amber-100 font-serif text-xl md:text-2xl leading-relaxed">
            It's a culinary laboratory disguised as a lounge.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sand-400 text-sm">
            <span className="flex items-center gap-2"><Star size={14} className="text-amber-500" aria-hidden="true" /> Every hookah is a tasting menu</span>
            <span className="flex items-center gap-2"><Star size={14} className="text-amber-500" aria-hidden="true" /> Every flavor is a note in a composition</span>
            <span className="flex items-center gap-2"><Star size={14} className="text-amber-500" aria-hidden="true" /> Every session is unforgettable</span>
          </div>
        </div>
      </SectionWrapper>

      {/* ════════════════ SECTION 2: THE R&D LAB ════════════════ */}
      <SectionWrapper bg="#150f0d" inView={rdSection.inView} refEl={rdSection.ref} maxW="max-w-5xl">
        <SectionHeader kicker="The Kitchen" title="Where Flavor R&D Happens" icon={FlaskConical} />

        {/* Intro */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-sand-300 text-lg leading-relaxed">
            A Michelin chef spends 80% of their time in R&D. Testing. Failing. Iterating.
            Mina does the same — every week, without exception.
          </p>
        </div>

        {/* R&D experiment cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {R_AND_D_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="group relative p-6 border border-amber-900/30 rounded-sm bg-[#1a1210]/60 hover:border-amber-600/50 hover:bg-[#1e150f]/80 transition-all duration-500"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-sm border border-amber-600/30 bg-amber-950/40 flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
                    <Icon size={22} className="text-amber-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-amber-200 mb-2 group-hover:text-amber-100 transition-colors">{card.title}</h3>
                    <p className="text-sand-400 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Comparison: Most Lounges vs Centerpiece */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 border border-sand-700/20 rounded-sm bg-[#120d0b]/60">
            <div className="flex items-center gap-2 mb-4">
              <X size={18} className="text-sand-600" aria-hidden="true" />
              <h3 className="text-sand-500 text-xs tracking-[0.3em] uppercase">Most Lounges</h3>
            </div>
            <p className="text-sand-500 text-sm leading-relaxed">
              Serve pre-made blends from suppliers. The menu never changes. The flavors are
              familiar, predictable, and identical everywhere you go.
            </p>
          </div>
          <div className="group p-6 border border-amber-600/30 rounded-sm bg-gradient-to-br from-amber-950/25 to-[#1e150f]/70 hover:border-amber-500/50 transition-all duration-400">
            <div className="flex items-center gap-2 mb-4">
              <Check size={18} className="text-amber-400" aria-hidden="true" />
              <h3 className="text-amber-300 text-xs tracking-[0.3em] uppercase">Centerpiece</h3>
            </div>
            <p className="text-sand-200 text-sm leading-relaxed mb-3">
              Creates flavors that have never been tasted before. Sometimes they become
              signature blends. Sometimes they teach us what NOT to do.
            </p>
            <p className="text-amber-200/80 text-sm leading-relaxed italic">
              That's the point. That's the craft.
            </p>
          </div>
        </div>

        {/* Result banner */}
        <div className="mt-8 p-6 border-l-2 border-amber-500/60 bg-amber-950/20 rounded-r-sm">
          <p className="text-sand-200 text-base leading-relaxed">
            This is why you'll taste flavors at Centerpiece you literally can't find
            anywhere else in Southern California. <span className="text-amber-300 font-medium">We're not following the menu. We're writing it.</span>
          </p>
        </div>
      </SectionWrapper>

      {/* ════════════════ SECTION 3: THE SOMMELIER CURATION ════════════════ */}
      <SectionWrapper bg="#0E0C10" inView={sommelierSection.inView} refEl={sommelierSection.ref} maxW="max-w-5xl">
        <SectionHeader kicker="The Sommelier" title="Curation Based on Your Appetite" icon={Wine} />

        {/* Intro */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-sand-300 text-lg leading-relaxed">
            A Michelin restaurant doesn't just hand you the menu and disappear.
            The sommelier guides you. They read the room. They understand what you're
            craving — not just for your palate, but for your moment.
          </p>
          <p className="text-amber-200 font-medium mt-4">This is what our staff does at Centerpiece.</p>
        </div>

        {/* Question cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {SOMMELIER_QUESTIONS.map((q, i) => {
            const Icon = q.icon;
            return (
              <div
                key={q.question}
                className="group p-6 border border-teal-700/30 rounded-sm bg-[#1a1210]/50 hover:border-teal-500/50 hover:bg-[#162020]/60 transition-all duration-400 text-center"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-teal-600/30 bg-teal-950/30 mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={22} className="text-teal-400" aria-hidden="true" />
                </div>
                <p className="text-sand-200 text-sm leading-relaxed font-medium">{q.question}</p>
              </div>
            );
          })}
        </div>

        {/* Mood pairing cards */}
        <p className="text-center text-amber-200 text-lg font-medium mb-6">Then they curate.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {SOMMELIER_PAIRINGS.map((item, i) => {
            const Icon = item.icon;
            return (
              <article
                key={item.mood}
                className="group relative p-6 border rounded-sm bg-[#1a1210]/60 hover:bg-[#1e150f]/80 transition-all duration-500 overflow-hidden"
                style={{ borderColor: `${item.accent}40`, transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
                  aria-hidden="true"
                />
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full border mb-4 group-hover:scale-110 transition-transform"
                  style={{ borderColor: `${item.accent}50`, backgroundColor: `${item.accent}15` }}
                >
                  <Icon size={22} style={{ color: item.accent }} aria-hidden="true" />
                </div>
                <h3 className="font-serif text-lg text-amber-100 mb-3">{item.mood}</h3>
                <p className="text-sand-400 text-sm leading-relaxed mb-3">{item.pairing}</p>
                <p className="text-sm leading-relaxed font-medium" style={{ color: item.accent }}>{item.result}</p>
              </article>
            );
          })}
        </div>

        {/* Comparison card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 border border-sand-700/20 rounded-sm bg-[#120d0b]/60 text-center">
            <p className="text-sand-500 text-xs tracking-[0.3em] uppercase mb-3">Most Lounges Ask</p>
            <p className="text-sand-400 text-lg italic">'What flavor do you want?'</p>
          </div>
          <div className="p-6 border border-amber-600/30 rounded-sm bg-gradient-to-br from-amber-950/25 to-[#1e150f]/70 text-center">
            <p className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-3">Centerpiece Asks</p>
            <p className="text-amber-100 text-lg italic">'What do you need to feel right now?'</p>
          </div>
        </div>
      </SectionWrapper>

      {/* ════════════════ SECTION 4: THE EQUIPMENT ════════════════ */}
      <SectionWrapper bg="#150f0d" inView={equipmentSection.inView} refEl={equipmentSection.ref} maxW="max-w-5xl">
        <SectionHeader kicker="The Equipment" title="A Chef's Tools Matter" icon={Wrench} />

        {/* Intro */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-sand-300 text-lg leading-relaxed">
            A three-star chef doesn't cook with dull knives and warped pans.
            Mina doesn't compromise on equipment either. Every hookah at Centerpiece
            is built from three non-negotiables.
          </p>
        </div>

        {/* Equipment cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {EQUIPMENT.map((item, i) => {
            const Icon = item.icon;
            return (
              <article
                key={item.name}
                className="group relative p-6 border border-amber-900/30 rounded-sm bg-[#1a1210]/60 hover:border-amber-600/50 hover:bg-[#1e150f]/80 transition-all duration-500 overflow-hidden"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                <div className="flex items-center justify-between mb-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-sm border border-amber-600/30 bg-amber-950/40 flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
                    <Icon size={22} className="text-amber-500" aria-hidden="true" />
                  </div>
                  <span className="font-serif text-3xl text-amber-900/60 font-bold group-hover:text-amber-700/50 transition-colors">{item.num}</span>
                </div>
                <h3 className="font-serif text-lg text-amber-200 mb-3 group-hover:text-amber-100 transition-colors">{item.name}</h3>
                <p className="text-sand-400 text-sm leading-relaxed">{item.desc}</p>
              </article>
            );
          })}
        </div>

        {/* Sacred tools card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Every tool is sacred', icon: Star },
            { label: 'Precision matters', icon: Cpu },
            { label: 'Equipment determines outcome', icon: TrendingUp },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-3 p-5 border border-amber-900/25 rounded-sm bg-amber-950/15">
                <Icon size={18} className="text-amber-500 flex-shrink-0" aria-hidden="true" />
                <p className="text-sand-200 text-sm leading-relaxed">{item.label}</p>
              </div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* ════════════════ SECTION 5: LEAF TYPES ════════════════ */}
      <SectionWrapper bg="#0E0C10" inView={leafSection.inView} refEl={leafSection.ref} maxW="max-w-5xl">
        <SectionHeader kicker="Reading the Menu" title="Dark Leaf vs. Blonde Leaf" icon={Leaf} />

        {/* Intro */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-sand-300 text-lg leading-relaxed">
            A Michelin tasting menu has courses. Light. Then rich. Then surprising.
            Your Centerpiece experience works the same way — we pair leaf type to your emotional appetite.
          </p>
        </div>

        {/* Leaf type cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
          {LEAF_TYPES.map((leaf, i) => {
            const Icon = leaf.icon;
            return (
              <article
                key={leaf.name}
                className="group relative p-6 border rounded-sm bg-[#1a1210]/60 hover:bg-[#1e150f]/80 transition-all duration-500 overflow-hidden"
                style={{ borderColor: `${leaf.accent}40`, transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: `linear-gradient(90deg, transparent, ${leaf.accent}, transparent)` }}
                  aria-hidden="true"
                />
                {/* Icon + label */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-full border flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ borderColor: `${leaf.accent}50`, backgroundColor: `${leaf.accent}15` }}
                  >
                    <Icon size={20} style={{ color: leaf.accent }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: leaf.accent }}>{leaf.label}</p>
                    <h3 className="font-serif text-xl text-amber-100">{leaf.name}</h3>
                  </div>
                </div>

                {/* Attribute chips */}
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 text-amber-400/60 text-[10px] tracking-wide uppercase mt-0.5">Origin</span>
                    <div>
                      <p className="text-sand-300 text-sm leading-relaxed">{leaf.origin}</p>
                      <p className="text-sand-500 text-xs italic">{leaf.originNote}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 text-amber-400/60 text-[10px] tracking-wide uppercase mt-0.5">Character</span>
                    <p className="text-sand-400 text-sm leading-relaxed">{leaf.character}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 text-amber-400/60 text-[10px] tracking-wide uppercase mt-0.5">Best for</span>
                    <p className="text-sand-400 text-sm leading-relaxed">{leaf.bestFor}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 text-amber-400/60 text-[10px] tracking-wide uppercase mt-0.5">Technique</span>
                    <p className="text-sand-400 text-sm leading-relaxed">{leaf.technique}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-amber-900/20">
                    <span className="text-[10px] tracking-wide uppercase mb-1 block" style={{ color: leaf.accent }}>Centerpiece Pairing</span>
                    <p className="text-sand-200 text-sm leading-relaxed">{leaf.pairing}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Summary card */}
        <div className="p-8 border border-amber-600/30 rounded-sm bg-gradient-to-br from-amber-950/25 to-[#1a1210]/60 text-center">
          <p className="text-amber-200 font-serif text-xl leading-relaxed">
            At Centerpiece, you don't just 'pick a flavor.'
          </p>
          <p className="text-amber-100 font-serif text-xl leading-relaxed mt-2">
            You choose your course. Your mood becomes the menu.
          </p>
        </div>
      </SectionWrapper>

      {/* ════════════════ SECTION 6: PURSUIT OF PERFECTION ════════════════ */}
      <SectionWrapper bg="#150f0d" inView={pursuitSection.inView} refEl={pursuitSection.ref} maxW="max-w-5xl">
        <SectionHeader kicker="The Three-Star Mentality" title="Never Settle" icon={Sparkles} />

        {/* Intro */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-sand-300 text-lg leading-relaxed">
            Michelin chefs don't reach three stars and stop improving.
            They get their stars and immediately ask: How do we get better?
            Mina operates the same way. Since 2015, we've obsessed over:
          </p>
        </div>

        {/* Pursuit cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {PURSUIT_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="group p-6 border border-amber-900/30 rounded-sm bg-[#1a1210]/60 hover:border-amber-600/50 hover:bg-[#1e150f]/80 transition-all duration-500"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-sm border border-amber-600/30 bg-amber-950/40 flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
                    <Icon size={18} className="text-amber-500" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-base text-amber-200 group-hover:text-amber-100 transition-colors">{card.title}</h3>
                </div>
                <p className="text-sand-400 text-sm leading-relaxed">{card.desc}</p>
              </article>
            );
          })}
        </div>

        {/* Evolution statement */}
        <div className="p-6 border-l-2 border-amber-500/60 bg-amber-950/20 rounded-r-sm mb-8">
          <p className="text-sand-200 text-base leading-relaxed">
            This is why Centerpiece doesn't feel stale. We evolve because we're not
            chasing volume — <span className="text-amber-300 font-medium">we're chasing perfection.</span>
          </p>
        </div>

        {/* Final statement cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { text: 'Not a transaction', color: 'text-sand-600' },
            { text: 'Not a commodity', color: 'text-sand-500' },
            { text: 'Not a trend', color: 'text-sand-400' },
            { text: 'An art form', color: 'text-amber-300 font-serif text-lg', highlight: true },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-5 border rounded-sm text-center transition-all duration-400 ${
                item.highlight
                  ? 'border-amber-500/40 bg-amber-950/30'
                  : 'border-sand-700/20 bg-[#120d0b]/40'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p className={`text-sm leading-relaxed ${item.color}`}>{item.text}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ════════════════ SECTION 7: CTA ════════════════ */}
      <SectionWrapper bg="#0E0C10" inView={ctaSection.inView} refEl={ctaSection.ref} maxW="max-w-3xl">
        <SectionHeader kicker="Experience the Difference" title="You've Never Had Centerpiece" />

        {/* CTA cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="p-6 border border-sand-700/20 rounded-sm bg-[#120d0b]/50 text-center">
            <p className="text-sand-500 text-xs tracking-[0.3em] uppercase mb-3">You've Had Before</p>
            <p className="text-sand-400 text-base leading-relaxed">
              You've had hookah before. Probably good hookah.
            </p>
          </div>
          <div className="p-6 border border-amber-600/30 rounded-sm bg-gradient-to-br from-amber-950/25 to-[#1e150f]/70 text-center">
            <p className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-3">You've Never Had</p>
            <p className="text-amber-100 text-base leading-relaxed font-medium">
              But you've never had Centerpiece.
            </p>
          </div>
        </div>

        {/* Values cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: Sparkles, label: 'It\'s about the experience' },
            { icon: Heart, label: 'It\'s about intention' },
            { icon: ChefHat, label: 'It\'s about being understood' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center gap-3 p-5 border border-amber-900/25 rounded-sm bg-[#1a1210]/50 text-center"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <Icon size={22} className="text-amber-500" aria-hidden="true" />
                <p className="text-sand-200 text-sm leading-relaxed">{item.label}</p>
              </div>
            );
          })}
        </div>

        {/* Action line */}
        <p className="text-center text-sand-300 text-lg leading-relaxed mb-8">
          Walk in. Tell us how you're feeling. <span className="text-amber-200">We'll do the rest.</span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href="/visit-us"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-[#0E0C10] font-semibold text-sm tracking-widest uppercase transition-all duration-300 rounded-sm shadow-lg hover:shadow-amber-600/20"
          >
            <Calendar size={18} aria-hidden="true" />
            Reserve Your Experience
          </a>
          <a
            href="/visit-us"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-amber-500/60 text-amber-400 text-sm tracking-widest uppercase hover:bg-amber-500/10 transition-all duration-300 rounded-sm"
          >
            <MapPin size={18} aria-hidden="true" />
            Visit Us Today
          </a>
        </div>

        <BalineseBorder />

        {/* P.S. link card */}
        <div className="mt-6 p-6 border border-amber-900/30 rounded-sm bg-[#1a1210]/40 text-center">
          <p className="text-sand-400 text-sm leading-relaxed mb-3">
            <span className="text-amber-400 font-medium">P.S.</span> — Curious what makes a
            <a href="/premium-hookah" className="text-amber-400 hover:text-amber-300 underline-offset-4 hover:underline transition-colors mx-1">premium hookah</a>
            truly premium?
          </p>
          <a
            href="/premium-hookah"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm tracking-wide transition-colors group"
          >
            Learn The Centerpiece Premium Hookah Philosophy
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </a>
        </div>
      </SectionWrapper>
    </PageShell>
  );
}
