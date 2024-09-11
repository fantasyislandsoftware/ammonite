import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { MOVE } from '../../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`REG_TO_IWD`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000101000000',
        '0000000000000001',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l d0,0x0001(a0)');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        "0010110101001111",
        "0111111111111111",
        "0110000011111010",
        "0100111001110001",
        "0000000000000000"
    ]).asm
    ).toEqual('move.l a7,0x7fff(a6)');
  });
});
