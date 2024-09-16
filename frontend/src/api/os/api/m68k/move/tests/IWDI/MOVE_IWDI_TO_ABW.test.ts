import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { MOVE } from '../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`MOVE_IWDI_TO_ABW`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000111110000',
        '0000000000000001',
        '0000000000000001',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x01(a0,d0),0x0001.w');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010000111110111',
        '1111000001111111',
        '0111111111111111',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x7f(a7,a7),0x7fff.w');
  });
});
