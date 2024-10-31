export enum EnumByteOrder {
  LOW = 0,
  HIGH = 1,
}

export enum EnumOpBit {
  BYTE = 8,
  WORD = 16,
  LONG = 32,
}

export const opBitChar: {
  [key: number]: string;
} = {
  8: 'b',
  16: 'w',
  32: 'l',
};

export type INumberCalcConfig = {
  log?: boolean;
};

export enum EnumBit {
  BYTE = 8,
  WORD = 16,
  LONG = 32,
}

export enum EnumDataFormat {
  TEXT = 'text',
  ARRAY_BUFFER = 'arrayBuffer',
}
