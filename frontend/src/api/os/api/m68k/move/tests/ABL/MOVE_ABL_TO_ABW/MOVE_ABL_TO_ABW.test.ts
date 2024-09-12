import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { MOVE } from '../../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`MOVE_ABL_TO_ABW`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000111111001',
        '0000000000000000',
        '1000000000000000',
        '0000000000000000',
        '0110000011110110',
      ]).asm
    ).toEqual('move.l 0x00008000.l,0x0000.w');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010000111111001',
        '0111111111111111',
        '1111111111111111',
        '0111111111111111',
        '0110000011110110',
      ]).asm
    ).toEqual('move.l 0x7fffffff.l,0x7fff.w');
  });
});
