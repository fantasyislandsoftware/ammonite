import { ITask } from 'stores/useTaskStore';
import { IM68KArg } from '../m68k';
import { EnumBit } from '../IM68k';

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

export const merge = (src: string, dst: string, bit: EnumBit) => {
  let res = '';
  for (let n = 0; n < dst.length - bit / 4; n += 1) {
    res += dst[n];
  }

  const width = bit / 4;

  for (let n = dst.length - width; n < dst.length; n += 1) {
    res += src[n];
  }

  return res;
};

export const move_dn_to_dn = (
  self: ITask,
  bit: EnumBit,
  arg1: IM68KArg,
  arg2: IM68KArg
) => {
  const src = padHex(self.r.d[arg1.v as number].toString(16), EnumBit.LONG);
  const dst = padHex(self.r.d[arg2.v as number].toString(16), EnumBit.LONG);
  let res = merge(src, dst, bit);
  self.r.d[arg2.v as number] = parseInt(res, 16);
  return self;
};

export const move_dn_to_dst = (
  self: ITask,
  bit: EnumBit,
  arg1: IM68KArg,
  arg2: IM68KArg
) => {
  switch (arg2.t) {
    case 'dreg':
      return move_dn_to_dn(self, bit, arg1, arg2);
    default:
  }
};
