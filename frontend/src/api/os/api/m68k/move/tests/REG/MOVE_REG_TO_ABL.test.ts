import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`MOVE_REG_TO_ABL`, () => {
  const task = makeTestTask({ memoryBufferSize: 100 });
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010001111000000',
        '0000000000000000',
        '1000000000000000',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l d0,0x00008000.l');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010001111001111',
        '0111111111111111',
        '1111111111111111',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l a7,0x7fffffff.l');
  });
});

describe('Instruction', () => {
  const task = makeTestTask({
    memoryBufferSize: 4,
    d0: [0x12, 0x34, 0x56, 0x78],
  });
  test.each([
    ['move.b d0,0x00000000.l', [0x78, 0xff, 0xff, 0xff]],
    ['move.w d0,0x00000000.l', [0x56, 0x78, 0xff, 0xff]],
    ['move.l d0,0x00000000.l', [0x12, 0x34, 0x56, 0x78]],
  ])('', (a, expected) => {
    expect(exeMove(task, a).s.m).toEqual(expected);
  });
});
