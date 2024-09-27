import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';
import {
  hex2int,
  join4BytesInto1Long,
  splitLongInto4Bytes,
} from 'functions/dataHandling/dataHandling';

export const regToIWD = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  const src = args[0];
  const index = hex2int(args[1].replaceAll('0x', ''));
  const dst = args[2];
  let p = join4BytesInto1Long(
    task.s[dst][0],
    task.s[dst][1],
    task.s[dst][2],
    task.s[dst][3]
  );
  p = p + index;
  console.log({ index: args[1] });

  switch (opBit) {
    case EnumOpBit.BYTE:
      task.s.m[p] = task.s[src][3];
      break;
    case EnumOpBit.WORD:
      task.s.m[p + 0] = task.s[src][2];
      task.s.m[p + 1] = task.s[src][3];
      break;
    case EnumOpBit.LONG:
      task.s.m[p + 0] = task.s[src][0];
      task.s.m[p + 1] = task.s[src][1];
      task.s.m[p + 2] = task.s[src][2];
      task.s.m[p + 3] = task.s[src][3];
      break;
  }

  return task;
};
