import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`MOVE_IWD_TO_ABW`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000111101000',
        '0000000000000001',
        '0000000000000001',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x0001(a0),0x0001.w');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010000111101111',
        '0111111111111111',
        '0111111111111111',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x7fff(a7),0x7fff.w');
  });
});

describe('IWD_TO_ABW EXE', () => {
  const cmd = [
    'move.b 0x0002(a0),0x0000.w',
    'move.w 0x0002(a0),0x0000.w',
    'move.l 0x0002(a0),0x0000.w',
  ];
  //
  class S {
    public setting = {
      memoryBufferSize: 0,
      d0: [0x00, 0x00, 0x00, 0x00],
      a0: [0x00, 0x00, 0x00, 0x02],
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
