import { ITask } from 'stores/useTaskStore';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import {
  copyLowLowByteToLongValue,
  copyLowWordToLongValue,
} from 'functions/dataHandling/dataHandling';

export const MOVE_DX_TO_DX = (
  task: ITask,
  opSize: EnumOpBit,
  srcDN: number,
  dstDN: number
) => {
  const srcLong = task.s.d[srcDN];
  const dstLong = task.s.d[dstDN];
  let res = -1;

  switch (opSize) {
    case EnumOpBit.BYTE:
      res = copyLowLowByteToLongValue(srcLong, dstLong);
      task.s.d[dstDN] = res;
      break;
    case EnumOpBit.WORD:
      res = copyLowWordToLongValue(srcLong, dstLong);
      task.s.d[dstDN] = res;
      break;
    case EnumOpBit.LONG:
      task.s.d[dstDN] = srcLong;
      break;
  }

  return task;
};
