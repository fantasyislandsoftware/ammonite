import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';
import {
  getRegInfo,
  join4BytesInto1Long,
  splitLongInto4Bytes,
} from 'functions/dataHandling/dataHandling';

export const I_TO_IPD = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  const srcS = args[0];
  const src = getRegInfo(task, srcS);
  const dstS = args[2];
  const dst = getRegInfo(task, dstS);

  const dec = opBit / 8;
  const loc = dst.long - dec;
  task.s[dstS] = splitLongInto4Bytes(dst.long - dec);

  for (let i = 0; i < opBit / 8; i++) {
    task.s.m[loc + i] = task.s.m[src.long + i];
  }

  return task;
};
