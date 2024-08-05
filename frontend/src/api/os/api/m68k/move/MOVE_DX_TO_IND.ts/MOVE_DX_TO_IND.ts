import { splitLongInto4Bytes } from 'functions/dataHandling/dataHandling';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';

export const MOVE_DX_TO_IND = (
  task: ITask,
  opSize: number,
  srcDN: number,
  dstIND: number
) => {
  const srcLongL = task.s.d[srcDN];
  const srcLongA = splitLongInto4Bytes(srcLongL);
  const dstAddr = task.s.a[dstIND];

  const op8bit = () => {
    task.s.m[dstAddr] = srcLongA[3];
  };

  const op16bit = () => {
    const offset = 2;
    for (let i = 0; i < 2; i++) {
      task.s.m[dstAddr + i] = srcLongA[i + offset];
    }
  };

  const op32bit = () => {
    for (let i = 0; i < 4; i++) {
      task.s.m[dstAddr + i] = srcLongA[i];
    }
  };

  const main = () => {
    switch (opSize) {
      case EnumOpBit.BYTE:
        op8bit();
        break;
      case EnumOpBit.WORD:
        op16bit();
        break;
      case EnumOpBit.LONG:
        op32bit();
        break;
    }
  };

  main();

  return task;
};
