import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`ABL_TO_IWDI CONV`, () => {
  const task = makeTestTask({ memoryBufferSize: 100 });
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000110111001',
        '0000000000000000',
        '1000000000000000',
        '0000000000000001',
        '0110000011110110',
      ]).asm
    ).toEqual('move.l 0x00008000.l,0x01(a0,d0)');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010101110111001',
        '0111111111111111',
        '1111111111111111',
        '1110000001111001',
        '0110000011110110',
      ]).asm
    ).toEqual('move.l 0x7fffffff.l,0x79(a5,a6)');
  });
});

describe('ABL_TO_IWDI EXE', () => {
  const cmd = [
    'move.b 0x00000000.l,0x01(a0,d0)',
    'move.w 0x00000000.l,0x01(a0,d0)',
    'move.l 0x00000000.l,0x01(a0,d0)',
  ];
  //
  class S {
    public setting = {
      memoryBufferSize: 8,
      a0: [0x00, 0x00, 0x00, 0x02],
      d0: [0x00, 0x00, 0x00, 0x01],
      m: [0x12, 0x34, 0x56, 0x78, 0xff, 0xff, 0xff, 0xff],
    };
  }
  //
  it(cmd[0], () => {
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0xff, 0xff, 0xff]);
    expect(a0).toEqual([0x00, 0x00, 0x00, 0x02]);
  });
  //
  it(cmd[1], () => {
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0xff, 0xff]);
    expect(a0).toEqual([0x00, 0x00, 0x00, 0x02]);
  });
  //
  it(cmd[2], () => {
    const { m, a0 } = exeMove(makeTestTask(new S().setting), cmd[2]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78]);
    expect(a0).toEqual([0x00, 0x00, 0x00, 0x02]);
  });
});
