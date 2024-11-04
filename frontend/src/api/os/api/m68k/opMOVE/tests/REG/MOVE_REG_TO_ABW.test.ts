import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';
import { EnumArgSrcDst } from '../../../IM68k';
import { examineInstruction } from '../../../m68KHelpers/m68kHelpers';

describe(`REG_TO_ABW CONV`, () => {
  const task = makeTestTask({
    memoryBufferSize: 0x7fff,
    d0: [0x12, 0x34, 0x56, 0x78],
  });

  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000111000000',
        '0000000000000000',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l d0,0x0000.w');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010000111001111',
        '0111111111111111',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l a7,0x7fff.w');
  });
});

describe('REG_TO_ABW EXE', () => {
  const cmd = [
    'move.b d0,0x0000.w',
    'move.w d0,0x0000.w',
    'move.l d0,0x0000.w',
  ];
  //
  class S {
    public setting = {
      memoryBufferSize: 4,
      d0: [0x12, 0x34, 0x56, 0x78],
    };
  }
  //
  it(cmd[0], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(m).toEqual([0x78, 0xff, 0xff, 0xff]);
  });
  //
  it(cmd[1], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(m).toEqual([0x56, 0x78, 0xff, 0xff]);
  });
  //
  it(cmd[2], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[2]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78]);
  });
});
