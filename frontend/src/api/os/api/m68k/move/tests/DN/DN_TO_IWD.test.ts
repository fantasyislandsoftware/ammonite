import { EnumLOC2BIN, EnumOpSizeBin } from '../../../IM68k';
import { makeTestTask } from '../../../m68kTestHelpers';
import { MOVE } from '../../MOVE';
import { dec2bin } from 'functions/dataHandling/dataHandling';

/* move.b d0,d(a0) */
it(`move.b d0,d(a0)`, () => {
  const d_src_t = EnumLOC2BIN.D;
  const d_src_n = dec2bin(0, 3);
  const d_dst_t = EnumLOC2BIN.IWD;
  const d_dst_n = dec2bin(0, 3);
  const d = dec2bin(0x02, 32);
  const i = ['00', EnumOpSizeBin.B, d_dst_n, d_dst_t, d_src_n, d_src_t];
  const testTask = makeTestTask({
    memoryBufferSize: 8,
    d0: [0x12, 0x34, 0x56, 0x78],
    a0: [0x00, 0x00, 0x00, 0x00],
  });
  const res = MOVE(testTask, i.join(''), d);
  const { task, success, length } = res;
  expect(success).toEqual(true);
  expect(length).toEqual(2);
  expect(task.s.m).toEqual([0xff, 0xff, 0x78, 0xff, 0xff, 0xff, 0xff, 0xff]);
});

/* move.w d0,d(a0) */
it(`move.w d0,d(a0)`, () => {
  const d_src_t = EnumLOC2BIN.D;
  const d_src_n = dec2bin(0, 3);
  const d_dst_t = EnumLOC2BIN.IWD;
  const d_dst_n = dec2bin(0, 3);
  const d = dec2bin(0x02, 32);
  const i = ['00', EnumOpSizeBin.W, d_dst_n, d_dst_t, d_src_n, d_src_t];
  const testTask = makeTestTask({
    memoryBufferSize: 8,
    d0: [0x12, 0x34, 0x56, 0x78],
    a0: [0x00, 0x00, 0x00, 0x00],
  });
  const res = MOVE(testTask, i.join(''), d);
  const { task, success, length } = res;
  expect(success).toEqual(true);
  expect(length).toEqual(2);
  expect(task.s.m).toEqual([0xff, 0xff, 0x56, 0x78, 0xff, 0xff, 0xff, 0xff]);
});

/* move.l d0,d(a0) */
it(`move.l d0,d(a0)`, () => {
  const d_src_t = EnumLOC2BIN.D;
  const d_src_n = dec2bin(0, 3);
  const d_dst_t = EnumLOC2BIN.IWD;
  const d_dst_n = dec2bin(0, 3);
  const d = dec2bin(0x02, 32);
  const i = ['00', EnumOpSizeBin.L, d_dst_n, d_dst_t, d_src_n, d_src_t];
  const testTask = makeTestTask({
    memoryBufferSize: 8,
    d0: [0x12, 0x34, 0x56, 0x78],
    a0: [0x00, 0x00, 0x00, 0x00],
  });
  const res = MOVE(testTask, i.join(''), d);
  const { task, success, length } = res;
  expect(success).toEqual(true);
  expect(length).toEqual(2);
  expect(task.s.m).toEqual([0xff, 0xff, 0x12, 0x34, 0x56, 0x78, 0xff, 0xff]);
});
