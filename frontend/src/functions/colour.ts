export const _12BitColour = (r: number, g: number, b: number) => {
  const _r = Math.floor(r * 17);
  const _g = Math.floor(g * 17);
  const _b = Math.floor(b * 17);
  return [_r, _g, _b, 255];
};
