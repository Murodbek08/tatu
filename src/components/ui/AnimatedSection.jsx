import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function AnimatedSection({
  children,
  direction = "up",
  delay = 0,
  className = "",
}) {
  const { ref, isInView } = useScrollReveal();

  const variants = {
    up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
    fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  };

  const chosen = variants[direction] || variants.up;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={chosen}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1], // easeOutExpo — professional hissiyot
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
