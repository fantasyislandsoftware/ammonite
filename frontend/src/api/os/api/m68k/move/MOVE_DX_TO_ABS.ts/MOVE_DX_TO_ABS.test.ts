import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { makeTestTask } from '../../m68kTestHelpers';
import { MOVE_DX_TO_ABS } from './MOVE_DX_TO_ABS';

it(`MOVE_DX_TO_ABS_8bit_op`, () => {
  expect(1).toEqual(1);
});

/* MOVE_DX_TO_ABS_8bit_op */
/*it(`MOVE_DX_TO_ABS_8bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 4,
    d: [0x12345678],
  });
  const res = MOVE_DX_TO_ABS(task, EnumOpBit.BYTE, 0, 0);
  expect(res.s.m).toEqual([0x78, 0x00, 0x00, 0x00]);
});*/

/* MOVE_DX_TO_ABS_16bit_op */
/*it(`MOVE_DX_TO_ABS_16bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 1,
    d: [0x7fffffff],
  });
  const res = MOVE_DX_TO_ABS(task, EnumOpBit.WORD, 0, 0);
  expect(res.s.m[0]).toEqual(0x0000ffff);
});*/

/* MOVE_DX_TO_ABS_32bit_op */
/*it(`MOVE_DX_TO_ABS_32bit_op`, () => {
    const task = makeTestTask({
      memoryBufferSize: 1,
      d: [0x7fffffff],
    });
    const res = MOVE_DX_TO_ABS(task, EnumOpBit.LONG, 0, 0);
    expect(res.s.m[0]).toEqual(0x7fffffff);
  });*/
