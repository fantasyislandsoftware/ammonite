import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { makeTestTask } from '../../m68kTestHelpers';
import { MOVE_DX_TO_IND } from './MOVE_DX_TO_IND';
import { EnumOPAction } from '../../IM68k';

/*****************************/
/************ NOR ************/
/*****************************/

/* MOVE_DX_TO_IND_8bit_op */
it(`MOVE_DX_TO_IND_8bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000004],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.BYTE, 0, 0);
  expect(res.s.m).toEqual([0x00, 0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 0x00]);
});

/* MOVE_DX_TO_IND_16bit_op */
it(`MOVE_DX_TO_IND_16bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000004],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.WORD, 0, 0);
  expect(res.s.m).toEqual([0x00, 0x00, 0x00, 0x00, 0x56, 0x78, 0x00, 0x00]);
});

/* MOVE_DX_TO_IND_32bit_op */
it(`MOVE_DX_TO_IND_32bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000004],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.LONG, 0, 0);
  expect(res.s.m).toEqual([0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78]);
});

/*****************************/
/************ INC ************/
/*****************************/

/* MOVE_DX_TO_IND_8bit_op_inc */
it(`MOVE_DX_TO_IND_8bit_op_inc`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000004],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.BYTE, 0, 0, EnumOPAction.INC);
  expect(res.s.m).toEqual([0x00, 0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 0x00]);
  expect(res.s.a[0]).toEqual(0x00000005);
});

/* MOVE_DX_TO_IND_16bit_op_inc */
it(`MOVE_DX_TO_IND_16bit_op_inc`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000004],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.WORD, 0, 0, EnumOPAction.INC);
  expect(res.s.m).toEqual([0x00, 0x00, 0x00, 0x00, 0x56, 0x78, 0x00, 0x00]);
  expect(res.s.a[0]).toEqual(0x00000006);
});

/* MOVE_DX_TO_IND_32bit_op_inc */
it(`MOVE_DX_TO_IND_32bit_op_inc`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000004],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.LONG, 0, 0, EnumOPAction.INC);
  expect(res.s.m).toEqual([0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78]);
  expect(res.s.a[0]).toEqual(0x00000008);
});

/*****************************/
/************ DEC ************/
/*****************************/

/* MOVE_DX_TO_IND_8bit_op_dec */
it(`MOVE_DX_TO_IND_8bit_op_dec`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000004],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.BYTE, 0, 0, EnumOPAction.DEC);
  expect(res.s.m).toEqual([0x00, 0x00, 0x00, 0x78, 0x00, 0x00, 0x00, 0x00]);
  expect(res.s.a[0]).toEqual(0x00000003);
});

/* MOVE_DX_TO_IND_16bit_op_dec */
it(`MOVE_DX_TO_IND_16bit_op_dec`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000004],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.WORD, 0, 0, EnumOPAction.DEC);
  expect(res.s.m).toEqual([0x00, 0x00, 0x56, 0x78, 0x00, 0x00, 0x00, 0x00]);
  expect(res.s.a[0]).toEqual(0x00000002);
});

/* MOVE_DX_TO_IND_32bit_op_dec */
it(`MOVE_DX_TO_IND_32bit_op_dec`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000004],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.LONG, 0, 0, EnumOPAction.DEC);
  expect(res.s.m).toEqual([0x12, 0x34, 0x56, 0x78, 0x00, 0x00, 0x00, 0x00]);
  expect(res.s.a[0]).toEqual(0x00000000);
});
