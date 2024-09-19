import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { MOVE } from '../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`MOVE_PCID_TO_IWDI`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000110111011',
        '0000000000000001',
        '0000000000000001',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x03(pc,d0),0x01(a0,d0)');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010111110111011',
        '1111000001111111',
        '0111000001111111',
        '0110000011111000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x81(pc,a7),0x7f(a7,d7)');
  });
});
