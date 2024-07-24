import { EnumBit } from '../../IM68k';
import {
  autoFillA,
  autoFillCCR,
  autoFillD,
  makeTestTask,
} from '../../m68kTestHelpers';
import { MOVE_DX_TO_ABS } from './MOVE_DX_TO_ABS';

/* MOVE_DX_TO_ABS_8 */
/*it(`MOVE_DX_TO_ABS_8`, () => {
  const task = makeTestTask(
    autoFillD(0xffffffff, [0xffffff01]),
    autoFillA(0xffffffff),
    autoFillCCR(),
    [0xffffffff]
  );
  expect(MOVE_DX_TO_ABS(task, EnumBit.BYTE, 0, 0).s).toEqual({
    d: [
      0xffffff01, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff,
      0xffffffff, 0xffffffff,
    ],
    a: [
      0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff,
      0xffffffff, 0xffffffff,
    ],
    c: { x: 0, n: 1, z: 0, v: 0, c: 0 },
    m: [0xffffff01],
  });
});*/
