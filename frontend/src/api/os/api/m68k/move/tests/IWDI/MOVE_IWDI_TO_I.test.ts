import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { MOVE } from '../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`MOVE_IWDI_TO_I`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000010110000',
        '0000000000000001',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x01(a0,d0),(a0)');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010111010110111',
        '1111000001111111',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x7f(a7,a7),(a7)');
  });
});
