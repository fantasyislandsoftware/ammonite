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
  IMM_S,
} from '../MOVE_Helpers';

const MOVE_IMM = (
  task: ITask,
  opBit: EnumOpBit,
  argSrcDst: EnumArgSrcDst,
  arg: string[],
  length: number
) => {
  switch (argSrcDst) {
    /* IMM_TO_REG */
    case EnumArgSrcDst.IMM_TO_REG:
      task = crunch(
        task,
        opBit,
        {
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${REG_D}${EQU}${IMM_S}`,
          imm: arg[0],
        }
      );
      length = 2 + opBit / 8;
      break;
    /* IMM_TO_ABW */
    case EnumArgSrcDst.IMM_TO_ABW:
      task = crunch(
        task,
        opBit,
        {
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${ABX_D}${EQU}${IMM_S}`,
          imm: arg[0],
        }
      );
      length = 4 + opBit / 8;
      break;
    /* IMM_TO_ABL */
    case EnumArgSrcDst.IMM_TO_ABL:
      task = crunch(
        task,
        opBit,
        {
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${ABX_D}${EQU}${IMM_S}`,
          imm: arg[0],
        }
      );
      length = 6 + opBit / 8;
      break;
    /* IMM_TO_I */
    case EnumArgSrcDst.IMM_TO_I:
      task = crunch(
        task,
        opBit,
        {
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${I_D}${EQU}${IMM_S}`,
          imm: arg[0],
        }
      );
      length = 2 + opBit / 8;
      break;
    /* IMM_TO_IPI */
    case EnumArgSrcDst.IMM_TO_IPI:
      task = crunch(
        task,
        opBit,
        {
          dst: { reg: [arg[1]] },
        },
        {
          loop: `${I_D}${EQU}${IMM_S}`,
          imm: arg[0],
          postInc: [arg[1]],
        }
      );
      length = 2 + opBit / 8;
      break;
    /* IMM_TO_IPD */
    case EnumArgSrcDst.IMM_TO_IPD:
      task = crunch(
        task,
        opBit,
        {
          dst: { reg: [arg[2]] },
        },
        {
          loop: `${I_D}${EQU}${IMM_S}`,
          imm: arg[0],
          preDec: [arg[2]],
        }
      );
      length = 2 + opBit / 8;
      break;
    /* IMM_TO_IWD */
    case EnumArgSrcDst.IMM_TO_IWD:
      task = crunch(
        task,
        opBit,
        {
          dst: { reg: [arg[2]], dis: [arg[1]] },
        },
        {
          loop: `${IWD_D}${EQU}${IMM_S}`,
          imm: arg[0],
        }
      );
      length = 4 + opBit / 8;
      break;
    /* IMM_TO_IWDI */
    case EnumArgSrcDst.IMM_TO_IWDI:
      task = crunch(
        task,
        opBit,
        {
          dst: { dis: [arg[1]], reg: [arg[2], arg[3]] },
        },
        {
          loop: `${IWDI_D}${EQU}${IMM_S}`,
          imm: arg[0],
        }
      );
      length = 4 + opBit / 8;
      break;
  }

  return { task, length };
};

export default MOVE_IMM;
