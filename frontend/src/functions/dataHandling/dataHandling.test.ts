import {
  is32bitSigned,
  getWordFromLongValue,
  getByteFromWordValue,
  putWordIntoLongValue,
  combine2WordInto1Long,
} from './dataHandling';
import { INumberCalcConfig, EnumByteOrder } from './IdataHandling';

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
  expect(combine2WordInto1Long(0x1234, 0x5678)).toBe(0x12345678);
  expect(combine2WordInto1Long(0x7fff, 0xffff)).toBe(0x7fffffff);

  /* putWordIntoLongValue */
  expect(
    putWordIntoLongValue(long, 0x0000, EnumByteOrder.LOW, { log: true })
  ).toBe(0x12340000);
  expect(
    putWordIntoLongValue(long, 0x0000, EnumByteOrder.HIGH, { log: true })
  ).toBe(0x00005678);
});
