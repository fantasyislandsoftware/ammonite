import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`REG_TO_I`, () => {
  const task = makeTestTask({ memoryBufferSize: 0 });
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000010000000',
        '0110000011111100',
        '0000000000000000',
        '0000001111110000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l d0,(a0)');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010111010001111',
        '0110000011111100',
        '0000000000000000',
        '0000001111110000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l a7,(a7)');
  });
});

describe('Instruction', () => {
  const setting = {
    memoryBufferSize: 4,
    d0: [0x12, 0x34, 0x56, 0x78],
  };
  test.each([
    [makeTestTask(setting), 'move.b d0,(a0)', [0x78, 0xff, 0xff, 0xff]],
    [makeTestTask(setting), 'move.w d0,(a0)', [0x56, 0x78, 0xff, 0xff]],
    [makeTestTask(setting), 'move.l d0,(a0)', [0x12, 0x34, 0x56, 0x78]],
  ])('', (t, a, expected) => {
    expect(exeMove(t, a).s.m).toEqual(expected);
  });
});
