import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { MOVE } from '../../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`ABL_TO_IWD`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000101111001',
        '0000000000000000',
        '1111111111111111',
        '0000000000000001',
        '0110000011110110',
      ]).asm
    ).toEqual('move.l 0x0000ffff.l,0x0001(a0)');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010110101111001',
        '0111111111111111',
        '1111111111111111',
        '0111111111111111',
        '0110000011110110',
      ]).asm
    ).toEqual('move.l 0x7fffffff.l,0x7fff(a6)');
  });
});
