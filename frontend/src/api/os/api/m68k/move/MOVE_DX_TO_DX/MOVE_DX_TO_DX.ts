import { mergeHex, padHex } from 'functions/string';
import { ITask } from 'stores/useTaskStore';
import { EnumBit } from '../../IM68k';
import { moveC } from '../../m68kTestHelpers';

export const MOVE_DX_TO_DX = (
  task: ITask,
  opSize: number,
  srcDN: number,
  dstDN: number
) => {
  const src = padHex(task.s.d[srcDN].toString(16), EnumBit.LONG);
  const dst = padHex(task.s.d[dstDN].toString(16), EnumBit.LONG);
  const res = mergeHex(src, dst, opSize);
  task.s.d[dstDN] = parseInt(res, 16);
  task.s.c = moveC(task);
  return task;
};
