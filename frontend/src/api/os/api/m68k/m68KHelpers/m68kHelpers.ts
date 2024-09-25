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
  argIWDI,
  argPCD,
  argPCDI,
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
          res.asmOperand = `{${l}_pc}(pc)`;
          res.length = 4;
          break;
        case '011':
          res.argType = EnumArgType.PCID;
          res.asmOperand = `{${l}_pc}(pc,{${l}_n})`;
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

  const rx = (template: string, verbose?: boolean) => {
    let result = '';
    for (let i = 0; i < template.length; i++) {
      const ch = template[i];
      switch (ch) {
        case 'c':
          result += '[A-Za-z0-9]';
          break;
        case 'n':
          result += '\\d';
          break;
        case '.':
          result += '\\.';
          break;
        case '(':
          result += '\\(';
          break;
        case ')':
          result += '\\)';
          break;
        case '+':
          result += '\\+';
          break;
        case '-':
          result += '\\-';
          break;
        default:
          result += ch;
      }
    }
    verbose && console.log(result);
    return new RegExp(result);
  };

  const REG = 'cn';
  const ABW = '0xcccc.w';
  const ABL = '0xcccccccc.l';
  const I = '(cn)';
  const IPI = '(cn)+';
  const IPD = '-(cn)';
  const IWD = '0xcccc(cn)';
  const IWDI = '0xcc(cn,cn)';
  const PCD = '0xcccc(pc)';
  const PCID = '0xcc(pc,cn)';
  const TO = ',';

  const Args = {
    /* Reg */
    REG_TO_REG: rx(`${REG}${TO}${REG}`),
    REG_TO_ABW: rx(`${REG}${TO}${ABW}`),
    REG_TO_ABL: rx(`${REG}${TO}${ABL}`),
    REG_TO_I: rx(`${REG}${TO}${I}`),
    REG_TO_IPI: rx(`${REG}${TO}${IPI}`),
    REG_TO_IPD: rx(`${REG}${TO}${IPD}`),
    REG_TO_IWD: rx(`${REG}${TO}${IWD}`),
    REG_TO_IWDI: rx(`${REG}${TO}${IWDI}`),

    /* ABW */
    ABW_TO_REG: rx(`${ABW}${TO}${REG}`),
    ABW_TO_ABW: rx(`${ABW}${TO}${ABW}`),
    ABW_TO_ABL: rx(`${ABW}${TO}${ABL}`),
    ABW_TO_I: rx(`${ABW}${TO}${I}`),
    ABW_TO_IPI: rx(`${ABW}${TO}${IPI}`),
    ABW_TO_IPD: rx(`${ABW}${TO}${IPD}`),
    ABW_TO_IWD: rx(`${ABW}${TO}${IWD}`),
    ABW_TO_IWDI: rx(`${ABW}${TO}${IWDI}`),

    /* ABL */
    ABL_TO_REG: rx(`${ABL}${TO}${REG}`),
    ABL_TO_ABW: rx(`${ABL}${TO}${ABW}`),
    ABL_TO_ABL: rx(`${ABL}${TO}${ABL}`),
    ABL_TO_I: rx(`${ABL}${TO}${I}`),
    ABL_TO_IPI: rx(`${ABL}${TO}${IPI}`),
    ABL_TO_IPD: rx(`${ABL}${TO}${IPD}`),
    ABL_TO_IWD: rx(`${ABL}${TO}${IWD}`),
    ABL_TO_IWDI: rx(`${ABL}${TO}${IWDI}`),

    /* I */
    I_TO_REG: rx(`${I}${TO}${REG}`),
    I_TO_ABW: rx(`${I}${TO}${ABW}`),
    I_TO_ABL: rx(`${I}${TO}${ABL}`),
    I_TO_I: rx(`${I}${TO}${I}`),
    I_TO_IPI: rx(`${I}${TO}${IPI}`),
    I_TO_IPD: rx(`${I}${TO}${IPD}`),
    I_TO_IWD: rx(`${I}${TO}${IWD}`),
    I_TO_IWDI: rx(`${I}${TO}${IWDI}`),

    /* IPI */
    IPI_TO_REG: rx(`${IPI}${TO}${REG}`),
    IPI_TO_ABW: rx(`${IPI}${TO}${ABW}`),
    IPI_TO_ABL: rx(`${IPI}${TO}${ABL}`),
    IPI_TO_I: rx(`${IPI}${TO}${I}`),
    IPI_TO_IPI: rx(`${IPI}${TO}${IPI}`),
    IPI_TO_IPD: rx(`${IPI}${TO}${IPD}`),
    IPI_TO_IWD: rx(`${IPI}${TO}${IWD}`),
    IPI_TO_IWDI: rx(`${IPI}${TO}${IWDI}`),

    /* IPD */
    IPD_TO_REG: rx(`${IPD}${TO}${REG}`),
    IPD_TO_ABW: rx(`${IPD}${TO}${ABW}`),
    IPD_TO_ABL: rx(`${IPD}${TO}${ABL}`),
    IPD_TO_I: rx(`${IPD}${TO}${I}`),
    IPD_TO_IPI: rx(`${IPD}${TO}${IPI}`),
    IPD_TO_IPD: rx(`${IPD}${TO}${IPD}`),
    IPD_TO_IWD: rx(`${IPD}${TO}${IWD}`),
    IPD_TO_IWDI: rx(`${IPD}${TO}${IWDI}`),

    /* IWD */
    IWD_TO_REG: rx(`${IWD}${TO}${REG}`),
    IWD_TO_ABW: rx(`${IWD}${TO}${ABW}`),
    IWD_TO_ABL: rx(`${IWD}${TO}${ABL}`),
    IWD_TO_I: rx(`${IWD}${TO}${I}`),
    IWD_TO_IPI: rx(`${IWD}${TO}${IPI}`),
    IWD_TO_IPD: rx(`${IWD}${TO}${IPD}`),
    IWD_TO_IWD: rx(`${IWD}${TO}${IWD}`),
    IWD_TO_IWDI: rx(`${IWD}${TO}${IWDI}`),

    /* IWDI */
    IWDI_TO_REG: rx(`${IWDI}${TO}${REG}`),
    IWDI_TO_ABW: rx(`${IWDI}${TO}${ABW}`),
    IWDI_TO_ABL: rx(`${IWDI}${TO}${ABL}`),
    IWDI_TO_I: rx(`${IWDI}${TO}${I}`),
    IWDI_TO_IPI: rx(`${IWDI}${TO}${IPI}`),
    IWDI_TO_IPD: rx(`${IWDI}${TO}${IPD}`),
    IWDI_TO_IWD: rx(`${IWDI}${TO}${IWD}`),
    IWDI_TO_IWDI: rx(`${IWDI}${TO}${IWDI}`),

    /* PCD */
    PCD_TO_REG: rx(`${PCD}${TO}${REG}`),
    PCD_TO_ABW: rx(`${PCD}${TO}${ABW}`),
    PCD_TO_ABL: rx(`${PCD}${TO}${ABL}`),
    PCD_TO_I: rx(`${PCD}${TO}${I}`),
    PCD_TO_IPI: rx(`${PCD}${TO}${IPI}`),
    PCD_TO_IPD: rx(`${PCD}${TO}${IPD}`),
    PCD_TO_IWD: rx(`${PCD}${TO}${IWD}`),
    PCD_TO_IWDI: rx(`${PCD}${TO}${IWDI}`),

    /* PCID */
    PCID_TO_REG: rx(`${PCID}${TO}${REG}`),
    PCID_TO_ABW: rx(`${PCID}${TO}${ABW}`),
    PCID_TO_ABL: rx(`${PCID}${TO}${ABL}`),
    PCID_TO_I: rx(`${PCID}${TO}${I}`),
    PCID_TO_IPI: rx(`${PCID}${TO}${IPI}`),
    PCID_TO_IPD: rx(`${PCID}${TO}${IPD}`),
    PCID_TO_IWD: rx(`${PCID}${TO}${IWD}`),
    PCID_TO_IWDI: rx(`${PCID}${TO}${IWDI}`),
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

  const b: string[] = [];
  a.forEach((e) => {
    if (e.length > 0) {
      b.push(e);
    }
  });

  return b;
};

export const fillArgData = (
  task: ITask,
  argDir: string,
  src: IOperand,
  dst: IOperand,
  xnSrcN: string,
  xnDstN: string,
  dataW: string[],
  setting?: { verbose: boolean }
) => {
  const w: number[] = [];
  const wh: string[] = [];
  const l: number[] = [];
  const lh: string[] = [];
  let b: number[] = [];
  const bh: string[] = [];

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
  const a: string[] = [
    argREG(argDir, argData, src, dst, xnSrcN, xnDstN),
    argABW(argDir, argData, src, dst, xnSrcN, xnDstN),
    argABL(argDir, argData, src, dst, xnSrcN, xnDstN),
    argI(argDir, argData, src, dst, xnSrcN, xnDstN),
    argIPI(argDir, argData, src, dst, xnSrcN, xnDstN),
    argIPD(argDir, argData, src, dst, xnSrcN, xnDstN),
    argIWD(argDir, argData, src, dst, xnSrcN, xnDstN),
    argIWDI(argDir, argData, src, dst, xnSrcN, xnDstN),
    argPCD(task, argDir, argData, src, dst, xnSrcN, xnDstN),
    argPCDI(task, argDir, argData, src, dst, xnSrcN, xnDstN),
  ];
  a.forEach((e) => {
    if (e !== '') {
      args = e;
    }
  });

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
