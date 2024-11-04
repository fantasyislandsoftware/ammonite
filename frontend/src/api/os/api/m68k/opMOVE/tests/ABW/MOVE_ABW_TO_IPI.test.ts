import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`MOVE_ABW_TO_IPI CONV`, () => {
  const task = makeTestTask({ memoryBufferSize: 100 });
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000011111000',
        '0000000000000000',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x0000.w,(a0)+');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010111011111000',
        '0111111111111111',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x7fff.w,(a7)+');
  });
});

describe('ABW_TO_IPI EXE', () => {
  const cmd = [
    'move.b 0x0000.w,(a0)+',
    'move.w 0x0000.w,(a0)+',
    'move.l 0x0000.w,(a0)+',
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
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0xff, 0xff, 0xff]);
    expect(a0).toEqual([0x00, 0x00, 0x00, 0x05]);
  });
  //
  it(cmd[1], () => {
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0xff, 0xff]);
    expect(a0).toEqual([0x00, 0x00, 0x00, 0x06]);
  });
  //
  it(cmd[2], () => {
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[2]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78]);
    expect(a0).toEqual([0x00, 0x00, 0x00, 0x08]);
  });
});
