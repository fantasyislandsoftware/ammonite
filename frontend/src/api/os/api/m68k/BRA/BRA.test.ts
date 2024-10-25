import { makeTestTask } from '../m68kTestHelpers';
import { BRA, exeBRA } from './BRA';

describe(`BRA CONV`, () => {
  const task = makeTestTask({
    memoryBufferSize: 100,
  });
  task.pos = 10;
  it(`MIN`, () => {
    expect(
      BRA(
        task,
        [
          '0110000011111010',
          '0100111001110101',
          '0000000000000000',
          '0000001111110000',
          '0000000000000000',
        ],
        { verbose: false }
      ).asm
    ).toEqual('bra.b 0x0006');
  });
  it(`MAX`, () => {
    expect(
      BRA(
        task,
        [
          '0110000000000000',
          '1111111111111010',
          '0100111001110101',
          '0100111001110001',
          '0000000000000000',
        ],
        { verbose: false }
      ).asm
    ).toEqual('bra.w 0x0002');
  });
});

describe('BRA EXE', () => {
  const cmd = ['bra.b 1'];
  //
  class S {
    public setting = {
      memoryBufferSize: 0,
      pos: 0,
    };
  }
  //
  const { pos } = exeBRA(makeTestTask(new S().setting), cmd[0]);
  expect(pos).toEqual(1);
  //
});
