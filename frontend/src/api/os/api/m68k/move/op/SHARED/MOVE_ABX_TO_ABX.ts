import { filterLoc, hex2int } from 'functions/dataHandling/dataHandling';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';

export const ABX_TO_ABX = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  const srcP = hex2int(filterLoc(args[0]));
  const dstP = hex2int(filterLoc(args[1]));

  for (let i = 0; i < opBit / 8; i++) {
    task.s.m[dstP + i] = task.s.m[srcP + i];
  }

  return task;
};
