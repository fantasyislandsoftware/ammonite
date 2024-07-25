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
  srcWord: number,
  dstLong: number,
  order: EnumByteOrder,
  config?: INumberCalcConfig
) => {
  let result = 0;
  const low = getWordFromLongValue(dstLong, EnumByteOrder.LOW);
  const high = getWordFromLongValue(dstLong, EnumByteOrder.HIGH);
  if (order === EnumByteOrder.LOW) {
    result = combine2WordsInto1Long(high, srcWord);
  } else {
    result = combine2WordsInto1Long(srcWord, low);
  }
  processConfig(result, config);
  return result;
};

export const putByteIntoWordValue = (
  srcByte: number,
  dstWord: number,
  order: EnumByteOrder,
  config?: INumberCalcConfig
) => {
  let result = 0;
  const low = getByteFromWordValue(dstWord, EnumByteOrder.LOW);
  const high = getByteFromWordValue(dstWord, EnumByteOrder.HIGH);
  if (order === EnumByteOrder.LOW) {
    result = combine2BytesInto1Word(high, srcByte);
  } else {
    result = combine2BytesInto1Word(srcByte, low);
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

export const combine2WordsInto1Long = (
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

export const combine2BytesInto1Word = (
  byte1: number,
  byte2: number,
  config?: INumberCalcConfig
) => {
  const result = (byte1 << 8) + byte2;
  processConfig(result, config);
  return result;
};

export const is32bitSigned = (n: number) => {
  return (Math.abs(n) & 0x7fffffff) === Math.abs(n);
};

export const copyLowLowByteToLongValue = (srcLong: number, dstLong: number) => {
  /* Get byte from right hand side of source */
  const srcWord = getWordFromLongValue(srcLong, EnumByteOrder.LOW);
  const srcByte = getByteFromWordValue(srcWord, EnumByteOrder.LOW);

  /* Get words from destination */
  const dstHighWord = getWordFromLongValue(dstLong, EnumByteOrder.HIGH);
  const dstLowWord = getWordFromLongValue(dstLong, EnumByteOrder.LOW);

  /* Put byte into low word */
  const dstLowWordUpdated = putByteIntoWordValue(
    srcByte,
    dstLowWord,
    EnumByteOrder.LOW
  );

  const res = combine2WordsInto1Long(dstHighWord, dstLowWordUpdated);

  return res;
};

export const copyLowWordToLongValue = (srcLong: number, dstLong: number) => {
  const srcWord = getWordFromLongValue(srcLong, EnumByteOrder.LOW);
  const dstWord = getWordFromLongValue(dstLong, EnumByteOrder.HIGH);
  const res = combine2WordsInto1Long(dstWord, srcWord);
  return res;
};
