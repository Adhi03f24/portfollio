import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const defaultVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ScrollSection({
  children,
  className = "",
  id,
  variants = defaultVariants,
  delay = 0,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...variants.visible,
          transition: {
            ...variants.visible.transition,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.section>
  );
}
