import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';
import {
  filterLoc,
  hex2int,
  join4BytesInto1Long,
} from 'functions/dataHandling/dataHandling';

export const I_TO_ABX = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  const srcS = args[0];
  const srcP = join4BytesInto1Long(
    task.s[srcS][0],
    task.s[srcS][1],
    task.s[srcS][2],
    task.s[srcS][3]
  );
  const dstP = hex2int(filterLoc(args[1]));

  for (let i = 0; i < opBit / 8; i++) {
    task.s.m[dstP + i] = task.s.m[srcP + i];
  }

  return task;
};
