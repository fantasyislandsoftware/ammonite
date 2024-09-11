import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { MOVE } from '../../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`MOVE_ABW_TO_IPD`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000100111000',
        '0000000000000000',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x0000.w,-(a0)');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010110100111000',
        '0111111111111111',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x7fff.w,-(a6)');
  });
});
