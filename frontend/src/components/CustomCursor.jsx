import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.3 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.3 });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    document.body.classList.add('custom-cursor-active');
    const move = (e) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };
    window.addEventListener('mousemove', move);
    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', move);
    };
  }, [isDesktop, cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-gold pointer-events-none z-[999] mix-blend-difference"
      style={{ x: springX, y: springY }}
    />
  );
}