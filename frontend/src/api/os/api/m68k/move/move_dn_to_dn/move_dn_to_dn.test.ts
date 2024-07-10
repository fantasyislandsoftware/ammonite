import { ICCR, ITask, TaskState } from 'stores/useTaskStore';
import { M68K_API as m68k_api } from '../../m68k';
import { SYSTEM_API as system_api } from '../../../system';
import { autoFillA, autoFillCCR, autoFillD, makeTestTask } from '../../m68kTestHelpers';

const M68K_API = new m68k_api();
const SYSTEM = new system_api();

/* move_dn_to_dn_8bit */
/*it(`move_dn_to_dn_8bit`, () => {
  const t_move_dn_to_dn_8bit = makeTestTask(
    autoFillD(0xffffffff, [0xffffff01]),
    autoFillA(0xffffffff),
    autoFillCCR(),
    []
  );
  const line = SYSTEM.convertMove(8, {
    addr: '',
    hex: '',
    op: `move.b`,
    arg: 'd0,d1',
  }).replace('self', `t_move_dn_to_dn_8bit`);
  const res = eval(line);
  expect(res.s).toEqual({
    d: [
      0xffffff01, 0xffffff01, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff,
      0xffffffff, 0xffffffff,
    ],
    a: [
      0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff,
      0xffffffff, 0xffffffff,
    ],
    c: { x: 0, n: 1, z: 0, v: 0, c: 0 },
    m: [],
  });
});*/

/* move_dn_to_dn_16bit */
/*it(`move_dn_to_dn_16bit`, () => {
  const t_move_dn_to_dn_16bit = makeTestTask(
    autoFillD(0xffffffff, [0xffff0101]),
    autoFillA(0xffffffff),
    autoFillCCR(),
    []
  );
  const line = SYSTEM.convertMove(16, {
    addr: '',
    hex: '',
    op: `move.w`,
    arg: 'd0,d1',
  }).replace('self', `t_move_dn_to_dn_16bit`);
  const res = eval(line);
  expect(res.s).toEqual({
    d: [
      0xffff0101, 0xffff0101, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff,
      0xffffffff, 0xffffffff,
    ],
    a: [
      0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff,
      0xffffffff, 0xffffffff,
    ],
    c: { x: 0, n: 1, z: 0, v: 0, c: 0 },
    m: [],
  });
});*/

/* move_dn_to_dn_32bit */
/*it(`move_dn_to_dn_32bit`, () => {
  const t_move_dn_to_dn_32bit = makeTestTask(
    autoFillD(0xffffffff, [0x01010101]),
    autoFillA(0xffffffff),
    autoFillCCR(),
    []
  );
  const line = SYSTEM.convertMove(32, {
    addr: '',
    hex: '',
    op: `move.l`,
    arg: 'd0,d1',
  }).replace('self', `t_move_dn_to_dn_32bit`);
  const res = eval(line);
  expect(res.s).toEqual({
    d: [
      0x01010101, 0x01010101, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff,
      0xffffffff, 0xffffffff,
    ],
    a: [
      0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff,
      0xffffffff, 0xffffffff,
    ],
    c: { x: 0, n: 1, z: 0, v: 0, c: 0 },
    m: [],
  });*/

  /* */
//});
