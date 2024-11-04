import { makeTestTask } from '../../../m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`MOVE_IMM_TO_ABW CONV`, () => {
  const task = makeTestTask({
    memoryBufferSize: 100,
  });
  it(`MIN`, () => {
    expect(
      MOVE(
        task,
        [
          '0010000111111100',
          '0000000000000000',
          '0111111111111111',
          '0000000000000001',
          '0110000011110110',
        ],
        { verbose: false }
      ).asm
    ).toEqual('move.l #0x00007fff,0x0001.w');
  });
  it(`MAX`, () => {
    expect(
      MOVE(
        task,
        [
          '0010000111111100',
          '0111111111111111',
          '1111111111111111',
          '0111111111111111',
          '0110000011110110',
        ],
        { verbose: false }
      ).asm
    ).toEqual('move.l #0x7fffffff,0x7fff.w');
  });
});

describe('IMM_TO_ABW EXE', () => {
  const cmd = ['move.w #0x00005678,0x0000.w', 'move.l #0x12345678,0x0000.w'];
  //
  class S {
    public setting = {
      memoryBufferSize: 0,
      m: [0x00, 0x00, 0x00, 0x00],
    };
  }
  //
  it(cmd[0], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(m).toEqual([0x56, 0x78, 0x00, 0x00]);
  });
  //
  it(cmd[1], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78]);
  });
  //
});
