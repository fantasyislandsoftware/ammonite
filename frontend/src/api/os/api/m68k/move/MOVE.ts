import { ITask } from 'stores/useTaskStore';
import { processOpSize, processXNXT } from '../m68kHelpers';
import { EnumM68KOP, IOperand } from '../IM68k';
import { EnumOpBit, opBitChar } from 'functions/dataHandling/IdataHandling';
import {
  _4to1 as __4to1,
  incReg,
  decReg,
  splitLongInto4Bytes,
  dec2bin,
  bin2hex,
  combine2BytesInto1Word,
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
  i: string,
  data: string,
  setting?: {
    verbose: boolean;
  }
) => {
  /* Bit Size */
  const opSize_bin = `${i[2]}${i[3]}`;
  const opSize = processOpSize(opSize_bin);
  const opSizeChar = opBitChar[opSize];

  /* Source */
  const xt_src_bin = `${i[10]}${i[11]}${i[12]}`;
  const xn_src_bin = `${i[13]}${i[14]}${i[15]}`;
  const xn_src_n = parseInt(xn_src_bin, 2).toString();
  console.log(xn_src_n);

  /* Destination */
  const xn_dst_bin = `${i[4]}${i[5]}${i[6]}`;
  const xt_dst_bin = `${i[7]}${i[8]}${i[9]}`;
  const xn_dst_n = parseInt(xn_dst_bin, 2).toString();
  console.log(xn_dst_n);

  const data0 = data.substring(0, 16);
  const data1 = data.substring(16, 32);
  const data0A = splitLongInto4Bytes(parseInt(data0, 2));
  const data1A = splitLongInto4Bytes(parseInt(data1, 2));

  //console.log(data0A);
  //console.log(data1A);

  /* Data conversion */
  const db0 = data0A[0];
  const db1 = data0A[1];
  const w0 = combine2BytesInto1Word(db0, db1);
  const db2 = data0A[2];
  const db3 = data0A[3];
  const w1 = combine2BytesInto1Word(db2, db3);
  const db4 = data1A[0];
  const db5 = data1A[1];
  const w2 = combine2BytesInto1Word(db4, db5);
  const db6 = data1A[2];
  const db7 = data1A[3];
  const w3 = combine2BytesInto1Word(db6, db7);

  const src: IOperand = processXNXT('src', xt_src_bin, xn_src_bin);
  const dst: IOperand = processXNXT('dst', xt_dst_bin, xn_dst_bin);

  let d0 = 0;
  let d1 = 0;

  /* absolute */
  const abs = lrb(src.abs, dst.abs);
  switch (abs) {
    case EnumLRB.L:
      d0 = w1;
      break;
    case EnumLRB.R:
      d1 = w1;
      break;
    case EnumLRB.B:
      d0 = w1;
      d1 = w3;
  }

  /* iwd */
  const iwd = lrb(src.iwd, dst.iwd);
  switch (iwd) {
    case EnumLRB.L:
      d0 = w1;
      break;
    case EnumLRB.R:
      d1 = w1;
      break;
    case EnumLRB.B:
      d0 = w1;
      d1 = w3;
  }

  const srcRp = [
    { str: '{src_d}', with: d0.toString() },
    {
      str: '{src_n}',
      with: xn_src_n,
    },
  ];

  const dstRp = [
    {
      str: '{dst_d}',
      with: d1.toString(),
    },
    {
      str: '{dst_n}',
      with: xn_dst_n,
    },
  ];

  const srcAsmOperand = rp(src.asmOperand, srcRp);
  const dstAsmOperand = rp(dst.asmOperand, dstRp);

  const asm = `move.${opSizeChar} ${srcAsmOperand},${dstAsmOperand}`;

  return { task: exeMove(task, asm), success: true, length: 0 };
};

const OPReg = {
  /* Reg */
  MOVE_REG_TO_ABS: /move\.[A-Za-z]+ [A-Za-z]+[0-9]+,[0-9]+/i,
  MOVE_REG_TO_I: /move\.[A-Za-z]+ [A-Za-z]+[0-9]+,\(a[0-9]+\)/i,
  MOVE_REG_TO_IPI: /move\.[A-Za-z]+ [A-Za-z]+[0-9]+,\(a[0-9]+\)\+/i,
  MOVE_REG_TO_IPD: /move\.[A-Za-z]+ [A-Za-z]+[0-9]+,-\(a[0-9]+\)/i,
  MOVE_REG_TO_IWD: /move\.[A-Za-z]+ [A-Za-z]+[0-9]+,[0-9]+\(a[0-9]+\)/i,
  MOVE_REG_TO_IWDI:
    /move\.[A-Za-z]+ [A-Za-z]+[0-9]+,[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,
  MOVE_REG_TO_REG: /move\.[A-Za-z]+ [A-Za-z]+[0-9]+,[A-Za-z]+[0-9]+/i,

  /* Abs */
  MOVE_ABS_TO_REG: /move\.[A-Za-z]+ [0-9]+,[A-Za-z]+[0-9]+/i,
  MOVE_ABS_TO_ABS: /move\.[A-Za-z]+ [0-9]+,[0-9]+/i,
  MOVE_ABS_TO_I: /move\.[A-Za-z]+ [0-9]+,\(a[0-9]+\)/i,
  MOVE_ABS_TO_IPI: /move\.[A-Za-z]+ [0-9]+,\(a[0-9]+\)\+/i,
  MOVE_ABS_TO_IPD: /move\.[A-Za-z]+ [0-9]+,-\(a[0-9]+\)/i,
  MOVE_ABS_TO_IWD: /move\.[A-Za-z]+ [0-9]+,[0-9]+\(a[0-9]+\)/i,
  MOVE_ABS_TO_IWDI: /move\.[A-Za-z]+ [0-9]+,[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

  /* I */
  MOVE_I_TO_REG: /move\.[A-Za-z]+ \(a[0-9]+\),[A-Za-z]+[0-9]+/i,
  MOVE_I_TO_ABS: /move\.[A-Za-z]+ \(a[0-9]+\),[0-9]+/i,
  MOVE_I_TO_I: /move\.[A-Za-z]+ \(a[0-9]+\),\(a[0-9]+\)/i,
  MOVE_I_TO_IPI: /move\.[A-Za-z]+ \(a[0-9]+\),\(a[0-9]+\)\+/i,
  MOVE_TO_IPD: /move\.[A-Za-z]+ \(a[0-9]+\),-\(a[0-9]+\)/i,
  MOVE_I_TO_IWD: /move\.[A-Za-z]+ \(a[0-9]+\),[0-9]+\(a[0-9]+\)/i,
  MOVE_I_TO_IWDI:
    /move\.[A-Za-z]+ \(a[0-9]+\),[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

  /* IPI */
  MOVE_IPI_TO_REG: /move\.[A-Za-z]+ \(a[0-9]+\)\+,[A-Za-z]+[0-9]+/i,
  MOVE_IPI_TO_ABS: /move\.[A-Za-z]+ \(a[0-9]+\)\+,[0-9]+/i,
  MOVE_IPI_TO_I: /move\.[A-Za-z]+ \(a[0-9]+\)\+,\([A-Za-z]+[0-9]+\)/i,
  MOVE_IPI_TO_IPI: /move\.[A-Za-z]+ \(a[0-9]+\)\+,\([A-Za-z]+[0-9]+\)\+/i,
  MOVE_IPI_TO_IPD: /move\.[A-Za-z]+ \(a[0-9]+\)\+,-\([A-Za-z]+[0-9]+\)/i,
  MOVE_IPI_TO_IWD: /move\.[A-Za-z]+ \(a[0-9]+\)\+,[0-9]+\(a[0-9]+\)/i,
  MOVE_IPI_TO_IWDI:
    /move\.[A-Za-z]+ \(a[0-9]+\)\+,[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

  /* IPD */
  MOVE_IPD_TO_REG: /move\.[A-Za-z]+ -\(a[0-9]+\),[A-Za-z]+[0-9]+/i,
  MOVE_IPD_TO_ABS: /move\.[A-Za-z]+ -\(a[0-9]+\),[0-9]+/i,
  MOVE_IPD_TO_I: /move\.[A-Za-z]+ -\(a[0-9]+\),\(a[0-9]+\)/i,
  MOVE_IPD_TO_IPI: /move\.[A-Za-z]+ -\(a[0-9]+\),\(a[0-9]+\)\+/i,
  MOVE_IPD_TO_IPD: /move\.[A-Za-z]+ -\(a[0-9]+\),-\(a[0-9]+\)/i,
  MOVE_IPD_TO_IWD: /move\.[A-Za-z]+ -\(a[0-9]+\),[0-9]+\(a[0-9]+\)/i,
  MOVE_IPD_TO_IWDI:
    /move\.[A-Za-z]+ -\(a[0-9]+\),[0-9]+\(a[0-9]+\.[A-Za-z]+[0-9]+\)/i,

  /* IWD */
  MOVE_IWD_TO_REG: /move\.[A-Za-z]+ [0-9]+\(a[0-9]+\),[A-Za-z]+[0-9]+/i,
  MOVE_IWD_TO_ABS: /move\.[A-Za-z]+ [0-9]+\(a[0-9]+\),[0-9]+/i,
  MOVE_IWD_TO_I: /move\.[A-Za-z]+ [0-9]+\(a[0-9]+\),\(a[0-9]+\)/i,
  MOVE_IWD_TO_IPI: /move\.[A-Za-z]+ [0-9]+\(a[0-9]+\),\(a[0-9]+\)\+/i,
  MOVE_IWD_TO_IPD: /move\.[A-Za-z]+ [0-9]+\(a[0-9]+\),-\(a[0-9]+\)/i,
  MOVE_IWD_TO_IWD: /move\.[A-Za-z]+ [0-9]+\(a[0-9]+\),[0-9]+\(a[0-9]+\)/i,
  MOVE_IWD_TO_IWDI:
    /move\.[A-Za-z]+ [0-9]+\(a[0-9]+\),[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

  /* IWDI */
  MOVE_IWDI_TO_REG:
    /move\.[A-Za-z]+ [0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),[A-Za-z]+[0-9]+/i,
  MOVE_IWDI_TO_ABS: /move\.[A-Za-z]+ [0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),[0-9]+/i,
  MOVE_IWDI_TO_I:
    /move\.[A-Za-z]+ [0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),\(a[0-9]+\)/i,
  MOVE_IWDI_TO_IPI:
    /move\.[A-Za-z]+ [0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),\(a[0-9]+\)\+/i,
  MOVE_IWDI_TO_IPD:
    /move\.[A-Za-z]+ [0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),-\(a[0-9]+\)/i,
  MOVE_IWDI_TO_IWD:
    /move\.[A-Za-z]+ [0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),[0-9]+\(a[0-9]+\)/i,
  MOVE_IWDI_TO_IWDI:
    /move\.[A-Za-z]+ [0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,
};

export const exeMove = (task: ITask, asm: string) => {
  asm = 'move.b 1(a0,d1),1(a0,d1)';
  console.log(asm);

  let state = 'unknown';

  /* Reg */
  if (OPReg.MOVE_REG_TO_REG.test(asm)) state = 'MOVE_REG_TO_REG';
  if (OPReg.MOVE_REG_TO_ABS.test(asm)) state = 'MOVE_REG_TO_ABS';
  if (OPReg.MOVE_REG_TO_I.test(asm)) state = 'MOVE_REG_TO_I';
  if (OPReg.MOVE_REG_TO_IPI.test(asm)) state = 'MOVE_REG_TO_IPI';
  if (OPReg.MOVE_REG_TO_IPD.test(asm)) state = 'MOVE_REG_TO_IPD';
  if (OPReg.MOVE_REG_TO_IWD.test(asm)) state = 'MOVE_REG_TO_IWD';
  if (OPReg.MOVE_REG_TO_IWDI.test(asm)) state = 'MOVE_REG_TO_IWDI';

  /* Abs */
  if (OPReg.MOVE_ABS_TO_REG.test(asm)) state = 'MOVE_ABS_TO_REG';
  if (OPReg.MOVE_ABS_TO_ABS.test(asm)) state = 'MOVE_ABS_TO_ABS';
  if (OPReg.MOVE_ABS_TO_I.test(asm)) state = 'MOVE_ABS_TO_I';
  if (OPReg.MOVE_ABS_TO_IPI.test(asm)) state = 'MOVE_ABS_TO_IPI';
  if (OPReg.MOVE_ABS_TO_IPD.test(asm)) state = 'MOVE_ABS_TO_IPD';
  if (OPReg.MOVE_ABS_TO_IWD.test(asm)) state = 'MOVE_ABS_TO_IWD';
  if (OPReg.MOVE_ABS_TO_IWDI.test(asm)) state = 'MOVE_ABS_TO_IWDI';

  /* I */
  if (OPReg.MOVE_I_TO_REG.test(asm)) state = 'MOVE_I_TO_REG';
  if (OPReg.MOVE_I_TO_ABS.test(asm)) state = 'MOVE_I_TO_ABS';
  if (OPReg.MOVE_I_TO_I.test(asm)) state = 'MOVE_I_TO_I';
  if (OPReg.MOVE_I_TO_IPI.test(asm)) state = 'MOVE_I_TO_IPI';
  if (OPReg.MOVE_TO_IPD.test(asm)) state = 'MOVE_TO_IPD';
  if (OPReg.MOVE_I_TO_IWD.test(asm)) state = 'MOVE_I_TO_IWD';
  if (OPReg.MOVE_I_TO_IWDI.test(asm)) state = 'MOVE_I_TO_IWDI';

  /* IPI */
  if (OPReg.MOVE_IPI_TO_REG.test(asm)) state = 'MOVE_IPI_TO_REG';
  if (OPReg.MOVE_IPI_TO_ABS.test(asm)) state = 'MOVE_IPI_TO_ABS';
  if (OPReg.MOVE_IPI_TO_I.test(asm)) state = 'MOVE_IPI_TO_I';
  if (OPReg.MOVE_IPI_TO_IPI.test(asm)) state = 'MOVE_IPI_TO_IPI';
  if (OPReg.MOVE_IPI_TO_IPD.test(asm)) state = 'MOVE_IPI_TO_IPD';
  if (OPReg.MOVE_IPI_TO_IWD.test(asm)) state = 'MOVE_IPI_TO_IWD';
  if (OPReg.MOVE_IPI_TO_IWDI.test(asm)) state = 'MOVE_IPI_TO_IWDI';

  /* IPD */
  if (OPReg.MOVE_IPD_TO_REG.test(asm)) state = 'MOVE_IPD_TO_REG';
  if (OPReg.MOVE_IPD_TO_ABS.test(asm)) state = 'MOVE_IPD_TO_ABS';
  if (OPReg.MOVE_IPD_TO_I.test(asm)) state = 'MOVE_IPD_TO_I';
  if (OPReg.MOVE_IPD_TO_IPI.test(asm)) state = 'MOVE_IPD_TO_IPI';
  if (OPReg.MOVE_IPD_TO_IPD.test(asm)) state = 'MOVE_IPD_TO_IPD';
  if (OPReg.MOVE_IPD_TO_IWD.test(asm)) state = 'MOVE_IPD_TO_IWD';
  if (OPReg.MOVE_IPD_TO_IWDI.test(asm)) state = 'MOVE_IPD_TO_IWDI';

  /* IWD */
  if (OPReg.MOVE_IWD_TO_REG.test(asm)) state = 'MOVE_IWD_TO_REG';
  if (OPReg.MOVE_IWD_TO_ABS.test(asm)) state = 'MOVE_IWD_TO_ABS';
  if (OPReg.MOVE_IWD_TO_I.test(asm)) state = 'MOVE_IWD_TO_I';
  if (OPReg.MOVE_IWD_TO_IPI.test(asm)) state = 'MOVE_IWD_TO_IPI';
  if (OPReg.MOVE_IWD_TO_IPD.test(asm)) state = 'MOVE_IWD_TO_IPD';
  if (OPReg.MOVE_IWD_TO_IWD.test(asm)) state = 'MOVE_IWD_TO_IWD';
  if (OPReg.MOVE_IWD_TO_IWDI.test(asm)) state = 'MOVE_IWD_TO_IWDI';

  /* IWDI */
  if (OPReg.MOVE_IWDI_TO_REG.test(asm)) state = 'MOVE_IWDI_TO_REG';
  if (OPReg.MOVE_IWDI_TO_ABS.test(asm)) state = 'MOVE_IWDI_TO_ABS';
  if (OPReg.MOVE_IWDI_TO_I.test(asm)) state = 'MOVE_IWDI_TO_I';
  if (OPReg.MOVE_IWDI_TO_IPI.test(asm)) state = 'MOVE_IWDI_TO_IPI';
  if (OPReg.MOVE_IWDI_TO_IPD.test(asm)) state = 'MOVE_IWDI_TO_IPD';
  if (OPReg.MOVE_IWDI_TO_IWD.test(asm)) state = 'MOVE_IWDI_TO_IWD';
  if (OPReg.MOVE_IWDI_TO_IWDI.test(asm)) state = 'MOVE_IWDI_TO_IWDI';

  /* PC

  /* PCID */

  console.log(state);

  return task;
};

export const MOVE_ = (
  task: ITask,
  i: string,
  data: string,
  setting?: {
    verbose: boolean;
  }
) => {
  const { verbose } = setting || { verbose: false };

  let src: IOperand = {
    asmOperand: '',
    jsOperand: '',
    ipi: false,
    ipd: false,
    iwd: false,
    length: 0,
  };
  let dst: IOperand = {
    asmOperand: '',
    jsOperand: '',
    ipi: false,
    ipd: false,
    iwd: false,
    length: 0,
  };
  let length = 0;

  /* Bit Size */
  const opSize_bin = `${i[2]}${i[3]}`;
  const opSize = processOpSize(opSize_bin);

  /* Source */
  const xt_src_bin = `${i[10]}${i[11]}${i[12]}`;
  const xn_src_bin = `${i[13]}${i[14]}${i[15]}`;
  src = processXNXT('src', xt_src_bin, xn_src_bin);

  /* Destination */
  const xn_dst_bin = `${i[4]}${i[5]}${i[6]}`;
  const xt_dst_bin = `${i[7]}${i[8]}${i[9]}`;
  dst = processXNXT('dst', xt_dst_bin, xn_dst_bin);

  /* Length */
  if (src.length === 4 || dst.length === 4) {
    length = 4;
  } else {
    length = 2;
  }

  /* */
  let pi = 0;
  switch (opSize) {
    case EnumOpBit.BYTE:
      pi = 1;
      break;
    case EnumOpBit.WORD:
      pi = 2;
      break;
    case EnumOpBit.LONG:
      pi = 4;
      break;
  }

  let success = true;

  /* */

  /* src address */
  const xn_src = parseInt(xn_src_bin, 2).toString();

  /* dst address */
  const xn_dst = parseInt(xn_dst_bin, 2).toString();

  let start = 0;
  switch (opSize) {
    case EnumOpBit.BYTE:
      start = 3;
      break;
    case EnumOpBit.WORD:
      start = 2;
      break;
    case EnumOpBit.LONG:
      start = 0;
      break;
  }
  if (opSize === EnumOpBit.BYTE) start = 3;
  if (opSize === EnumOpBit.WORD) start = 2;

  const opSizeChar = opBitChar[opSize];

  const data0 = data.substring(0, 16);
  const data1 = data.substring(16, 32);
  const data0A = splitLongInto4Bytes(parseInt(data0, 2));
  const data1A = splitLongInto4Bytes(parseInt(data1, 2));

  const db0 = data0A[0];
  const db1 = data0A[1];
  const w0 = combine2BytesInto1Word(db0, db1);
  const db2 = data0A[2];
  const db3 = data0A[3];
  const w1 = combine2BytesInto1Word(db2, db3);
  const db4 = data1A[4];
  const db5 = data1A[5];
  const w2 = combine2BytesInto1Word(db4, db5);
  const db6 = data1A[6];
  const db7 = data1A[7];
  const w3 = combine2BytesInto1Word(db6, db7);

  const ib = dec2bin(db2, 8);

  const it = parseInt(`${ib[0]}`, 2);
  const its = it === 1 ? 'a' : 'd';

  const inum = parseInt(`${ib[1]}${ib[2]}${ib[3]}`, 2).toString();

  /* Replacers */
  const generalRp = [
    { str: 'd0', with: db0.toString() },
    { str: 'd1', with: db1.toString() },
    { str: 'd2', with: db2.toString() },
    { str: 'd3', with: db3.toString() },
    { str: 'it', with: its },
    { str: 'in', with: inum },
  ];

  let srcRp = [{ str: 'n', with: xn_src }];
  let dstRp = [{ str: 'n', with: xn_dst }];

  /* Verbose Instruction */
  const srcAsmOperand = rp(src.asmOperand, generalRp.concat(srcRp));
  const dstAsmOperand = rp(dst.asmOperand, generalRp.concat(dstRp));
  const ins = `move.${opSizeChar} ${srcAsmOperand},${dstAsmOperand}`;
  verbose && console.log(ins);

  /* Indirect Pre-Decrement */
  const preIPDCmd = 'task.s.a{n} = _decReg(task.s.a{n},{pi})';
  const preIPDRep = [{ str: 'pi', with: pi.toString() }];
  if (src.ipd) {
    const cmd = rp(preIPDCmd, [{ str: 'n', with: xn_src }].concat(preIPDRep));
    verbose && console.log(cmd);
    eval(cmd);
  }
  if (dst.ipd) {
    const cmd = rp(preIPDCmd, [{ str: 'n', with: xn_dst }].concat(preIPDRep));
    verbose && console.log(cmd);
    eval(cmd);
  }

  /* Indirect with Displacement */
  const preIWDCmd = 'task.s.a{n} = _incReg(task.s.a{n},{d})';
  //const preIWDRep = [{ str: 'd', with: parseInt(d, 2).toString() }];
  if (src.iwd) {
    //const cmd = rp(preIWDCmd, [{ str: 'n', with: xn_src }].concat(preIWDRep));
    //verbose && console.log(cmd);
    //eval(cmd);
  }
  /*if (dst.iwd) {
    const cmd = rp(preIWDCmd, [{ str: 'n', with: xn_dst }].concat(preIWDRep));
    verbose && console.log(cmd);
    eval(cmd);
  }*/

  /* Calc */
  srcRp = [
    { str: 'n', with: xn_src },
    { str: 'd', with: db3.toString() },
    { str: 's', with: start.toString() },
  ];
  dstRp = [
    { str: 'n', with: xn_dst },
    { str: 'd', with: db3.toString() },
    { str: 's', with: start.toString() },
  ];
  for (let i = start; i < 4; i++) {
    const generalRp = [{ str: 'i', with: i.toString() }];
    const srcJsOperand = rp(src.jsOperand, generalRp.concat(srcRp));
    const dstJsOperand = rp(dst.jsOperand, generalRp.concat(dstRp));
    const cmd = `${dstJsOperand} = ${srcJsOperand}`;
    verbose && console.log(cmd);
    try {
      eval(cmd);
    } catch (error) {
      success = false;
    }
  }

  /* Indirect Post-Increment */
  const postIPICmd = 'task.s.a{n} = _incReg(task.s.a{n},{pi})';
  const postIPIRep = [{ str: 'pi', with: pi.toString() }];
  if (src.ipi) {
    const cmd = rp(postIPICmd, [{ str: 'n', with: xn_src }].concat(postIPIRep));
    verbose && console.log(cmd);
    eval(cmd);
  }
  if (dst.ipi) {
    const cmd = rp(postIPICmd, [{ str: 'n', with: xn_dst }].concat(postIPIRep));
    verbose && console.log(cmd);
    eval(cmd);
  }

  return { task: task, success: success, length: length };
};
