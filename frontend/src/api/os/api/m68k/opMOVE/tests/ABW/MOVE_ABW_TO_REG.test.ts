import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';
import { examineInstruction } from '../../../m68KHelpers/m68kHelpers';

describe(`MOVE_ABW_TO_REG CONV`, () => {
  const task = makeTestTask({ memoryBufferSize: 100 });
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000000111000',
        '0000000000000000',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x0000.w,d0');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010111001111000',
        '0111111111111111',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x7fff.w,a7');
  });
});

describe('MOVE_ABW_TO_REG EXE', () => {
  const cmd = [
    'move.b 0x0000.w,d0',
    'move.w 0x0000.w,d0',
    'move.l 0x0000.w,d0',
  ];

  class S {
    public setting = {
      memoryBufferSize: 4,
      m: [0x12, 0x34, 0x56, 0x78],
      d0: [0x00, 0x00, 0x00, 0x00],
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
