import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';
import { EnumArgSrcDst } from '../../../IM68k';
import { examineInstruction } from '../../../m68KHelpers/m68kHelpers';

describe(`REG_TO_ABW`, () => {
  const task = makeTestTask({
    memoryBufferSize: 0x7fff,
    d0: [0x12, 0x34, 0x56, 0x78],
  });

  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000111000000',
        '0000000000000000',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l d0,0x0000.w');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010000111001111',
        '0111111111111111',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l a7,0x7fff.w');
  });
});

describe('Instruction', () => {
  const task = makeTestTask({
    memoryBufferSize: 4,
    d0: [0x12, 0x34, 0x56, 0x78],
  });
  test.each([
    ['move.b d0,0x0000.w', [0x78, 0xff, 0xff, 0xff]],
    ['move.w d0,0x0000.w', [0x56, 0x78, 0xff, 0xff]],
    ['move.l d0,0x0000.w', [0x12, 0x34, 0x56, 0x78]],
  ])('', (a, expected) => {
    expect(exeMove(task, a).s.m).toEqual(expected);
  });
});
