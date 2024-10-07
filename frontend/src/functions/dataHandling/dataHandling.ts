import { ITask } from 'stores/useTaskStore';
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

export const hex2int = (hex: string) => {
  return parseInt(hex, 16);
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
  if (error) throw new Error(`Error: Invalid 32bit number: ${result}`);
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
  //return (Math.abs(n) & 0x7fffffff) === Math.abs(n);
  return n >= -2147483648 && n <= 2147483647;
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

export const splitWordInto2Bytes = (w: number) => {
  const byte1 = (w >> 8) & 0xff;
  const byte2 = w & 0xff;
  return [byte1, byte2];
};

export const splitLongInto4Bytes = (l: number) => {
  const byte1 = (l >> 24) & 0xff;
  const byte2 = (l >> 16) & 0xff;
  const byte3 = (l >> 8) & 0xff;
  const byte4 = l & 0xff;
  return [byte1, byte2, byte3, byte4];
};

export const join2BytesInto1Word = (byte1: number, byte2: number) => {
  return (byte1 << 8) + byte2;
};

export const join4BytesInto1Long = (
  byte1: number,
  byte2: number,
  byte3: number,
  byte4: number
) => {
  return (byte1 << 24) + (byte2 << 16) + (byte3 << 8) + byte4;
};

export const l = (task: ITask, reg: string) => {
  return join4BytesInto1Long(
    task.s[reg][0],
    task.s[reg][1],
    task.s[reg][2],
    task.s[reg][3]
  );
};

export const b = (task: ITask, reg: string) => {
  return join4BytesInto1Long(
    task.s[reg][0],
    task.s[reg][1],
    task.s[reg][2],
    task.s[reg][3]
  );
};

/*export const _4to1 = (array: number[]) => {
  return (array[0] << 24) + (array[1] << 16) + (array[2] << 8) + array[3];
};*/

/*export const incReg = (reg: any, i: number) => {
  let n = _4to1(reg);
  n += i;
  return splitLongInto4Bytes(n);
};*/

/*export const decReg = (reg: any, i: number) => {
  let n = _4to1(reg);
  n -= i;
  return splitLongInto4Bytes(n);
};*/

export const genM68KAddrSpace = (allocatedMemory: number) => {
  let data: number[] = [];

  let map: {
    [key: string]: number;
  } = {};

  /* D */
  for (let i = 0; i < 8; i++) {
    map['d' + i] = data.length;
    for (let i = 0; i < 4; i++) {
      data.push(0);
    }
  }

  /* A */
  for (let i = 0; i < 8; i++) {
    map['a' + i] = data.length;
    for (let i = 0; i < 4; i++) {
      data.push(0);
    }
  }

  /* SR */
  map['sr'] = data.length;
  for (let i = 0; i < 2; i++) {
    data.push(0);
  }

  /* M */
  map['m'] = data.length;
  for (let i = 0; i < allocatedMemory; i++) {
    data.push(0);
  }

  return { data: data, map: map };
};

export const fillNumberArray = (n: number, length: number) => {
  let arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(n);
  }
  return arr;
};

export const dec2bin = (dec: number, pad: number) => {
  return (dec >>> 0).toString(2).padStart(pad, '0');
};

export const incReg = (task: ITask, reg: string, n: number) => {
  let r = join4BytesInto1Long(
    task.s[reg][0],
    task.s[reg][1],
    task.s[reg][2],
    task.s[reg][3]
  );
  r += n;
  return splitLongInto4Bytes(r);
};

export const decReg = (task: ITask, reg: string, n: number) => {
  let r = join4BytesInto1Long(
    task.s[reg][0],
    task.s[reg][1],
    task.s[reg][2],
    task.s[reg][3]
  );
  r -= n;
  if (r < 0) {
    r = 0x7fffffff - r;
  }
  return splitLongInto4Bytes(r);
};

export const getRegInfo = (task: ITask, reg: string) => {
  const byteArray = task.s[reg];
  const long = join4BytesInto1Long(
    byteArray[0],
    byteArray[1],
    byteArray[2],
    byteArray[3]
  );
  return { byteArray, long };
};

export const filterLoc = (loc: string) => {
  return loc.replaceAll('0x', '').replaceAll('.w', '').replaceAll('.l', '');
};
