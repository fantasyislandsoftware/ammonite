import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`REG_TO_IWD CONV`, () => {
  const task = makeTestTask({ memoryBufferSize: 100 });
  //
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000101000000',
        '0000000000000001',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l d0,0x0001(a0)');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010110101001111',
        '0111111111111111',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l a7,0x7fff(a6)');
  });
});

describe('REG_TO_IWD EXE', () => {
  const cmd = [
    'move.b d0,0x0002(a0)',
    'move.w d0,0x0002(a0)',
    'move.l d0,0x0002(a0)',
  ];
  //
  class S {
    public setting = {
      memoryBufferSize: 8,
      d0: [0x12, 0x34, 0x56, 0x78],
      a0: [0, 0, 0, 0],
    };
  }
  //
  it(cmd[0], () => {
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(m).toEqual([0xff, 0xff, 0x78, 0xff, 0xff, 0xff, 0xff, 0xff]);
    expect(a0).toEqual([0, 0, 0, 0]);
  });
  //
  it(cmd[1], () => {
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(m).toEqual([0xff, 0xff, 0x56, 0x78, 0xff, 0xff, 0xff, 0xff]);
    expect(a0).toEqual([0, 0, 0, 0]);
  });
  //
  it(cmd[2], () => {
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[2]).s;
    expect(m).toEqual([0xff, 0xff, 0x12, 0x34, 0x56, 0x78, 0xff, 0xff]);
    expect(a0).toEqual([0, 0, 0, 0]);
  });
});
