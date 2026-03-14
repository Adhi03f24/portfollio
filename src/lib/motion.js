/**
 * Motion variants inspired by space-portfolio and modern-portfolio.
 * Use with framer-motion: initial="hidden" animate="visible" variants={slideInFromLeft(0.2)}
 */

export function slideInFromLeft(delay = 0) {
  return {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay, duration: 0.5, ease: [0.25, 0.6, 0.3, 0.8] },
    },
  };
}

export function slideInFromRight(delay = 0) {
  return {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay, duration: 0.5, ease: [0.25, 0.6, 0.3, 0.8] },
    },
  };
}

export const slideInFromTop = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.3, duration: 0.5, ease: [0.25, 0.6, 0.3, 0.8] },
  },
};

export const slideInFromBottom = {
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.6, 0.3, 0.8] },
  },
};

/**
 * @param {"up"|"down"|"left"|"right"} direction
 * @param {number} delay
 */
export function fadeIn(direction, delay = 0) {
  const offsets = { up: 80, down: -80, left: 80, right: -80 };
  const x = direction === "left" ? offsets.left : direction === "right" ? offsets.right : 0;
  const y = direction === "up" ? offsets.up : direction === "down" ? offsets.down : 0;
  return {
    hidden: { x, y, opacity: 0, transition: { type: "tween", duration: 0.6, delay, ease: [0.25, 0.6, 0.3, 0.8] } },
    visible: { x: 0, y: 0, opacity: 1, transition: { type: "tween", duration: 0.5, delay, ease: [0.25, 0.25, 0.25, 0.75] } },
  };
}
