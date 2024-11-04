import { ITask } from 'stores/useTaskStore';
import { EnumArgSrcDst } from '../../IM68k';
import { EnumOpBit } from 'functions/dataHandling/IntDataHandling';
import {
  ABX_D,
  ABX_S,
  crunch,
  I_D,
  IWD_D,
  IWDI_D,
  REG_D,
  EQU,
} from '../MOVE_Helpers';

const MOVE_ABL = (
  task: ITask,
  opBit: EnumOpBit,
  argSrcDst: EnumArgSrcDst,
  arg: string[],
  length: number
) => {
  switch (argSrcDst) {
    /* ABL_TO_REG */
    case EnumArgSrcDst.ABL_TO_REG:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${REG_D}${EQU}${ABX_S}`,
        }
      );
      length = 6;
      break;
    /* ABL_TO_ABW */
    case EnumArgSrcDst.ABL_TO_ABW:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${ABX_D}${EQU}${ABX_S}`,
        }
      );
      length = 8;
      break;
    /* ABL_TO_ABL */
    case EnumArgSrcDst.ABL_TO_ABL:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${ABX_D}${EQU}${ABX_S}`,
        }
      );
      length = 10;
      break;
    /* ABL_TO_I */
    case EnumArgSrcDst.ABL_TO_I:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${I_D}${EQU}${ABX_S}`,
        }
      );
      length = 6;
      break;
    /* ABL_TO_IPI */
    case EnumArgSrcDst.ABL_TO_IPI:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${I_D}${EQU}${ABX_S}`,
          postInc: [arg[1]],
        }
      );
      length = 6;
      break;
    /* ABL_TO_IPD */
    case EnumArgSrcDst.ABL_TO_IPD:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[2]] },
        },
        {
          loop: `${I_D}${EQU}${ABX_S}`,
          preDec: [arg[2]],
        }
      );
      length = 6;
      break;
    /* ABL_TO_IWD */
    case EnumArgSrcDst.ABL_TO_IWD:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[2]], dis: [arg[1]] },
        },
        {
          loop: `${IWD_D}${EQU}${ABX_S}`,
        }
      );
      length = 8;
      break;
    /* ABL_TO_IWDI */
    case EnumArgSrcDst.ABL_TO_IWDI:
      task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { dis: [arg[1]], reg: [arg[2], arg[3]] },
        },
        {
          loop: `${IWDI_D}${EQU}${ABX_S}`,
        }
      );
      length = 8;
      break;
  }

  return { task, length };
};

export default MOVE_ABL;
