import { ITask } from 'stores/useTaskStore';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { splitLongInto4Bytes } from 'functions/dataHandling/dataHandling';

export const MOVE_DX_TO_ABS = (
  task: ITask,
  opSize: number,
  srcDN: number,
  dstAddr: number
) => {
  const srcLongL = task.s.d[srcDN];
  const srcLongA = splitLongInto4Bytes(srcLongL);

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
