import { create } from 'zustand';

export enum TaskArch {
  JS,
  M68K,
}

export enum TaskState {
  RUNNING = 'running',
  ERROR = 'error',
}

export interface ILabel {
  name: string;
  pos: number;
}

export interface ICCR {
  x: number;
  n: number;
  z: number;
  v: number;
  c: number;
}

export interface ITask {
  id: string;
  name: string;
  arch: TaskArch;
  state: TaskState;
  code: string[];
  var: any;
  label: any;
  promise: any;
  pos: number;
  s: {
    d0: number[];
    d1: number[];
    d2: number[];
    d3: number[];
    d4: number[];
    d5: number[];
    d6: number[];
    d7: number[];
    a0: number[];
    a1: number[];
    a2: number[];
    a3: number[];
    a4: number[];
    a5: number[];
    a6: number[];
    a7: number[];
    c: number[];
    m: number[];
    pc: number;
  };
}

export interface TaskStore {
  tasks: ITask[];
  setTasks: (tasks: ITask[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks: ITask[]) => {
    set({ tasks });
  },
}));
