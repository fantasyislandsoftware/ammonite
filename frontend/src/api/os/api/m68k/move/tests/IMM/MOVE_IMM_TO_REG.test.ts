import { makeTestTask } from '../../../m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`MOVE_IMM_TO_REG CONV`, () => {
  const task = makeTestTask({
    memoryBufferSize: 100,
  });
  it(`MIN`, () => {
    expect(
      MOVE(
        task,
        [
          '0010000000111100',
          '0000000000000000',
          '0111111111111111',
          '0110000011111000',
          '0110000011110110',
        ],
        { verbose: false }
      ).asm
    ).toEqual('move.l #0x00007fff,d0');
  });
  it(`MAX`, () => {
    expect(
      MOVE(
        task,
        [
          '0010000000111100',
          '0111111111111111',
          '1111111111111111',
          '0110000011111000',
          '0110000011110110',
        ],
        { verbose: false }
      ).asm
    ).toEqual('move.l #0x7fffffff,d0');
  });
});

describe('IMM_TO_REG EXE', () => {
  const cmd = ['move.w #0x00005678,d0', 'move.l #0x12345678,d0'];
  //
  class S {
    public setting = {
      memoryBufferSize: 0,
    };
  }
  //
  it(cmd[0], () => {
    const { d0 } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(d0).toEqual([0x00, 0x00, 0x56, 0x78]);
  });
  //
  it(cmd[1], () => {
    const { d0 } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(d0).toEqual([0x12, 0x34, 0x56, 0x78]);
  });
  //
});
