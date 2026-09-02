import { motion, useReducedMotion } from 'framer-motion';

export interface ComparisonRow {
  label: string;
  oldWay: string;
  ourWay: string;
}

interface Props {
  leftTitle: string;
  rightTitle: string;
  rows: ComparisonRow[];
}

export default function ComparisonCallout({ leftTitle, rightTitle, rows }: Props) {
  const reduce = useReducedMotion();
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-stretch"
    >
      {/* Left column */}
      <div className="flex flex-col">
        <div className="rounded-sm border border-[#C9922E]/30 bg-[#0E0C10]/60 px-5 py-3 mb-3">
          <h4 className="font-serif text-sm tracking-wide text-sand-500 uppercase">{leftTitle}</h4>
        </div>
        <div className="flex flex-col gap-3">
          {rows.map((row) => (
            <motion.div
              key={row.label}
              variants={item}
              className="rounded-sm border border-[#C9922E]/20 bg-[#0E0C10]/40 px-5 py-4"
            >
              <p className="text-[10px] tracking-[0.25em] uppercase text-sand-600 mb-1">{row.label}</p>
              <p className="text-sand-400 text-sm leading-relaxed">{row.oldWay}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Versus divider */}
      <div className="hidden md:flex items-center justify-center">
        <div className="h-full w-px bg-gradient-to-b from-transparent via-[#FFB347]/40 to-transparent" />
      </div>
      <div className="md:hidden flex items-center justify-center py-1">
        <span className="text-[#FFB347]/60 text-xs tracking-[0.3em] uppercase">vs</span>
      </div>

      {/* Right column */}
      <div className="flex flex-col">
        <div className="rounded-sm border border-[#FFB347]/40 bg-[#FFB347]/10 px-5 py-3 mb-3">
          <h4 className="font-serif text-sm tracking-wide text-[#FFB347] uppercase">{rightTitle}</h4>
        </div>
        <div className="flex flex-col gap-3">
          {rows.map((row) => (
            <motion.div
              key={row.label}
              variants={item}
              className="rounded-sm border border-[#FFB347]/25 bg-[#FFB347]/5 px-5 py-4"
            >
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#FFB347]/70 mb-1">{row.label}</p>
              <p className="text-sand-200 text-sm leading-relaxed">{row.ourWay}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
