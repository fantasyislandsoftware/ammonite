import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';
import {
  getRegInfo,
  splitLongInto4Bytes,
} from 'functions/dataHandling/dataHandling';

export const I_TO_IWD = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  console.log(args);

  /*const srcS = args[0];
  const src = getRegInfo(task, srcS);
  const dstS = args[1];
  const dst = getRegInfo(task, dstS);

  for (let i = 0; i < opBit / 8; i++) {
    task.s.m[dst.long + i] = task.s.m[src.long + i];
  }

  if (setting?.inc) {
    const inc = opBit / 8;
    task.s[dstS] = splitLongInto4Bytes(dst.long + inc);
  }*/

  return task;
};
