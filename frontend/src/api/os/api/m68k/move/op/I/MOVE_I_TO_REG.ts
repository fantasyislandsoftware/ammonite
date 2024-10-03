import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';
import { join4BytesInto1Long } from 'functions/dataHandling/dataHandling';

export const I_TO_REG = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  const srcS = args[0];
  const dstS = args[1];

  const srcP = join4BytesInto1Long(
    task.s[srcS][0],
    task.s[srcS][1],
    task.s[srcS][2],
    task.s[srcS][3]
  );

  for (let i = 0; i < opBit / 8; i++) {
    task.s[dstS][i + 4 - opBit / 8] = task.s.m[srcP + i];
  }

  return task;
};
