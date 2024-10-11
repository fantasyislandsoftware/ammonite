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
  EQU,
  I_S,
} from '../MOVE_Helpers';

const MOVE_IPI = (
  task: ITask,
  opBit: EnumOpBit,
  argSrcDst: EnumArgSrcDst,
  arg: string[],
  length: number
) => {
  switch (argSrcDst) {
    case EnumArgSrcDst.I_TO_REG:
      /*task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${REG_D}${EQU}${I_S}`,
        }
      );*/
      break;
    case EnumArgSrcDst.I_TO_ABW:
      /*task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${ABX_D}${EQU}${I_S}`,
        }
      );*/
      break;
    case EnumArgSrcDst.I_TO_ABL:
      /*task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${ABX_D}${EQU}${I_S}`,
        }
      );*/
      break;
    case EnumArgSrcDst.I_TO_I:
      /*task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${I_D}${EQU}${I_S}`,
        }
      );*/
      break;
    case EnumArgSrcDst.I_TO_IPI:
      /*task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${I_D}${EQU}${I_S}`,
          postInc: [arg[1]],
        }
      );*/
      break;
    case EnumArgSrcDst.I_TO_IPD:
      /*task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[2]] },
        },
        {
          loop: `${I_D}${EQU}${I_S}`,
          preDec: [arg[2]],
        }
      );*/
      break;
    case EnumArgSrcDst.I_TO_IWD:
      /*task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { reg: [arg[2]], dis: [arg[1]] },
        },
        {
          loop: `${IWD_D}${EQU}${I_S}`,
        }
      );*/
      break;
    case EnumArgSrcDst.I_TO_IWDI:
      /*task = crunch(
        task,
        opBit,
        {
          src: { reg: [arg[0]] },
          dst: { dis: [arg[1]], reg: [arg[2], arg[3]] },
        },
        {
          loop: `${IWDI_D}${EQU}${I_S}`,
        }
      );*/
      break;
  }

  return { task, length };
};

export default MOVE_IPI;
