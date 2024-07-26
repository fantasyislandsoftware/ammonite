import { ITask } from 'stores/useTaskStore';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import {
  copyLowLowByteToLongValue,
  copyLowWordToLongValue,
  splitLongInto4Bytes,
} from 'functions/dataHandling/dataHandling';

export const MOVE_DX_TO_ABS = (
  task: ITask,
  opSize: number,
  srcDN: number,
  dstAddr: number
) => {
  const srcLongL = task.s.d[srcDN];
  const srcLongA = splitLongInto4Bytes(srcLongL);
  const dstLongL = task.s.m[dstAddr];
  let dstLongA = splitLongInto4Bytes(dstLongL);

  /*switch (opSize) {
    case EnumOpBit.BYTE:
      res = copyLowLowByteToLongValue(srcLong, dstLong);
      task.s.m[dstAddr] = res;
      break;
    case EnumOpBit.WORD:
      res = copyLowWordToLongValue(srcLong, dstLong);
      task.s.m[dstAddr] = res;
      break;
    case EnumOpBit.LONG:
      task.s.m[dstAddr] = srcLong;
      break;
  }*/

  const op8bit = () => {};

  const main = () => {
    switch (opSize) {
      case EnumOpBit.BYTE:
        //task.s.m[dstAddr] = op8bit();
        break;
      case EnumOpBit.WORD:
        //res = copyLowWordToLongValue(srcLong, dstLong);
        //task.s.m[dstAddr] = res;
        break;
      case EnumOpBit.LONG:
        //task.s.m[dstAddr] = srcLong;
        break;
    }
  };

  main();

  return task;
};
