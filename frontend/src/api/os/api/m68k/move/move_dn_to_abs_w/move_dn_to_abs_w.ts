import { padHex, mergeHex } from 'functions/string';
import { ITask } from 'stores/useTaskStore';
import { bitSize, EnumBit } from '../../IM68k';
import { IM68KArg } from '../../m68k';
import { parse } from 'path';

const hex32Tohex8Array = (hex: string) => {
  const arr = [];
  for (let i = 0; i < 4; i++) {
    arr.push(hex.substr(i * 2, 2));
  }
  return arr;
};

export const move_dn_to_abs_w = (
  self: ITask,
  bit: EnumBit,
  arg1: IM68KArg,
  arg2: IM68KArg
) => {
  const src = padHex(self.s.d[arg1.v as number].toString(16), EnumBit.LONG);
  const hexBytes = hex32Tohex8Array(src);
  const width = bitSize[bit] / 2;
  for (let n = 0; n < width; n += 1) {
    const h = hexBytes[4 - width + n];
    self.s.m[n] = parseInt(h, 16);
  }

  self.s.c = {
    x: self.s.c.x,
    n: 1,
    z: 0,
    v: 0,
    c: 0,
  };
  return self;
};
