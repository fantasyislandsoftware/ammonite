export enum EnumBit {
  BYTE = 8,
  WORD = 16,
  LONG = 32,
}

export enum EnumASMType {
  ABS_W = 'abs.w',
  ABS_L = 'abs.l',
  DREG = 'dreg',
  AREG = 'areg',
  IMM = 'imm',
  IND = 'ind',
  UNKNOWN = '?',
}

export const bitSize = {
  8: 2,
  16: 4,
  32: 8,
};
