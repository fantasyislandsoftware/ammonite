import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`REG_TO_IPD CONV`, () => {
  const task = makeTestTask({ memoryBufferSize: 100 });
  //
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000100000000',
        '0110000011111100',
        '0000000000000000',
        '0000001111110000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l d0,-(a0)');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010110100001111',
        '0110000011111100',
        '0000000000000000',
        '0000001111110000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l a7,-(a6)');
  });
});

describe('REG_TO_IPD CONV EXE', () => {
  const cmd = ['move.b d0,-(a0)', 'move.w d0,-(a0)', 'move.l d0,-(a0)'];
  //
  class S {
    public setting = {
      memoryBufferSize: 8,
      d0: [0x12, 0x34, 0x56, 0x78],
      a0: [0, 0, 0, 4],
    };
  }
  //
  it(cmd[0], () => {
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(m).toEqual([0xff, 0xff, 0xff, 0x78, 0xff, 0xff, 0xff, 0xff]);
    expect(a0).toEqual([0, 0, 0, 3]);
  });
  //
  it(cmd[1], () => {
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(m).toEqual([0xff, 0xff, 0x56, 0x78, 0xff, 0xff, 0xff, 0xff]);
    expect(a0).toEqual([0, 0, 0, 2]);
  });
  //
  it(cmd[2], () => {
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[2]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0xff, 0xff, 0xff, 0xff]);
    expect(a0).toEqual([0, 0, 0, 0]);
  });
});
