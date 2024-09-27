import { hex2int } from 'functions/dataHandling/dataHandling';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { ITask } from 'stores/useTaskStore';
import { byteCopy } from '../../../m68KHelpers/m68kHelpers';

export const REG_TO_ABL = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  const src = args[0];
  const loc = hex2int(args[1].replaceAll('0x', '').replaceAll('.l', ''));

  let setting = {
    src: 0,
    dst: loc,
    bit: EnumOpBit.BYTE,
  };

  switch (opBit) {
    case EnumOpBit.BYTE:
      setting = {
        src: 3,
        dst: loc,
        bit: EnumOpBit.BYTE,
      };
      break;
    case EnumOpBit.WORD:
      setting = {
        src: 2,
        dst: loc,
        bit: EnumOpBit.WORD,
      };
      break;
    case EnumOpBit.LONG:
      setting = {
        src: 0,
        dst: loc,
        bit: EnumOpBit.LONG,
      };
      break;
  }

  task = byteCopy(
    task,
    {
      src: { id: src, start: setting.src },
      dst: { id: 'm', start: setting.dst },
    },
    setting.bit
  );

  return task;
};
