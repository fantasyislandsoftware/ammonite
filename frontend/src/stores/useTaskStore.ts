import { create } from 'zustand';

export enum TaskType {
  JS,
  ASM,
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
  type: TaskType;
  state: TaskState;
  code: string[];
  var: any;
  label: any;
  promise: any;
  pos: number;
  s: {
    d: number[];
    a: number[];
    c: ICCR;
    m: number[];
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
