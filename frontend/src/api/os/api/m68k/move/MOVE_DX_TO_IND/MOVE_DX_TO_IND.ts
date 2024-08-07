import { splitLongInto4Bytes } from 'functions/dataHandling/dataHandling';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';
import { EnumOPAction } from '../../IM68k';

export const MOVE_DX_TO_IND = (
  task: ITask,
  opSize: number,
  srcDN: number,
  dstIND: number,
  action?: EnumOPAction,
  actionValue?: number
) => {
  const srcLongL = task.s.d[srcDN];
  const srcLongA = splitLongInto4Bytes(srcLongL);
  let dstAddr = task.s.a[dstIND];

  /* Displacement */
  let dis = 0;
  if (action === EnumOPAction.INC || action === EnumOPAction.DEC) {
    switch (opSize) {
      case EnumOpBit.BYTE:
        dis = 1;
        break;
      case EnumOpBit.WORD:
        dis = 2;
        break;
      case EnumOpBit.LONG:
        dis = 4;
        break;
    }
  }

  if (action === EnumOPAction.DIS && actionValue) {
    dis = actionValue;
  }

  const op8bit = () => {
    dstAddr = task.s.a[dstIND];
    task.s.m[dstAddr] = srcLongA[3];
  };

  const op16bit = () => {
    dstAddr = task.s.a[dstIND];
    const offset = 2;
    for (let i = 0; i < 2; i++) {
      task.s.m[dstAddr + i] = srcLongA[i + offset];
    }
  };

  const op32bit = () => {
    dstAddr = task.s.a[dstIND];
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

  /* Rememeber original a reg value */
  const aRegValue = task.s.a[dstIND];

  /* Pre decrement */
  if (action === EnumOPAction.DEC) task.s.a[dstIND] -= dis;
  if (action === EnumOPAction.DIS) task.s.a[dstIND] += dis;
  /* Main */
  main();
  /* Post Increment */
  if (action === EnumOPAction.INC) task.s.a[dstIND] += dis;
  /* */
  if (action === EnumOPAction.DIS) task.s.a[dstIND] = aRegValue;

  return task;
};
