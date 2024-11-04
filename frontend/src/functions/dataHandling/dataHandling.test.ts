import {
  is32bitSigned,
  getWordFromLongValue,
  getByteFromWordValue,
  putWordIntoLongValue,
  combine2WordsInto1Long,
  combine2BytesInto1Word,
  putByteIntoWordValue,
  copyLowLowByteToLongValue,
  copyLowWordToLongValue,
  splitLongInto4Bytes,
  splitWordInto2Bytes,
  join2BytesInto1Word,
  join4BytesInto1Long,
} from './dataHandling';
import { EnumByteOrder } from './IntDataHandling';

it(`test`, () => {
  const word = 0x1234;
  const long = 0x12345678;

  /* is32bitSigned */
  expect(is32bitSigned(0x7fffffff)).toBe(true);
  expect(is32bitSigned(0xffffffff)).toBe(false);
  expect(is32bitSigned(0x12345678)).toBe(true);

  /* getWordFromLongValue */
  expect(getWordFromLongValue(long, EnumByteOrder.LOW)).toBe(0x5678);
  expect(getWordFromLongValue(long, EnumByteOrder.HIGH)).toBe(0x1234);

  /* getByteFromWordValue */
  expect(getByteFromWordValue(word, EnumByteOrder.LOW)).toBe(0x34);
  expect(getByteFromWordValue(word, EnumByteOrder.HIGH)).toBe(0x12);

  /* combine2WordInto1Long */
  expect(combine2WordsInto1Long(0x1234, 0x5678)).toBe(0x12345678);
  expect(combine2WordsInto1Long(0x7fff, 0xffff)).toBe(0x7fffffff);

  /* combine2ByteInto1Word */
  expect(combine2BytesInto1Word(0x12, 0xff)).toBe(0x12ff);
  expect(combine2BytesInto1Word(0x1f, 0x2a)).toBe(0x1f2a);

  /* putByteIntoWordValue */
  expect(putByteIntoWordValue(0xff, word, EnumByteOrder.LOW)).toBe(0x12ff);
  expect(putByteIntoWordValue(0xff, word, EnumByteOrder.HIGH)).toBe(0xff34);

  /* putWordIntoLongValue */
  expect(putWordIntoLongValue(0x0000, long, EnumByteOrder.LOW)).toBe(
    0x12340000
  );
  expect(putWordIntoLongValue(0x0000, long, EnumByteOrder.HIGH)).toBe(
    0x00005678
  );

  /* copyLowLowByteToLongValue */
  expect(copyLowLowByteToLongValue(0x7fffffaa, 0x00000000)).toBe(0x000000aa);

  /* copyLowWordToLongValue */
  expect(copyLowWordToLongValue(0x7fffaaaa, 0x00000000)).toBe(0x0000aaaa);

  /* splitWordInto2Bytes */
  expect(splitWordInto2Bytes(0x1234)).toEqual([0x12, 0x34]);

  /* splitLongInto4Bytes */
  expect(splitLongInto4Bytes(0x12345678)).toEqual([0x12, 0x34, 0x56, 0x78]);

  /* join2BytesInto1Word */
  expect(join2BytesInto1Word(0x12, 0x34)).toBe(0x1234);

  /* join4BytesInto1Long */
  expect(join4BytesInto1Long(0x12, 0x34, 0x56, 0x78)).toBe(0x12345678);
});
