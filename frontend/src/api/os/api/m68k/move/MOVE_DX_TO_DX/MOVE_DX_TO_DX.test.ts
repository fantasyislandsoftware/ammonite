import { EnumBit } from '../../IM68k';
import {
  autoFillA,
  autoFillCCR,
  autoFillD,
  makeTestTask,
} from '../../m68kTestHelpers';
import { MOVE_DX_TO_DX } from './MOVE_DX_TO_DX';

/* MOVE_DX_TO_DX_8 */
it(`MOVE_DX_TO_DX_8`, () => {
  const task = makeTestTask(
    autoFillD(0xffffffff, [0xffffff01]),
    autoFillA(0xffffffff),
    autoFillCCR(),
    []
  );
  expect(MOVE_DX_TO_DX(task, EnumBit.BYTE, 0, 1).s).toEqual({
    d: [
      0xffffff01, 0xffffff01, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff,
      0xffffffff, 0xffffffff,
    ],
    a: [
      0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff,
      0xffffffff, 0xffffffff,
    ],
    c: { x: 0, n: 1, z: 0, v: 0, c: 0 },
    m: [],
  });
});

/* MOVE_DX_TO_DX_16 */
it(`MOVE_DX_TO_DX_16`, () => {
  const task = makeTestTask(
    autoFillD(0xffffffff, [0xffff0101]),
    autoFillA(0xffffffff),
    autoFillCCR(),
    []
  );
  expect(MOVE_DX_TO_DX(task, EnumBit.WORD, 0, 1).s).toEqual({
    d: [
      0xffff0101, 0xffff0101, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff,
      0xffffffff, 0xffffffff,
    ],
    a: [
      0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff,
      0xffffffff, 0xffffffff,
    ],
    c: { x: 0, n: 1, z: 0, v: 0, c: 0 },
    m: [],
  });
});

/* MOVE_DX_TO_DX_32 */
it(`MOVE_DX_TO_DX_32`, () => {
  const task = makeTestTask(
    autoFillD(0xffffffff, [0x01010101]),
    autoFillA(0xffffffff),
    autoFillCCR(),
    []
  );
  expect(MOVE_DX_TO_DX(task, EnumBit.LONG, 0, 1).s).toEqual({
    d: [
      0x01010101, 0x01010101, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff,
      0xffffffff, 0xffffffff,
    ],
    a: [
      0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff,
      0xffffffff, 0xffffffff,
    ],
    c: { x: 0, n: 1, z: 0, v: 0, c: 0 },
    m: [],
  });
});
