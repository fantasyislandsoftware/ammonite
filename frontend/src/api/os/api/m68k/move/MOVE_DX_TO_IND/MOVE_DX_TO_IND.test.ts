import { EnumOpBit } from 'functions/dataHandling/IdataHandling';
import { makeTestTask } from '../../m68kTestHelpers';
import { MOVE_DX_TO_IND } from './MOVE_DX_TO_IND';
import { EnumOPAction } from '../../IM68k';

/*****************************/
/********** NORMAL ***********/
/*****************************/

/* MOVE_DX_TO_IND_8bit_op */
it(`MOVE_DX_TO_IND_8bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000004],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.BYTE, 0, 0);
  expect(res.s.m).toEqual([0xff, 0xff, 0xff, 0xff, 0x78, 0xff, 0xff, 0xff]);
});

/* MOVE_DX_TO_IND_16bit_op */
it(`MOVE_DX_TO_IND_16bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000004],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.WORD, 0, 0);
  expect(res.s.m).toEqual([0xff, 0xff, 0xff, 0xff, 0x56, 0x78, 0xff, 0xff]);
});

/* MOVE_DX_TO_IND_32bit_op */
it(`MOVE_DX_TO_IND_32bit_op`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000004],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.LONG, 0, 0);
  expect(res.s.m).toEqual([0xff, 0xff, 0xff, 0xff, 0x12, 0x34, 0x56, 0x78]);
});

/*****************************/
/********* POST INC **********/
/*****************************/

/* MOVE_DX_TO_IND_8bit_op_post_inc */
it(`MOVE_DX_TO_IND_8bit_op_post_inc`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000000],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.BYTE, 0, 0, EnumOPAction.INC);
  expect(res.s.m).toEqual([0x78, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
  expect(res.s.a[0]).toEqual(0x00000001);
});

/* MOVE_DX_TO_IND_16bit_op_inc */
it(`MOVE_DX_TO_IND_16bit_op_inc`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000000],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.WORD, 0, 0, EnumOPAction.INC);
  expect(res.s.m).toEqual([0x56, 0x78, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
  expect(res.s.a[0]).toEqual(0x00000002);
});

/* MOVE_DX_TO_IND_32bit_op_inc */
it(`MOVE_DX_TO_IND_32bit_op_inc`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000000],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.LONG, 0, 0, EnumOPAction.INC);
  expect(res.s.m).toEqual([0x12, 0x34, 0x56, 0x78, 0xff, 0xff, 0xff, 0xff]);
  expect(res.s.a[0]).toEqual(0x00000004);
});

/*****************************/
/********** PRE DEC **********/
/*****************************/

/* MOVE_DX_TO_IND_8bit_op_dec */
it(`MOVE_DX_TO_IND_8bit_op_dec`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000004],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.BYTE, 0, 0, EnumOPAction.DEC);
  expect(res.s.m).toEqual([0xff, 0xff, 0xff, 0x78, 0xff, 0xff, 0xff, 0xff]);
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
  expect(res.s.m).toEqual([0xff, 0xff, 0x56, 0x78, 0xff, 0xff, 0xff, 0xff]);
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
  expect(res.s.m).toEqual([0x12, 0x34, 0x56, 0x78, 0xff, 0xff, 0xff, 0xff]);
  expect(res.s.a[0]).toEqual(0x00000000);
});

/*****************************/
/********** PRE DEC **********/
/*****************************/

/* MOVE_DX_TO_IND_8bit_op_ind_with_dis */
it(`MOVE_DX_TO_IND_8bit_op_ind_with_dis`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000000],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.BYTE, 0, 0, EnumOPAction.DIS, 1);
  expect(res.s.m).toEqual([0xff, 0x78, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
  expect(res.s.a[0]).toEqual(0x00000000);
});

/* MOVE_DX_TO_IND_16bit_op_ind_with_dis */
it(`MOVE_DX_TO_IND_16bit_op_ind_with_dis`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000000],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.WORD, 0, 0, EnumOPAction.DIS, 2);
  expect(res.s.m).toEqual([0xff, 0xff, 0x56, 0x78, 0xff, 0xff, 0xff, 0xff]);
  expect(res.s.a[0]).toEqual(0x00000000);
});

/* MOVE_DX_TO_IND_32bit_op_ind_with_dis */
it(`MOVE_DX_TO_IND_32bit_op_ind_with_dis`, () => {
  const task = makeTestTask({
    memoryBufferSize: 8,
    d: [0x12345678],
    a: [0x00000000],
  });
  const res = MOVE_DX_TO_IND(task, EnumOpBit.LONG, 0, 0, EnumOPAction.DIS, 4);
  expect(res.s.m).toEqual([0xff, 0xff, 0xff, 0xff, 0x12, 0x34, 0x56, 0x78]);
  expect(res.s.a[0]).toEqual(0x00000000);
});
