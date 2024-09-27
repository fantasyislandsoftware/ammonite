import { hex2int } from 'functions/dataHandling/dataHandling';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';

export const ABW_TO_ABL = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  const srcP = hex2int(args[0].replaceAll('0x', '').replaceAll('.w', ''));
  const dstP = hex2int(args[1].replaceAll('0x', '').replaceAll('.l', ''));

  switch (opBit) {
    case EnumOpBit.BYTE:
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
