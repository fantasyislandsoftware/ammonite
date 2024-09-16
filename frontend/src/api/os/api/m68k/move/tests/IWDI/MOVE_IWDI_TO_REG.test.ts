import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { MOVE } from '../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`MOVE_IWD_TO_REG`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000000110000',
        '0000000000000001',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x01(a0,d0),d0');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010111000110111',
        '1111000001111111',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x7f(a7,a7),d7');
  });
});
