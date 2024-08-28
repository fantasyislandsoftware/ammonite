export enum EnumASMType {
  ABS_W = 'abs.w',
  ABS_L = 'abs.l',
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
}

export enum EnumLOCD2BIN {
  ABS_W = '000',
  ABS_L = '001',
}
