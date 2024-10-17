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
  IWDI_S,
} from '../MOVE_Helpers';

const MOVE_IWDI = (
  task: ITask,
  opBit: EnumOpBit,
  argSrcDst: EnumArgSrcDst,
  arg: string[],
  length: number
) => {
  switch (argSrcDst) {
    case EnumArgSrcDst.IWDI_TO_REG:
      task = crunch(
        task,
        opBit,
        {
          src: { dis: [arg[0]], reg: [arg[1], arg[2]] },
          dst: { reg: [arg[3]] },
        },
        {
          loop: `${REG_D}${EQU}${IWDI_S}`,
        }
      );
      length = 4;
      break;
    case EnumArgSrcDst.IWDI_TO_ABW:
      task = crunch(
        task,
        opBit,
        {
          src: { dis: [arg[0]], reg: [arg[1], arg[2]] },
          dst: { reg: [arg[3]] },
        },
        {
          loop: `${ABX_D}${EQU}${IWDI_S}`,
        }
      );
      length = 0;
      break;
    case EnumArgSrcDst.IWDI_TO_ABL:
      task = crunch(
        task,
        opBit,
        {
          src: { dis: [arg[0]], reg: [arg[1], arg[2]] },
          dst: { reg: [arg[3]] },
        },
        {
          loop: `${ABX_D}${EQU}${IWDI_S}`,
        }
      );
      length = 8;
      break;
    case EnumArgSrcDst.IWDI_TO_I:
      task = crunch(
        task,
        opBit,
        {
          src: { dis: [arg[0]], reg: [arg[1], arg[2]] },
          dst: { reg: [arg[3]] },
        },
        {
          loop: `${I_D}${EQU}${IWDI_S}`,
        }
      );
      length = 4;
      break;
    case EnumArgSrcDst.IWDI_TO_IPI:
      task = crunch(
        task,
        opBit,
        {
          src: { dis: [arg[0]], reg: [arg[1], arg[2]] },
          dst: { reg: [arg[3]] },
        },
        {
          loop: `${I_D}${EQU}${IWDI_S}`,
          postInc: [arg[3]],
        }
      );
      length = 4;
      break;
    case EnumArgSrcDst.IWDI_TO_IPD:
      task = crunch(
        task,
        opBit,
        {
          src: { dis: [arg[0]], reg: [arg[1], arg[2]] },
          dst: { reg: [arg[4]] },
        },
        {
          loop: `${I_D}${EQU}${IWDI_S}`,
          preDec: [arg[4]],
        }
      );
      length = 4;
      break;
    case EnumArgSrcDst.IWDI_TO_IWD:
      task = crunch(
        task,
        opBit,
        {
          src: { dis: [arg[0]], reg: [arg[1], arg[2]] },
          dst: { dis: [arg[3]], reg: [arg[4]] },
        },
        {
          loop: `${IWD_D}${EQU}${IWDI_S}`,
        }
      );
      length = 6;
      break;
    case EnumArgSrcDst.IWDI_TO_IWDI:
      // 1(a0,d0),1(a1,d1)
      task = crunch(
        task,
        opBit,
        {
          src: { dis: [arg[0]], reg: [arg[1], arg[2]] },
          dst: { dis: [arg[3]], reg: [arg[4], arg[5]] },
        },
        {
          loop: `${IWDI_D}${EQU}${IWDI_S}`,
        }
      );
      length = 6;
      break;
  }

  return { task, length };
};

export default MOVE_IWDI;
