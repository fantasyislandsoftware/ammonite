import { ITask } from 'stores/useTaskStore';
import { EnumASMType, EnumM68KOP, EnumOPAction } from './IM68k';
import { EnumBit, EnumOpBit } from 'functions/dataHandling/IdataHandling';

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

export const processXNXT = (xt_bin: string, xn_bin: string, d: string) => {
  let arg = '';
  let loc = '';
  let length = 0;
  switch (xt_bin) {
    case '000':
      arg = 'd{n}';
      loc = 'task.s.d{n}[{i}]';
      length = 2;
      break;
    case '001':
      arg = 'an';
      loc = 'task.s.a{n}[i]';
      length = 2;
      break;
    case '010':
      arg = '(an)';
      loc = 'task.s.m[_4to1(task.s.a{n})]';
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
          arg = '{d}.w';
          loc = 'task.s.m[{d}+{i}-{s}]';
          length = 4;
          break;
        case '001':
          arg = '{d}.l';
          loc = 'task.s.m[{d}+{i}-{s}]';
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
    loc: loc,
    length: length,
  };
};

export const processOpSize = (opSize_bin: string) => {
  let opSize: EnumOpBit = EnumOpBit.WORD;
  switch (opSize_bin) {
    case '01':
      opSize = EnumOpBit.BYTE;
      break;
    case '11':
      opSize = EnumOpBit.WORD;
      break;
    case '10':
      opSize = EnumOpBit.LONG;
      break;
    default:
      opSize = EnumOpBit.WORD;
  }
  return opSize;
};
