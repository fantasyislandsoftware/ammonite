import { splitLongInto4Bytes } from 'functions/dataHandling/dataHandling';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';
import { EnumOPAction } from '../../IM68k';

export const MOVE_DX_TO_IND = (
  task: ITask,
  opSize: number,
  srcDN: number,
  dstIND: number,
  action?: EnumOPAction
) => {
  const srcLongL = task.s.d[srcDN];
  const srcLongA = splitLongInto4Bytes(srcLongL);
  let dstAddr = task.s.a[dstIND];

  const op8bit = () => {
    if (action === EnumOPAction.DEC) task.s.a[dstIND] -= 1;
    dstAddr = task.s.a[dstIND];
    task.s.m[dstAddr] = srcLongA[3];
    if (action === EnumOPAction.INC) task.s.a[dstIND] += 1;
  };

  const op16bit = () => {
    if (action === EnumOPAction.DEC) task.s.a[dstIND] -= 2;
    dstAddr = task.s.a[dstIND];
    const offset = 2;
    for (let i = 0; i < 2; i++) {
      task.s.m[dstAddr + i] = srcLongA[i + offset];
    }
    if (action === EnumOPAction.INC) task.s.a[dstIND] += 2;
  };

  const op32bit = () => {
    if (action === EnumOPAction.DEC) task.s.a[dstIND] -= 4;
    dstAddr = task.s.a[dstIND];
    for (let i = 0; i < 4; i++) {
      task.s.m[dstAddr + i] = srcLongA[i];
    }
    if (action === EnumOPAction.INC) task.s.a[dstIND] += 4;
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
