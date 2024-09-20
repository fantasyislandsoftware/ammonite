import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { MOVE } from '../../MOVE';
import { EnumArgSrcDst } from '../../../IM68k';
import { examineInstruction } from '../../../m68KHelpers/m68kHelpers';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`REG_TO_IWDI`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000110000000',
        '0000000000000000',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l d0,0x00(a0,d0)');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010110110001111',
        '1110000001111001',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l a7,0x79(a6,a6)');
  });
});
