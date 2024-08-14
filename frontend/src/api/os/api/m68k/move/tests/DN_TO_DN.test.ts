import { EnumBit } from 'functions/dataHandling/IdataHandling';
import { makeTestTask } from '../../m68kTestHelpers';
import { MOVE } from '../MOVE';

/* move.b d0,d1 */
it(`move.b d0,d1`, () => {
  EnumBit.BYTE;

  const i = ['00', '01', '001', '000', '000', '000'];
  const d = '0000000000000000';

  const testTask = makeTestTask({
    memoryBufferSize: 8,
    d0: [0x12, 0x34, 0x56, 0x78],
  });
  const res = MOVE(testTask, i.join(''), d);
  const { task, success, length } = res;
  expect(success).toEqual(true);
  expect(length).toEqual(2);
  expect(task.s.d1).toEqual([0x0, 0x0, 0x0, 0x78]);
});

/* move.w d0,d1 */
it(`move.w d0,d1`, () => {
  EnumBit.BYTE;
  const i = ['00', '11', '001', '000', '000', '000'];
  const d = '0000000000000000';
  const testTask = makeTestTask({
    memoryBufferSize: 8,
    d0: [0x12, 0x34, 0x56, 0x78],
  });
  const res = MOVE(testTask, i.join(''), d);
  const { task, success, length } = res;
  expect(success).toEqual(true);
  expect(length).toEqual(2);
  expect(task.s.d1).toEqual([0x0, 0x0, 0x56, 0x78]);
});

/* move.l d0,d1 */
it(`move.l d0,d1`, () => {
  EnumBit.BYTE;
  const i = ['00', '10', '001', '000', '000', '000'];
  const d = '0000000000000000';
  const testTask = makeTestTask({
    memoryBufferSize: 8,
    d0: [0x12, 0x34, 0x56, 0x78],
  });
  const res = MOVE(testTask, i.join(''), d);
  const { task, success, length } = res;
  expect(success).toEqual(true);
  expect(length).toEqual(2);
  expect(task.s.d1).toEqual([0x12, 0x34, 0x56, 0x78]);
});
