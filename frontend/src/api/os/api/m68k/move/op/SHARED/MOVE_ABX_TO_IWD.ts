import {
  filterLoc,
  hex2int,
  incReg,
  join4BytesInto1Long,
  splitLongInto4Bytes,
} from 'functions/dataHandling/dataHandling';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';

export const ABX_TO_IWD = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  const srcP = hex2int(filterLoc(args[0]));
  const i = parseInt(args[1].replaceAll('0x', ''));
  const dstS = args[2];
  const dstPA = task.s[dstS];
  const dstP = join4BytesInto1Long(dstPA[0], dstPA[1], dstPA[2], dstPA[3]) + i;

  for (let i = 0; i < opBit / 8; i++) {
    task.s.m[dstP + i] = task.s.m[srcP + i];
  }

  task.s[dstS] = splitLongInto4Bytes(dstP);

  return task;
};
