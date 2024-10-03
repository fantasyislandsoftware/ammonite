import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';
import exp from 'constants';

describe(`MOVE_I_TO_IPI CONV`, () => {
  const task = makeTestTask({ memoryBufferSize: 100 });

  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000011010000',
        '0110000011111100',
        '0000000000000000',
        '0000001111110000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l (a0),(a0)+');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010111011010111',
        '0110000011111100',
        '0000000000000000',
        '0000001111110000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l (a7),(a7)+');
  });
});

describe('I_TO_IPI EXE', () => {
  const cmd = ['move.b (a0),(a1)+', 'move.w (a0),(a1)+', 'move.l (a0),(a1)+'];
  //
  class S {
    public setting = {
      memoryBufferSize: 0,
      a0: [0x00, 0x00, 0x00, 0x00],
      a1: [0x00, 0x00, 0x00, 0x04],
      m: [0x12, 0x34, 0x56, 0x78, 0xff, 0xff, 0xff, 0xff],
    };
  }
  //
  it(cmd[0], () => {
    const { m, a1 } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0xff, 0xff, 0xff]);
    expect(a1).toEqual([0x00, 0x00, 0x00, 0x05]);
  });
  //
  it(cmd[1], () => {
    const { m, a1 } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0xff, 0xff]);
    expect(a1).toEqual([0x00, 0x00, 0x00, 0x06]);
  });
  //
  it(cmd[2], () => {
    const { m, a1 } = exeMove(makeTestTask(new S().setting), cmd[2]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78]);
    expect(a1).toEqual([0x00, 0x00, 0x00, 0x08]);
  });
});
