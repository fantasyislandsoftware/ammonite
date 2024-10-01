import { filterLoc, getRegInfo } from 'functions/dataHandling/dataHandling';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';

export const ABX_TO_IWDI = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  const srcLoc = parseInt(filterLoc(args[0]));
  const dis = parseInt(filterLoc(args[1]));
  const dstIndirect = getRegInfo(task, args[2]);
  const dstIndex = getRegInfo(task, args[3]);
  const dstLoc = dis + dstIndex.long + dstIndirect.long;

  for (let i = 0; i < opBit / 8; i++) {
    task.s.m[dstLoc + i] = task.s.m[srcLoc + i];
  }

  return task;
};
