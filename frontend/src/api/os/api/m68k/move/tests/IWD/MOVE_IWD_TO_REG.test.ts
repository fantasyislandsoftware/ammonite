import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`MOVE_IWD_TO_REG`, () => {
  const task = makeTestTask({ memoryBufferSize: 100 });
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000000101000',
        '0000000000000001',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x0001(a0),d0');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010111000101111',
        '0111111111111111',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x7fff(a7),d7');
  });
});

describe('IWD_TO_REG EXE', () => {
  const cmd = [
    'move.b 0x0002(a0),d0',
    'move.w 0x0002(a0),d0',
    'move.l 0x0002(a0),d0',
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
    const { d0 } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(d0).toEqual([0x00, 0x00, 0x00, 0x12]);
  });
  //
  it(cmd[1], () => {
    const { d0 } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(d0).toEqual([0x00, 0x00, 0x12, 0x34]);
  });
  //
  it(cmd[2], () => {
    const { d0 } = exeMove(makeTestTask(new S().setting), cmd[2]).s;
    expect(d0).toEqual([0x12, 0x34, 0x56, 0x78]);
  });
});
