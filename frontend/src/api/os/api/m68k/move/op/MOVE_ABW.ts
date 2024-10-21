import { ITask } from 'stores/useTaskStore';
import { EnumArgSrcDst } from '../../IM68k';
import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
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
import { l } from 'functions/dataHandling/dataHandling';

const MOVE_ABW = (
  task: ITask,
  opBit: EnumOpBit,
  argSrcDst: EnumArgSrcDst,
  arg: string[],
  length: number
) => {
  switch (argSrcDst) {
    /* ABW_TO_REG */
    case EnumArgSrcDst.ABW_TO_REG:
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
      length = 4;
      break;
    /* ABW_TO_ABW */
    case EnumArgSrcDst.ABW_TO_ABW:
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
      length = 6;
      break;
    /* ABW_TO_ABL */
    case EnumArgSrcDst.ABW_TO_ABL:
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
    /* ABW_TO_I */
    case EnumArgSrcDst.ABW_TO_I:
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
      length = 4;
      break;
    /* ABW_TO_IPI */
    case EnumArgSrcDst.ABW_TO_IPI:
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
      length = 4;
      break;
    /* ABW_TO_IPD */
    case EnumArgSrcDst.ABW_TO_IPD:
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
      length = 4;
      break;
    /* ABW_TO_IWD */
    case EnumArgSrcDst.ABW_TO_IWD:
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
      length = 6;
      break;
    /* ABW_TO_IWDI */
    case EnumArgSrcDst.ABW_TO_IWDI:
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
      length = 6;
      break;
  }

  return { task, length };
};

export default MOVE_ABW;
