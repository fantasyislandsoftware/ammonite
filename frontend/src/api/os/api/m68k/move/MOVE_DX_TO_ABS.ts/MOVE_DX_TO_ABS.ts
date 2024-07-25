import { ITask } from 'stores/useTaskStore';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import {
  copyLowLowByteToLongValue,
  copyLowWordToLongValue,
} from 'functions/dataHandling/dataHandling';

export const MOVE_DX_TO_ABS = (
  task: ITask,
  opSize: number,
  srcDN: number,
  dstAddr: number
) => {
  const srcLong = task.s.d[srcDN];
  const dstLong = task.s.m[dstAddr];
  let res = -1;

  switch (opSize) {
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
  }
  return task;
};
