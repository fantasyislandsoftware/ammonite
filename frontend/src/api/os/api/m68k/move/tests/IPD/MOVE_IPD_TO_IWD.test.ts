import { makeTestTask } from 'api/os/api/m68k/m68kTestHelpers';
import { exeMove, MOVE } from '../../MOVE';

describe(`MOVE_IPD_TO_IWD`, () => {
  const task = makeTestTask({ memoryBufferSize: 100 });
  it(`MIN`, () => {
    expect(
      MOVE(task, [
        '0010000101100000',
        '0000000000000001',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l -(a0),0x0001(a0)');
  });
  it(`MAX`, () => {
    expect(
      MOVE(task, [
        '0010111101100111',
        '0111111111111111',
        '0110000011111010',
        '0100111001110001',
        '0000000000000000',
      ]).asm
    ).toEqual('move.l -(a7),0x7fff(a7)');
  });
});

describe('IPD_TO_IWD EXE', () => {
  const cmd = [
    'move.b -(a0),0x0001(a1)',
    'move.w -(a0),0x0001(a1)',
    'move.l -(a0),0x0001(a1)',
  ];
  //
  class S {
    public setting = {
      memoryBufferSize: 0,
      a0: [0x00, 0x00, 0x00, 0x04],
      a1: [0x00, 0x00, 0x00, 0x03],
      m: [0x12, 0x34, 0x56, 0x78, 0xff, 0xff, 0xff, 0xff],
    };
  }
  //
  it(cmd[0], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[0]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x78, 0xff, 0xff, 0xff]);
  });
  //
  it(cmd[1], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[1]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x56, 0x78, 0xff, 0xff]);
  });
  //
  it(cmd[2], () => {
    const { m } = exeMove(makeTestTask(new S().setting), cmd[2]).s;
    expect(m).toEqual([0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78]);
  });
});
