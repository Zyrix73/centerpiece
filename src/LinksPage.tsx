import { useState } from 'react';
import { Instagram, Facebook } from 'lucide-react';
import MenuButton from './components/MenuButton';

type LinkVariant = 'default' | 'bordered' | 'solid';

interface LinkItem {
  label: string;
  href?: string;
  external?: boolean;
  variant: LinkVariant;
  emoji?: string;
  sub?: string;
  onClick?: () => void;
}

const SOCIALS = [
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@centerpiecehookahlounge',
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/centerpiecehookahlounge/',
    icon: <Instagram size={20} aria-hidden="true" />,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/Centerpiecehookahlounge',
    icon: <Facebook size={20} aria-hidden="true" />,
  },
];

const variantStyles: Record<LinkVariant, string> = {
  default:
    'bg-[#1c1a14] border border-[#3a3220] text-[#c9a84c] hover:border-[#c9a84c]/50 hover:bg-[#221f13]',
  bordered:
    'bg-[#1c1a14] border-2 border-[#c9a84c] text-[#c9a84c] hover:bg-[#221f13]',
  solid:
    'bg-[#c9a84c] border-2 border-[#c9a84c] text-[#1a1208] hover:bg-[#d4b355]',
};

function Pill({ label, href, external, variant, emoji, sub, onClick }: LinkItem) {
  const [pressed, setPressed] = useState(false);
  const base =
    'relative w-full flex items-center justify-center rounded-full select-none transition-all duration-200 overflow-hidden py-4';

  const pressHandlers = {
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseLeave: () => setPressed(false),
    onTouchStart: () => setPressed(true),
    onTouchEnd: () => setPressed(false),
  };

  const style = { transform: pressed ? 'scale(0.97)' : 'scale(1)' };

  const inner = (
    <div className="flex flex-col items-center gap-0.5 px-8">
      <span className="font-serif tracking-widest text-base" style={{ fontVariant: 'small-caps', letterSpacing: '0.12em' }}>
        {emoji && <span className="mr-2 not-italic" aria-hidden="true">{emoji}</span>}
        {label}
      </span>
      {sub && (
        <span className={`text-xs tracking-wide font-sans ${variant === 'solid' ? 'text-[#1a1208]/70' : 'text-[#c9a84c]/50'}`}>
          {sub}
        </span>
      )}
    </div>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        {...pressHandlers}
        className={`${base} ${variantStyles[variant]} cursor-pointer`}
        style={style}
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...pressHandlers}
      className={`${base} ${variantStyles[variant]}`}
      style={style}
    >
      {variant === 'solid' && (
        <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)' }} aria-hidden="true" />
      )}
      {inner}
    </a>
  );
}

function HangingLantern({ side, delay = '0s' }: { side: 'left' | 'right'; delay?: string }) {
  const cordH = 110;

  return (
    <div
      className="fixed top-0 pointer-events-none"
      style={{
        [side]: 'calc(50% - 108px)',
        zIndex: 9,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transformOrigin: 'top center',
        animation: `lantern-sway 5.5s ease-in-out ${delay} infinite`,
      }}
      aria-hidden="true"
    >
      {/* Ceiling hook */}
      <div style={{
        width: 5, height: 5,
        borderRadius: '50%',
        border: '1px solid #7a6840',
        background: '#2a2210',
        opacity: 0.45,
      }} />
      {/* Cord */}
      <svg width="6" height={cordH} viewBox={`0 0 6 ${cordH}`} style={{ display: 'block' }} aria-hidden="true">
        <line x1="3" y1="0" x2="3" y2={cordH} stroke="#6a5a32" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
        <line x1="3" y1="0" x2="3" y2={cordH} stroke="#a08840" strokeWidth="0.5" opacity="0.2" strokeLinecap="round" />
      </svg>
      {/* Lantern */}
      <img
        src="/images/lantern.webp"
        alt=""
        style={{
          width: 50,
          height: 'auto',
          objectFit: 'contain',
          filter: 'drop-shadow(0 0 12px rgba(201,168,76,0.55))',
          transform: side === 'right' ? 'scaleX(-1)' : undefined,
          animation: `small-lantern-flicker 4.8s ease-in-out ${delay} infinite`,
        }}
      />
    </div>
  );
}

export default function LinksPage() {
  const links: LinkItem[] = [
    { label: 'Our Website', href: '/', variant: 'default' },
    { label: 'Build My Hookah', href: '/build-my-hookah', variant: 'bordered', emoji: '🪔' },
  ];

  return (
    <>
    <div
      className="h-screen overflow-hidden flex flex-col items-center justify-between px-3 py-6 font-sans"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #2a2210 0%, #141208 50%, #0e0d09 100%)' }}
    >
      {/* Background lantern */}
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <img
          src="/images/lantern.webp"
          alt=""
          className="object-contain lantern-flicker"
          style={{
            width: '80vw',
            maxWidth: '80vh',
            opacity: 0.85,
            filter: 'blur(0px) drop-shadow(0 0 60px rgba(201,168,76,0.6)) brightness(1.3) contrast(1.1)',
          }}
        />
      </div>

      {/* Hanging lanterns */}
      <HangingLantern side="left" delay="0s" />
      <HangingLantern side="right" delay="0.8s" />

      {/* Top glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '80vw',
          height: '40vh',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.10) 0%, transparent 70%)',
          filter: 'blur(24px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center justify-center flex-1 gap-7">

        {/* Logo */}
        <div className="flex items-center justify-center w-full">
          <a href="/" aria-label="Centerpiece Hookah Lounge home" className="flex flex-col items-center gap-1.5 group">
            <img
              src="/images/centerpiece_icon_transparent_no_text_cropped.webp"
              alt="Centerpiece icon"
              className="w-[84px] h-[84px] object-contain"
            />
            <div className="text-center leading-tight">
              <p className="font-serif text-[#c9a84c] tracking-widest text-2xl" style={{ fontVariant: 'small-caps', letterSpacing: '0.2em' }}>
                Centerpiece
              </p>
              <p className="text-[12px] tracking-[0.35em] text-[#c9a84c]/50 uppercase mt-0.5">
                Hookah Lounge
              </p>
            </div>
          </a>
        </div>

        {/* Links + Socials grouped */}
        <div className="w-full flex flex-col items-center gap-4">
          {/* Links */}
          <div className="w-full flex flex-col gap-2.5">
            {links.map((link) => (
              <Pill key={link.label} {...link} />
            ))}
            <MenuButton />
            <Pill
              label="Review Us on Google"
              href="https://search.google.com/local/writereview?placeid=ChIJi-q_YJy7woARSXfqFxWEYDY"
              external
              variant="solid"
              emoji="★"
            />
          </div>

          {/* Happy Hour card */}
          <div
            className="hh-sparkle-card w-full rounded-2xl border border-[#c9a84c]/30 bg-gradient-to-br from-[#2a2210]/80 to-[#1c1a14]/80 px-5 py-4 text-center"
            style={{ boxShadow: '0 0 24px rgba(201,168,76,0.08)' }}
          >
            <span className="hh-sparkle s1" aria-hidden="true" />
            <span className="hh-sparkle s2" aria-hidden="true" />
            <span className="hh-sparkle s3" aria-hidden="true" />
            <span className="hh-sparkle s4" aria-hidden="true" />
            <span className="hh-sparkle s5" aria-hidden="true" />
            <p className="relative z-[3] text-[#c9a84c] text-[10px] tracking-[0.4em] uppercase font-semibold mb-1">
              Happy Hour
            </p>
            <p className="relative z-[3] text-[#f5e6c8] text-sm font-bold tracking-wide">
              2–6 PM · 7 Days a Week
            </p>
            <p className="relative z-[3] text-[#c9a84c]/70 text-xs tracking-wide mt-0.5">
              Hookah $35
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Centerpiece on ${label}`}
                className="w-10 h-10 rounded-full bg-[#1c1a14] border border-[#3a3220] flex items-center justify-center text-[#c9a84c]/70 hover:text-[#c9a84c] hover:border-[#c9a84c]/40 transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

    </div>
    </>
  );
}
