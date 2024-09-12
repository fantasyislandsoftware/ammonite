import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { MOVE } from '../../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`ABL_TO_IWDI`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000110111001',
        '0000000000000000',
        '1000000000000000',
        '0000000000000001',
        '0110000011110110',
      ]).asm
    ).toEqual('move.l 0x00008000.l,0x01(a0,d0)');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010101110111001',
        '0111111111111111',
        '1111111111111111',
        '1110000001111001',
        '0110000011110110',
      ]).asm
    ).toEqual('move.l 0x7fffffff.l,0x79(a5,a6)');
  });
});
