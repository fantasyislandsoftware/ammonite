import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`MOVE_REG_TO_ABL CONV`, () => {
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

describe('REG_TO_ABL EXE', () => {
  const cmd = [
    'move.b d0,0x00000000.l',
    'move.w d0,0x00000000.l',
    'move.l d0,0x00000000.l',
  ];
  //
  class S {
    public setting = {
      memoryBufferSize: 4,
      d0: [0x12, 0x34, 0x56, 0x78],
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
