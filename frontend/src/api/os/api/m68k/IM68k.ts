import { EnumOpBit } from 'functions/dataHandling/IdataHandling';

export enum EnumASMType {
  ABW_W = 'ABW.w',
  ABW_L = 'ABW.l',
  DREG = 'dreg',
  AREG = 'areg',
  IMM = 'imm',
  IND = 'ind',
  UNKNOWN = '?',
}

/*export const bitSize = {
  8: 2,
  16: 4,
  32: 8,
};*/

export enum EnumM68KOP {
  MOVE = 'move',
  BRA = 'bra',
  RTS = 'rts',
  NOP = 'nop',
  NC = 'nc',
  UNKNOWN = 'unknown',
}

export interface IM68KArg {
  t: string;
  v: string | number;
}

export enum EnumOPAction {
  INC = 'inc',
  DEC = 'dec',
  DIS = 'dis',
}

export enum EnumOpSizeBin {
  B = '01',
  W = '11',
  L = '10',
}

export enum EnumLOC2BIN {
  D = '000',
  M = '111',
  I = '010',
  IPI = '011',
  IPD = '100',
  IWD = '101',
  IWDI = '110',
}

export enum EnumLOCD2BIN {
  ABW_W = '000',
  ABW_L = '001',
}

export interface IOperand {
  asmOperand: string;
  abw?: boolean;
  abl?: boolean;
  ipi?: boolean;
  ipd?: boolean;
  iwd?: boolean;
  argType: EnumArgType;
}

export enum EnumArgType {
  UNKNOWN = 'UNKNOWN',
  REG = 'REG',
  ABW = 'ABW',
  ABL = 'ABL',
  I = 'I',
  IPI = 'IPI',
  IPD = 'IPD',
  IWD = 'IWD',
  IWDI = 'IWDI',
  PCD = 'PCD',
  PCID = 'PCID',
  IMM = 'IMM',
}

export enum EnumArgSrcDst {
  /* Unknowm */
  UNKNOWN = 'UNKNOWN',

  /* Reg */
  REG_TO_REG = 'REG_TO_REG',
  REG_TO_ABW = 'REG_TO_ABW',
  REG_TO_ABL = 'REG_TO_ABL',
  REG_TO_I = 'REG_TO_I',
  REG_TO_IPI = 'REG_TO_IPI',
  REG_TO_IPD = 'REG_TO_IPD',
  REG_TO_IWD = 'REG_TO_IWD',
  REG_TO_IWDI = 'REG_TO_IWDI',

  /* ABW */
  ABW_TO_REG = 'ABW_TO_REG',
  ABW_TO_ABW = 'ABW_TO_ABW',
  ABW_TO_ABL = 'ABW_TO_ABL',
  ABW_TO_I = 'ABW_TO_I',
  ABW_TO_IPI = 'ABW_TO_IPI',
  ABW_TO_IPD = 'ABW_TO_IPD',
  ABW_TO_IWD = 'ABW_TO_IWD',
  ABW_TO_IWDI = 'ABW_TO_IWDI',

  /* ABL */
  ABL_TO_REG = 'ABL_TO_REG',
  ABL_TO_ABW = 'ABL_TO_ABW',
  ABL_TO_ABL = 'ABL_TO_ABL',
  ABL_TO_I = 'ABL_TO_I',
  ABL_TO_IPI = 'ABL_TO_IPI',
  ABL_TO_IPD = 'ABL_TO_IPD',
  ABL_TO_IWD = 'ABL_TO_IWD',
  ABL_TO_IWDI = 'ABL_TO_IWDI',

  /* IMM */
  IMM_TO_REG = 'IMM_TO_REG',
  IMM_TO_ABW = 'IMM_TO_ABW',
  IMM_TO_ABL = 'IMM_TO_ABL',
  IMM_TO_I = 'IMM_TO_I',
  IMM_TO_IPI = 'IMM_TO_IPI',
  IMM_TO_IPD = 'IMM_TO_IPD',
  IMM_TO_IWD = 'IMM_TO_IWD',
  IMM_TO_IWDI = 'IMM_TO_IWDI',

  /* I */
  I_TO_REG = 'I_TO_REG',
  I_TO_ABW = 'I_TO_ABW',
  I_TO_ABL = 'I_TO_ABL',
  I_TO_I = 'I_TO_I',
  I_TO_IPI = 'I_TO_IPI',
  I_TO_IPD = 'I_TO_IPD',
  I_TO_IWD = 'I_TO_IWD',
  I_TO_IWDI = 'I_TO_IWDI',

  /* IPI */
  IPI_TO_REG = 'IPI_TO_REG',
  IPI_TO_ABW = 'IPI_TO_ABW',
  IPI_TO_ABL = 'IPI_TO_ABL',
  IPI_TO_I = 'IPI_TO_I',
  IPI_TO_IPI = 'IPI_TO_IPI',
  IPI_TO_IPD = 'IPI_TO_IPD',
  IPI_TO_IWD = 'IPI_TO_IWD',
  IPI_TO_IWDI = 'IPI_TO_IWDI',

  /* IPD */
  IPD_TO_REG = 'IPD_TO_REG',
  IPD_TO_ABW = 'IPD_TO_ABW',
  IPD_TO_ABL = 'IPD_TO_ABL',
  IPD_TO_I = 'IPD_TO_I',
  IPD_TO_IPI = 'IPD_TO_IPI',
  IPD_TO_IPD = 'IPD_TO_IPD',
  IPD_TO_IWD = 'IPD_TO_IWD',
  IPD_TO_IWDI = 'IPD_TO_IWDI',

  /* IWD */
  IWD_TO_REG = 'IWD_TO_REG',
  IWD_TO_ABW = 'IWD_TO_ABW',
  IWD_TO_ABL = 'IWD_TO_ABL',
  IWD_TO_I = 'IWD_TO_I',
  IWD_TO_IPI = 'IWD_TO_IPI',
  IWD_TO_IPD = 'IWD_TO_IPD',
  IWD_TO_IWD = 'IWD_TO_IWD',
  IWD_TO_IWDI = 'IWD_TO_IWDI',

  /* IWDI */
  IWDI_TO_REG = 'IWDI_TO_REG',
  IWDI_TO_ABW = 'IWDI_TO_ABW',
  IWDI_TO_ABL = 'IWDI_TO_ABL',
  IWDI_TO_I = 'IWDI_TO_I',
  IWDI_TO_IPI = 'IWDI_TO_IPI',
  IWDI_TO_IPD = 'IWDI_TO_IPD',
  IWDI_TO_IWD = 'IWDI_TO_IWD',
  IWDI_TO_IWDI = 'IWDI_TO_IWDI',

  /* PCD */
  PCD_TO_REG = 'PCD_TO_REG',
  PCD_TO_ABW = 'PCD_TO_ABW',
  PCD_TO_ABL = 'PCD_TO_ABL',
  PCD_TO_I = 'PCD_TO_I',
  PCD_TO_IPI = 'PCD_TO_IPI',
  PCD_TO_IPD = 'PCD_TO_IPD',
  PCD_TO_IWD = 'PCD_TO_IWD',
  PCD_TO_IWDI = 'PCD_TO_IWDI',

  /* PCID */
  PCID_TO_REG = 'PCID_TO_REG',
  PCID_TO_ABW = 'PCID_TO_ABW',
  PCID_TO_ABL = 'PCID_TO_ABL',
  PCID_TO_I = 'PCID_TO_I',
  PCID_TO_IPI = 'PCID_TO_IPI',
  PCID_TO_IPD = 'PCID_TO_IPD',
  PCID_TO_IWD = 'PCID_TO_IWD',
  PCID_TO_IWDI = 'PCID_TO_IWDI',
}

export interface IExamineInstruction {
  inst: string;
  opBit: EnumOpBit;
  args: string;
  argSrcDst: EnumArgSrcDst;
  argArray: string[];
}
