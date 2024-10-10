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
  REG_S,
  EQU,
} from '../MOVE_Helpers';
import { ABX_TO_IPD } from './SHARED/MOVE_ABX_TO_IPD';
import { ABX_TO_IWD } from './SHARED/MOVE_ABX_TO_IWD';
import { ABX_TO_IWDI } from './SHARED/MOVE_ABX_TO_IWDI';

const MOVE_ABW = (
  task: ITask,
  opBit: EnumOpBit,
  argSrcDst: EnumArgSrcDst,
  arg: string[]
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
      break;
    /* ABW_TO_IWD */
    case EnumArgSrcDst.ABW_TO_IWD:
      task = ABX_TO_IWD(task, opBit, arg);
      break;
    /* ABW_TO_IWDI */
    case EnumArgSrcDst.ABW_TO_IWDI:
      task = ABX_TO_IWDI(task, opBit, arg);
      break;
  }

  return task;
};

export default MOVE_ABW;
