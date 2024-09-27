import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';
import {
  join4BytesInto1Long,
  splitLongInto4Bytes,
} from 'functions/dataHandling/dataHandling';

export const REG_TO_IPD = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  const src = args[0];
  const dst = args[2];
  let p = join4BytesInto1Long(
    task.s[dst][0],
    task.s[dst][1],
    task.s[dst][2],
    task.s[dst][3]
  );

  switch (opBit) {
    case EnumOpBit.BYTE:
      p = p - 1;
      task.s.m[p] = task.s[src][3];
      break;
    case EnumOpBit.WORD:
      p = p - 2;
      task.s.m[p + 0] = task.s[src][2];
      task.s.m[p + 1] = task.s[src][3];
      break;
    case EnumOpBit.LONG:
      p = p - 4;
      task.s.m[p + 0] = task.s[src][0];
      task.s.m[p + 1] = task.s[src][1];
      task.s.m[p + 2] = task.s[src][2];
      task.s.m[p + 3] = task.s[src][3];
      break;
  }

  const b = splitLongInto4Bytes(p);
  task.s[dst][0] = b[0];
  task.s[dst][1] = b[1];
  task.s[dst][2] = b[2];
  task.s[dst][3] = b[3];

  return task;
};
