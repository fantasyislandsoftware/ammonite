import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`MOVE_PCD_TO_REG`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000000111010',
        '0000000000000001',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x0003(pc),d0');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010111000111010',
        '0000000001111111',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x0081(pc),d7');
  });
});

describe('PCD_TO_REG EXE', () => {
  const cmd = [
    'move.b 0x0004(pc),d0',
    'move.w 0x0004(pc),d0',
    'move.l 0x0004(pc),d0',
  ];
  //
  class S {
    public setting = {
      memoryBufferSize: 0,
      d0: [0x00, 0x00, 0x00, 0x00],
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
