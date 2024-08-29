export const hex2bin = (hex: string) => {
  return parseInt(hex, 16).toString(2).padStart(16, '0');
};

export const bin2int = (bin: string) => {
  return parseInt(bin, 16);
};

export const int2Hex = (int: number) => {
  return int.toString(16);
};

export const rp = (src: string, a: { str: string; with: string }[]) => {
  a.map((v) => {
    src = src.replaceAll(`{${v.str}}`, v.with);
  });
  return src;
};
