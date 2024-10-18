import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`MOVE_PCD_TO_IPI`, () => {
  const task = makeTestTask({ memoryBufferSize: 100 });
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000011111010',
        '0000000000000001',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x0003(pc),(a0)+');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010111011111010',
        '0000000001111111',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x0081(pc),(a7)+');
  });
});

describe('PCD_TO_IPI EXE', () => {
  const cmd = [
    'move.b 0x0004(pc),(a0)+',
    'move.w 0x0004(pc),(a0)+',
    'move.l 0x0004(pc),(a0)+',
  ];
  //
  class S {
    public setting = {
      memoryBufferSize: 0,
      a0: [0x00, 0x00, 0x00, 0x00],
      m: [0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78],
    };
  }
  //
  it(cmd[0], () => {
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(m).toEqual([0x12, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78]);
    expect(a0).toEqual([0x00, 0x00, 0x00, 0x01]);
  });
  //
  it(cmd[1], () => {
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(m).toEqual([0x12, 0x34, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78]);
    expect(a0).toEqual([0x00, 0x00, 0x00, 0x02]);
  });
  //
  it(cmd[2], () => {
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[2]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78]);
    expect(a0).toEqual([0x00, 0x00, 0x00, 0x04]);
  });
});
