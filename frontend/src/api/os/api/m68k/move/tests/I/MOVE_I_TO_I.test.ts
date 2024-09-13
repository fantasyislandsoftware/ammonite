import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { MOVE } from '../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`MOVE_I_TO_I`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000010010000',
        '0110000011111100',
        '0000000000000000',
        '0000001111110000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l (a0),(a0)');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010111010010111',
        '0110000011111100',
        '0000000000000000',
        '0000001111110000',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l (a7),(a7)');
  });
});
