import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`ABL_TO_IWD CONV`, () => {
  const task = makeTestTask({ memoryBufferSize: 100 });

  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000101111001',
        '0000000000000000',
        '1111111111111111',
        '0000000000000001',
        '0110000011110110',
      ]).asm
    ).toEqual('move.l 0x0000ffff.l,0x0001(a0)');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010110101111001',
        '0111111111111111',
        '1111111111111111',
        '0111111111111111',
        '0110000011110110',
      ]).asm
    ).toEqual('move.l 0x7fffffff.l,0x7fff(a6)');
  });
});

describe('ABL_TO_IWD EXE', () => {
  const cmd = [
    'move.b 0x00000000.l,0x0001(a0)',
    'move.w 0x00000000.l,0x0001(a0)',
    'move.l 0x00000000.l,0x0001(a0)',
  ];
  //
  class S {
    public setting = {
      memoryBufferSize: 8,
      a0: [0x00, 0x00, 0x00, 0x03],
      m: [0x12, 0x34, 0x56, 0x78, 0xff, 0xff, 0xff, 0xff],
    };
  }
  //
  it(cmd[0], () => {
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0xff, 0xff, 0xff]);
    expect(a0).toEqual([0x00, 0x00, 0x00, 0x03]);
  });
  //
  it(cmd[1], () => {
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0xff, 0xff]);
    expect(a0).toEqual([0x00, 0x00, 0x00, 0x03]);
  });
  //
  it(cmd[2], () => {
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[2]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78]);
    expect(a0).toEqual([0x00, 0x00, 0x00, 0x03]);
  });
});
