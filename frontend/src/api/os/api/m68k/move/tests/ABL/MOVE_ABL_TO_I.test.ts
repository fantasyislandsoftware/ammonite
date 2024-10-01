import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`MOVE_ABL_TO_I CONV`, () => {
  const task = makeTestTask({ memoryBufferSize: 0 });
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000010111001',
        '0000000000000000',
        '1000000000000000',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x00008000.l,(a0)');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010111010111001',
        '0111111111111111',
        '1111111111111111',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x7fffffff.l,(a7)');
  });
});

describe('ABL_TO_I EXE', () => {
  const cmd = [
    'move.b 0x00000000.l,(a0)',
    'move.w 0x00000000.l,(a0)',
    'move.l 0x00000000.l,(a0)',
  ];
  //
  class S {
    public setting = {
      memoryBufferSize: 8,
      a0: [0x00, 0x00, 0x00, 0x04],
      m: [0x12, 0x34, 0x56, 0x78, 0xff, 0xff, 0xff, 0xff],
    };
  }
  //
  it(cmd[0], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0xff, 0xff, 0xff]);
  });
  //
  it(cmd[1], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0xff, 0xff]);
  });
  //
  it(cmd[2], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[2]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78]);
  });
});
