import { ITask } from 'stores/useTaskStore';
import { EnumArgSrcDst } from '../../IM68k';
import { EnumOpBit } from 'functions/dataHandling/IDataHandling';
import {
  ABX_D,
  crunch,
  I_D,
  IWD_D,
  IWDI_D,
  REG_D,
  REG_S,
  EQU,
  IWD_S,
} from '../MOVE_Helpers';

const MOVE_IWD = (
  task: ITask,
  opBit: EnumOpBit,
  argSrcDst: EnumArgSrcDst,
  arg: string[],
  length: number
) => {
  switch (argSrcDst) {
    case EnumArgSrcDst.IWD_TO_REG:
      task = crunch(
        task,
        opBit,
        {
          src: { dis: [arg[0]], reg: [arg[1]] },
          dst: { reg: [arg[2]] },
        },
        {
          loop: `${REG_D}${EQU}${IWD_S}`,
        }
      );
      length = 4;
      break;
    case EnumArgSrcDst.IWD_TO_ABW:
      task = crunch(
        task,
        opBit,
        {
          src: { dis: [arg[0]], reg: [arg[1]] },
          dst: { reg: [arg[2]] },
        },
        {
          loop: `${ABX_D}${EQU}${IWD_S}`,
        }
      );
      length = 6;
      break;
    case EnumArgSrcDst.IWD_TO_ABL:
      task = crunch(
        task,
        opBit,
        {
          src: { dis: [arg[0]], reg: [arg[1]] },
          dst: { reg: [arg[2]] },
        },
        {
          loop: `${ABX_D}${EQU}${IWD_S}`,
        }
      );
      length = 8;
      break;
    case EnumArgSrcDst.IWD_TO_I:
      task = crunch(
        task,
        opBit,
        {
          src: { dis: [arg[0]], reg: [arg[1]] },
          dst: { reg: [arg[2]] },
        },
        {
          loop: `${I_D}${EQU}${IWD_S}`,
        }
      );
      length = 4;
      break;
    case EnumArgSrcDst.IWD_TO_IPI:
      task = crunch(
        task,
        opBit,
        {
          src: { dis: [arg[0]], reg: [arg[1]] },
          dst: { reg: [arg[2]] },
        },
        {
          loop: `${I_D}${EQU}${IWD_S}`,
          postInc: [arg[2]],
        }
      );
      length = 4;
      break;
    case EnumArgSrcDst.IWD_TO_IPD:
      task = crunch(
        task,
        opBit,
        {
          src: { dis: [arg[0]], reg: [arg[1]] },
          dst: { reg: [arg[3]] },
        },
        {
          loop: `${I_D}${EQU}${IWD_S}`,
          preDec: [arg[3]],
        }
      );
      length = 4;
      break;
    case EnumArgSrcDst.IWD_TO_IWD:
      task = crunch(
        task,
        opBit,
        {
          src: { dis: [arg[0]], reg: [arg[1]] },
          dst: { dis: [arg[2]], reg: [arg[3]] },
        },
        {
          loop: `${IWD_D}${EQU}${IWD_S}`,
        }
      );
      length = 6;
      break;
    case EnumArgSrcDst.IWD_TO_IWDI:
      task = crunch(
        task,
        opBit,
        {
          src: { dis: [arg[0]], reg: [arg[1]] },
          dst: { dis: [arg[2]], reg: [arg[3], arg[4]] },
        },
        {
          loop: `${IWDI_D}${EQU}${IWD_S}`,
        }
      );
      length = 6;
      break;
  }

  return { task, length };
};

export default MOVE_IWD;
