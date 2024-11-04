import { makeTestTask } from '../../../m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`MOVE_REG_TO_REG CONV`, () => {
  const task = makeTestTask({
    memoryBufferSize: 100,
  });
  it(`MIN`, () => {
    expect(
      MOVE(
        task,
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
        task,
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

describe('REG_TO_REG EXE', () => {
  const cmd = ['move.b d0,d1', 'move.w d0,d1', 'move.l d0,d1'];
  //
  class S {
    public setting = {
      memoryBufferSize: 0,
      d0: [0x12, 0x34, 0x56, 0x78],
    };
  }
  //
  it(cmd[0], () => {
    const { d1 } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(d1).toEqual([0x00, 0x00, 0x00, 0x78]);
  });
  //
  it(cmd[1], () => {
    const { d1 } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(d1).toEqual([0x00, 0x00, 0x56, 0x78]);
  });
  //
  it(cmd[2], () => {
    const { d1 } = exeMove(makeTestTask(new S().setting), cmd[2]).s;
    expect(d1).toEqual([0x12, 0x34, 0x56, 0x78]);
  });
});
