export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, delay: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export const staggerItem = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};