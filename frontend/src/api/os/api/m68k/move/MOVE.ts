import { ITask } from 'stores/useTaskStore';
import {
  examineInstruction,
  fillArgData,
  processOpSize,
  processXNXT,
} from '../m68KHelpers/m68kHelpers';
import { IExamineInstruction } from '../IM68k';
import { opBitChar } from 'functions/dataHandling/IdataHandling';
import { l } from 'functions/dataHandling/dataHandling';
import { join4BytesInto1Long } from 'functions/dataHandling/dataHandling';
import MOVE_REG from './op/MOVE_REG';
import MOVE_ABW from './op/MOVE_ABW';
import MOVE_ABL from './op/MOVE_ABL';
import MOVE_I from './op/MOVE_I';
import MOVE_IPI from './op/MOVE_IPI';
import MOVE_IPD from './op/MOVE_IPD';
import MOVE_IWD from './op/MOVE_IWD';

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

  ({ task, length } = MOVE_REG(task, opBit, argSrcDst, arg, length));
  ({ task, length } = MOVE_ABW(task, opBit, argSrcDst, arg, length));
  ({ task, length } = MOVE_ABL(task, opBit, argSrcDst, arg, length));
  ({ task, length } = MOVE_I(task, opBit, argSrcDst, arg, length));
  ({ task, length } = MOVE_IPI(task, opBit, argSrcDst, arg, length));
  ({ task, length } = MOVE_IPD(task, opBit, argSrcDst, arg, length));
  ({ task, length } = MOVE_IWD(task, opBit, argSrcDst, arg, length));

  console.log(length);

  return task;
};
