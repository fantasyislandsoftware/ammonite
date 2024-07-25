import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { makeTestTask } from '../../m68kTestHelpers';
import { MOVE_DX_TO_ABS } from './MOVE_DX_TO_ABS';

/* MOVE_DX_TO_ABS_8bit_op */
it(`MOVE_DX_TO_ABS_8bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 1,
    d: [0x7fffffff],
  });
  const res = MOVE_DX_TO_ABS(task, EnumOpBit.BYTE, 0, 0);
  expect(res.s.m[0]).toEqual(0x000000ff);
});

/* MOVE_DX_TO_ABS_16bit_op */
it(`MOVE_DX_TO_ABS_16bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 1,
    d: [0x7fffffff],
  });
  const res = MOVE_DX_TO_ABS(task, EnumOpBit.WORD, 0, 0);
  expect(res.s.m[0]).toEqual(0x0000ffff);
});

/* MOVE_DX_TO_ABS_32bit_op */
it(`MOVE_DX_TO_ABS_32bit_op`, () => {
    const task = makeTestTask({
      memoryBufferSize: 1,
      d: [0x7fffffff],
    });
    const res = MOVE_DX_TO_ABS(task, EnumOpBit.LONG, 0, 0);
    expect(res.s.m[0]).toEqual(0x7fffffff);
  });
  