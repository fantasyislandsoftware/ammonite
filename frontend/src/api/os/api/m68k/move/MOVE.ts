import { ITask } from 'stores/useTaskStore';
import { processOpSize, processXNXT } from '../m68kHelpers';
import { EnumM68KOP } from '../IM68k';
import { EnumOpBit, opBitChar } from 'functions/dataHandling/IdataHandling';
import { _4to1 as __4to1, incReg } from 'functions/dataHandling/dataHandling';

const _4to1 = __4to1;
const _incReg = incReg;

export const MOVE = (
  task: ITask,
  i: string,
  d: string,
  setting?: {
    verbose: boolean;
  }
) => {
  const { verbose } = setting || { verbose: false };

  let src = {
    arg: '',
    calc: '',
    preCalc: '',
    postCalc: '',
    length: 0,
  };
  let dst = {
    arg: '',
    calc: '',
    preCalc: '',
    postCalc: '',
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

  if (src.length === 4 || dst.length === 4) {
    length = 4;
  } else {
    length = 2;
  }

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
  const srcLoc = `${src.calc}`.replace('{n}', xn_src);

  /* dst address */
  const xn_dst = parseInt(xn_dst_bin, 2).toString();
  const dstLoc = `${dst.calc}`.replace('{n}', xn_dst);
  //console.log(dstKey);

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

  const data = parseInt(d, 2).toString();

  const rp = (s: string, n: string, d: string) => {
    return s.replaceAll('{n}', n).replaceAll('{d}', d);
  };

  const ins = `move.${opSizeChar} ${rp(src.arg, xn_src, data)},${rp(
    dst.arg,
    xn_dst,
    data
  )}`;
  verbose && console.log(ins);

  /* Calc */
  for (let i = start; i < 4; i++) {
    const cmd = `${dstLoc} = ${srcLoc}`
      .replaceAll('{i}', i.toString())
      .replaceAll('{d}', data)
      .replaceAll('{s}', start.toString());
    verbose && console.log(cmd);
    eval(cmd);
  }

  /* Post Calc */
  if (dst.postCalc) {
    const cmd = dst.postCalc
      .replaceAll('{n}', xn_dst)
      .replaceAll('{pi}', pi.toString());
    verbose && console.log(cmd);
    eval(cmd);
  }

  return { task: task, success: success, length: length };
};
