import { ITask } from 'stores/useTaskStore';
import { EnumArgSrcDst } from '../../IM68k';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import {
  ABX_D,
  crunch,
  I_D,
  IWD_D,
  IWDI_D,
  REG_D,
  REG_S,
  EQU,
} from '../MOVE_Helpers';

const MOVE_REG = (
  task: ITask,
  opBit: EnumOpBit,
  argSrcDst: EnumArgSrcDst,
  arg: string[],
  length: number
) => {
  switch (argSrcDst) {
    /* REG_TO_REG */
    case EnumArgSrcDst.REG_TO_REG:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${REG_D}${EQU}${REG_S}`,
        }
      );
      length = 2;
      break;
    /* REG_TO_ABW */
    case EnumArgSrcDst.REG_TO_ABW:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${ABX_D}${EQU}${REG_S}`,
        }
      );
      length = 4;
      break;
    /* REG_TO_ABL */
    case EnumArgSrcDst.REG_TO_ABL:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${ABX_D}${EQU}${REG_S}`,
        }
      );
      length = 6;
      break;
    /* REG_TO_I */
    case EnumArgSrcDst.REG_TO_I:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${I_D}${EQU}${REG_S}`,
        }
      );
      length = 2;
      break;
    /* REG_TO_IPI */
    case EnumArgSrcDst.REG_TO_IPI:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${I_D}${EQU}${REG_S}`,
          postInc: [arg[1]],
        }
      );
      length = 2;
      break;
    /* REG_TO_IPD */
    case EnumArgSrcDst.REG_TO_IPD:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[2]] },
        },
        {
          loop: `${I_D}${EQU}${REG_S}`,
          preDec: [arg[2]],
        }
      );
      length = 2;
      break;
    /* REG_TO_IWD */
    case EnumArgSrcDst.REG_TO_IWD:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[2]], dis: [arg[1]] },
        },
        {
          loop: `${IWD_D}${EQU}${REG_S}`,
        }
      );
      length = 4;
      break;
    /* REG_TO_IWDI */
    case EnumArgSrcDst.REG_TO_IWDI:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[2], arg[3]], dis: [arg[1]] },
        },
        {
          loop: `${IWDI_D}${EQU}${REG_S}`,
        }
      );
      length = 4;
      break;
  }

  return { task, length };
};

export default MOVE_REG;
