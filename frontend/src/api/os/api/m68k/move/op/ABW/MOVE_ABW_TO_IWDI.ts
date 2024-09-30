import {
  filterLoc,
  getRegInfo,
  hex2int,
  incReg,
  join4BytesInto1Long,
  splitLongInto4Bytes,
} from 'functions/dataHandling/dataHandling';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';

export const ABW_TO_IWDI = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  const srcLoc = parseInt(filterLoc(args[0]));
  const dis = parseInt(filterLoc(args[1]));
  const dstIndirect = getRegInfo(task, args[2]);
  const dstIndex = getRegInfo(task, args[3]);
  const dstLoc = dis + dstIndex.long + dstIndirect.long;

  switch (opBit) {
    case EnumOpBit.BYTE:
      task.s.m[dstLoc] = task.s.m[srcLoc];
      break;
    case EnumOpBit.WORD:
      task.s.m[dstLoc + 0] = task.s.m[srcLoc + 0];
      task.s.m[dstLoc + 1] = task.s.m[srcLoc + 1];
      break;
    case EnumOpBit.LONG:
      task.s.m[dstLoc + 0] = task.s.m[srcLoc + 0];
      task.s.m[dstLoc + 1] = task.s.m[srcLoc + 1];
      task.s.m[dstLoc + 2] = task.s.m[srcLoc + 2];
      task.s.m[dstLoc + 3] = task.s.m[srcLoc + 3];
      break;
  }

  return task;
};
