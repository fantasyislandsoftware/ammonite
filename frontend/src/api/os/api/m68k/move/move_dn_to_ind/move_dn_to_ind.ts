import { ITask } from 'stores/useTaskStore';
import { bitSize, EnumBit } from '../../IM68k';
import { IM68KArg } from '../../m68k';
import { padHex } from 'functions/string';
import { hex32Tohex8Array, moveC } from '../../m68kTestHelpers';

export const move_dn_to_ind = (
  self: ITask,
  bit: EnumBit,
  arg1: IM68KArg,
  arg2: IM68KArg
) => {
  const src = padHex(self.s.d[arg1.v as number].toString(16), EnumBit.LONG);
  const hexBytes = hex32Tohex8Array(src);
  const width = bitSize[bit] / 2;
  const addr = self.s.a[arg2.v as number];
  for (let n = addr; n < width; n += 1) {
    const h = hexBytes[4 - width + n];
    self.s.m[n] = parseInt(h, 16);
  }
  self.s.c = moveC(self);
  return self;
};
