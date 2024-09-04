import { EnumLOC2BIN, EnumOpSizeBin } from '../../../IM68k';
import { makeTestTask } from '../../../m68kTestHelpers';
import { MOVE } from '../../MOVE';
import {
  dec2bin,
  join4BytesInto1Long,
} from 'functions/dataHandling/dataHandling';

/* move.b d0,d(a0.xn) */
it(`move.b d0,d(a0.xn)`, () => {
  const d_src_t = EnumLOC2BIN.D;
  const d_src_n = dec2bin(0, 3);
  const d_dst_t = EnumLOC2BIN.IWDI;
  const d_dst_n = dec2bin(0, 3);
  const d0 = 0;
  const d1 = 0;
  const d2 = parseInt('00010000', 2);
  const d3 = 1;
  const dl = join4BytesInto1Long(d0, d1, d2, d3);
  const d = dec2bin(dl, 32);
  const i = ['00', EnumOpSizeBin.B, d_dst_n, d_dst_t, d_src_n, d_src_t];
  const testTask = makeTestTask({
    memoryBufferSize: 8,
    d0: [0x12, 0x34, 0x56, 0x78],
    d1: [0x00, 0x00, 0x00, 0x01],
    a0: [0x00, 0x00, 0x00, 0x01],
  });
  const res = MOVE(testTask, i.join(''), d, { verbose: true });
  const { task, success, length } = res;
  expect(success).toEqual(true);
  expect(length).toEqual(2);
  expect(task.s.m).toEqual([0xff, 0xff, 0x78, 0xff, 0xff, 0xff, 0xff, 0xff]);
});
