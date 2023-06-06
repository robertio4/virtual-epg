export const getRemInPx = (): number =>
  parseFloat(getComputedStyle(document.documentElement)?.fontSize);
