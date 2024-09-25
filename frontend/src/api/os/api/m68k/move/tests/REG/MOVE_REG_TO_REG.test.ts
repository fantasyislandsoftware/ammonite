import { EnumArgSrcDst } from '../../../IM68k';
import { examineInstruction } from '../../../m68KHelpers/m68kHelpers';
import { makeTestTask } from '../../../m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

const t1 = makeTestTask({
  memoryBufferSize: 100,
});

const t2 = makeTestTask({
  memoryBufferSize: 4,
  d0: [0x12, 0x34, 0x56, 0x78],
  d1: [0x00, 0x00, 0x00, 0x00],
});

describe(`MOVE_REG_TO_REG`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(
        t1,
        [
          '0010000000000000',
          '0110000011111100',
          '0000000000000000',
          '0000001111110000',
          '0000000000000000',
        ],
        { verbose: false }
      ).asm
    ).toEqual('move.l d0,d0');
  });
  it(`MAX`, () => {
    expect(
      MOVE(
        t1,
        [
          '0010111001001111',
          '0110000011111100',
          '0000000000000000',
          '0000001111110000',
          '0000000000000000',
        ],
        { verbose: false }
      ).asm
    ).toEqual('move.l a7,a7');
  });
});

describe('Instruction', () => {
  test.each([
    ['move.b d0,d1', [0x00, 0x00, 0x00, 0x78]],
    ['move.w d0,d1', [0x00, 0x00, 0x56, 0x78]],
    ['move.l d0,d1', [0x12, 0x34, 0x56, 0x78]],
  ])('', (a, expected) => {
    expect(exeMove(t2, a).s.d1).toEqual(expected);
  });
});
