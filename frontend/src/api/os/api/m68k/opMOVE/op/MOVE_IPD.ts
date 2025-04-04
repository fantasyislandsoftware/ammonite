import { ITask } from 'stores/useTaskStore';
import { EnumArgSrcDst } from '../../IM68k';
import { EnumOpBit } from 'functions/dataHandling/IntDataHandling';
import {
  ABX_D,
  crunch,
  I_D,
  IWD_D,
  IWDI_D,
  REG_D,
  EQU,
  I_S,
} from '../MOVE_Helpers';

const MOVE_IPD = (
  task: ITask,
  opBit: EnumOpBit,
  argSrcDst: EnumArgSrcDst,
  arg: string[],
  length: number
) => {
  switch (argSrcDst) {
    case EnumArgSrcDst.IPD_TO_REG:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[1]] },
          dst: { reg: [arg[2]] },
        },
        {
          loop: `${REG_D}${EQU}${I_S}`,
          preDec: [arg[1]],
        }
      );
      length = 2;
      break;
    case EnumArgSrcDst.IPD_TO_ABW:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[1]] },
          dst: { reg: [arg[2]] },
        },
        {
          loop: `${ABX_D}${EQU}${I_S}`,
          preDec: [arg[1]],
        }
      );
      length = 4;
      break;
    case EnumArgSrcDst.IPD_TO_ABL:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[1]] },
          dst: { reg: [arg[2]] },
        },
        {
          loop: `${ABX_D}${EQU}${I_S}`,
          preDec: [arg[1]],
        }
      );
      length = 6;
      break;
    case EnumArgSrcDst.IPD_TO_I:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[1]] },
          dst: { reg: [arg[2]] },
        },
        {
          loop: `${I_D}${EQU}${I_S}`,
          preDec: [arg[1]],
        }
      );
      length = 2;
      break;
    case EnumArgSrcDst.IPD_TO_IPI:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[1]] },
          dst: { reg: [arg[2]] },
        },
        {
          loop: `${I_D}${EQU}${I_S}`,
          preDec: [arg[1]],
          postInc: [arg[2]],
        }
      );
      length = 2;
      break;
    case EnumArgSrcDst.IPD_TO_IPD:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[1]] },
          dst: { reg: [arg[3]] },
        },
        {
          loop: `${I_D}${EQU}${I_S}`,
          preDec: [arg[1], arg[3]],
        }
      );
      length = 2;
      break;
    case EnumArgSrcDst.IPD_TO_IWD:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[1]] },
          dst: { reg: [arg[3]], dis: [arg[2]] },
        },
        {
          loop: `${IWD_D}${EQU}${I_S}`,
          preDec: [arg[1]],
        }
      );
      length = 4;
      break;
    case EnumArgSrcDst.IPD_TO_IWDI:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[1]] },
          dst: { dis: [arg[2]], reg: [arg[3], arg[4]] },
        },
        {
          loop: `${IWDI_D}${EQU}${I_S}`,
          preDec: [arg[1]],
        }
      );
      length = 4;
      break;
  }

  return { task, length };
};

export default MOVE_IPD;
