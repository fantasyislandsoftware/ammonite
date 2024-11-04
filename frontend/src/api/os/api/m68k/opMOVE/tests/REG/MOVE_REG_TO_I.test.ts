import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`REG_TO_I CONV`, () => {
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

describe('REG_TO_I EXE', () => {
  const cmd = ['move.b d0,(a0)', 'move.w d0,(a0)', 'move.l d0,(a0)'];
  //
  class S {
    public setting = {
      memoryBufferSize: 4,
      d0: [0x12, 0x34, 0x56, 0x78],
      a0: [0, 0, 0, 0],
    };
  }
  //
  it(cmd[0], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(m).toEqual([0x78, 0xff, 0xff, 0xff]);
  });
  //
  it(cmd[1], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(m).toEqual([0x56, 0x78, 0xff, 0xff]);
  });
  //
  it(cmd[2], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[2]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78]);
  });
});
