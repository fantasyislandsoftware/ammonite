import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`MOVE_ABL_TO_REG CONV`, () => {
  const task = makeTestTask({ memoryBufferSize: 100 });
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000000111001',
        '0000000000000000',
        '1000000000000000',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x00008000.l,d0');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010111001111001',
        '0111111111111111',
        '1111111111111111',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x7fffffff.l,a7');
  });
});

describe('MOVE_ABL_TO_REG EXE', () => {
  const cmd = [
    'move.b 0x00000000.l,d0',
    'move.w 0x00000000.l,d0',
    'move.l 0x00000000.l,d0',
  ];
  //
  class S {
    public setting = {
      memoryBufferSize: 4,
      m: [0x12, 0x34, 0x56, 0x78],
      d0: [0x00, 0x00, 0x00, 0x00],
    };
  }
  //
  it(cmd[0], () => {
    const { d0 } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(d0).toEqual([0x00, 0x00, 0x00, 0x12]);
  });
  //
  it(cmd[1], () => {
    const { d0 } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(d0).toEqual([0x00, 0x00, 0x12, 0x34]);
  });
  //
  it(cmd[2], () => {
    const { d0 } = exeMove(makeTestTask(new S().setting), cmd[2]).s;
    expect(d0).toEqual([0x12, 0x34, 0x56, 0x78]);
  });
});
