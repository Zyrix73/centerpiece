import { useRef } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import PageShell, { OrnamentDivider } from './components/PageShell';
import VideoLabelOverlay, { type TimestampLabel } from './components/premium/VideoLabelOverlay';
import ComparisonCallout from './components/premium/ComparisonCallout';
import StatPillRow from './components/premium/StatPillRow';

const VIDEO_TIMESTAMPS: TimestampLabel[] = [
  { start: 0, end: 3, text: 'Wookah Hookah — Body', position: 'bottom' },
  { start: 3, end: 6, text: 'Crystal Glass Head', position: 'top' },
  { start: 6, end: 9, text: 'Premium Tobacco Leaf', position: 'middle' },
  { start: 9, end: 12, text: 'Russian HMD', position: 'top' },
  { start: 12, end: 15, text: 'Leorgange Charcoal', position: 'top' },
];

const TOBACCO_TAGS = ['Adalya', 'Eternal Smoke', 'Dark Leaf', 'Russian Tobacco', 'Sebero', 'Tangiers'];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'What Is Premium Hookah? | Centerpiece Hookah Lounge',
      description:
        'Every premium hookah session starts with five deliberate decisions: a Wookah Hookah, a crystal glass head, premium tobacco, a Russian HMD, and Leorgange charcoal.',
      url: 'https://centerpiecehookahlounge.com/premium-hookah',
      publisher: { '@type': 'Organization', name: 'Centerpiece Hookah Lounge' },
    },
    {
      '@type': 'ItemList',
      name: 'Five Components of a Premium Hookah Session',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Wookah Hookah' },
        { '@type': 'ListItem', position: 2, name: 'Crystal Glass Head' },
        { '@type': 'ListItem', position: 3, name: 'Premium Tobacco' },
        { '@type': 'ListItem', position: 4, name: 'Russian HMD' },
        { '@type': 'ListItem', position: 5, name: 'Leorgange Charcoal' },
      ],
    },
  ],
};

function useFadeUp() {
  const reduce = useReducedMotion();
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };
  const item: Variants = {
    hidden: reduce ? {} : { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  return { container, item };
}

function AnimatedHeading({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  };
  const word: Variants = {
    hidden: reduce ? {} : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };
  return (
    <motion.h2
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className={className}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={word} className="inline-block">
          {w}
          {i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.h2>
  );
}

function GlowCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-sm border border-[#FFB347]/25 bg-gradient-to-br from-[#0E0C10]/80 to-[#16484F]/10 p-8 md:p-10 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#FFB347]/5 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function PremiumHookahPage() {
  const { container, item } = useFadeUp();
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <PageShell
      pageTitle="What Is Premium Hookah? | Centerpiece Hookah Lounge"
      pageDescription="Every premium hookah session starts with five deliberate decisions: a Wookah Hookah, a crystal glass head, premium tobacco, a Russian HMD, and Leorgange charcoal."
      jsonLd={jsonLd}
    >
      {/* ── SECTION 0 — HERO / VIDEO BREAKDOWN ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0E0C10] px-6 pt-24 pb-12">
        {/* Amber glow pulse */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 35%, rgba(255,179,71,0.12) 0%, transparent 70%)',
          }}
          animate={useReducedMotion() ? {} : { opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center mb-8"
        >
          <motion.h1
            variants={item}
            className="font-serif text-4xl md:text-6xl text-[#F2E8D8] mb-5"
          >
            What Is Premium Hookah?
          </motion.h1>
          <motion.p
            variants={item}
            className="text-sand-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
          >
            Every session starts with five decisions most lounges never make.
          </motion.p>
        </motion.div>

        {/* Vertical video container */}
        <motion.div
          initial={useReducedMotion() ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-[340px]"
          onViewportEnter={() => {
            const v = videoRef.current;
            if (v) v.play().catch(() => {});
          }}
          onViewportLeave={() => {
            const v = videoRef.current;
            if (v) v.pause();
          }}
        >
          <div
            className="relative rounded-xl overflow-hidden border border-[#FFB347]/30 shadow-[0_0_40px_rgba(255,179,71,0.12)]"
            style={{ aspectRatio: '9 / 16', maxHeight: '85vh' }}
          >
            <video
              ref={videoRef}
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://pub-503bdcef50f44f499fb98ef82b72d6db.r2.dev/hookah-breakdown.mp4" type="video/mp4" />
            </video>
            <VideoLabelOverlay timestamps={VIDEO_TIMESTAMPS} videoRef={videoRef} />
          </div>
        </motion.div>

        <motion.p
          initial={useReducedMotion() ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative z-10 text-sand-500/60 text-sm mt-6 text-center"
        >
          Scroll to see what makes each piece matter.
        </motion.p>

        <motion.div
          aria-hidden="true"
          className="relative z-10 mt-4"
          animate={useReducedMotion() ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-[#FFB347]/60" size={28} />
        </motion.div>
      </section>

      {/* ── SECTION 1 — THE HOOKAH: WOOKAH ── */}
      <section className="py-16 md:py-24 px-6 bg-[#0E0C10] relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center"
          >
            <motion.div variants={item} className="order-2 md:order-1">
              <div className="relative rounded-sm overflow-hidden border border-[#FFB347]/20 aspect-[4/5]">
                <img
                  src="/images/Wookah-hookah-square.webp"
                  alt="Wookah Hookah — handcrafted wooden body"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C10]/60 to-transparent" aria-hidden="true" />
              </div>
            </motion.div>
            <motion.div variants={item} className="order-1 md:order-2">
              <GlowCard>
                <p className="text-[#FFB347] text-xs tracking-[0.4em] uppercase mb-3">01 — The Hookah</p>
                <AnimatedHeading
                  text="It Starts With the Hookah — And We Don't Use Generic Pipes"
                  className="font-serif text-2xl md:text-3xl text-[#F2E8D8] mb-5 leading-tight"
                />
                <div className="space-y-4 text-sand-300 text-base leading-relaxed">
                  <p>
                    Most lounges run the hookah equivalent of a rental car — mass-produced,
                    inconsistent, replaced the moment it breaks. We don't. Every session at
                    Centerpiece starts on a Wookah, a handcrafted, precision-engineered pipe
                    built for one purpose: a perfect, uninterrupted draw.
                  </p>
                  <p>
                    A generic hookah is stamped out of thin metal, with loose seals and
                    airflow that fights you the whole session — you're constantly
                    re-adjusting, re-lighting, and losing flavor to leaks you can't even
                    see. A Wookah is different by design, down to the metal itself. The body
                    is crafted from 1.4301 (V2A) stainless steel — the same grade prized for
                    its durability and resistance to corrosion — paired with a hand-finished
                    wood accent that gives it warmth a purely metal pipe can't match. It's
                    built to be washed, reused, and trusted, not replaced.
                  </p>
                  <p>
                    The engineering goes deeper than the body. Every Wookah includes a
                    downstem fitted with a demountable diffuser — a small piece with an
                    outsized effect. With it in place, your session runs soft, quiet, and
                    undisturbed, the smoke gliding through with none of the harsh gurgle of
                    a standard setup. Prefer the classic sound and feel? Pull the diffuser
                    out in seconds and you're back to the traditional Wookah pull. Either
                    way, the airflow path is engineered for zero resistance, and every joint
                    holds a tight seal for hours, not minutes.
                  </p>
                  <p>
                    The result is a smoother pull from your first inhale to your last, a
                    session that stays consistent instead of degrading halfway through —
                    and a pipe that doesn't hold onto yesterday's session. Stainless steel
                    doesn't absorb smells the way lesser metals do, so what you taste is
                    exactly what you ordered, every time.
                  </p>
                  <p className="text-[#F2E8D8]/80 italic">
                    Handmade in Europe. Built to outlast the trend of disposable hookahs
                    entirely.
                  </p>
                </div>
                <div className="mt-6">
                  <StatPillRow items={['1.4301 Stainless Steel', 'Demountable Diffuser', 'Zero-Leak Seal', 'Handmade in Europe']} />
                </div>
              </GlowCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2 — THE HEAD: CRYSTAL GLASS ── */}
      <section className="py-16 md:py-24 px-6 bg-[#0E0C10] relative overflow-hidden border-t border-[#C9922E]/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center"
          >
            <motion.div variants={item} className="order-1">
              <GlowCard>
                <p className="text-[#FFB347] text-xs tracking-[0.4em] uppercase mb-3">02 — The Head</p>
                <AnimatedHeading
                  text="The Head That Doesn't Lie to You"
                  className="font-serif text-2xl md:text-3xl text-[#F2E8D8] mb-5 leading-tight"
                />
                <div className="space-y-4 text-sand-300 text-base leading-relaxed">
                  <p>
                    Underneath the tobacco sits the part most lounges never think about —
                    the bowl. We use a crystallized glass head instead of the standard clay
                    head you'll find almost everywhere else, and it changes the entire
                    session.
                  </p>
                  <p>
                    Clay is porous. Every session it holds a little bit of the last
                    flavor — and the one before that — so over time your Blue Mist starts
                    tasting faintly of last week's Double Apple. Clay also heats unevenly,
                    which means part of your bowl scorches while another part barely
                    cooks, so you get harsh hits mixed with weak ones in the same session.
                  </p>
                  <p>
                    Glass holds none of that. It's completely non-porous, so every flavor
                    you smoke is exactly what you ordered — no carryover, no muddiness. It
                    also conducts heat far more evenly across the whole bowl, which means
                    consistent vaporization from the first pull to the last, and a session
                    that tastes as clean at minute 60 as it did at minute one.
                  </p>
                </div>
              </GlowCard>
            </motion.div>
            <motion.div variants={item} className="order-2">
              <div className="relative rounded-sm overflow-hidden border border-[#FFB347]/20 aspect-[4/5]">
                <img
                  src="/images/crystal-head.webp"
                  alt="Crystal glass hookah head — non-porous bowl"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C10]/60 to-transparent" aria-hidden="true" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={useReducedMotion() ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <ComparisonCallout
              leftTitle="Clay Head"
              rightTitle="Crystal Glass Head"
              rows={[
                { label: 'Flavor Purity', oldWay: 'Porous, absorbs old flavors', ourWay: 'Non-porous, zero flavor carryover' },
                { label: 'Heat', oldWay: 'Uneven heat spots', ourWay: 'Even heat distribution' },
                { label: 'Durability', oldWay: 'Can crack and degrade', ourWay: 'Durable, built to last' },
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3 — THE TOBACCO ── */}
      <section className="py-16 md:py-24 px-6 bg-[#0E0C10] relative overflow-hidden border-t border-[#C9922E]/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center"
          >
            <motion.div variants={item} className="order-2 md:order-1">
              <div className="relative rounded-sm overflow-hidden border border-[#FFB347]/20">
                <img
                  src="/images/tobacco-leaf.png"
                  alt="Premium dark leaf tobacco"
                  className="block w-full h-auto"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C10]/60 to-transparent" aria-hidden="true" />
              </div>
            </motion.div>
            <motion.div variants={item} className="order-1 md:order-2">
              <GlowCard>
                <p className="text-[#FFB347] text-xs tracking-[0.4em] uppercase mb-3">03 — The Tobacco</p>
                <AnimatedHeading
                  text="Leaves That Actually Deserve the Bowl"
                  className="font-serif text-2xl md:text-3xl text-[#F2E8D8] mb-5 leading-tight"
                />
                <div className="space-y-4 text-sand-300 text-base leading-relaxed">
                  <p>
                    The tobacco is where most lounges cut corners, and it's the one place
                    we refuse to. We source from the brands serious hookah smokers already
                    seek out — Adalya, Eternal Smoke, dark leaf blends, and Russian
                    tobacco — instead of the mass-market leaf built for speed and cost, not
                    flavor.
                  </p>
                  <p>
                    High-quality shisha starts with the leaf itself. The best tobacco is
                    grown from select cultivars, harvested at peak maturity, and washed and
                    fermented slowly to remove harshness while keeping the natural oils that
                    carry flavor. Cheaper leaf is rushed through every stage — picked early,
                    washed quick, and dyed to look premium — so what you get is thin smoke and
                    a flavor that fades in ten minutes. A properly cured leaf holds more
                    moisture, more natural sweetness, and a deeper, truer taste that lasts the
                    entire session.
                  </p>
                  <p>
                    The cut matters just as much. Premium shisha is cut finer and more
                    consistent, which means the leaf packs evenly in the bowl instead of
                    clumping or leaving air gaps. Finer cut lets heat travel through the
                    tobacco smoothly and uniformly — no hot spots scorching one side while the
                    other side barely cooks. The result is a session that vaporizes evenly
                    from the first pull to the last, with fuller flavor, thicker smoke, and
                    none of the harshness that comes from uneven heat hitting unevenly cut
                    leaf.
                  </p>
                </div>
                <div className="mt-6 space-y-4">
                  <StatPillRow items={TOBACCO_TAGS} />
                  <StatPillRow
                    variant="stat"
                    items={['Select Cultivars', 'Finer Cut', 'Even Heat Flow', 'Deeper Flavor']}
                  />
                </div>
              </GlowCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4 — THE HMD ── */}
      <section className="py-16 md:py-24 px-6 bg-[#0E0C10] relative overflow-hidden border-t border-[#C9922E]/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center"
          >
            <motion.div variants={item} className="order-1">
              <GlowCard>
                <p className="text-[#FFB347] text-xs tracking-[0.4em] uppercase mb-3">04 — Heat Management</p>
                <AnimatedHeading
                  text="No Foil. Ever."
                  className="font-serif text-2xl md:text-3xl text-[#F2E8D8] mb-5 leading-tight"
                />
                <div className="space-y-4 text-sand-300 text-base leading-relaxed">
                  <p>
                    Above the bowl, most hookahs still run on tinfoil with holes poked in
                    it — a decades-old workaround, not a real heat solution. We use a
                    high-end Russian HMD (heat management device) instead, and the
                    difference shows up in every hit.
                  </p>
                  <p>
                    Foil is thin, inconsistent, and impossible to regulate mid-session —
                    once it's punctured wrong or burns through unevenly, your heat is gone
                    and so is your flavor. It also does nothing to actually manage
                    temperature; it just sits there and lets heat do whatever it wants,
                    which is how you end up with scorched tobacco twenty minutes in. A
                    proper HMD is a precision-engineered unit with adjustable vents, built
                    to distribute heat evenly across the entire bowl and let us dial your
                    session up or down without ever touching your coals. It's the
                    difference between guessing and controlling.
                  </p>
                </div>
              </GlowCard>
            </motion.div>
            <motion.div variants={item} className="order-2">
              <div className="relative rounded-sm overflow-hidden border border-[#FFB347]/20 aspect-[4/5]">
                <img
                  src="/images/hmd.png"
                  alt="Russian HMD heat management device"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C10]/60 to-transparent" aria-hidden="true" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={useReducedMotion() ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <ComparisonCallout
              leftTitle="Foil"
              rightTitle="Russian HMD"
              rows={[
                { label: 'Build', oldWay: 'Inconsistent, tears and punctures', ourWay: 'Precision-engineered, reusable' },
                { label: 'Heat Control', oldWay: 'No real heat control', ourWay: 'Adjustable vents, full heat control' },
                { label: 'Distribution', oldWay: 'Scorches tobacco unevenly', ourWay: 'Even heat across the whole bowl' },
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5 — THE CHARCOAL: LEORGANGE ── */}
      <section className="py-16 md:py-24 px-6 bg-[#0E0C10] relative overflow-hidden border-t border-[#C9922E]/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center"
          >
            <motion.div variants={item} className="order-2 md:order-1">
              <div className="relative rounded-sm overflow-hidden border border-[#FFB347]/20 aspect-[4/5]">
                <img
                  src="/images/leorange-square.webp"
                  alt="Leorgange natural charcoal"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C10]/60 to-transparent" aria-hidden="true" />
              </div>
            </motion.div>
            <motion.div variants={item} className="order-1 md:order-2">
              <GlowCard>
                <p className="text-[#FFB347] text-xs tracking-[0.4em] uppercase mb-3">05 — The Charcoal</p>
                <AnimatedHeading
                  text="Even the Charcoal Is Considered"
                  className="font-serif text-2xl md:text-3xl text-[#F2E8D8] mb-5 leading-tight"
                />
                <div className="space-y-4 text-sand-300 text-base leading-relaxed">
                  <p>
                    The last piece is the one nobody asks about — the charcoal — and it's
                    still a deliberate choice. We use Leorgange charcoal, a high-heat
                    natural coal built to stay lit and burn clean, instead of the
                    quick-light briquettes most places default to.
                  </p>
                  <p>
                    Leorgange holds a high, stable temperature for a long burn without
                    needing to be replaced every twenty minutes, and it produces
                    noticeably minimal ash while it does it. Less ash means less soot
                    falling into your bowl, less interference with your HMD's airflow, and
                    a cleaner-tasting session from start to finish. It's a small detail
                    most guests will never notice consciously — they'll just notice that
                    the session never got worse.
                  </p>
                </div>
                <div className="mt-6">
                  <StatPillRow items={['Minimal Ash', 'Stays Lit at High Heat', 'Cleaner Session']} />
                </div>
              </GlowCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 6 — CLOSING CTA ── */}
      <section className="py-20 md:py-28 px-6 bg-[#0E0C10] relative overflow-hidden border-t border-[#C9922E]/10">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(255,179,71,0.08) 0%, transparent 70%)',
          }}
          animate={useReducedMotion() ? {} : { opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          <motion.div variants={item}>
            <AnimatedHeading
              text="Five Details. One Unforgettable Session."
              className="font-serif text-3xl md:text-5xl text-[#F2E8D8] mb-5"
            />
          </motion.div>
          <motion.div variants={item}>
            <OrnamentDivider />
          </motion.div>
          <motion.p
            variants={item}
            className="text-sand-300 text-lg leading-relaxed mb-10"
          >
            This is what 'premium hookah' actually means at Centerpiece — not a marketing
            word, a build sheet. Come experience it yourself.
          </motion.p>
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/visit-us"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFB347] hover:bg-[#FFB347]/90 text-[#0E0C10] font-semibold text-sm tracking-widest uppercase transition-all duration-300 rounded-sm shadow-lg hover:shadow-[#FFB347]/20"
            >
              Reserve Your Table
            </a>
            <a
              href="/who-we-are"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#FFB347]/40 hover:border-[#FFB347]/70 text-[#FFB347] font-semibold text-sm tracking-widest uppercase transition-all duration-300 rounded-sm"
            >
              Meet Mina
            </a>
          </motion.div>
        </motion.div>
      </section>
    </PageShell>
  );
}
