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
  s: { [key: string]: number[] };
  pc: number;
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
