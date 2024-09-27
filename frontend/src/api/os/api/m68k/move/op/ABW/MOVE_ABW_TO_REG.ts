import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';

export const ABW_TO_REG = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  const src = 'm';
  const dst = args[1];

  switch (opBit) {
    case EnumOpBit.BYTE:
      task.s[dst][3] = task.s[src][3];
      break;
    case EnumOpBit.WORD:
      task.s[dst][3] = task.s[src][3];
      task.s[dst][2] = task.s[src][2];
      break;
    case EnumOpBit.LONG:
      task.s[dst][0] = task.s[src][0];
      task.s[dst][1] = task.s[src][1];
      task.s[dst][2] = task.s[src][2];
      task.s[dst][3] = task.s[src][3];
      break;
  }

  return task;
};
