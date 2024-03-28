import { IParam } from 'functions/tasks';
import { ITask } from 'stores/useTaskStore';

export const _add = (task: ITask, varName: IParam, value: IParam) => {
  task.var[varName.id] = task.var[varName.id] + Number(value.value);
};

export const _sub = (task: ITask, varName: IParam, value: IParam) => {
  task.var[varName.id] = task.var[varName.id] - Number(value.value);
};
