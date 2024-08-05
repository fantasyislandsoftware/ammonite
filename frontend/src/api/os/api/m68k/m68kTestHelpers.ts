import { ICCR, ITask, TaskArch, TaskState } from 'stores/useTaskStore';

export interface IMakeTestTaskParams {
  memoryBufferSize: number;
  d?: number[];
  a?: number[];
  m?: number[];
}

export const makeTestTask = (params: IMakeTestTaskParams) => {
  const { memoryBufferSize, d, a, m } = params;

  /* DN */
  const initD: number[] = [];
  for (let i = 0; i < 8; i++) {
    initD.push(0);
  }
  d?.forEach((v, i) => {
    initD[i] = v;
  });

  /* AN */
  const initA: number[] = [];
  for (let i = 0; i < 8; i++) {
    initA.push(0);
  }
  a?.forEach((v, i) => {
    initA[i] = v;
  });

  /* Memory */
  const initM: number[] = [];
  for (let i = 0; i < memoryBufferSize; i++) {
    initM.push(0);
  }
  m?.forEach((v, i) => {
    initM[i] = v;
  });

  /* CCR */
  const c: ICCR = {
    x: 0,
    n: 0,
    z: 0,
    v: 0,
    c: 0,
  };

  class FreshTask {
    public task: ITask = {
      id: '1',
      code: [],
      pos: 0,
      state: TaskState.RUNNING,
      arch: TaskArch.M68K,
      name: '',
      var: undefined,
      label: undefined,
      promise: undefined,
      s: {
        d: initD,
        a: initA,
        c: c,
        m: initM,
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

export const hex32Tohex8Array = (hex: string) => {
  const arr = [];
  for (let i = 0; i < 4; i++) {
    arr.push(hex.substr(i * 2, 2));
  }
  return arr;
};

export const moveC = (self: ITask) => {
  return {
    x: self.s.c.x,
    n: 1,
    z: 0,
    v: 0,
    c: 0,
  };
};
