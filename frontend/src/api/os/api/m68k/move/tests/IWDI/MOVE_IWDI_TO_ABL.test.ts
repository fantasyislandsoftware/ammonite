import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { MOVE } from '../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`MOVE_IWDI_TO_ABL`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010001111110000',
        '0000000000000001',
        '0000000000000000',
        '1000000000000000',
        '0110000011110110',
      ]).asm
    ).toEqual('move.l 0x01(a0,d0),0x00008000.l');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010001111110111',
        '1111000001111111',
        '0111111111111111',
        '1111111111111111',
        '0110000011110110',
      ]).asm
    ).toEqual('move.l 0x7f(a7,a7),0x7fffffff.l');
  });
});
