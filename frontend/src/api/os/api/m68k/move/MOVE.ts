import { ITask } from 'stores/useTaskStore';
import {
  examineInstruction,
  fillArgData,
  processOpSize,
  processXNXT,
} from '../m68KHelpers/m68kHelpers';
import {
  EnumArgSrcDst,
  EnumM68KOP,
  IExamineInstruction,
  IOperand,
} from '../IM68k';
import { EnumOpBit, opBitChar } from 'functions/dataHandling/IdataHandling';
import {
  _4to1 as __4to1,
  incReg,
  decReg,
  splitLongInto4Bytes,
  dec2bin,
  bin2hex,
  combine2BytesInto1Word,
  combine2WordsInto1Long,
} from 'functions/dataHandling/dataHandling';
import { join, parse } from 'path';
import { rp } from 'functions/string';

const _4to1 = __4to1;
const _incReg = incReg;
const _decReg = decReg;

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

  const args = fillArgData(argDir, src, dst, xnSrcN, xnDstN, dataW, setting);

  //const asm = 'move.l d0,d0';
  const asm = `move.${opSizeChar} ${args}`;

  /* Log */

  if (setting?.verbose) {
    console.log(dataW);
    console.log(asm);
  }

  return { asm: asm, task: exeMove(task, asm), success: true, length: 0 };
};

const regToReg = (task: ITask, opBit: EnumOpBit, args: string) => {
  return task;
};

export const exeMove = (task: ITask, asm: string) => {
  //console.log(asm);

  const { opBit, args, argSrcDst }: IExamineInstruction =
    examineInstruction(asm);

  switch (argSrcDst) {
    case EnumArgSrcDst.REG_TO_REG:
      task = regToReg(task, opBit, args);
      break;
  }

  return task;
};
