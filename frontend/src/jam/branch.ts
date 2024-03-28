import { IParam } from 'functions/tasks';
import { ITask } from 'stores/useTaskStore';

export const _define = (task: ITask, varName: IParam, value: IParam) => {
  task.var[varName.id] = value.value;
};
