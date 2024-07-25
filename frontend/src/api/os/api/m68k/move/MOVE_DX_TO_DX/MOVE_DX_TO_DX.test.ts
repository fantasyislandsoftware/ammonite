import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { makeTestTask } from '../../m68kTestHelpers';
import { MOVE_DX_TO_DX } from './MOVE_DX_TO_DX';

/* MOVE_DX_TO_DX_8bit_op */
it(`MOVE_DX_TO_DX_8bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 0,
    d: [0x7fffffff],
  });
  const res = MOVE_DX_TO_DX(task, EnumOpBit.BYTE, 0, 1);
  expect(res.s.d[1]).toEqual(0x000000ff);
});

/* MOVE_DX_TO_DX_16bit_op */
it(`MOVE_DX_TO_DX_16bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 0,
    d: [0x7fffffff],
  });
  const res = MOVE_DX_TO_DX(task, EnumOpBit.WORD, 0, 1);
  expect(res.s.d[1]).toEqual(0x0000ffff);
});

/* MOVE_DX_TO_DX_32bit_op */
it(`MOVE_DX_TO_DX_32bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 0,
    d: [0x7fffffff],
  });
  const res = MOVE_DX_TO_DX(task, EnumOpBit.LONG, 0, 1);
  expect(res.s.d[1]).toEqual(0x7fffffff);
});
