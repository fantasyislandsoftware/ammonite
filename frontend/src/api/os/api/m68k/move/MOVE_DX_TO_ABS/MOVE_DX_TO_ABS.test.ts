import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { makeTestTask } from '../../m68kTestHelpers';
import { MOVE_DX_TO_ABS } from './MOVE_DX_TO_ABS';

/* MOVE_DX_TO_ABS_8bit_op */
it(`MOVE_DX_TO_ABS_8bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 4,
    d: [0x12345678],
  });
  const res = MOVE_DX_TO_ABS(task, EnumOpBit.BYTE, 0, 0);
  expect(res.s.m).toEqual([0x78, 0xff, 0xff, 0xff]);
});

/* MOVE_DX_TO_ABS_16bit_op */
it(`MOVE_DX_TO_ABS_16bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 4,
    d: [0x12345678],
  });
  const res = MOVE_DX_TO_ABS(task, EnumOpBit.WORD, 0, 0);
  expect(res.s.m).toEqual([0x56, 0x78, 0xff, 0xff]);
});

/* MOVE_DX_TO_ABS_32bit_op */
it(`MOVE_DX_TO_ABS_32bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 4,
    d: [0x12345678],
  });
  const res = MOVE_DX_TO_ABS(task, EnumOpBit.LONG, 0, 0);
  expect(res.s.m).toEqual([0x12, 0x34, 0x56, 0x78]);
});
