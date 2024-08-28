import { dec2bin } from 'functions/dataHandling/dataHandling';
import { EnumLOC2BIN, EnumLOCD2BIN, EnumOpSizeBin } from '../../../IM68k';
import { makeTestTask } from '../../../m68kTestHelpers';
import { MOVE } from '../../MOVE';

/* move.b d0,0.w */
it(`move.b d0,0.w`, () => {
  const d_src_t = EnumLOC2BIN.D;
  const d_src_n = dec2bin(0, 3);
  const d_dst_t = EnumLOC2BIN.M;
  const d_dst_n = EnumLOCD2BIN.ABS_W;
  const d = dec2bin(0x00, 32);
  const i = ['00', EnumOpSizeBin.B, d_dst_n, d_dst_t, d_src_n, d_src_t];
  const testTask = makeTestTask({
    memoryBufferSize: 8,
    d0: [0x12, 0x34, 0x56, 0x78],
    m: [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
  });
  const res = MOVE(testTask, i.join(''), d);
  const { task, success, length } = res;
  expect(success).toEqual(true);
  expect(length).toEqual(4);
  expect(task.s.m).toEqual([0x78, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
});

/* move.w d0,0.w */
it(`move.w d0,0.w`, () => {
  const d_src_t = EnumLOC2BIN.D;
  const d_src_n = dec2bin(0, 3);
  const d_dst_t = EnumLOC2BIN.M;
  const d_dst_n = EnumLOCD2BIN.ABS_W;
  const d = dec2bin(0x00, 32);
  const i = ['00', EnumOpSizeBin.W, d_dst_n, d_dst_t, d_src_n, d_src_t];
  const testTask = makeTestTask({
    memoryBufferSize: 8,
    d0: [0x12, 0x34, 0x56, 0x78],
    m: [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
  });
  const res = MOVE(testTask, i.join(''), d);
  const { task, success, length } = res;
  expect(success).toEqual(true);
  expect(length).toEqual(4);
  expect(task.s.m).toEqual([0x56, 0x78, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
});

/* move.w d0,0.l */
it(`move.w d0,0.l`, () => {
  const d_src_t = EnumLOC2BIN.D;
  const d_src_n = dec2bin(0, 3);
  const d_dst_t = EnumLOC2BIN.M;
  const d_dst_n = EnumLOCD2BIN.ABS_W;
  const d = dec2bin(0x00, 32);
  const i = ['00', EnumOpSizeBin.L, d_dst_n, d_dst_t, d_src_n, d_src_t];
  const testTask = makeTestTask({
    memoryBufferSize: 8,
    d0: [0x12, 0x34, 0x56, 0x78],
    m: [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
  });
  const res = MOVE(testTask, i.join(''), d);
  const { task, success, length } = res;
  expect(success).toEqual(true);
  expect(length).toEqual(4);
  expect(task.s.m).toEqual([0x12, 0x34, 0x56, 0x78, 0xff, 0xff, 0xff, 0xff]);
});
