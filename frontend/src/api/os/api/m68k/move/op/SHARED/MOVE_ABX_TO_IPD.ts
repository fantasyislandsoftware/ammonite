import {
  hex2int,
  decReg,
  join4BytesInto1Long,
  splitLongInto4Bytes,
  filterLoc,
} from 'functions/dataHandling/dataHandling';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';

export const ABX_TO_IPD = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  const srcP = hex2int(filterLoc(args[0]));
  const dstS = args[2];
  let dstLA = task.s[dstS];
  let dstP = join4BytesInto1Long(dstLA[0], dstLA[1], dstLA[2], dstLA[3]);

  switch (opBit) {
    case EnumOpBit.BYTE:
      dstP -= 1;
      break;
    case EnumOpBit.WORD:
      dstP -= 2;
      break;
    case EnumOpBit.LONG:
      dstP -= 4;
      break;
  }
  dstLA = splitLongInto4Bytes(dstP);
  task.s[dstS] = dstLA;

  for (let i = 0; i < opBit / 8; i++) {
    task.s.m[dstP + i] = task.s.m[srcP + i];
  }

  return task;
};
