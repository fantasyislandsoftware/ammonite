import {
  filterLoc,
  hex2int,
  incReg,
  join4BytesInto1Long,
} from 'functions/dataHandling/dataHandling';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';

export const ABX_TO_IPI = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  const srcP = hex2int(filterLoc(args[0]));
  const dstPA = task.s[args[1]];
  const dstP = join4BytesInto1Long(dstPA[0], dstPA[1], dstPA[2], dstPA[3]);
  const dst = args[1];

  for (let i = 0; i < opBit / 8; i++) {
    task.s.m[dstP + i] = task.s.m[srcP + i];
  }

  task.s[dst] = incReg(task, dst, opBit / 8);

  return task;
};
