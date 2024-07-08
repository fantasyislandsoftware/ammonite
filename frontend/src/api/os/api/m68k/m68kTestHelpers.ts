import { ICCR, ITask, TaskState } from 'stores/useTaskStore';

export const makeTestTask = (
  d: number[],
  a: number[],
  c: ICCR,
  m: number[]
) => {
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
      s: {
        d: d,
        a: a,
        c: c,
        m: m,
      },
    };
  }
  const result = new FreshTask().task;
  return result;
};

export const autoFillD = (fill: number, custom?: number[]) => {
  const result: number[] = [];
  for (let i = 0; i < 8; i++) {
    result.push(fill);
  }
  custom?.forEach((v, i) => {
    result[i] = v;
  });
  return result;
};

export const autoFillA = (fill: number, custom?: number[]) => {
  const result: number[] = [];
  for (let i = 0; i < 8; i++) {
    result.push(fill);
  }
  custom?.forEach((v, i) => {
    result[i] = v;
  });
  return result;
};

export const autoFillCCR = () => {
  return {
    x: 0,
    n: 0,
    z: 0,
    v: 0,
    c: 0,
  };
};
