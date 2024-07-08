import { bitSize, EnumBit } from 'api/os/api/m68k/IM68k';

export const padHex = (hexString: string, bit: EnumBit) => {
  switch (bit) {
    case EnumBit.BYTE:
      return hexString.padStart(2, '0');
    case EnumBit.WORD:
      return hexString.padStart(4, '0');
    case EnumBit.LONG:
      return hexString.padStart(8, '0');
    default:
      return hexString;
  }
};

export const mergeHex = (src: string, dst: string, bit: EnumBit) => {
  const res = dst.split('');

  const width = bitSize[bit];

  for (let n = src.length - width; n < src.length; n += 1) {
    res[n] = dst[n];
  }

  for (let n = dst.length - bitSize[bit]; n < dst.length; n += 1) {
    res[n] = src[n];
  }

  const s = res.join('');

  return s;
};
