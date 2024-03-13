import { create } from 'zustand';

export enum TaskType {
  JS,
  ASM,
}

export interface ITask {
  id: string;
  name: string;
  type: TaskType;
  code: string[];
  vars: any;
  labels: any;
  pos: number;
}

export interface TaskStore {
  tasks: ITask[];
  setTasks: (fonts: ITask[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks: ITask[]) => {
    set({ tasks });
  },
}));
