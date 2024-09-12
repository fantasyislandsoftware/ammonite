import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { MOVE } from '../../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`MOVE_ABL_TO_REG`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000000111001',
        '0000000000000000',
        '1000000000000000',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x00008000.l,d0');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010111001111001',
        '0111111111111111',
        '1111111111111111',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x7fffffff.l,a7');
  });
});
