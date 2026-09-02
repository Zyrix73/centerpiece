import { useState, useEffect } from 'react';

const AFTER_HOURS_PDF = '/After-hours.pdf';
const STANDARD_MENU = 'https://centerpiecehookahlounge.com/menu';

function isAfterHours() {
  const laHour = Number(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      hour: 'numeric',
      hour12: false,
    }).format(new Date()),
  );
  return laHour >= 0 && laHour < 4;
}

export default function MenuButton() {
  const [afterHours, setAfterHours] = useState(isAfterHours());

  useEffect(() => {
    const interval = setInterval(() => {
      setAfterHours(isAfterHours());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  const href = afterHours ? AFTER_HOURS_PDF : STANDARD_MENU;
  const label = afterHours ? 'View After Hours Menu' : 'View Menu';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative w-full flex items-center justify-center rounded-full select-none transition-all duration-200 overflow-hidden py-4 bg-[#1c1a14] border-2 border-[#c9a84c] text-[#c9a84c] hover:bg-[#221f13]${afterHours ? ' after-hours-btn' : ''}`}
    >
      <div className="flex flex-col items-center gap-0.5 px-8 relative z-[2]">
        <span
          className={`font-serif tracking-widest text-base${afterHours ? ' after-hours-label' : ''}`}
          style={{ fontVariant: 'small-caps', letterSpacing: '0.12em' }}
        >
          <span className="mr-2 not-italic" aria-hidden="true">{afterHours ? '🌙' : '📋'}</span>
          {label}
        </span>
      </div>
    </a>
  );
}
