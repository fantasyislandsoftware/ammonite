import { ITask, TaskState } from 'stores/useTaskStore';
import { M68K_API as m68k_api } from './m68k';
import { SYSTEM_API as system_api } from './system';

const M68K_API = new m68k_api();
const SYSTEM = new system_api();

class FreshTask {
  public task: ITask = {
    id: '1',
    code: [],
    pos: 0,
    state: TaskState.RUNNING,
    type: 1,
    name: '',
    var: undefined,
    label: undefined,
    promise: undefined,
    r: {
      d: [0, 0, 0, 0, 0, 0, 0, 0],
      a: [0, 0, 0, 0, 0, 0, 0, 0],
    },
  };
}

describe('move_8', () => {
  let line = '';

  /* Copy DX to DX */
  let I_A = new FreshTask().task;
  let R_A = I_A;
  I_A.r.d = [1, 0, 0, 0, 0, 0, 0, 0];
  line = SYSTEM.convertToMove8({
    addr: '',
    hex: '',
    op: 'move.b',
    arg: 'd0,d1',
  }).replace('self', 'I_A');
  console.log(line);
  R_A = eval(line);
  it('copy dn to dn', () => {
    expect(R_A.r.d).toEqual([1, 1, 0, 0, 0, 0, 0, 0]);
  });

  /* Copy IMM to DN */
  let I_B = new FreshTask().task;
  let R_B = I_B;
  I_B.r.d = [1, 0, 0, 0, 0, 0, 0, 0];
  line = SYSTEM.convertToMove8({
    addr: '',
    hex: '',
    op: 'move.b',
    arg: '#1,d0',
  }).replace('self', 'I_B');
  R_B = eval(line);
  it('copy imm to dn', () => {
    expect(I_B.r.d).toEqual([1, 0, 0, 0, 0, 0, 0, 0]);
  });
});
