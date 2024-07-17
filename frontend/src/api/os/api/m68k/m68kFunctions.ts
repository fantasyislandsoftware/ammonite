import { ITask } from 'stores/useTaskStore';
import { bitSize, EnumASMType, EnumBit, EnumM68KOP } from './IM68k';
import { opTable } from './opTable2';

import { M68K_API as m68k_api } from 'api/os/api/m68k/m68k';

const M68K_API = new m68k_api();

export const convertArg = (arg: string) => {
  const dreg = ['d0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7'];
  const areg = ['a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'];

  /* Data register */
  if (dreg.includes(arg)) {
    return `{ t: '${EnumASMType.DREG}', v: ${arg.replace('d', '')} }`;
  }

  /* Address register */
  if (areg.includes(arg)) {
    return `{ t: '${EnumASMType.AREG}', v: ${arg.replace('d', '')} }`;
  }

  /* Immediate */
  if (arg.startsWith('#')) {
    return `{ t: '${EnumASMType.IMM}', v: ${arg.replace('#', '')} }`;
  }

  /* 16bit Absolute Address*/
  if (arg.endsWith('w')) {
    return `{ t: '${EnumASMType.ABS_W}', v: ${arg.replace('.w', '')} }`;
  }

  /* 32bit Absolute Address*/
  if (arg.endsWith('l')) {
    return `{ t: '${EnumASMType.ABS_L}', v: ${arg.replace('.l', '')} }`;
  }

  /* (An) */
  if (arg.startsWith('(') && arg.endsWith(')')) {
    return `{ t: '${EnumASMType.IND}', v: ${arg
      .replace('(a', '')
      .replace(')', '')} }`;
  }

  /* Unknown */
  return `'?'`;
};

const processXNXT = (xt_bin: string, xn_bin: string, d: string) => {
  let result = '';
  switch (xt_bin) {
    case '000':
      result = `d${parseInt(xn_bin, 2)}`;
      break;
    case '001':
      result = `a${parseInt(xn_bin, 2)}`;
      break;
    case '010':
      result = `(a${parseInt(xn_bin, 2)})`;
      break;
    case '011':
      result = `(a${parseInt(xn_bin, 2)})+`;
      break;
    case '100':
      result = `-(a${parseInt(xn_bin, 2)})`;
      break;
    case '101':
      result = `d16(a${parseInt(xn_bin, 2)})`;
      break;
    case '110':
      result = `d8(a${parseInt(xn_bin, 2)},Xn)`;
      break;
    case '111':
      switch (xn_bin) {
        case '000':
          result = `${parseInt(d)}.W`;
          break;
        case '001':
          result = `${parseInt(d)}.L`;
          break;
        case '010':
          result = `d16(PC)`;
          break;
        case '011':
          result = `d8(PC,Xn)`;
          break;
        case '100':
          result = `#imm`;
          break;
        default:
          result = `#imm`;
      }
      break;
  }
  return result;
};

export const processMOVE = (task: ITask, i: string, d: string) => {
  /* 0123456789ABCDEF */
  /* 0000000000000000 */

  let src = '';
  let dst = '';

  /* Bit Size */
  const opSize_bin = `${i[2]}${i[3]}`;

  let opSize: EnumBit = EnumBit.WORD;
  switch (opSize_bin) {
    case '01':
      opSize = EnumBit.BYTE;
      break;
    case '11':
      opSize = EnumBit.WORD;
      break;
    case '10':
      opSize = EnumBit.LONG;
      break;
    default:
      opSize = EnumBit.WORD;
  }

  /* Source */
  const xt_src_bin = `${i[10]}${i[11]}${i[12]}`;
  const xn_src_bin = `${i[13]}${i[14]}${i[15]}`;
  src = processXNXT(xt_src_bin, xn_src_bin, d);

  /* Destination */
  const xn_dst_bin = `${i[4]}${i[5]}${i[6]}`;
  const xt_dst_bin = `${i[7]}${i[8]}${i[9]}`;
  dst = processXNXT(xt_dst_bin, xn_dst_bin, d);

  console.log(`${EnumM68KOP.MOVE}.${opSize} ${src},${dst}`);

  return 2;
};

export const processRTS = (task: ITask) => {
  M68K_API.rts(task);
  return 2;
};
