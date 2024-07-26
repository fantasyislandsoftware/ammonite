import { ITask } from 'stores/useTaskStore';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import {
  copyLowLowByteToLongValue,
  copyLowWordToLongValue,
  join4BytesInto1Long,
  splitLongInto4Bytes,
} from 'functions/dataHandling/dataHandling';

export const MOVE_DX_TO_DX = (
  task: ITask,
  opSize: EnumOpBit,
  srcDN: number,
  dstDN: number
) => {
  const op8bit = () => {
    dstLongA[3] = srcLongA[3];
    return join4BytesInto1Long(
      dstLongA[0],
      dstLongA[1],
      dstLongA[2],
      dstLongA[3]
    );
  };

  const op16bit = () => {
    dstLongA[2] = srcLongA[2];
    dstLongA[3] = srcLongA[3];
    return join4BytesInto1Long(
      dstLongA[0],
      dstLongA[1],
      dstLongA[2],
      dstLongA[3]
    );
  };

  const main = () => {
    switch (opSize) {
      case EnumOpBit.BYTE:
        task.s.d[dstDN] = op8bit();
        break;
      case EnumOpBit.WORD:
        task.s.d[dstDN] = op16bit();
        break;
      case EnumOpBit.LONG:
        task.s.d[dstDN] = srcLongL;
        break;
    }
  };

  const srcLongL = task.s.d[srcDN];
  const srcLongA = splitLongInto4Bytes(srcLongL);
  const dstLongL = task.s.d[dstDN];
  let dstLongA = splitLongInto4Bytes(dstLongL);

  main();

  return task;
};
