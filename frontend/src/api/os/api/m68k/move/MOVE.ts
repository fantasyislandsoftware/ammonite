import { ITask } from 'stores/useTaskStore';
import {
  byteCopy,
  examineInstruction,
  fillArgData,
  processOpSize,
  processXNXT,
} from '../m68KHelpers/m68kHelpers';
import { EnumArgSrcDst, IExamineInstruction } from '../IM68k';
import { opBitChar } from 'functions/dataHandling/IdataHandling';
import { ABX_TO_I } from './op/SHARED/MOVE_ABX_TO_I';
import { ABX_TO_REG } from './op/SHARED/MOVE_ABX_TO_REG';
import { ABX_TO_IPI } from './op/SHARED/MOVE_ABX_TO_IPI';
import { ABX_TO_IPD } from './op/SHARED/MOVE_ABX_TO_IPD';
import { ABX_TO_IWD } from './op/SHARED/MOVE_ABX_TO_IWD';
import { ABX_TO_IWDI } from './op/SHARED/MOVE_ABX_TO_IWDI';
import { ABX_TO_ABX } from './op/SHARED/MOVE_ABX_TO_ABX';
import { I_TO_REG } from './op/I/MOVE_I_TO_REG';
import { I_TO_ABX } from './op/I/MOVE_I_TO_ABX';
import { I_TO_I } from './op/I/MOVE_I_TO_I';
import { I_TO_IPD } from './op/I/MOVE_I_TO_IPD';
import { l } from 'functions/dataHandling/dataHandling';
import { join4BytesInto1Long } from 'functions/dataHandling/dataHandling';
import MOVE_REG from './op/REG';
import MOVE_ABW from './op/ABW';

const _l = l;
const _421 = join4BytesInto1Long;

enum EnumLRB {
  N = 0,
  L = 1,
  R = 2,
  B = 3,
}

const lrb = (v0: boolean | undefined, v1: boolean | undefined) => {
  let result: EnumLRB = EnumLRB.N;

  if (v0 === true && v1 === undefined) {
    result = EnumLRB.L;
  }
  if (v0 === undefined && v1 === true) {
    result = EnumLRB.R;
  }
  if (v0 === true && v1 === true) {
    result = EnumLRB.B;
  }
  return result;
};

export const MOVE = (
  task: ITask,
  dataW: string[],
  setting?: {
    verbose: boolean;
  }
) => {
  const i = dataW[0];

  /* Bit Size */
  const opSize_bin = `${i[2]}${i[3]}`;
  const opSize = processOpSize(opSize_bin);
  const opSizeChar = opBitChar[opSize];

  /* Source */
  const xtSrcBin = `${i[10]}${i[11]}${i[12]}`;
  const xnSrcBin = `${i[13]}${i[14]}${i[15]}`;
  const xnSrcN = parseInt(xnSrcBin, 2).toString();

  /* Destination */
  const xnDstBin = `${i[4]}${i[5]}${i[6]}`;
  const xtDstBin = `${i[7]}${i[8]}${i[9]}`;
  const xnDstN = parseInt(xnDstBin, 2).toString();

  const src = processXNXT('src', xtSrcBin, xnSrcBin);
  const dst = processXNXT('dst', xtDstBin, xnDstBin);

  const argDir = `${src.argType}_TO_${dst.argType}`;

  const args = fillArgData(
    task,
    argDir,
    src,
    dst,
    xnSrcN,
    xnDstN,
    dataW,
    setting
  );

  const asm = `move.${opSizeChar} ${args}`;

  /* Log */
  if (setting?.verbose) {
    console.log(dataW);
    console.log(asm);
  }

  return { asm: asm, task: exeMove(task, asm), success: true, length: 0 };
};

export const exeMove = (task: ITask, asm: string) => {
  console.log(asm);

  const {
    opBit,
    argSrcDst,
    argArray: arg,
  }: IExamineInstruction = examineInstruction(asm);

  let length = 0;

  task = MOVE_REG(task, opBit, argSrcDst, arg);
  task = MOVE_ABW(task, opBit, argSrcDst, arg);

  switch (argSrcDst) {
    /* ABL */
    case EnumArgSrcDst.ABL_TO_REG:
      task = ABX_TO_REG(task, opBit, arg);
      break;
    case EnumArgSrcDst.ABL_TO_ABW:
      task = ABX_TO_ABX(task, opBit, arg);
      break;
    case EnumArgSrcDst.ABL_TO_ABL:
      task = ABX_TO_ABX(task, opBit, arg);
      break;
    case EnumArgSrcDst.ABL_TO_I:
      task = ABX_TO_I(task, opBit, arg);
      break;
    case EnumArgSrcDst.ABL_TO_IPI:
      task = ABX_TO_IPI(task, opBit, arg);
      break;
    case EnumArgSrcDst.ABL_TO_IPD:
      task = ABX_TO_IPD(task, opBit, arg);
      break;
    case EnumArgSrcDst.ABL_TO_IWD:
      task = ABX_TO_IWD(task, opBit, arg);
      break;
    case EnumArgSrcDst.ABL_TO_IWDI:
      task = ABX_TO_IWDI(task, opBit, arg);
      break;
    /* I */
    case EnumArgSrcDst.I_TO_REG:
      task = I_TO_REG(task, opBit, arg);
      break;
    case EnumArgSrcDst.I_TO_ABW:
      task = I_TO_ABX(task, opBit, arg);
      break;
    case EnumArgSrcDst.I_TO_ABL:
      task = I_TO_ABX(task, opBit, arg);
      break;
    case EnumArgSrcDst.I_TO_I:
      task = I_TO_I(task, opBit, arg);
      break;
    case EnumArgSrcDst.I_TO_IPI:
      task = I_TO_I(task, opBit, arg, { inc: true });
      break;
    case EnumArgSrcDst.I_TO_IPD:
      task = I_TO_IPD(task, opBit, arg);
      break;
  }

  return task;
};
