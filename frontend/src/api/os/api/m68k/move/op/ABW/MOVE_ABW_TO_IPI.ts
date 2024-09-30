import {
  hex2int,
  incReg,
  join4BytesInto1Long,
} from 'functions/dataHandling/dataHandling';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';

export const ABW_TO_IPI = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  const srcP = hex2int(args[0].replaceAll('0x', '').replaceAll('.w', ''));
  const dstPA = task.s[args[1]];
  const dstP = join4BytesInto1Long(dstPA[0], dstPA[1], dstPA[2], dstPA[3]);
  const dst = args[1];

  switch (opBit) {
    case EnumOpBit.BYTE:
      task.s.m[dstP] = task.s.m[srcP];
      task.s[dst] = incReg(task, dst, 1);
      break;
    case EnumOpBit.WORD:
      task.s.m[dstP + 0] = task.s.m[srcP + 0];
      task.s.m[dstP + 1] = task.s.m[srcP + 1];
      task.s[dst] = incReg(task, dst, 2);
      break;
    case EnumOpBit.LONG:
      task.s.m[dstP + 0] = task.s.m[srcP + 0];
      task.s.m[dstP + 1] = task.s.m[srcP + 1];
      task.s.m[dstP + 2] = task.s.m[srcP + 2];
      task.s.m[dstP + 3] = task.s.m[srcP + 3];
      task.s[dst] = incReg(task, dst, 4);
      break;
  }

  return task;
};
