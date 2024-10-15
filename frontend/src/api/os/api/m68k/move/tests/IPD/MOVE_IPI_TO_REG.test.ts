import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`MOVE_IPD_TO_REG`, () => {
  const task = makeTestTask({ memoryBufferSize: 100 });
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000000100000',
        '0110000011111100',
        '0000000000000000',
        '0000001111110000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l -(a0),d0');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010111000100111',
        '0110000011111100',
        '0000000000000000',
        '0000001111110000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l -(a7),d7');
  });
});

describe('IPD_TO_REG EXE', () => {
  const cmd = ['move.b -(a0),d0', 'move.w -(a0),d0', 'move.l -(a0),d0'];
  //
  class S {
    public setting = {
      memoryBufferSize: 0,
      a0: [0x00, 0x00, 0x00, 0x04],
      m: [0x12, 0x34, 0x56, 0x78, 0x00, 0x00, 0x00, 0x00],
    };
  }
  //
  it(cmd[0], () => {
    const { d0, a0 } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(d0).toEqual([0x00, 0x00, 0x00, 0x78]);
    expect(a0).toEqual([0x00, 0x00, 0x00, 0x03]);
  });
  //
  it(cmd[1], () => {
    const { d0, a0 } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(d0).toEqual([0x00, 0x00, 0x56, 0x78]);
    expect(a0).toEqual([0x00, 0x00, 0x00, 0x02]);
  });
  //
  it(cmd[2], () => {
    const { d0, a0 } = exeMove(makeTestTask(new S().setting), cmd[2]).s;
    expect(d0).toEqual([0x12, 0x34, 0x56, 0x78]);
    expect(a0).toEqual([0x00, 0x00, 0x00, 0x00]);
  });
});
