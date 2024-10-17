import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`MOVE_IWDI_TO_ABL`, () => {
  const task = makeTestTask({ memoryBufferSize: 100 });

  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010001111110000',
        '0000000000000001',
        '0000000000000000',
        '1000000000000000',
        '0110000011110110',
      ]).asm
    ).toEqual('move.l 0x01(a0,d0),0x00008000.l');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010001111110111',
        '1111000001111111',
        '0111111111111111',
        '1111111111111111',
        '0110000011110110',
      ]).asm
    ).toEqual('move.l 0x7f(a7,a7),0x7fffffff.l');
  });
});

describe('IWDI_TO_ABW EXE', () => {
  const cmd = [
    'move.b 0x02(a0,d0),0x00000000.l',
    'move.w 0x02(a0,d0),0x00000000.l',
    'move.l 0x02(a0,d0),0x00000000.l',
  ];
  //
  class S {
    public setting = {
      memoryBufferSize: 0,
      d0: [0x00, 0x00, 0x00, 0x01],
      a0: [0x00, 0x00, 0x00, 0x01],
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
