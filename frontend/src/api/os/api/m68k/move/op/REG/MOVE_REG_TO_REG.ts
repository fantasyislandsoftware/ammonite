import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';
import { byteCopy } from '../../../m68KHelpers/m68kHelpers';

export const regToReg = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  const src = args[0];
  const dst = args[1];

  let setting = {
    src: 0,
    dst: 0,
    bit: EnumOpBit.BYTE,
  };

  switch (opBit) {
    case EnumOpBit.BYTE:
      setting = {
        src: 3,
        dst: 3,
        bit: EnumOpBit.BYTE,
      };
      break;
    case EnumOpBit.WORD:
      setting = {
        src: 2,
        dst: 2,
        bit: EnumOpBit.WORD,
      };
      break;
    case EnumOpBit.LONG:
      setting = {
        src: 0,
        dst: 0,
        bit: EnumOpBit.LONG,
      };
      break;
  }

  task = byteCopy(
    task,
    {
      src: { id: src, start: setting.src },
      dst: { id: dst, start: setting.dst },
    },
    setting.bit
  );

  return task;
};
