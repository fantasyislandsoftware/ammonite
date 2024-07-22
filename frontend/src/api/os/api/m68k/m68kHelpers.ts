import { ITask } from 'stores/useTaskStore';
import { EnumASMType, EnumBit, EnumM68KOP } from './IM68k';
import { MOVE_DX_TO_DX } from './move/MOVE_DX_TO_DX/MOVE_DX_TO_DX';

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
  let arg = '';
  let length = 0;
  switch (xt_bin) {
    case '000':
      arg = 'dn';
      length = 2;
      break;
    case '001':
      arg = 'an';
      length = 2;
      break;
    case '010':
      arg = '(an)';
      length = 2;
      break;
    case '011':
      arg = '(an)+';
      length = 2;
      break;
    case '100':
      arg = '-(an)';
      length = 2;
      break;
    case '101':
      arg = 'd16(an)';
      length = 2;
      break;
    case '110':
      arg = 'd8(an,Xn)';
      length = 2;
      break;
    case '111':
      switch (xn_bin) {
        case '000':
          arg = 'x.w';
          length = 4;
          break;
        case '001':
          arg = 'x.l';
          length = 4;
          break;
        case '010':
          arg = 'd16(pc)';
          length = 4;
          break;
        case '011':
          arg = 'd8(pc,xn)';
          length = 4;
          break;
        case '100':
          arg = '#imm';
          length = 4;
          break;
        default:
          arg = '#imm';
          length = 4;
      }
      break;
  }
  return {
    arg: arg,
    length: length,
  };
};

export const processOpSize = (opSize_bin: string) => {
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
  return opSize;
};

export const processMOVE = (task: ITask, i: string, d: string) => {
  /* 0123456789ABCDEF */
  /* 0000000000000000 */

  let src = {
    arg: '',
    length: 0,
  };
  let dst = {
    arg: '',
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

  const template = `${EnumM68KOP.MOVE}.x ${src.arg},${dst.arg}`;
  console.log(`${EnumM68KOP.MOVE}.x ${src.arg},${dst.arg}`);

  switch (template) {
    case 'move.x dn,dn':
      MOVE_DX_TO_DX(
        task,
        opSize,
        parseInt(xn_src_bin, 2),
        parseInt(xn_dst_bin, 2)
      );
      break;
  }

  return length;
};
