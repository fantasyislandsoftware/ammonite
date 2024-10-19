import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`MOVE_PCID_TO_ABW`, () => {
  const task = makeTestTask({ memoryBufferSize: 100 });
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000111111011',
        '0000000000000001',
        '0000000000000001',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x03(pc,d0),0x0001.w');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010000111111011',
        '1111000001111111',
        '0111111111111111',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x81(pc,a7),0x7fff.w');
  });
});

describe('PCID_TO_ABW EXE', () => {
  const cmd = [
    'move.b 0x02(pc,d1),0x0000.w',
    'move.w 0x02(pc,d1),0x0000.w',
    'move.l 0x02(pc,d1),0x0000.w',
  ];
  //
  class S {
    public setting = {
      memoryBufferSize: 0,
      d1: [0x00, 0x00, 0x00, 0x02],
      m: [0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78],
    };
  }
  //
  it(cmd[0], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(m).toEqual([0x12, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78]);
  });
  //
  it(cmd[1], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(m).toEqual([0x12, 0x34, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78]);
  });
  //
  it(cmd[2], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[2]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78]);
  });
});
