import { ITask } from 'stores/useTaskStore';
import {
  EnumArgSrcDst,
  EnumArgType,
  EnumASMType,
  EnumM68KOP,
  EnumOPAction,
  IExamineInstruction,
  IOperand,
} from '../IM68k';
import { EnumBit, EnumOpBit } from 'functions/dataHandling/IdataHandling';
import {
  bin2hex,
  combine2WordsInto1Long,
  int2hex,
  splitLongInto4Bytes,
} from 'functions/dataHandling/dataHandling';
import {
  argREG,
  argABW,
  argABL,
  IArgData,
  argI,
  argIPI,
  argIPD,
  argIWD,
} from './m68Args';

export const processXNXT = (
  l: 'src' | 'dst',
  xt_bin: string,
  xn_bin: string
) => {
  const res: IOperand = {
    argType: EnumArgType.UNKNOWN,
    asmOperand: '',
    jsOperand: '',
    length: 0,
  };

  switch (xt_bin) {
    case '000':
      res.argType = EnumArgType.REG;
      res.asmOperand = `d{${l}_n}`;
      res.jsOperand = `task.s.d{${l}_n}`;
      res.length = 2;
      break;
    case '001':
      res.argType = EnumArgType.REG;
      res.asmOperand = `a{${l}_n}`;
      res.jsOperand = 'task.s.a{n}[i]';
      res.length = 2;
      break;
    case '010':
      res.argType = EnumArgType.I;
      res.asmOperand = `(a{${l}_n})`;
      res.jsOperand = 'task.s.m[_4to1(task.s.a{n})+{i}-{s}]';
      res.length = 2;
      break;
    case '011':
      res.argType = EnumArgType.IPI;
      res.asmOperand = `(a{${l}_n})+`;
      res.jsOperand = 'task.s.m[_4to1(task.s.a{n})+{i}-{s}]';
      res.ipi = true;
      res.length = 2;
      break;
    case '100':
      res.argType = EnumArgType.IPD;
      res.asmOperand = `-(a{${l}_n})`;
      res.jsOperand = 'task.s.m[_4to1(task.s.a{n})+{i}-{s}]';
      res.ipd = true;
      res.length = 2;
      break;
    case '101':
      res.argType = EnumArgType.IWD;
      res.asmOperand = `{${l}_d}(a{${l}_n})`;
      res.jsOperand = 'task.s.m[_4to1(task.s.a{n})+{di}+{i}-{s}]';
      res.iwd = true;
      res.length = 2;
      break;
    case '110':
      res.argType = EnumArgType.IWDI;
      res.asmOperand = `{${l}_d}(a{${l}_n},{ir})`;
      res.length = 2;
      break;
    case '111':
      switch (xn_bin) {
        case '000':
          res.argType = EnumArgType.ABW;
          res.asmOperand = `{${l}_d}.w`;
          res.abw = true;
          res.jsOperand = 'task.s.m[{d}+{i}-{s}]';
          res.length = 4;
          break;
        case '001':
          res.argType = EnumArgType.ABL;
          res.asmOperand = `{${l}_d}.l`;
          res.abl = true;
          res.jsOperand = 'task.s.m[{d}+{i}-{s}]';
          res.length = 4;
          break;
        case '010':
          res.argType = EnumArgType.PCD;
          res.asmOperand = 'd16(pc)';
          res.length = 4;
          break;
        case '011':
          res.argType = EnumArgType.PCID;
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
    argSrcDst: calcArgDir(args),
    argArray: calcArgArray(args),
  };

  return result;
};

export const calcArgDir = (args: string) => {
  let state = EnumArgSrcDst.UNKNOWN;

  const Args = {
    /* Reg */
    REG_TO_REG: /[A-Za-z]+[0-9]+,[A-Za-z]+[0-9]+/i,
    REG_TO_ABW: /[A-Za-z]+[0-9]+,[0-9]+.w/i,
    REG_TO_ABL: /[A-Za-z]+[0-9]+,[0-9]+.l/i,
    REG_TO_I: /[A-Za-z]+[0-9]+,\(a[0-9]+\)/i,
    REG_TO_IPI: /[A-Za-z]+[0-9]+,\(a[0-9]+\)\+/i,
    REG_TO_IPD: /[A-Za-z]+[0-9]+,-\(a[0-9]+\)/i,
    REG_TO_IWD: /[A-Za-z]+[0-9]+,[0-9]+\(a[0-9]+\)/i,
    REG_TO_IWDI: /[A-Za-z]+[0-9]+,[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

    /* ABW */
    ABW_TO_REG: /[0-9]+\.w,[A-Za-z]+[0-9]+/i,
    ABW_TO_ABW: /[0-9]+\.w,[0-9]+\.w/i,
    ABW_TO_ABL: /[0-9]+\.w,[0-9]+\.l/i,
    ABW_TO_I: /[0-9]+.w,\(a[0-9]+\)/i,
    ABW_TO_IPI: /[0-9]+.w,\(a[0-9]+\)\+/i,
    ABW_TO_IPD: /[0-9]+.w,-\(a[0-9]+\)/i,
    ABW_TO_IWD: /[0-9]+.w,[0-9]+\(a[0-9]+\)/i,
    ABW_TO_IWDI: /[0-9]+.w,[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

    /* ABL */
    ABL_TO_REG: /[0-9]+\.l,[A-Za-z]+[0-9]+/i,
    ABL_TO_ABW: /[0-9]+\.l,[0-9]+\.w/i,
    ABL_TO_ABL: /[0-9]+\.l,[0-9]+\.l/i,
    ABL_TO_I: /[0-9]+.l,\(a[0-9]+\)/i,
    ABL_TO_IPI: /[0-9]+.l,\(a[0-9]+\)\+/i,
    ABL_TO_IPD: /[0-9]+.l,-\(a[0-9]+\)/i,
    ABL_TO_IWD: /[0-9]+.l,[0-9]+\(a[0-9]+\)/i,
    ABL_TO_IWDI: /[0-9]+.l,[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

    /* I */
    I_TO_REG: /\(a[0-9]+\),[A-Za-z]+[0-9]+/i,
    I_TO_ABW: /\(a[0-9]+\),[0-9]+.w/i,
    I_TO_ABL: /\(a[0-9]+\),[0-9]+.l/i,
    I_TO_I: /\(a[0-9]+\),\(a[0-9]+\)/i,
    I_TO_IPI: /\(a[0-9]+\),\(a[0-9]+\)\+/i,
    I_TO_IPD: /\(a[0-9]+\),-\(a[0-9]+\)/i,
    I_TO_IWD: /\(a[0-9]+\),[0-9]+\(a[0-9]+\)/i,
    I_TO_IWDI: /\(a[0-9]+\),[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

    /* IPI */
    IPI_TO_REG: /\(a[0-9]+\)\+,[A-Za-z]+[0-9]+/i,
    IPI_TO_ABW: /\(a[0-9]+\)\+,[0-9]+.w/i,
    IPI_TO_ABL: /\(a[0-9]+\)\+,[0-9]+.l/i,
    IPI_TO_I: /\(a[0-9]+\)\+,\([A-Za-z]+[0-9]+\)/i,
    IPI_TO_IPI: /\(a[0-9]+\)\+,\([A-Za-z]+[0-9]+\)\+/i,
    IPI_TO_IPD: /\(a[0-9]+\)\+,-\([A-Za-z]+[0-9]+\)/i,
    IPI_TO_IWD: /\(a[0-9]+\)\+,[0-9]+\(a[0-9]+\)/i,
    IPI_TO_IWDI: /\(a[0-9]+\)\+,[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

    /* IPD */
    IPD_TO_REG: /-\(a[0-9]+\),[A-Za-z]+[0-9]+/i,
    IPD_TO_ABW: /-\(a[0-9]+\),[0-9]+.w/i,
    IPD_TO_ABL: /-\(a[0-9]+\),[0-9]+.l/i,
    IPD_TO_I: /-\(a[0-9]+\),\(a[0-9]+\)/i,
    IPD_TO_IPI: /-\(a[0-9]+\),\(a[0-9]+\)\+/i,
    IPD_TO_IPD: /-\(a[0-9]+\),-\(a[0-9]+\)/i,
    IPD_TO_IWD: /-\(a[0-9]+\),[0-9]+\(a[0-9]+\)/i,
    IPD_TO_IWDI: /-\(a[0-9]+\),[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

    /* IWD */
    IWD_TO_REG: /[0-9]+\(a[0-9]+\),[A-Za-z]+[0-9]+/i,
    IWD_TO_ABW: /[0-9]+\(a[0-9]+\),[0-9]+.w/i,
    IWD_TO_ABL: /[0-9]+\(a[0-9]+\),[0-9]+.l/i,
    IWD_TO_I: /[0-9]+\(a[0-9]+\),\(a[0-9]+\)/i,
    IWD_TO_IPI: /[0-9]+\(a[0-9]+\),\(a[0-9]+\)\+/i,
    IWD_TO_IPD: /[0-9]+\(a[0-9]+\),-\(a[0-9]+\)/i,
    IWD_TO_IWD: /[0-9]+\(a[0-9]+\),[0-9]+\(a[0-9]+\)/i,
    IWD_TO_IWDI: /[0-9]+\(a[0-9]+\),[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

    /* IWDI */
    IWDI_TO_REG: /[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),[A-Za-z]+[0-9]+/i,
    IWDI_TO_ABW: /[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),[0-9]+.w/i,
    IWDI_TO_ABL: /[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),[0-9]+.l/i,
    IWDI_TO_I: /[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),\(a[0-9]+\)/i,
    IWDI_TO_IPI: /[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),\(a[0-9]+\)\+/i,
    IWDI_TO_IPD: /[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),-\(a[0-9]+\)/i,
    IWDI_TO_IWD: /[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),[0-9]+\(a[0-9]+\)/i,
    IWDI_TO_IWDI:
      /[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\),[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

    /* PCD */
    PCD_TO_REG: /[0-9]+\(pc\),[A-Za-z]+[0-9]+/i,
    PCD_TO_ABW: /[0-9]+\(pc\),[0-9]+.w/i,
    PCD_TO_ABL: /[0-9]+\(pc\),[0-9]+.l/i,
    PCD_TO_I: /[0-9]+\(pc\),\(a[0-9]+\)/i,
    PCD_TO_IPI: /[0-9]+\(pc\),\(a[0-9]+\)\+/i,
    PCD_TO_IPD: /[0-9]+\(pc\),-\(a[0-9]+\)/i,
    PCD_TO_IWD: /[0-9]+\(pc\),[0-9]+\(a[0-9]+\)/i,
    PCD_TO_IWDI: /[0-9]+\(pc\),[0-9]+\(a[0-9]+,[A-Za-z]+[0-9]+\)/i,

    /* PCID */
    PCID_TO_REG: /[0-9]+\(pc,[A-Za-z]+[0-9]+\),[A-Za-z]+[0-9]+/i,
    PCID_TO_ABW: /[0-9]+\(pc,[A-Za-z]+[0-9]+\),[0-9]+.w/i,
    PCID_TO_ABL: /[0-9]+\(pc,[A-Za-z]+[0-9]+\),[0-9]+.l/i,
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
  if (Args.REG_TO_ABL.test(args)) state = EnumArgSrcDst.REG_TO_ABL;
  if (Args.REG_TO_I.test(args)) state = EnumArgSrcDst.REG_TO_I;
  if (Args.REG_TO_IPI.test(args)) state = EnumArgSrcDst.REG_TO_IPI;
  if (Args.REG_TO_IPD.test(args)) state = EnumArgSrcDst.REG_TO_IPD;
  if (Args.REG_TO_IWD.test(args)) state = EnumArgSrcDst.REG_TO_IWD;
  if (Args.REG_TO_IWDI.test(args)) state = EnumArgSrcDst.REG_TO_IWDI;

  /* ABW */
  if (Args.ABW_TO_REG.test(args)) state = EnumArgSrcDst.ABW_TO_REG;
  if (Args.ABW_TO_ABW.test(args)) state = EnumArgSrcDst.ABW_TO_ABW;
  if (Args.ABW_TO_ABL.test(args)) state = EnumArgSrcDst.ABW_TO_ABL;
  if (Args.ABW_TO_I.test(args)) state = EnumArgSrcDst.ABW_TO_I;
  if (Args.ABW_TO_IPI.test(args)) state = EnumArgSrcDst.ABW_TO_IPI;
  if (Args.ABW_TO_IPD.test(args)) state = EnumArgSrcDst.ABW_TO_IPD;
  if (Args.ABW_TO_IWD.test(args)) state = EnumArgSrcDst.ABW_TO_IWD;
  if (Args.ABW_TO_IWDI.test(args)) state = EnumArgSrcDst.ABW_TO_IWDI;

  /* ABL */
  if (Args.ABL_TO_REG.test(args)) state = EnumArgSrcDst.ABL_TO_REG;
  if (Args.ABL_TO_ABW.test(args)) state = EnumArgSrcDst.ABL_TO_ABW;
  if (Args.ABL_TO_ABL.test(args)) state = EnumArgSrcDst.ABL_TO_ABL;
  if (Args.ABL_TO_I.test(args)) state = EnumArgSrcDst.ABL_TO_I;
  if (Args.ABL_TO_IPI.test(args)) state = EnumArgSrcDst.ABL_TO_IPI;
  if (Args.ABL_TO_IPD.test(args)) state = EnumArgSrcDst.ABL_TO_IPD;
  if (Args.ABL_TO_IWD.test(args)) state = EnumArgSrcDst.ABL_TO_IWD;
  if (Args.ABL_TO_IWDI.test(args)) state = EnumArgSrcDst.ABL_TO_IWDI;

  /* I */
  if (Args.I_TO_REG.test(args)) state = EnumArgSrcDst.I_TO_REG;
  if (Args.I_TO_ABW.test(args)) state = EnumArgSrcDst.I_TO_ABW;
  if (Args.I_TO_ABL.test(args)) state = EnumArgSrcDst.I_TO_ABL;
  if (Args.I_TO_I.test(args)) state = EnumArgSrcDst.I_TO_I;
  if (Args.I_TO_IPI.test(args)) state = EnumArgSrcDst.I_TO_IPI;
  if (Args.I_TO_IPD.test(args)) state = EnumArgSrcDst.I_TO_IPD;
  if (Args.I_TO_IWD.test(args)) state = EnumArgSrcDst.I_TO_IWD;
  if (Args.I_TO_IWDI.test(args)) state = EnumArgSrcDst.I_TO_IWDI;

  /* IPI */
  if (Args.IPI_TO_REG.test(args)) state = EnumArgSrcDst.IPI_TO_REG;
  if (Args.IPI_TO_ABW.test(args)) state = EnumArgSrcDst.IPI_TO_ABW;
  if (Args.IPI_TO_ABL.test(args)) state = EnumArgSrcDst.IPI_TO_ABL;
  if (Args.IPI_TO_I.test(args)) state = EnumArgSrcDst.IPI_TO_I;
  if (Args.IPI_TO_IPI.test(args)) state = EnumArgSrcDst.IPI_TO_IPI;
  if (Args.IPI_TO_IPD.test(args)) state = EnumArgSrcDst.IPI_TO_IPD;
  if (Args.IPI_TO_IWD.test(args)) state = EnumArgSrcDst.IPI_TO_IWD;
  if (Args.IPI_TO_IWDI.test(args)) state = EnumArgSrcDst.IPI_TO_IWDI;

  /* IPD */
  if (Args.IPD_TO_REG.test(args)) state = EnumArgSrcDst.IPD_TO_REG;
  if (Args.IPD_TO_ABW.test(args)) state = EnumArgSrcDst.IPD_TO_ABW;
  if (Args.IPD_TO_ABL.test(args)) state = EnumArgSrcDst.IPD_TO_ABL;
  if (Args.IPD_TO_I.test(args)) state = EnumArgSrcDst.IPD_TO_I;
  if (Args.IPD_TO_IPI.test(args)) state = EnumArgSrcDst.IPD_TO_IPI;
  if (Args.IPD_TO_IPD.test(args)) state = EnumArgSrcDst.IPD_TO_IPD;
  if (Args.IPD_TO_IWD.test(args)) state = EnumArgSrcDst.IPD_TO_IWD;
  if (Args.IPD_TO_IWDI.test(args)) state = EnumArgSrcDst.IPD_TO_IWDI;

  /* IWD */
  if (Args.IWD_TO_REG.test(args)) state = EnumArgSrcDst.IWD_TO_REG;
  if (Args.IWD_TO_ABW.test(args)) state = EnumArgSrcDst.IWD_TO_ABW;
  if (Args.IWD_TO_ABL.test(args)) state = EnumArgSrcDst.IWD_TO_ABL;
  if (Args.IWD_TO_I.test(args)) state = EnumArgSrcDst.IWD_TO_I;
  if (Args.IWD_TO_IPI.test(args)) state = EnumArgSrcDst.IWD_TO_IPI;
  if (Args.IWD_TO_IPD.test(args)) state = EnumArgSrcDst.IWD_TO_IPD;
  if (Args.IWD_TO_IWD.test(args)) state = EnumArgSrcDst.IWD_TO_IWD;
  if (Args.IWD_TO_IWDI.test(args)) state = EnumArgSrcDst.IWD_TO_IWDI;

  /* IWDI */
  if (Args.IWDI_TO_REG.test(args)) state = EnumArgSrcDst.IWDI_TO_REG;
  if (Args.IWDI_TO_ABW.test(args)) state = EnumArgSrcDst.IWDI_TO_ABW;
  if (Args.IWDI_TO_ABL.test(args)) state = EnumArgSrcDst.IWDI_TO_ABL;
  if (Args.IWDI_TO_I.test(args)) state = EnumArgSrcDst.IWDI_TO_I;
  if (Args.IWDI_TO_IPI.test(args)) state = EnumArgSrcDst.IWDI_TO_IPI;
  if (Args.IWDI_TO_IPD.test(args)) state = EnumArgSrcDst.IWDI_TO_IPD;
  if (Args.IWDI_TO_IWD.test(args)) state = EnumArgSrcDst.IWDI_TO_IWD;
  if (Args.IWDI_TO_IWDI.test(args)) state = EnumArgSrcDst.IWDI_TO_IWDI;

  /* PCD */
  if (Args.PCD_TO_REG.test(args)) state = EnumArgSrcDst.PCD_TO_REG;
  if (Args.PCD_TO_ABW.test(args)) state = EnumArgSrcDst.PCD_TO_ABW;
  if (Args.PCD_TO_ABL.test(args)) state = EnumArgSrcDst.PCD_TO_ABL;
  if (Args.PCD_TO_I.test(args)) state = EnumArgSrcDst.PCD_TO_I;
  if (Args.PCD_TO_IPI.test(args)) state = EnumArgSrcDst.PCD_TO_IPI;
  if (Args.PCD_TO_IPD.test(args)) state = EnumArgSrcDst.PCD_TO_IPD;
  if (Args.PCD_TO_IWD.test(args)) state = EnumArgSrcDst.PCD_TO_IWD;
  if (Args.PCD_TO_IWDI.test(args)) state = EnumArgSrcDst.PCD_TO_IWDI;

  /* PCID */
  if (Args.PCID_TO_REG.test(args)) state = EnumArgSrcDst.PCID_TO_REG;
  if (Args.PCID_TO_ABW.test(args)) state = EnumArgSrcDst.PCID_TO_ABW;
  if (Args.PCID_TO_ABL.test(args)) state = EnumArgSrcDst.PCID_TO_ABL;
  if (Args.PCID_TO_I.test(args)) state = EnumArgSrcDst.PCID_TO_I;
  if (Args.PCID_TO_IPI.test(args)) state = EnumArgSrcDst.PCID_TO_IPI;
  if (Args.PCID_TO_IPD.test(args)) state = EnumArgSrcDst.PCID_TO_IPD;
  if (Args.PCID_TO_IWD.test(args)) state = EnumArgSrcDst.PCID_TO_IWD;
  if (Args.PCID_TO_IWDI.test(args)) state = EnumArgSrcDst.PCID_TO_IWDI;

  return state;
};

export const calcArgArray = (args: string) => {
  const a = args
    .replaceAll(',', ';')
    .replaceAll('(', ';')
    .replaceAll(')', ';')
    .split(';');

  let b: string[] = [];
  a.forEach((e) => {
    if (e.length > 0) {
      b.push(e);
    }
  });

  return b;
};

export const fillArgData = (
  argDir: string,
  src: IOperand,
  dst: IOperand,
  xnSrcN: string,
  xnDstN: string,
  dataW: string[],
  setting?: { verbose: boolean }
) => {
  let w: number[] = [];
  let wh: string[] = [];
  let l: number[] = [];
  let lh: string[] = [];
  let b: number[] = [];
  let bh: string[] = [];

  w.push(parseInt(dataW[1], 2));
  w.push(parseInt(dataW[2], 2));
  w.push(parseInt(dataW[3], 2));
  w.push(parseInt(dataW[4], 2));

  l.push(combine2WordsInto1Long(w[0], w[1]));
  l.push(combine2WordsInto1Long(w[1], w[2]));
  l.push(combine2WordsInto1Long(w[2], w[3]));

  b = splitLongInto4Bytes(l[0]).concat(splitLongInto4Bytes(l[1]));

  /* Word */
  for (let i = 0; i < 4; i++) {
    wh.push(bin2hex(dataW[i + 1], 4));
  }

  /* Long */
  for (let i = 0; i < 3; i++) {
    lh.push(bin2hex(dataW[i + 1] + dataW[i + 2], 8));
  }

  /* Byte */
  b.forEach((e) => {
    bh.push(int2hex(e, 2));
  });

  const argData: IArgData = { w: wh, l: lh, b: bh };

  if (setting?.verbose) {
    console.log(argData);
  }

  let args = '';
  let a: string[] = [
    argREG(argDir, argData, src, dst, xnSrcN, xnDstN),
    argABW(argDir, argData, src, dst, xnSrcN, xnDstN),
    argABL(argDir, argData, src, dst, xnSrcN, xnDstN),
    argI(argDir, argData, src, dst, xnSrcN, xnDstN),
    argIPI(argDir, argData, src, dst, xnSrcN, xnDstN),
    argIPD(argDir, argData, src, dst, xnSrcN, xnDstN),
    argIWD(argDir, argData, src, dst, xnSrcN, xnDstN),
  ];
  a.forEach((e) => {
    if (e !== '') {
      args = e;
    }
  });
  console.log(args);

  return args;
};

export const IWDI_B: { [key: string]: string } = {
  '00000000': 'd0',
  '00010000': 'd1',
  '00100000': 'd2',
  '00110000': 'd3',
  '01000000': 'd4',
  '01010000': 'd5',
  '01100000': 'd6',
  '01110000': 'd7',
  '10000000': 'a0',
  '10010000': 'a1',
  '10100000': 'a2',
  '10110000': 'a3',
  '11000000': 'a4',
  '11010000': 'a5',
  '11100000': 'a6',
  '11110000': 'a7',
};
