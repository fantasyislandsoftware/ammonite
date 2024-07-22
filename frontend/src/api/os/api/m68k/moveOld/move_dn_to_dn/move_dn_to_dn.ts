import { ITask } from 'stores/useTaskStore';
import { EnumBit, IM68KArg } from '../../IM68k';
import { padHex, mergeHex } from 'functions/string';
import { moveC } from '../../m68kTestHelpers';

export const move_dn_to_dn = (
  self: ITask,
  bit: EnumBit,
  arg1: IM68KArg,
  arg2: IM68KArg
) => {
  const src = padHex(self.s.d[arg1.v as number].toString(16), EnumBit.LONG);
  const dst = padHex(self.s.d[arg2.v as number].toString(16), EnumBit.LONG);
  const res = mergeHex(src, dst, bit);
  self.s.d[arg2.v as number] = parseInt(res, 16);
  self.s.c = moveC(self);
  return self;
};
