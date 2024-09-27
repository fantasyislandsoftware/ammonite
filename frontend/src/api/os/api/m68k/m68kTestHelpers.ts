import { EnumBit } from 'functions/dataHandling/IdataHandling';
import { ITask, TaskArch, TaskState } from 'stores/useTaskStore';

export interface IMakeTestTaskParams {
  memoryBufferSize: number;
  d0?: number[];
  d1?: number[];
  d2?: number[];
  d3?: number[];
  d4?: number[];
  d5?: number[];
  d6?: number[];
  d7?: number[];
  a0?: number[];
  a1?: number[];
  a2?: number[];
  a3?: number[];
  a4?: number[];
  a5?: number[];
  a6?: number[];
  a7?: number[];
  m?: number[];
}

export const makeTestTask = (params: IMakeTestTaskParams) => {
  const {
    memoryBufferSize,
    d0,
    d1,
    d2,
    d3,
    d4,
    d5,
    d6,
    d7,
    a0,
    a1,
    a2,
    a3,
    a4,
    a5,
    a6,
    a7,
    m,
  } = params;

  //const defaultReg = [0x0, 0x0, 0x0, 0x0];

  /* Memory */
  const initM: number[] = [];
  for (let i = 0; i < memoryBufferSize; i++) {
    initM.push(0xff);
  }

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
        d0: d0 ? d0 : [0x0, 0x0, 0x0, 0x0],
        d1: d1 ? d1 : [0x0, 0x0, 0x0, 0x0],
        d2: d2 ? d2 : [0x0, 0x0, 0x0, 0x0],
        d3: d3 ? d3 : [0x0, 0x0, 0x0, 0x0],
        d4: d4 ? d4 : [0x0, 0x0, 0x0, 0x0],
        d5: d5 ? d5 : [0x0, 0x0, 0x0, 0x0],
        d6: d6 ? d6 : [0x0, 0x0, 0x0, 0x0],
        d7: d7 ? d7 : [0x0, 0x0, 0x0, 0x0],
        a0: a0 ? a0 : [0x0, 0x0, 0x0, 0x0],
        a1: a1 ? a1 : [0x0, 0x0, 0x0, 0x0],
        a2: a2 ? a2 : [0x0, 0x0, 0x0, 0x0],
        a3: a3 ? a3 : [0x0, 0x0, 0x0, 0x0],
        a4: a4 ? a4 : [0x0, 0x0, 0x0, 0x0],
        a5: a5 ? a5 : [0x0, 0x0, 0x0, 0x0],
        a6: a6 ? a6 : [0x0, 0x0, 0x0, 0x0],
        a7: a7 ? a7 : [0x0, 0x0, 0x0, 0x0],
        m: m ? m : initM,
        c: [],
      },
      pc: 0,
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

export const buildMoveCode = (bit: EnumBit) => {};
