import { EnumArgSrcDst } from '../../../IM68k';
import { examineInstruction } from '../../../m68KHelpers/m68kHelpers';
import { makeTestTask } from '../../../m68kTestHelpers';
import { MOVE } from '../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`MOVE_REG_TO_REG`, () => {
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
