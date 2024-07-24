import { bin2int, padHex } from 'functions/string';
import { ITask } from 'stores/useTaskStore';
import { bitSize, EnumBit } from '../../IM68k';
import { hex32Tohex8Array, moveC } from '../../m68kTestHelpers';
import { parse } from 'path';

export const MOVE_DX_TO_ABS = (
  task: ITask,
  opSize: number,
  srcDN_bin: string,
  dstABS_bin: string
) => {
  const srcDN = bin2int(srcDN_bin);
  console.log(srcDN);

  const srcDN_data = task.s.d[srcDN];
  console.log(srcDN_data);

  //const srcData = padHex(task.s.d[srcDN].toString(16), EnumBit.LONG);
  //console.log(srcData);

  //console.log(dstABS);
  //console.log(dstData);
  //const srcData = hex32Tohex8Array(src);
  //const width = bitSize[opSize] / 2;
  //console.log(width);
  //const addr = dstABS;
  //for (let n = addr; n < width; n += 1) {
  //  const h = hexBytes[4 - width + n];
  //  task.s.m[n] = parseInt(h, 16);
  //}
  task.s.c = moveC(task);
  return task;
};
