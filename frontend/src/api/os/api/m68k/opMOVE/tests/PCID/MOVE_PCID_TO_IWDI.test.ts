import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`MOVE_PCID_TO_IWDI`, () => {
  const task = makeTestTask({ memoryBufferSize: 100 });
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000110111011',
        '0000000000000001',
        '0000000000000001',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x03(pc,d0),0x01(a0,d0)');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010111110111011',
        '1111000001111111',
        '0111000001111111',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x81(pc,a7),0x7f(a7,d7)');
  });
});

describe('PCID_TO_IWDI EXE', () => {
  const cmd = [
    'move.b 0x04(pc,d1),0x01(a0,d0)',
    'move.w 0x04(pc,d1),0x01(a0,d0)',
    'move.l 0x04(pc,d1),0x01(a0,d0)',
  ];
  //
  class S {
    public setting = {
      memoryBufferSize: 0,
      a0: [0x00, 0x00, 0x00, 0x02],
      d0: [0x00, 0x00, 0x00, 0x01],
      d1: [0x00, 0x00, 0x00, 0x04],
      m: [
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78,
      ],
    };
  }
  //
  it(cmd[0], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(m).toEqual([
      0x00, 0x00, 0x00, 0x00, 0x12, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78,
    ]);
  });
  //
  it(cmd[1], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(m).toEqual([
      0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78,
    ]);
  });
  //
  it(cmd[2], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[2]).s;
    expect(m).toEqual([
      0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78,
    ]);
  });
});
