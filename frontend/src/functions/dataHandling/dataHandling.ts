import { EnumByteOrder, INumberCalcConfig } from './IdataHandling';

export const bin2int = (bin: string) => {
  return parseInt(bin, 16);
};

export const int2bin = (int: number, length: number) => {
  return int.toString(2).padStart(length, '0').slice(-length);
};

export const bin2hex = (bin: string, length: number) => {
  return parseInt(bin, 2).toString(16).padStart(length, '0');
};

export const int2hex = (int: number, length: number) => {
  return int.toString(16).padStart(length, '0');
};

const processConfig = (result: number, config?: INumberCalcConfig) => {
  if (config?.log) {
    console.log(result.toString(16));
  }
};

export const getWordFromLongValue = (
  n: number,
  order: EnumByteOrder,
  config?: INumberCalcConfig
) => {
  let result = 0;
  if (order === EnumByteOrder.LOW) {
    result = n & 0xffff;
  } else {
    result = (n >> 16) & 0xffff;
  }
  processConfig(result, config);
  return result;
};

export const putWordIntoLongValue = (
  n: number,
  word: number,
  order: EnumByteOrder,
  config?: INumberCalcConfig
) => {
  let result = 0;
  const low = getWordFromLongValue(n, EnumByteOrder.LOW);
  const high = getWordFromLongValue(n, EnumByteOrder.HIGH);
  if (order === EnumByteOrder.LOW) {
    result = combine2WordInto1Long(high, word);
  } else {
    result = combine2WordInto1Long(word, low);
  }
  processConfig(result, config);
  return result;
};

export const getByteFromWordValue = (
  n: number,
  order: EnumByteOrder,
  config?: INumberCalcConfig
) => {
  let result = 0;
  if (order === EnumByteOrder.LOW) {
    result = n & 0xff;
  } else {
    result = (n >> 8) & 0xff;
  }
  processConfig(result, config);
  return result;
};

export const combine2WordInto1Long = (
  word1: number,
  word2: number,
  config?: INumberCalcConfig
) => {
  const result = (word1 << 16) + word2;
  processConfig(result, config);
  const error = !is32bitSigned(result);
  if (error) throw new Error('Error: Invalid 32bit number');
  return result;
};

export const is32bitSigned = (n: number) => {
  return (Math.abs(n) & 0x7fffffff) === Math.abs(n);
};
