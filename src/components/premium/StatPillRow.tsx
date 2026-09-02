import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  items: string[];
  variant?: 'pill' | 'stat';
  icon?: React.ReactNode;
}

export default function StatPillRow({ items, variant = 'pill' }: Props) {
  const reduce = useReducedMotion();
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  if (variant === 'stat') {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {items.map((label) => (
          <motion.div
            key={label}
            variants={item}
            className="rounded-sm border border-[#16484F]/40 bg-[#16484F]/10 px-5 py-4 text-center"
          >
            <p className="font-serif text-base text-[#F2E8D8] tracking-wide">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="flex flex-wrap gap-3"
    >
      {items.map((label) => (
        <motion.span
          key={label}
          variants={item}
          className="rounded-full border border-[#FFB347]/40 bg-[#FFB347]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#FFB347]"
        >
          {label}
        </motion.span>
      ))}
    </motion.div>
  );
}
