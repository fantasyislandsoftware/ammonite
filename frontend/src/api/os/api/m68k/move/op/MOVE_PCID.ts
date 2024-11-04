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
  REG_S,
  EQU,
  IWD_S,
  PCD_S,
  PCID_S,
} from '../MOVE_Helpers';

const MOVE_PCID = (
  task: ITask,
  opBit: EnumOpBit,
  argSrcDst: EnumArgSrcDst,
  arg: string[],
  length: number
) => {
  // 0x002(pc,d1),d0
  const src = { dis: [arg[0]], reg: [arg[2]] };
  switch (argSrcDst) {
    case EnumArgSrcDst.PCID_TO_REG:
      task = crunch(
        task,
        opBit,
        {
          src: src,
          dst: { reg: [arg[3]] },
        },
        {
          loop: `${REG_D}${EQU}${PCID_S}`,
        }
      );
      length = 4;
      break;
    case EnumArgSrcDst.PCID_TO_ABW:
      task = crunch(
        task,
        opBit,
        {
          src: src,
          dst: { reg: [arg[3]] },
        },
        {
          loop: `${ABX_D}${EQU}${PCID_S}`,
        }
      );
      length = 6;
      break;
    case EnumArgSrcDst.PCID_TO_ABL:
      task = crunch(
        task,
        opBit,
        {
          src: src,
          dst: { reg: [arg[3]] },
        },
        {
          loop: `${ABX_D}${EQU}${PCD_S}`,
        }
      );
      length = 8;
      break;
    case EnumArgSrcDst.PCID_TO_I:
      task = crunch(
        task,
        opBit,
        {
          src: src,
          dst: { reg: [arg[3]] },
        },
        {
          loop: `${I_D}${EQU}${PCID_S}`,
        }
      );
      length = 4;
      break;
    case EnumArgSrcDst.PCID_TO_IPI:
      task = crunch(
        task,
        opBit,
        {
          src: src,
          dst: { reg: [arg[3]] },
        },
        {
          loop: `${I_D}${EQU}${PCID_S}`,
          postInc: [arg[3]],
        }
      );
      length = 4;
      break;
    case EnumArgSrcDst.PCID_TO_IPD:
      task = crunch(
        task,
        opBit,
        {
          src: src,
          dst: { reg: [arg[4]] },
        },
        {
          loop: `${I_D}${EQU}${PCID_S}`,
          preDec: [arg[4]],
        }
      );
      length = 4;
      break;
    case EnumArgSrcDst.PCID_TO_IWD:
      task = crunch(
        task,
        opBit,
        {
          src: src,
          dst: { dis: [arg[3]], reg: [arg[4]] },
        },
        {
          loop: `${IWD_D}${EQU}${PCID_S}`,
        }
      );
      length = 6;
      break;
    case EnumArgSrcDst.PCID_TO_IWDI:
      task = crunch(
        task,
        opBit,
        {
          src: src,
          dst: { dis: [arg[3]], reg: [arg[4], arg[5]] },
        },
        {
          loop: `${IWDI_D}${EQU}${PCID_S}`,
        }
      );
      length = 6;
      break;
  }

  return { task, length };
};

export default MOVE_PCID;
