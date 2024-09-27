import { EnumArgSrcDst } from '../../../IM68k';
import { examineInstruction } from '../../../m68KHelpers/m68kHelpers';
import { makeTestTask } from '../../../m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`MOVE_REG_TO_REG conversion`, () => {
  const task = makeTestTask({
    memoryBufferSize: 100,
  });
  it(`MIN`, () => {
    expect(
      MOVE(
        task,
        [
          '0010000000000000',
          '0110000011111100',
          '0000000000000000',
          '0000001111110000',
          '0000000000000000',
        ],
        { verbose: false }
      ).asm
    ).toEqual('move.l d0,d0');
  });
  it(`MAX`, () => {
    expect(
      MOVE(
        task,
        [
          '0010111001001111',
          '0110000011111100',
          '0000000000000000',
          '0000001111110000',
          '0000000000000000',
        ],
        { verbose: false }
      ).asm
    ).toEqual('move.l a7,a7');
  });
});

describe('MOVE_REG_TO_REG execution', () => {
  const cmd = ['move.b d0,d1', 'move.w d0,d1', 'move.l d0,d1'];
  const setting = {
    memoryBufferSize: 8,
    d0: [0x12, 0x34, 0x56, 0x78],
  };
  it(cmd[0], () => {
    const t = makeTestTask(setting);
    const { d1 } = exeMove(t, cmd[0]).s;
    expect(d1).toEqual([0x00, 0x00, 0x00, 0x78]);
  });
  //
  it(cmd[1], () => {
    const t = makeTestTask(setting);
    const { d1 } = exeMove(t, cmd[1]).s;
    expect(d1).toEqual([0x00, 0x00, 0x56, 0x78]);
  });
  //
  it(cmd[2], () => {
    const t = makeTestTask(setting);
    const { d1 } = exeMove(t, cmd[2]).s;
    expect(d1).toEqual([0x12, 0x34, 0x56, 0x78]);
  });
});
