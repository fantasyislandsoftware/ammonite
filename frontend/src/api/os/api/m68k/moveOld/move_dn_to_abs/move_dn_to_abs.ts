import { padHex, mergeHex } from 'functions/string';
import { ITask } from 'stores/useTaskStore';
import { bitSize, EnumBit, IM68KArg } from '../../IM68k';
import { hex32Tohex8Array, moveC } from '../../m68kTestHelpers';

export const move_dn_to_abs = (
  self: ITask,
  bit: EnumBit,
  arg1: IM68KArg,
  arg2: IM68KArg
) => {
  const src = padHex(self.s.d[arg1.v as number].toString(16), EnumBit.LONG);
  const hexBytes = hex32Tohex8Array(src);
  const width = bitSize[bit] / 2;
  const addr = arg2.v as number;
  for (let n = addr; n < width; n += 1) {
    const h = hexBytes[4 - width + n];
    self.s.m[n] = parseInt(h, 16);
  }
  self.s.c = moveC(self);
  return self;
};
