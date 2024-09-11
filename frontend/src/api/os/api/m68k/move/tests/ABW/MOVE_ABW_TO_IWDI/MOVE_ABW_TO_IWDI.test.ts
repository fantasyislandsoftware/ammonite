import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { MOVE } from '../../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`ABW_TO_IWDI`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000110111000',
        '0000000000000000',
        '0000000000000001',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x0000.w,0x01(a0,d0)');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010110110111000',
        '0111111111111111',
        '1110000001111001',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x7fff.w,0x79(a6,a6)');
  });
});
