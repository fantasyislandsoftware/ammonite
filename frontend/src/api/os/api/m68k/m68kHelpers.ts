import { ITask } from 'stores/useTaskStore';
import { EnumASMType, EnumM68KOP, EnumOPAction, IOperand } from './IM68k';
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

export const processXNXT = (
  l: 'src' | 'dst',
  xt_bin: string,
  xn_bin: string
) => {
  let res: IOperand = {
    asmOperand: '',
    jsOperand: '',
    ipi: false,
    ipd: false,
    iwd: false,
    length: 0,
  };

  switch (xt_bin) {
    case '000':
      res.asmOperand = `d{${l}_n}`;
      res.jsOperand = `task.s.d{${l}_n}`;
      res.length = 2;
      break;
    case '001':
      res.asmOperand = 'a{n}';
      res.jsOperand = 'task.s.a{n}[i]';
      res.length = 2;
      break;
    case '010':
      res.asmOperand = `(a{${l}_n})`;
      res.jsOperand = 'task.s.m[_4to1(task.s.a{n})+{i}-{s}]';
      res.length = 2;
      break;
    case '011':
      res.asmOperand = '(a{n})+';
      res.jsOperand = 'task.s.m[_4to1(task.s.a{n})+{i}-{s}]';
      res.ipi = true;
      res.length = 2;
      break;
    case '100':
      res.asmOperand = '-(a{n})';
      res.jsOperand = 'task.s.m[_4to1(task.s.a{n})+{i}-{s}]';
      res.ipd = true;
      res.length = 2;
      break;
    case '101':
      res.asmOperand = `{${l}_d}(a{${l}_n})`;
      res.jsOperand = 'task.s.m[_4to1(task.s.a{n})+{di}+{i}-{s}]';
      res.iwd = true;
      res.length = 2;
      break;
    case '110':
      res.asmOperand = '{d3}(a{n},{it}{in})';
      res.length = 2;
      break;
    case '111':
      switch (xn_bin) {
        case '000':
          res.asmOperand = '{d3}';
          res.jsOperand = 'task.s.m[{d}+{i}-{s}]';
          res.length = 4;
          break;
        case '001':
          res.asmOperand = '{d}';
          res.jsOperand = 'task.s.m[{d}+{i}-{s}]';
          res.length = 4;
          break;
        case '010':
          res.asmOperand = 'd16(pc)';
          res.length = 4;
          break;
        case '011':
          res.asmOperand = 'd8(pc,xn)';
          res.length = 4;
          break;
        case '100':
          res.asmOperand = '#imm';
          res.length = 4;
          break;
        default:
          res.asmOperand = '#imm';
          res.length = 4;
      }
      break;
  }
  return res;
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
