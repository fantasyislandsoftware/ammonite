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
} from 'functions/dataHandling/dataHandling';
import { parse } from 'path';
import { rp } from 'functions/string';

const _4to1 = __4to1;
const _incReg = incReg;
const _decReg = decReg;

export const MOVE = (
  task: ITask,
  i: string,
  d: string,
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
  src = processXNXT(xt_src_bin, xn_src_bin, d);

  /* Destination */
  const xn_dst_bin = `${i[4]}${i[5]}${i[6]}`;
  const xt_dst_bin = `${i[7]}${i[8]}${i[9]}`;
  dst = processXNXT(xt_dst_bin, xn_dst_bin, d);

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

  const data = splitLongInto4Bytes(parseInt(d, 2));
  const d0 = data[0];
  const d1 = data[1];
  const d2 = data[2];
  const d3 = data[3];

  const ib = dec2bin(d2, 8);

  const it = parseInt(`${ib[0]}`, 2);
  const its = it === 1 ? 'a' : 'd';

  const inum = parseInt(`${ib[1]}${ib[2]}${ib[3]}`, 2).toString();

  /* Replacers */
  const generalRp = [
    { str: 'd0', with: d0.toString() },
    { str: 'd1', with: d1.toString() },
    { str: 'd2', with: d2.toString() },
    { str: 'd3', with: d3.toString() },
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

  /* Indirect Pre-Increment with Displacement */
  const preIWDCmd = 'task.s.a{n} = _incReg(task.s.a{n},{d})';
  const preIWDRep = [{ str: 'd', with: parseInt(d, 2).toString() }];
  if (src.iwd) {
    const cmd = rp(preIWDCmd, [{ str: 'n', with: xn_src }].concat(preIWDRep));
    verbose && console.log(cmd);
    eval(cmd);
  }
  if (dst.iwd) {
    const cmd = rp(preIWDCmd, [{ str: 'n', with: xn_dst }].concat(preIWDRep));
    verbose && console.log(cmd);
    eval(cmd);
  }

  /* Calc */
  srcRp = [
    { str: 'n', with: xn_src },
    { str: 'd', with: d3.toString() },
    { str: 's', with: start.toString() },
  ];
  dstRp = [
    { str: 'n', with: xn_dst },
    { str: 'd', with: d3.toString() },
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
