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
/*import {
  _4to1 as __4to1,
  incReg,
  decReg,
} from 'functions/dataHandling/dataHandling';*/
import { REG_TO_REG } from './op/REG/MOVE_REG_TO_REG';
import { REG_TO_ABW } from './op/REG/MOVE_REG_TO_ABW';
import { REG_TO_ABL } from './op/REG/MOVE_REG_TO_ABL';
import { REG_TO_I } from './op/REG/MOVE_REG_TO_I';
import { REG_TO_IPI } from './op/REG/MOVE_REG_TO_IPI';
import { REG_TO_IPD } from './op/REG/MOVE_REG_TO_IPD';
import { REG_TO_IWD } from './op/REG/MOVE_REG_TO_IWD';
import { REG_TO_IWDI } from './op/REG/MOVE_REG_TO_IWDI';
import { ABW_TO_ABW } from './op/ABW/MOVE_ABW_TO_ABW';
import { ABW_TO_I } from './op/ABW/MOVE_ABW_TO_I';
import { ABW_TO_REG } from './op/ABW/MOVE_ABW_TO_REG';
import { ABW_TO_IPI } from './op/ABW/MOVE_ABW_TO_IPI';
import { ABW_TO_IPD } from './op/ABW/MOVE_ABW_TO_IPD';
import { ABW_TO_IWD } from './op/ABW/MOVE_ABW_TO_IWD';
import { ABW_TO_IWDI } from './op/ABW/MOVE_ABW_TO_IWDI';

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

  const { opBit, args, argSrcDst, argArray }: IExamineInstruction =
    examineInstruction(asm);

  let length = 0;

  switch (argSrcDst) {
    /* REG */
    case EnumArgSrcDst.REG_TO_REG:
      task = REG_TO_REG(task, opBit, argArray);
      break;
    case EnumArgSrcDst.REG_TO_ABW:
      task = REG_TO_ABW(task, opBit, argArray);
      break;
    case EnumArgSrcDst.REG_TO_ABL:
      task = REG_TO_ABL(task, opBit, argArray);
      break;
    case EnumArgSrcDst.REG_TO_I:
      task = REG_TO_I(task, opBit, argArray);
      break;
    case EnumArgSrcDst.REG_TO_IPI:
      task = REG_TO_IPI(task, opBit, argArray);
      break;
    case EnumArgSrcDst.REG_TO_IPD:
      task = REG_TO_IPD(task, opBit, argArray);
      break;
    case EnumArgSrcDst.REG_TO_IWD:
      task = REG_TO_IWD(task, opBit, argArray);
      break;
    case EnumArgSrcDst.REG_TO_IWDI:
      task = REG_TO_IWDI(task, opBit, argArray);
      break;
    /* ABW */
    case EnumArgSrcDst.ABW_TO_REG:
      task = ABW_TO_REG(task, opBit, argArray);
      break;
    case EnumArgSrcDst.ABW_TO_ABW:
      task = ABW_TO_ABW(task, opBit, argArray);
      break;
    case EnumArgSrcDst.ABW_TO_ABL:
      task = ABW_TO_ABW(task, opBit, argArray);
      break;
    case EnumArgSrcDst.ABW_TO_I:
      task = ABW_TO_I(task, opBit, argArray);
      break;
    case EnumArgSrcDst.ABW_TO_IPI:
      task = ABW_TO_IPI(task, opBit, argArray);
      break;
    case EnumArgSrcDst.ABW_TO_IPD:
      task = ABW_TO_IPD(task, opBit, argArray);
      break;
    case EnumArgSrcDst.ABW_TO_IWD:
      task = ABW_TO_IWD(task, opBit, argArray);
      break;
    case EnumArgSrcDst.ABW_TO_IWDI:
      task = ABW_TO_IWDI(task, opBit, argArray);
      break;
  }

  return task;
};
