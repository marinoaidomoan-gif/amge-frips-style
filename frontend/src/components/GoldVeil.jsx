import { motion } from 'framer-motion';

export default function GoldVeil() {
  return (
    <motion.div
      className="fixed inset-0 z-[998] bg-gold pointer-events-none"
      initial={{ x: '-100%' }}
      animate={{ x: ['-100%', '0%', '100%'] }}
      transition={{ duration: 0.8, times: [0, 0.45, 1], ease: 'easeInOut' }}
    />
  );
}