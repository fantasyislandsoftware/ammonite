import {
  hex2int,
  decReg,
  join4BytesInto1Long,
  splitLongInto4Bytes,
} from 'functions/dataHandling/dataHandling';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';

export const ABW_TO_IPD = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  const srcP = hex2int(args[0].replaceAll('0x', '').replaceAll('.w', ''));
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

  switch (opBit) {
    case EnumOpBit.BYTE:
      console.log(`hello ${srcP} ${dstP}`);
      task.s.m[dstP + 0] = task.s.m[srcP + 0];
      break;
    case EnumOpBit.WORD:
      task.s.m[dstP + 0] = task.s.m[srcP + 0];
      task.s.m[dstP + 1] = task.s.m[srcP + 1];
      break;
    case EnumOpBit.LONG:
      task.s.m[dstP + 0] = task.s.m[srcP + 0];
      task.s.m[dstP + 1] = task.s.m[srcP + 1];
      task.s.m[dstP + 2] = task.s.m[srcP + 2];
      task.s.m[dstP + 3] = task.s.m[srcP + 3];
      break;
  }

  return task;
};
