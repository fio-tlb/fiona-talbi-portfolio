// Mouvement partagé avec le JavaScript : valeurs identiques aux tokens de :root dans src/styles.css
// (--motion-fast, --motion-base, --motion-slow, --ease-out). Modifier les deux ensemble.
export const MOTION = {
  fast: 120,
  base: 200,
  slow: 400,
  easeOut: "cubic-bezier(0.2, 0.65, 0.3, 1)",
} as const;
