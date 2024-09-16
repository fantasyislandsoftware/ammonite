import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { MOVE } from '../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`MOVE_IWD_TO_REG`, () => {
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
