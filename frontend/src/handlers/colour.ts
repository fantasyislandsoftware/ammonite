export const _12BitColour = (r: number, g: number, b: number) => {
  const padHex = (hex: string) => {
    if (hex.length === 1) {
      return `0${hex}`;
    } else {
      return hex;
    }
  };
  const _r = Math.floor(r * 17);
  const _g = Math.floor(g * 17);
  const _b = Math.floor(b * 17);
  const _rHex = padHex(_r.toString(16));
  const _gHex = padHex(_g.toString(16));
  const _bHex = padHex(_b.toString(16));
  const result = `#${_rHex}${_gHex}${_bHex}`;
  return result;
};
