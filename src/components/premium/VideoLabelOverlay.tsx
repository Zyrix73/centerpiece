import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface TimestampLabel {
  start: number;
  end: number;
  text: string;
  position: 'top' | 'middle' | 'bottom';
}

interface Props {
  timestamps: TimestampLabel[];
  videoRef: React.RefObject<HTMLVideoElement>;
}

export default function VideoLabelOverlay({ timestamps, videoRef }: Props) {
  const [currentTime, setCurrentTime] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tick = () => {
      setCurrentTime(video.currentTime);
      rafRef.current = requestAnimationFrame(tick);
    };

    const onPlay = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    const onPause = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('ended', onPause);

    if (!video.paused) onPlay();

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('ended', onPause);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [videoRef]);

  const active = timestamps.find(
    (t) => currentTime >= t.start && currentTime < t.end,
  );

  const positionClasses: Record<TimestampLabel['position'], string> = {
    top: 'top-[12%]',
    middle: 'top-1/2 -translate-y-1/2',
    bottom: 'bottom-[14%]',
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.text}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`absolute left-1/2 -translate-x-1/2 ${positionClasses[active.position]}`}
          >
            <div className="flex items-center gap-2">
              <svg width="40" height="1" viewBox="0 0 40 1" aria-hidden="true" className="hidden sm:block">
                <line x1="0" y1="0.5" x2="40" y2="0.5" stroke="#FFB347" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
              </svg>
              <span className="rounded-full bg-[#FFB347]/15 border border-[#FFB347]/50 px-4 py-1.5 text-xs font-medium tracking-wide text-[#FFB347] backdrop-blur-sm whitespace-nowrap">
                {active.text}
              </span>
              <svg width="40" height="1" viewBox="0 0 40 1" aria-hidden="true" className="hidden sm:block">
                <line x1="0" y1="0.5" x2="40" y2="0.5" stroke="#FFB347" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
