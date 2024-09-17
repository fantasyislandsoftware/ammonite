import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { MOVE } from '../../MOVE';

const task = makeTestTask({ memoryBufferSize: 100 });

describe(`MOVE_PCD_TO_REG`, () => {
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000000111010',
        '0000000000000001',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l 0x0003(pc),d0');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        "0010111000111010",
        "0000000001111111",
        "0110000011111010",
        "0100111001110001",
        "0000000000000000"
    ]).asm
    ).toEqual('move.l 0x0081(pc),d7');
  });
});
