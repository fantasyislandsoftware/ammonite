import { ITask } from 'stores/useTaskStore';
import {
  EnumArgSrcDst,
  EnumASMType,
  EnumM68KOP,
  EnumOPAction,
  IExamineInstruction,
  IOperand,
} from '../IM68k';
import { EnumBit, EnumOpBit } from 'functions/dataHandling/IdataHandling';

export const processXNXT = (
  l: 'src' | 'dst',
  xt_bin: string,
  xn_bin: string
) => {
  const res: IOperand = {
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
      res.asmOperand = `a{${l}_n}`;
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
          res.asmOperand = `{${l}_d}`;
          res.ABS = true;
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

export const examineInstruction = (i: string) => {
  const allA = i.split(' ');
  const instA = allA[0].split('.');

  const inst = instA[0];
  const opBit = instA[1];
  const args = allA[1];

  let opBitN = EnumOpBit.BYTE;
  switch (opBit) {
    case 'b':
      opBitN = EnumOpBit.BYTE;
      break;
    case 'w':
      opBitN = EnumOpBit.WORD;
      break;
    case 'l':
      opBitN = EnumOpBit.LONG;
      break;
  }

  const result: IExamineInstruction = {
    inst: inst,
    opBit: opBitN,
    args: args,
    argSrcDst: calcArgs(args),
  };

  return result;
};

export const calcArgs = (args: string) => {
  let state = EnumArgSrcDst.UNKNOWN;

  const Args = {
    /* Reg */
    REG_TO_REG: /[A-Za-z]+[0-9]+,[A-Za-z]+[0-9]+/i,
    REG_TO_ABW: /[A-Za-z]+[0-9]+,[0-9]+/i,
    REG_TO_I: /[A-Za-z]+[0-9]+,\(a[0-9]+\)/i,
    REG_TO_IPI: /[A-Za-z]+[0-9]+,\(a[0-9]+\)\+/i,
    REG_TO_IPD: /[A-Za-z]+[0-9]+,-\(a[0-9]+\)/i,
    REG_TO_IWD: /[A-Za-z]+[0-9]+,[0-9]+\(a[0-9]+\)/i,
    REG_TO_IWDI: /[A-Za-z]+[0-9]+,[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

    /* Abs */
    ABW_TO_REG: /[0-9]+\.w,[A-Za-z]+[0-9]+/i,
    ABW_TO_ABW: /[0-9]+\.w,[0-9]+\.w/i,
    ABW_TO_I: /[0-9]+.w,\(a[0-9]+\)/i,
    ABW_TO_IPI: /[0-9]+.w,\(a[0-9]+\)\+/i,
    ABW_TO_IPD: /[0-9]+.w,-\(a[0-9]+\)/i,
    ABW_TO_IWD: /[0-9]+.w,[0-9]+\(a[0-9]+\)/i,
    ABW_TO_IWDI: /[0-9]+.w,[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

    /* I */
    I_TO_REG: /\(a[0-9]+\),[A-Za-z]+[0-9]+/i,
    I_TO_ABW: /\(a[0-9]+\),[0-9]+.w/i,
    I_TO_I: /\(a[0-9]+\),\(a[0-9]+\)/i,
    I_TO_IPI: /\(a[0-9]+\),\(a[0-9]+\)\+/i,
    I_TO_IPD: /\(a[0-9]+\),-\(a[0-9]+\)/i,
    I_TO_IWD: /\(a[0-9]+\),[0-9]+\(a[0-9]+\)/i,
    I_TO_IWDI: /\(a[0-9]+\),[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

    /* IPI */
    IPI_TO_REG: /\(a[0-9]+\)\+,[A-Za-z]+[0-9]+/i,
    IPI_TO_ABW: /\(a[0-9]+\)\+,[0-9]+/i,
    IPI_TO_I: /\(a[0-9]+\)\+,\([A-Za-z]+[0-9]+\)/i,
    IPI_TO_IPI: /\(a[0-9]+\)\+,\([A-Za-z]+[0-9]+\)\+/i,
    IPI_TO_IPD: /\(a[0-9]+\)\+,-\([A-Za-z]+[0-9]+\)/i,
    IPI_TO_IWD: /\(a[0-9]+\)\+,[0-9]+\(a[0-9]+\)/i,
    IPI_TO_IWDI: /\(a[0-9]+\)\+,[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

    /* IPD */
    IPD_TO_REG: /-\(a[0-9]+\),[A-Za-z]+[0-9]+/i,
    IPD_TO_ABW: /-\(a[0-9]+\),[0-9]+.w/i,
    IPD_TO_I: /-\(a[0-9]+\),\(a[0-9]+\)/i,
    IPD_TO_IPI: /-\(a[0-9]+\),\(a[0-9]+\)\+/i,
    IPD_TO_IPD: /-\(a[0-9]+\),-\(a[0-9]+\)/i,
    IPD_TO_IWD: /-\(a[0-9]+\),[0-9]+\(a[0-9]+\)/i,
    IPD_TO_IWDI: /-\(a[0-9]+\),[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

    /* IWD */
    IWD_TO_REG: /[0-9]+\(a[0-9]+\),[A-Za-z]+[0-9]+/i,
    IWD_TO_ABW: /[0-9]+\(a[0-9]+\),[0-9]+/i,
    IWD_TO_I: /[0-9]+\(a[0-9]+\),\(a[0-9]+\)/i,
    IWD_TO_IPI: /[0-9]+\(a[0-9]+\),\(a[0-9]+\)\+/i,
    IWD_TO_IPD: /[0-9]+\(a[0-9]+\),-\(a[0-9]+\)/i,
    IWD_TO_IWD: /[0-9]+\(a[0-9]+\),[0-9]+\(a[0-9]+\)/i,
    IWD_TO_IWDI: /[0-9]+\(a[0-9]+\),[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

    /* IWDI */
    IWDI_TO_REG: /[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),[A-Za-z]+[0-9]+/i,
    IWDI_TO_ABW: /[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),[0-9]+/i,
    IWDI_TO_I: /[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),\(a[0-9]+\)/i,
    IWDI_TO_IPI: /[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),\(a[0-9]+\)\+/i,
    IWDI_TO_IPD: /[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),-\(a[0-9]+\)/i,
    IWDI_TO_IWD: /[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),[0-9]+\(a[0-9]+\)/i,
    IWDI_TO_IWDI:
      /[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

    /* PCD */
    PCD_TO_REG: /[0-9]+\(pc\),[A-Za-z]+[0-9]+/i,
    PCD_TO_ABW: /[0-9]+\(pc\),[0-9]+/i,
    PCD_TO_I: /[0-9]+\(pc\),\(a[0-9]+\)/i,
    PCD_TO_IPI: /[0-9]+\(pc\),\(a[0-9]+\)\+/i,
    PCD_TO_IPD: /[0-9]+\(pc\),-\(a[0-9]+\)/i,
    PCD_TO_IWD: /[0-9]+\(pc\),[0-9]+\(a[0-9]+\)/i,
    PCD_TO_IWDI: /[0-9]+\(pc\),[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

    /* PCID */
    PCID_TO_REG: /[0-9]+\(pc,[A-Za-z]+[0-9]+\),[A-Za-z]+[0-9]+/i,
    PCID_TO_ABW: /[0-9]+\(pc,[A-Za-z]+[0-9]+\),[0-9]+/i,
    PCID_TO_I: /[0-9]+\(pc,[A-Za-z]+[0-9]+\),\(a[0-9]+\)/i,
    PCID_TO_IPI: /[0-9]+\(pc,[A-Za-z]+[0-9]+\),\(a[0-9]+\)\+/i,
    PCID_TO_IPD: /[0-9]+\(pc,[A-Za-z]+[0-9]+\),-\(a[0-9]+\)/i,
    PCID_TO_IWD: /[0-9]+\(pc,[A-Za-z]+[0-9]+\),[0-9]+\(a[0-9]+\)/i,
    PCID_TO_IWDI:
      /[0-9]+\(pc,[A-Za-z]+[0-9]+\),[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,
  };

  /* Reg */
  if (Args.REG_TO_REG.test(args)) state = EnumArgSrcDst.REG_TO_REG;
  if (Args.REG_TO_ABW.test(args)) state = EnumArgSrcDst.REG_TO_ABW;
  if (Args.REG_TO_I.test(args)) state = EnumArgSrcDst.REG_TO_I;
  if (Args.REG_TO_IPI.test(args)) state = EnumArgSrcDst.REG_TO_IPI;
  if (Args.REG_TO_IPD.test(args)) state = EnumArgSrcDst.REG_TO_IPD;
  if (Args.REG_TO_IWD.test(args)) state = EnumArgSrcDst.REG_TO_IWD;
  if (Args.REG_TO_IWDI.test(args)) state = EnumArgSrcDst.REG_TO_IWDI;

  /* Abs */
  if (Args.ABW_TO_REG.test(args)) state = EnumArgSrcDst.ABW_TO_REG;
  if (Args.ABW_TO_ABW.test(args)) state = EnumArgSrcDst.ABW_TO_ABW;
  if (Args.ABW_TO_I.test(args)) state = EnumArgSrcDst.ABW_TO_I;
  if (Args.ABW_TO_IPI.test(args)) state = EnumArgSrcDst.ABW_TO_IPI;
  if (Args.ABW_TO_IPD.test(args)) state = EnumArgSrcDst.ABW_TO_IPD;
  if (Args.ABW_TO_IWD.test(args)) state = EnumArgSrcDst.ABW_TO_IWD;
  if (Args.ABW_TO_IWDI.test(args)) state = EnumArgSrcDst.ABW_TO_IWDI;

  /* I */
  if (Args.I_TO_REG.test(args)) state = EnumArgSrcDst.I_TO_REG;
  if (Args.I_TO_ABW.test(args)) state = EnumArgSrcDst.I_TO_ABW;
  if (Args.I_TO_I.test(args)) state = EnumArgSrcDst.I_TO_I;
  if (Args.I_TO_IPI.test(args)) state = EnumArgSrcDst.I_TO_IPI;
  if (Args.I_TO_IPD.test(args)) state = EnumArgSrcDst.I_TO_IPD;
  if (Args.I_TO_IWD.test(args)) state = EnumArgSrcDst.I_TO_IWD;
  if (Args.I_TO_IWDI.test(args)) state = EnumArgSrcDst.I_TO_IWDI;

  /* IPI */
  if (Args.IPI_TO_REG.test(args)) state = EnumArgSrcDst.IPI_TO_REG;
  if (Args.IPI_TO_ABW.test(args)) state = EnumArgSrcDst.IPI_TO_ABW;
  if (Args.IPI_TO_I.test(args)) state = EnumArgSrcDst.IPI_TO_I;
  if (Args.IPI_TO_IPI.test(args)) state = EnumArgSrcDst.IPI_TO_IPI;
  if (Args.IPI_TO_IPD.test(args)) state = EnumArgSrcDst.IPI_TO_IPD;
  if (Args.IPI_TO_IWD.test(args)) state = EnumArgSrcDst.IPI_TO_IWD;
  if (Args.IPI_TO_IWDI.test(args)) state = EnumArgSrcDst.IPI_TO_IWDI;

  /* IPD */
  if (Args.IPD_TO_REG.test(args)) state = EnumArgSrcDst.IPD_TO_REG;
  if (Args.IPD_TO_ABW.test(args)) state = EnumArgSrcDst.IPD_TO_ABW;
  if (Args.IPD_TO_I.test(args)) state = EnumArgSrcDst.IPD_TO_I;
  if (Args.IPD_TO_IPI.test(args)) state = EnumArgSrcDst.IPD_TO_IPI;
  if (Args.IPD_TO_IPD.test(args)) state = EnumArgSrcDst.IPD_TO_IPD;
  if (Args.IPD_TO_IWD.test(args)) state = EnumArgSrcDst.IPD_TO_IWD;
  if (Args.IPD_TO_IWDI.test(args)) state = EnumArgSrcDst.IPD_TO_IWDI;

  /* IWD */
  if (Args.IWD_TO_REG.test(args)) state = EnumArgSrcDst.IWD_TO_REG;
  if (Args.IWD_TO_ABW.test(args)) state = EnumArgSrcDst.IWD_TO_ABW;
  if (Args.IWD_TO_I.test(args)) state = EnumArgSrcDst.IWD_TO_I;
  if (Args.IWD_TO_IPI.test(args)) state = EnumArgSrcDst.IWD_TO_IPI;
  if (Args.IWD_TO_IPD.test(args)) state = EnumArgSrcDst.IWD_TO_IPD;
  if (Args.IWD_TO_IWD.test(args)) state = EnumArgSrcDst.IWD_TO_IWD;
  if (Args.IWD_TO_IWDI.test(args)) state = EnumArgSrcDst.IWD_TO_IWDI;

  /* IWDI */
  if (Args.IWDI_TO_REG.test(args)) state = EnumArgSrcDst.IWDI_TO_REG;
  if (Args.IWDI_TO_ABW.test(args)) state = EnumArgSrcDst.IWDI_TO_ABW;
  if (Args.IWDI_TO_I.test(args)) state = EnumArgSrcDst.IWDI_TO_I;
  if (Args.IWDI_TO_IPI.test(args)) state = EnumArgSrcDst.IWDI_TO_IPI;
  if (Args.IWDI_TO_IPD.test(args)) state = EnumArgSrcDst.IWDI_TO_IPD;
  if (Args.IWDI_TO_IWD.test(args)) state = EnumArgSrcDst.IWDI_TO_IWD;
  if (Args.IWDI_TO_IWDI.test(args)) state = EnumArgSrcDst.IWDI_TO_IWDI;

  /* PCD */
  if (Args.PCD_TO_REG.test(args)) state = EnumArgSrcDst.PCD_TO_REG;
  if (Args.PCD_TO_ABW.test(args)) state = EnumArgSrcDst.PCD_TO_ABW;
  if (Args.PCD_TO_I.test(args)) state = EnumArgSrcDst.PCD_TO_I;
  if (Args.PCD_TO_IPI.test(args)) state = EnumArgSrcDst.PCD_TO_IPI;
  if (Args.PCD_TO_IPD.test(args)) state = EnumArgSrcDst.PCD_TO_IPD;
  if (Args.PCD_TO_IWD.test(args)) state = EnumArgSrcDst.PCD_TO_IWD;
  if (Args.PCD_TO_IWDI.test(args)) state = EnumArgSrcDst.PCD_TO_IWDI;

  /* PCID */
  if (Args.PCID_TO_REG.test(args)) state = EnumArgSrcDst.PCID_TO_REG;
  if (Args.PCID_TO_ABW.test(args)) state = EnumArgSrcDst.PCID_TO_ABW;
  if (Args.PCID_TO_I.test(args)) state = EnumArgSrcDst.PCID_TO_I;
  if (Args.PCID_TO_IPI.test(args)) state = EnumArgSrcDst.PCID_TO_IPI;
  if (Args.PCID_TO_IPD.test(args)) state = EnumArgSrcDst.PCID_TO_IPD;
  if (Args.PCID_TO_IWD.test(args)) state = EnumArgSrcDst.PCID_TO_IWD;
  if (Args.PCID_TO_IWDI.test(args)) state = EnumArgSrcDst.PCID_TO_IWDI;

  return state;
};
