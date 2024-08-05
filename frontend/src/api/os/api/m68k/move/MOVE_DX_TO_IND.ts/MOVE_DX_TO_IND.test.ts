import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { makeTestTask } from '../../m68kTestHelpers';
import { MOVE_DX_TO_IND } from './MOVE_DX_TO_IND';

/* MOVE_DX_TO_IND_8bit_op */
it(`MOVE_DX_TO_IND_8bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 4,
    d: [0x12345678],
    a: [0x00000000],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.BYTE, 0, 0);
  expect(res.s.m).toEqual([0x78, 0x00, 0x00, 0x00]);
});

/* MOVE_DX_TO_IND_16bit_op */
it(`MOVE_DX_TO_IND_16bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 4,
    d: [0x12345678],
    a: [0x00000000],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.WORD, 0, 0);
  expect(res.s.m).toEqual([0x56, 0x78, 0x00, 0x00]);
});

/* MOVE_DX_TO_IND_32bit_op */
it(`MOVE_DX_TO_IND_32bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 4,
    d: [0x12345678],
    a: [0x00000000],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.LONG, 0, 0);
  expect(res.s.m).toEqual([0x12, 0x34, 0x56, 0x78]);
});
