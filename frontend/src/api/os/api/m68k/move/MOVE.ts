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
  hex2int,
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

const copy = (
  task: ITask,
  loc: {
    src: { id: string; start: number };
    dst: { id: string; start: number };
  },
  bit: EnumOpBit
) => {
  for (let i = 0; i < bit / 8; i++) {
    task.s[loc.dst.id][i + loc.dst.start] =
      task.s[loc.src.id][i + loc.src.start];
  }
  return task;
};

const regToReg = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  //console.log(args);

  const src = args[0];
  const dst = args[1];

  switch (opBit) {
    case EnumOpBit.BYTE:
      task.s[dst][3] = task.s[src][3];
      break;
    case EnumOpBit.WORD:
      task.s[dst][2] = task.s[src][2];
      task.s[dst][3] = task.s[src][3];
      break;
    case EnumOpBit.LONG:
      task.s[dst][0] = task.s[src][0];
      task.s[dst][1] = task.s[src][1];
      task.s[dst][2] = task.s[src][2];
      task.s[dst][3] = task.s[src][3];
      break;
  }

  return task;
};

const regToABW = (task: ITask, opBit: EnumOpBit, args: string[]) => {
  console.log(args);

  const src = args[0];
  const loc = hex2int(args[1].replaceAll('0x', '').replaceAll('.w', ''));

  switch (opBit) {
    case EnumOpBit.BYTE:
      task = copy(
        task,
        { src: { id: src, start: 3 }, dst: { id: 'm', start: loc } },
        EnumOpBit.BYTE
      );
      //task = copy(task, }, 'm', EnumOpBit.BYTE, );
      break;
    case EnumOpBit.WORD:
      //task = copy(task, src, 'm', EnumOpBit.WORD, 2, loc);
      task = copy(
        task,
        { src: { id: src, start: 2 }, dst: { id: 'm', start: loc } },
        EnumOpBit.WORD
      );
      break;
    case EnumOpBit.LONG:
      task = copy(
        task,
        { src: { id: src, start: 0 }, dst: { id: 'm', start: loc } },
        EnumOpBit.LONG
      );
      //task = copy(task, src, 'm', EnumOpBit.LONG, 0, loc);
      break;
  }

  return task;
};

export const exeMove = (task: ITask, asm: string) => {
  //console.log(asm);

  const { opBit, args, argSrcDst, argArray }: IExamineInstruction =
    examineInstruction(asm);

  let length = 0;

  switch (argSrcDst) {
    /* REG */
    case EnumArgSrcDst.REG_TO_REG:
      task = regToReg(task, opBit, argArray);
      break;
    case EnumArgSrcDst.REG_TO_ABW:
      task = regToABW(task, opBit, argArray);
      break;
  }

  return task;
};
